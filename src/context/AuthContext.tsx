"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { getFirebaseAuth, getFirebaseDb } from "../lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  role: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  sendPasswordReset: async () => {},
  signOut: async () => {},
  role: "student",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>("student");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void;

    async function initAuth() {
      try {
        const auth = await getFirebaseAuth();
        const db = await getFirebaseDb();
        if (!auth) {
          setLoading(false);
          return;
        }

        const { onAuthStateChanged } = await import("firebase/auth");

        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
          if (currentUser && db) {
            const firestore = await import("firebase/firestore");
            const userRef = firestore.doc(db, "users", currentUser.uid);
            const snap = await firestore.getDoc(userRef);
            if (!snap.exists()) {
              const newUser = {
                uid: currentUser.uid,
                displayName: currentUser.displayName || "Typing Learner",
                email: currentUser.email || "",
                photoURL: currentUser.photoURL || "",
                role: "student",
                totalTimeTypedSeconds: 0,
                totalSessions: 0,
                avgWpm: 0,
                highWpm: 0,
                xp: 0,
                level: 1,
                createdAt: firestore.serverTimestamp(),
              };
              await firestore.setDoc(userRef, newUser);
              setRole("student");
            } else {
              setRole(snap.data()?.role || "student");
            }

            // Sync offline guest typing history to cloud if available
            try {
              const rawHistory = localStorage.getItem("typemaster_history");
              if (rawHistory) {
                const history = JSON.parse(rawHistory);
                if (Array.isArray(history) && history.length > 0) {
                  const { saveTypingSession } = await import("../lib/firestoreService");
                  let successCount = 0;
                  const itemsToMigrate = history.slice(0, 5);
                  for (const sess of itemsToMigrate) {
                    const res = await saveTypingSession({
                      userId: currentUser.uid,
                      wpm: sess.wpm || sess.netWpm || 30,
                      netWpm: sess.wpm || sess.netWpm || 30,
                      accuracy: sess.accuracy || 95,
                      cpm: (sess.wpm || 30) * 5,
                      errors: sess.errors || 0,
                      layout: sess.layout || "avro",
                      language: sess.language || "bangla",
                      mode: sess.mode || "practice",
                      duration: sess.duration || 60,
                    });
                    if (res) successCount++;
                  }
                  if (successCount === itemsToMigrate.length) {
                    localStorage.removeItem("typemaster_history");
                  }
                }
              }
            } catch (e) {
              console.error("Failed to migrate guest history:", e);
            }

          } else {
            setRole("student");
          }
          setLoading(false);
        });
      } catch (err) {
        console.error("Auth init error:", err);
        setLoading(false);
      }
    }

    initAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    if (typeof window === "undefined") return;
    const auth = await getFirebaseAuth();
    if (!auth) return;
    const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const signInWithEmail = async (email: string, pass: string) => {
    if (typeof window === "undefined") return;
    const auth = await getFirebaseAuth();
    if (!auth) return;
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    if (typeof window === "undefined") return;
    const auth = await getFirebaseAuth();
    if (!auth) return;
    const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (cred.user && name) {
      await updateProfile(cred.user, { displayName: name });
    }
  };

  const sendPasswordReset = async (email: string) => {
    if (typeof window === "undefined") return;
    const auth = await getFirebaseAuth();
    if (!auth) return;
    const { sendPasswordResetEmail } = await import("firebase/auth");
    await sendPasswordResetEmail(auth, email);
  };

  const signOut = async () => {
    if (typeof window === "undefined") return;
    try {
      const auth = await getFirebaseAuth();
      if (!auth) return;
      const { signOut: firebaseSignOut } = await import("firebase/auth");
      await firebaseSignOut(auth);
      localStorage.removeItem("typemaster_enrolled_courses");
      localStorage.removeItem("typemaster_lesson_progress");
      localStorage.removeItem("typemaster_history");
      localStorage.removeItem("typemaster_earned_certificates");
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendPasswordReset,
        signOut,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
