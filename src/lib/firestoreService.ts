"use client";

import { getFirebaseDb } from "./firebase";

export interface SessionData {
  userId: string;
  name?: string;
  wpm: number;
  netWpm: number;
  accuracy: number;
  cpm: number;
  errors: number;
  layout: string;
  language: string;
  mode: string;
  duration: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  totalTimeTypedSeconds: number;
  totalSessions: number;
  avgWpm: number;
  highWpm: number;
  xp: number;
  level: number;
  role: "student" | "teacher" | "admin";
}

// ── Session Recording ────────────────────────────────────────────────────────
export async function saveTypingSession(session: SessionData) {
  if (typeof window === "undefined") return null;
  try {
    const db = await getFirebaseDb();
    if (!db) return null;

    const safeWpm = Math.min(500, Math.max(0, isFinite(session.wpm) ? session.wpm : 0));
    const safeNetWpm = Math.min(500, Math.max(0, isFinite(session.netWpm) ? session.netWpm : 0));
    const sanitizedSession = {
      ...session,
      wpm: safeWpm,
      netWpm: safeNetWpm,
    };

    const firestore = await import("firebase/firestore");
    const sessionRef = firestore.doc(firestore.collection(db, "typing_sessions"));
    await firestore.setDoc(sessionRef, {
      ...sanitizedSession,
      id: sessionRef.id,
      timestamp: firestore.serverTimestamp(),
    });

    if (session.userId && session.userId !== "guest") {
      const userRef = firestore.doc(db, "users", session.userId);
      const userSnap = await firestore.getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;
        const newHigh = Math.max(data.highWpm || 0, safeNetWpm);
        const newTotal = (data.totalSessions || 0) + 1;
        const rawAvg = Math.round(((data.avgWpm || 0) * (newTotal - 1) + safeNetWpm) / Math.max(1, newTotal));
        const newAvg = isNaN(rawAvg) ? safeNetWpm : Math.min(500, Math.max(0, rawAvg));
        const earnedXp = Math.round(safeNetWpm * (Math.max(0, Math.min(100, session.accuracy)) / 100) * 10);
        const newXp = (data.xp || 0) + earnedXp;
        const newLevel = Math.max(1, Math.floor(newXp / 100) + 1);

        await firestore.setDoc(
          userRef,
          {
            totalSessions: firestore.increment(1),
            totalTimeTypedSeconds: firestore.increment(session.duration),
            highWpm: newHigh,
            avgWpm: newAvg,
            xp: newXp,
            level: newLevel,
            updatedAt: firestore.serverTimestamp(),
          },
          { merge: true }
        );
      } else {
        const earnedXp = Math.round(safeNetWpm * (Math.max(0, Math.min(100, session.accuracy)) / 100) * 10);
        const newLevel = Math.max(1, Math.floor(earnedXp / 100) + 1);
        await firestore.setDoc(
          userRef,
          {
            uid: session.userId,
            displayName: session.name || "Learner",
            email: "",
            totalSessions: 1,
            totalTimeTypedSeconds: session.duration,
            highWpm: safeNetWpm,
            avgWpm: safeNetWpm,
            xp: earnedXp,
            level: newLevel,
            role: "student",
            createdAt: firestore.serverTimestamp(),
            updatedAt: firestore.serverTimestamp(),
          },
          { merge: true }
        );
      }
    }

    return sessionRef.id;
  } catch (error) {
    console.error("Error saving typing session:", error);
    return null;
  }
}

// ── Leaderboards ─────────────────────────────────────────────────────────────
export async function getTopLeaderboard(layout = "all", timePeriod = "all", limitCount = 100) {
  if (typeof window === "undefined") return [];
  try {
    const db = await getFirebaseDb();
    if (!db) return [];

    const firestore = await import("firebase/firestore");
    const sessionsRef = firestore.collection(db, "typing_sessions");
    const constraints: any[] = [];

    if (layout !== "all") {
      constraints.push(firestore.where("layout", "==", layout));
    }

    if (timePeriod !== "all") {
      const now = Date.now();
      let msAgo = 0;
      if (timePeriod === "daily") msAgo = 24 * 60 * 60 * 1000;
      else if (timePeriod === "weekly") msAgo = 7 * 24 * 60 * 60 * 1000;
      else if (timePeriod === "monthly") msAgo = 30 * 24 * 60 * 60 * 1000;
      else if (timePeriod === "yearly") msAgo = 365 * 24 * 60 * 60 * 1000;

      if (msAgo > 0) {
        const sinceDate = new Date(now - msAgo);
        constraints.push(firestore.where("timestamp", ">=", sinceDate));
      }
    }

    constraints.push(firestore.orderBy("netWpm", "desc"));
    constraints.push(firestore.limit(limitCount));

    const q = firestore.query(sessionsRef, ...constraints);
    const snapshot = await firestore.getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}

// ── Certificate Verification ────────────────────────────────────────────────
export async function saveCertificateRecord(certData: {
  certificateId: string;
  candidateName: string;
  wpm: number;
  accuracy: number;
  layout: string;
  language: string;
  instituteName?: string;
  mode?: string;
}) {
  if (typeof window === "undefined") return false;
  try {
    const db = await getFirebaseDb();
    if (!db) return false;

    const firestore = await import("firebase/firestore");
    const certRef = firestore.doc(db, "certificates", certData.certificateId);
    const cleanData = Object.fromEntries(
      Object.entries(certData).filter(([_, v]) => v !== undefined)
    );
    await firestore.setDoc(certRef, {
      ...cleanData,
      issuedAt: firestore.serverTimestamp(),
      timestamp: firestore.serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error saving certificate:", error);
    return false;
  }
}

export async function getCertificateRecord(certificateId: string) {
  if (typeof window === "undefined") return null;
  try {
    const db = await getFirebaseDb();
    if (db) {
      const firestore = await import("firebase/firestore");
      const certRef = firestore.doc(db, "certificates", certificateId);
      const snap = await firestore.getDoc(certRef);
      if (snap.exists()) {
        return snap.data();
      }
    }
  } catch (error) {
    console.error("Error getting certificate from Firestore:", error);
  }

  try {
    const cached = localStorage.getItem("typemaster_earned_certificates");
    if (cached) {
      const list = JSON.parse(cached);
      const found = list.find((c: { certificateId?: string }) => c.certificateId === certificateId);
      if (found) return found;
    }
  } catch (e) {}

  return null;
}

// ── Institute & Classroom Engine Data Models ──────────────────────────────────
export interface InstituteRecord {
  id: string;
  name: string;
  adminName: string;
  adminEmail: string;
  phone?: string;
  isBeta?: boolean;
  certificateQuota?: number;
  certificatesIssued?: number;
  createdAt: unknown;
}

export interface InstituteClassRecord {
  id: string;
  instituteId: string;
  instituteName: string;
  className: string;
  layout: string;
  classCode: string;
  targetWpm: number;
  studentCount: number;
  createdAt: unknown;
}

export interface ClassAssignmentRecord {
  id: string;
  classId: string;
  className: string;
  passageTitle: string;
  passageText: string;
  language: "bangla" | "english";
  layout: string;
  targetWpm: number;
  deadline?: string;
  createdAt: unknown;
}

export interface AssignmentSubmissionRecord {
  id: string;
  assignmentId: string;
  classId: string;
  studentUid: string;
  studentName: string;
  wpm: number;
  accuracy: number;
  passed: boolean;
  submittedAt: unknown;
}

export interface PaymentRequestRecord {
  id?: string;
  userId?: string;
  instituteId?: string;
  instituteName?: string;
  payerType: "institute" | "individual";
  paymentMethod: "bKash" | "Nagad";
  senderPhone: string;
  transactionId: string;
  certificateCount: number;
  pricePerCertBDT: number;
  totalAmountBDT: number;
  status: "pending" | "approved" | "rejected";
  createdAt?: unknown;
}

export async function submitPaymentRequest(request: Omit<PaymentRequestRecord, "id" | "createdAt" | "status">) {
  if (typeof window === "undefined") return null;
  try {
    const db = await getFirebaseDb();
    let firestoreDoc: PaymentRequestRecord | null = null;
    if (db) {
      const firestore = await import("firebase/firestore");
      const ref = firestore.doc(firestore.collection(db, "payment_requests"));
      firestoreDoc = {
        ...request,
        id: ref.id,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      await firestore.setDoc(ref, {
        ...firestoreDoc,
        createdAt: firestore.serverTimestamp(),
      });
    }

    const localDoc: PaymentRequestRecord = firestoreDoc || {
      ...request,
      id: `pay-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = localStorage.getItem("typemaster_payment_requests");
      const list: PaymentRequestRecord[] = existing ? JSON.parse(existing) : [];
      localStorage.setItem("typemaster_payment_requests", JSON.stringify([localDoc, ...list]));
    } catch (e) {}

    return localDoc;
  } catch (err) {
    console.error("Error submitting payment request:", err);
    return null;
  }
}

export async function getPaymentRequests(): Promise<PaymentRequestRecord[]> {
  if (typeof window === "undefined") return [];
  let firestoreList: PaymentRequestRecord[] = [];
  try {
    const db = await getFirebaseDb();
    if (db) {
      const firestore = await import("firebase/firestore");
      const q = firestore.query(
        firestore.collection(db, "payment_requests"),
        firestore.orderBy("createdAt", "desc")
      );
      const snap = await firestore.getDocs(q);
      if (!snap.empty) {
        firestoreList = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as PaymentRequestRecord));
      }
    }
  } catch (err) {
    console.error("Error fetching payment requests from Firestore:", err);
  }

  try {
    const cached = localStorage.getItem("typemaster_payment_requests");
    const localList: PaymentRequestRecord[] = cached ? JSON.parse(cached) : [];
    
    // Combine local and Firestore items unique by ID, preferring updated status over pending
    const combinedMap = new Map<string, PaymentRequestRecord>();
    [...firestoreList, ...localList].forEach((item) => {
      if (item.id) {
        const existing = combinedMap.get(item.id);
        if (!existing) {
          combinedMap.set(item.id, item);
        } else if (existing.status === "pending" && item.status !== "pending") {
          combinedMap.set(item.id, item);
        }
      }
    });

    return Array.from(combinedMap.values());
  } catch (e) {}

  return firestoreList;
}

export async function updatePaymentRequestStatus(
  requestId: string,
  status: "approved" | "rejected",
  instituteId?: string,
  certCount?: number,
  userId?: string
): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const db = await getFirebaseDb();
    if (db) {
      const firestore = await import("firebase/firestore");
      const ref = firestore.doc(db, "payment_requests", requestId);
      await firestore.updateDoc(ref, { status });

      if (status === "approved" && certCount) {
        if (instituteId) {
          const instRef = firestore.doc(db, "institutes", instituteId);
          await firestore.updateDoc(instRef, {
            certificateQuota: firestore.increment(certCount),
          });
        }
        if (userId) {
          const userRef = firestore.doc(db, "users", userId);
          await firestore.setDoc(
            userRef,
            { certificateQuota: firestore.increment(certCount) },
            { merge: true }
          );
        }
      }
    }
  } catch (err) {
    console.error("Error updating payment request in Firestore:", err);
  }

  try {
    const cached = localStorage.getItem("typemaster_payment_requests");
    if (cached) {
      const list: PaymentRequestRecord[] = JSON.parse(cached);
      const updated = list.map((item) => (item.id === requestId ? { ...item, status } : item));
      localStorage.setItem("typemaster_payment_requests", JSON.stringify(updated));
    }

    if (status === "approved" && certCount) {
      const quotaCached = localStorage.getItem("typemaster_institute_quota");
      if (quotaCached) {
        const quota = JSON.parse(quotaCached);
        const newTotal = (quota.totalQuota || 200) + certCount;
        const newRemaining = (quota.remaining || 200) + certCount;
        localStorage.setItem(
          "typemaster_institute_quota",
          JSON.stringify({ ...quota, totalQuota: newTotal, remaining: newRemaining })
        );
      }
    }
  } catch (e) {}

  return true;
}

export async function getGlobalCertificateStats() {
  if (typeof window === "undefined") return { totalIssued: 0, maxFreeQuota: 500 };
  try {
    const db = await getFirebaseDb();
    if (!db) return { totalIssued: 0, maxFreeQuota: 500 };
    const firestore = await import("firebase/firestore");
    const ref = firestore.doc(db, "system_stats", "certificates");
    const snap = await firestore.getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      return { totalIssued: data.totalIssued || 0, maxFreeQuota: 500 };
    }
    return { totalIssued: 0, maxFreeQuota: 500 };
  } catch (err) {
    console.error("Error fetching global certificate stats:", err);
    return { totalIssued: 0, maxFreeQuota: 500 };
  }
}

export async function saveInstituteRecord(inst: Omit<InstituteRecord, "id" | "createdAt">) {
  if (typeof window === "undefined") return null;
  try {
    const db = await getFirebaseDb();
    if (!db) return null;
    const firestore = await import("firebase/firestore");
    const ref = firestore.doc(firestore.collection(db, "institutes"));
    const data: InstituteRecord = {
      ...inst,
      id: ref.id,
      isBeta: inst.isBeta ?? true,
      certificateQuota: inst.certificateQuota ?? 200,
      certificatesIssued: inst.certificatesIssued ?? 0,
      createdAt: firestore.serverTimestamp(),
    };
    await firestore.setDoc(ref, data);
    return data;
  } catch (err) {
    console.error("Error saving institute record:", err);
    return null;
  }
}

export async function saveClassRecord(cls: Omit<InstituteClassRecord, "id" | "createdAt">) {
  if (typeof window === "undefined") return null;
  try {
    const db = await getFirebaseDb();
    if (!db) return null;
    const firestore = await import("firebase/firestore");
    const ref = firestore.doc(firestore.collection(db, "classes"));
    const data = { ...cls, id: ref.id, createdAt: firestore.serverTimestamp() };
    await firestore.setDoc(ref, data);
    return data;
  } catch (err) {
    console.error("Error saving class record:", err);
    return null;
  }
}

export async function getClassByCode(code: string) {
  if (typeof window === "undefined") return null;
  try {
    const db = await getFirebaseDb();
    if (!db) return null;
    const firestore = await import("firebase/firestore");
    const q = firestore.query(
      firestore.collection(db, "classes"),
      firestore.where("classCode", "==", code.toUpperCase().trim()),
      firestore.limit(1)
    );
    const snap = await firestore.getDocs(q);
    if (!snap.empty) {
      return snap.docs[0].data() as InstituteClassRecord;
    }
    return null;
  } catch (err) {
    console.error("Error finding class by code:", err);
    return null;
  }
}

export async function saveAssignmentRecord(assignment: Omit<ClassAssignmentRecord, "id" | "createdAt">) {
  if (typeof window === "undefined") return null;
  try {
    const db = await getFirebaseDb();
    if (!db) return null;
    const firestore = await import("firebase/firestore");
    const ref = firestore.doc(firestore.collection(db, "assignments"));
    const data = { ...assignment, id: ref.id, createdAt: firestore.serverTimestamp() };
    await firestore.setDoc(ref, data);
    return data;
  } catch (err) {
    console.error("Error saving assignment record:", err);
    return null;
  }
}

export async function saveAssignmentSubmission(sub: Omit<AssignmentSubmissionRecord, "id" | "submittedAt">) {
  if (typeof window === "undefined") return null;
  try {
    const db = await getFirebaseDb();
    if (!db) return null;
    const firestore = await import("firebase/firestore");
    const ref = firestore.doc(firestore.collection(db, "assignment_submissions"));
    const data = { ...sub, id: ref.id, submittedAt: firestore.serverTimestamp() };
    await firestore.setDoc(ref, data);
    return data;
  } catch (err) {
    console.error("Error saving assignment submission:", err);
    return null;
  }
}

// ── Institute V2 Waitlist & Feedback ─────────────────────────────────────────
export interface InstituteV2WaitlistRecord {
  id?: string;
  instituteName: string;
  contactName: string;
  email: string;
  phone: string;
  role: "owner" | "principal" | "teacher" | "student" | "other";
  expectedStudents: string;
  requestedFeatures: string;
  createdAt?: unknown;
  status: "pending" | "contacted" | "approved";
}

export async function submitInstituteV2Waitlist(data: Omit<InstituteV2WaitlistRecord, "id" | "createdAt" | "status">) {
  if (typeof window === "undefined") return null;
  try {
    const db = await getFirebaseDb();
    if (!db) return null;
    const firestore = await import("firebase/firestore");
    const ref = firestore.doc(firestore.collection(db, "institute_v2_waitlist"));
    const record = {
      ...data,
      id: ref.id,
      status: "pending" as const,
      createdAt: firestore.serverTimestamp(),
    };
    await firestore.setDoc(ref, record);
    return record;
  } catch (err) {
    console.error("Error submitting Institute V2 waitlist:", err);
    return null;
  }
}

export async function getInstituteV2WaitlistRequests(): Promise<InstituteV2WaitlistRecord[]> {
  if (typeof window === "undefined") return [];
  try {
    const db = await getFirebaseDb();
    if (!db) return [];
    const firestore = await import("firebase/firestore");
    const q = firestore.query(
      firestore.collection(db, "institute_v2_waitlist"),
      firestore.orderBy("createdAt", "desc")
    );
    const snap = await firestore.getDocs(q);
    const results: InstituteV2WaitlistRecord[] = [];
    snap.forEach((docSnap) => {
      results.push({ id: docSnap.id, ...docSnap.data() } as InstituteV2WaitlistRecord);
    });
    return results;
  } catch (err) {
    console.error("Error fetching Institute V2 waitlist requests:", err);
    return [];
  }
}

export async function getAllUsers(): Promise<UserProfile[]> {
  if (typeof window === "undefined") return [];
  try {
    const db = await getFirebaseDb();
    if (!db) return [];
    const firestore = await import("firebase/firestore");
    const q = firestore.query(
      firestore.collection(db, "users"),
      firestore.orderBy("createdAt", "desc"),
      firestore.limit(50)
    );
    const snap = await firestore.getDocs(q);
    const results: UserProfile[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data() as UserProfile;
      const xp = data.xp || 0;
      const computedLevel = Math.max(1, Math.floor(xp / 100) + 1);
      results.push({
        ...data,
        uid: docSnap.id,
        level: Math.max(data.level || 1, computedLevel),
      } as UserProfile);
    });
    return results;
  } catch (err) {
    console.error("Error fetching all users from Firestore:", err);
    return [];
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (typeof window === "undefined" || !uid) return null;
  try {
    const db = await getFirebaseDb();
    if (!db) return null;
    const firestore = await import("firebase/firestore");
    const ref = firestore.doc(db, "users", uid);
    const snap = await firestore.getDoc(ref);
    if (!snap.exists()) return null;
    const data = snap.data() as UserProfile;
    const computedLevel = Math.max(1, Math.floor((data.xp || 0) / 100) + 1);
    return {
      ...data,
      level: Math.max(data.level || 1, computedLevel),
    };
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return null;
  }
}

export async function updateUserRole(uid: string, newRole: string): Promise<boolean> {
  if (typeof window === "undefined" || !uid) return false;
  try {
    const db = await getFirebaseDb();
    if (!db) return false;
    const firestore = await import("firebase/firestore");
    const ref = firestore.doc(db, "users", uid);
    await firestore.updateDoc(ref, { role: newRole, updatedAt: firestore.serverTimestamp() });
    return true;
  } catch (err) {
    console.error("Error updating user role in Firestore:", err);
    return false;
  }
}

export async function getSystemAnalytics(): Promise<{
  totalUsers: number;
  totalCertificates: number;
  totalSessions: number;
  totalWaitlist: number;
  totalPayments: number;
  totalFeedback: number;
}> {
  if (typeof window === "undefined") {
    return { totalUsers: 0, totalCertificates: 0, totalSessions: 0, totalWaitlist: 0, totalPayments: 0, totalFeedback: 0 };
  }
  try {
    const db = await getFirebaseDb();
    if (!db) {
      return { totalUsers: 0, totalCertificates: 0, totalSessions: 0, totalWaitlist: 0, totalPayments: 0, totalFeedback: 0 };
    }
    const firestore = await import("firebase/firestore");
    const [usersSnap, certsSnap, sessionsSnap, waitlistSnap, paymentsSnap, feedbackSnap] = await Promise.allSettled([
      firestore.getDocs(firestore.query(firestore.collection(db, "users"), firestore.limit(500))),
      firestore.getDocs(firestore.query(firestore.collection(db, "certificates"), firestore.limit(500))),
      firestore.getDocs(firestore.query(firestore.collection(db, "typing_sessions"), firestore.limit(500))),
      firestore.getDocs(firestore.query(firestore.collection(db, "institute_v2_waitlist"), firestore.limit(500))),
      firestore.getDocs(firestore.query(firestore.collection(db, "payment_requests"), firestore.limit(500))),
      firestore.getDocs(firestore.query(firestore.collection(db, "contact_messages"), firestore.limit(500))),
    ]);

    return {
      totalUsers: usersSnap.status === "fulfilled" ? usersSnap.value.size : 0,
      totalCertificates: certsSnap.status === "fulfilled" ? certsSnap.value.size : 0,
      totalSessions: sessionsSnap.status === "fulfilled" ? sessionsSnap.value.size : 0,
      totalWaitlist: waitlistSnap.status === "fulfilled" ? waitlistSnap.value.size : 0,
      totalPayments: paymentsSnap.status === "fulfilled" ? paymentsSnap.value.size : 0,
      totalFeedback: feedbackSnap.status === "fulfilled" ? feedbackSnap.value.size : 0,
    };
  } catch (err) {
    console.error("Error fetching system analytics:", err);
    return { totalUsers: 0, totalCertificates: 0, totalSessions: 0, totalWaitlist: 0, totalPayments: 0, totalFeedback: 0 };
  }
}

export async function getCertificatesList(limitCount = 50): Promise<any[]> {
  if (typeof window === "undefined") return [];
  try {
    const db = await getFirebaseDb();
    if (!db) return [];
    const firestore = await import("firebase/firestore");
    let docs: any[] = [];
    try {
      const q = firestore.query(
        firestore.collection(db, "certificates"),
        firestore.orderBy("issuedAt", "desc"),
        firestore.limit(limitCount)
      );
      const snap = await firestore.getDocs(q);
      docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch {
      try {
        const qFallback = firestore.query(
          firestore.collection(db, "certificates"),
          firestore.orderBy("timestamp", "desc"),
          firestore.limit(limitCount)
        );
        const snapFallback = await firestore.getDocs(qFallback);
        docs = snapFallback.docs.map((d) => ({ id: d.id, ...d.data() }));
      } catch {
        const snapRaw = await firestore.getDocs(
          firestore.query(firestore.collection(db, "certificates"), firestore.limit(limitCount))
        );
        docs = snapRaw.docs.map((d) => ({ id: d.id, ...d.data() }));
      }
    }
    return docs;
  } catch (err) {
    console.error("Error fetching certificates list:", err);
    return [];
  }
}

export async function updateWaitlistStatus(id: string, status: "pending" | "contacted" | "approved") {
  if (typeof window === "undefined" || !id) return false;
  try {
    const db = await getFirebaseDb();
    if (!db) return false;
    const firestore = await import("firebase/firestore");
    const ref = firestore.doc(db, "institute_v2_waitlist", id);
    await firestore.updateDoc(ref, { status, updatedAt: firestore.serverTimestamp() });
    return true;
  } catch (err) {
    console.error("Error updating waitlist status:", err);
    return false;
  }
}

export interface ContactMessage {
  id?: string;
  refId?: string;
  name: string;
  email: string;
  category: string; // e.g. "suggestion", "bug", "general", "billing", "partnership", "improvement"
  subject: string;
  message: string;
  status?: "unread" | "reviewed" | "resolved" | "archived";
  createdAt?: string;
  timestamp?: unknown;
}

export async function saveContactMessage(msg: ContactMessage) {
  const refId = msg.refId || "MSG-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  if (typeof window === "undefined") return { success: false, refId };
  try {
    const db = await getFirebaseDb();
    if (db) {
      const firestore = await import("firebase/firestore");
      const docRef = firestore.doc(firestore.collection(db, "contact_messages"));
      await firestore.setDoc(docRef, {
        ...msg,
        refId,
        id: docRef.id,
        status: msg.status || "unread",
        timestamp: firestore.serverTimestamp(),
        createdAt: msg.createdAt || new Date().toISOString(),
      });
    }
    // Backup in local storage
    const stored = JSON.parse(localStorage.getItem("typemaster_contact_messages") || "[]");
    stored.unshift({ ...msg, refId, status: msg.status || "unread", createdAt: new Date().toISOString() });
    localStorage.setItem("typemaster_contact_messages", JSON.stringify(stored.slice(0, 50)));
    return { success: true, refId };
  } catch (err) {
    console.error("Error saving contact message:", err);
    return { success: false, refId };
  }
}

export async function submitFeedback(data: {
  type: "bug" | "suggestion" | "improvement";
  email?: string;
  name?: string;
  message: string;
}) {
  const isBug = data.type === "bug";
  return saveContactMessage({
    name: data.name || (data.email ? data.email.split("@")[0] : "Learner"),
    email: data.email || "anonymous@typebangla.com",
    category: data.type,
    subject: isBug ? "Bug Report" : "Improvement Suggestion",
    message: data.message,
    status: "unread",
  });
}

export async function getContactMessages(limitCount = 100): Promise<ContactMessage[]> {
  if (typeof window === "undefined") return [];
  try {
    const db = await getFirebaseDb();
    if (!db) {
      const stored = JSON.parse(localStorage.getItem("typemaster_contact_messages") || "[]");
      return stored;
    }
    const firestore = await import("firebase/firestore");
    const q = firestore.query(
      firestore.collection(db, "contact_messages"),
      firestore.orderBy("timestamp", "desc"),
      firestore.limit(limitCount)
    );
    const snap = await firestore.getDocs(q);
    const results: ContactMessage[] = [];
    snap.forEach((docSnap) => {
      results.push({ id: docSnap.id, ...docSnap.data() } as ContactMessage);
    });
    return results;
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    const stored = JSON.parse(localStorage.getItem("typemaster_contact_messages") || "[]");
    return stored;
  }
}

export async function updateContactMessageStatus(
  id: string,
  status: "unread" | "reviewed" | "resolved" | "archived"
): Promise<boolean> {
  if (typeof window === "undefined" || !id) return false;
  try {
    const db = await getFirebaseDb();
    if (!db) return false;
    const firestore = await import("firebase/firestore");
    const ref = firestore.doc(db, "contact_messages", id);
    await firestore.updateDoc(ref, { status, updatedAt: firestore.serverTimestamp() });
    return true;
  } catch (err) {
    console.error("Error updating contact message status:", err);
    return false;
  }
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  if (typeof window === "undefined" || !id) return false;
  try {
    const db = await getFirebaseDb();
    if (!db) return false;
    const firestore = await import("firebase/firestore");
    const ref = firestore.doc(db, "contact_messages", id);
    await firestore.deleteDoc(ref);
    return true;
  } catch (err) {
    console.error("Error deleting contact message:", err);
    return false;
  }
}

export async function seedDemoCertificates() {
  if (typeof window === "undefined") return false;
  try {
    const db = await getFirebaseDb();
    if (!db) return false;
    const firestore = await import("firebase/firestore");
    const demoCert = {
      certificateId: "TM-DEMO-2026",
      studentName: "Khorshed Alam",
      studentEmail: "hello@khorshed-alam.com",
      wpm: 55,
      accuracy: 98,
      mode: "Govt Exam Simulator",
      issueDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      issuedAt: firestore.serverTimestamp(),
      timestamp: firestore.serverTimestamp(),
    };
    const ref = firestore.doc(db, "certificates", "TM-DEMO-2026");
    await firestore.setDoc(ref, demoCert);
    return true;
  } catch (err) {
    console.error("Error seeding demo certificate:", err);
    return false;
  }
}
