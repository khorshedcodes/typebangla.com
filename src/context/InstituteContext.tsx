"use client";

import React, { createContext, useContext, useState } from "react";
import {
  InstituteClassRecord,
  ClassAssignmentRecord,
  AssignmentSubmissionRecord,
  saveClassRecord,
  getClassByCode,
  saveAssignmentRecord,
  saveAssignmentSubmission,
  saveInstituteRecord,
} from "../lib/firestoreService";
import { KeyboardLayout } from "../store/typingStore";

export interface InstituteQuota {
  totalQuota: number;
  issuedCount: number;
  remaining: number;
  isBeta: boolean;
}

interface InstituteContextType {
  instituteName: string | null;
  registerInstitute: (name: string, adminName: string, adminEmail: string, phone?: string) => Promise<boolean>;
  classes: InstituteClassRecord[];
  createClass: (className: string, layout: KeyboardLayout, targetWpm: number) => Promise<InstituteClassRecord | null>;
  enrolledClasses: InstituteClassRecord[];
  joinClassByCode: (code: string, studentName?: string) => Promise<{ success: boolean; message: string; classRecord?: InstituteClassRecord }>;
  assignments: ClassAssignmentRecord[];
  createAssignment: (classId: string, className: string, passageTitle: string, passageText: string, language: "bangla" | "english", layout: KeyboardLayout, targetWpm: number, deadline?: string) => Promise<ClassAssignmentRecord | null>;
  activeAssignment: ClassAssignmentRecord | null;
  setActiveAssignment: (assignment: ClassAssignmentRecord | null) => void;
  submissions: AssignmentSubmissionRecord[];
  submitAssignmentResult: (wpm: number, accuracy: number, studentName: string, studentUid?: string) => Promise<boolean>;
  quota: InstituteQuota;
  deductInstituteQuota: () => boolean;
}

const InstituteContext = createContext<InstituteContextType>({
  instituteName: null,
  registerInstitute: async () => false,
  classes: [],
  createClass: async () => null,
  enrolledClasses: [],
  joinClassByCode: async () => ({ success: false, message: "" }),
  assignments: [],
  createAssignment: async () => null,
  activeAssignment: null,
  setActiveAssignment: () => {},
  submissions: [],
  submitAssignmentResult: async () => false,
  quota: { totalQuota: 200, issuedCount: 0, remaining: 200, isBeta: true },
  deductInstituteQuota: () => false,
});

export function InstituteProvider({ children }: { children: React.ReactNode }) {
  const [instituteName, setInstituteName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("typemaster_institute_name");
  });

  const [classes, setClasses] = useState<InstituteClassRecord[]>(() => {
    if (typeof window === "undefined") return [];
    const cached = localStorage.getItem("typemaster_classes");
    if (cached) {
      try { return JSON.parse(cached); } catch { return []; }
    }
    return [];
  });

  const [enrolledClasses, setEnrolledClasses] = useState<InstituteClassRecord[]>(() => {
    if (typeof window === "undefined") return [];
    const cached = localStorage.getItem("typemaster_enrolled_classes");
    if (cached) {
      try { return JSON.parse(cached); } catch { return []; }
    }
    return [];
  });

  const [assignments, setAssignments] = useState<ClassAssignmentRecord[]>(() => {
    if (typeof window === "undefined") return [];
    const cached = localStorage.getItem("typemaster_assignments");
    if (cached) {
      try { return JSON.parse(cached); } catch { return []; }
    }
    return [];
  });

  const [activeAssignment, setActiveAssignment] = useState<ClassAssignmentRecord | null>(null);

  const [submissions, setSubmissions] = useState<AssignmentSubmissionRecord[]>(() => {
    if (typeof window === "undefined") return [];
    const cached = localStorage.getItem("typemaster_submissions");
    if (cached) {
      try { return JSON.parse(cached); } catch { return []; }
    }
    return [];
  });

  const [quota, setQuota] = useState<InstituteQuota>(() => {
    if (typeof window === "undefined") return { totalQuota: 200, issuedCount: 0, remaining: 200, isBeta: true };
    const cached = localStorage.getItem("typemaster_institute_quota");
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
    return { totalQuota: 200, issuedCount: 0, remaining: 200, isBeta: true };
  });

  const deductInstituteQuota = () => {
    if (quota.remaining <= 0) return false;
    const newIssued = quota.issuedCount + 1;
    const newRemaining = Math.max(0, quota.totalQuota - newIssued);
    const updated: InstituteQuota = {
      ...quota,
      issuedCount: newIssued,
      remaining: newRemaining,
    };
    setQuota(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("typemaster_institute_quota", JSON.stringify(updated));
    }
    return true;
  };

  const saveStateToStorage = (key: string, data: unknown) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving state:", error);
    }
  };

  const registerInstitute = async (name: string, adminName: string, adminEmail: string, phone?: string) => {
    setInstituteName(name);
    if (typeof window !== "undefined") {
      localStorage.setItem("typemaster_institute_name", name);
    }
    await saveInstituteRecord({ name, adminName, adminEmail, phone });
    return true;
  };

  const createClass = async (className: string, layout: KeyboardLayout, targetWpm: number) => {
    const codePrefix = layout.slice(0, 2).toUpperCase();
    const randomCode = `${codePrefix}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newClass: InstituteClassRecord = {
      id: `cls-${Date.now()}`,
      instituteId: "inst-user",
      instituteName: instituteName || "My Institute",
      className,
      layout,
      classCode: randomCode,
      targetWpm,
      studentCount: 1,
      createdAt: new Date().toISOString(),
    };

    const savedFirestore = await saveClassRecord({
      instituteId: newClass.instituteId,
      instituteName: newClass.instituteName,
      className: newClass.className,
      layout: newClass.layout,
      classCode: newClass.classCode,
      targetWpm: newClass.targetWpm,
      studentCount: newClass.studentCount,
    });

    const finalClass = savedFirestore || newClass;

    const updated = [finalClass, ...classes];
    setClasses(updated);
    saveStateToStorage("typemaster_classes", updated);
    return finalClass;
  };

  const joinClassByCode = async (code: string, studentName?: string) => {
    const trimmedCode = code.toUpperCase().trim();
    if (!trimmedCode) return { success: false, message: "Please enter a valid class code." };

    let found = classes.find((c) => c.classCode === trimmedCode);
    if (!found) {
      const firestoreClass = await getClassByCode(trimmedCode);
      if (firestoreClass) found = firestoreClass;
    }

    if (!found) {
      return { success: false, message: `No active class found with code: ${trimmedCode}` };
    }

    if (enrolledClasses.some((c) => c.id === found?.id || c.classCode === found?.classCode)) {
      return { success: true, message: `You are already enrolled in "${found.className}".`, classRecord: found };
    }

    const updatedEnrolled = [...enrolledClasses, found];
    setEnrolledClasses(updatedEnrolled);
    saveStateToStorage("typemaster_enrolled_classes", updatedEnrolled);

    return { success: true, message: `Successfully enrolled in "${found.className}"!`, classRecord: found };
  };

  const createAssignment = async (
    classId: string,
    className: string,
    passageTitle: string,
    passageText: string,
    language: "bangla" | "english",
    layout: KeyboardLayout,
    targetWpm: number,
    deadline?: string
  ) => {
    const newAsg: ClassAssignmentRecord = {
      id: `asg-${Date.now()}`,
      classId,
      className,
      passageTitle,
      passageText,
      language,
      layout,
      targetWpm,
      deadline: deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };

    const savedFirestore = await saveAssignmentRecord({
      classId: newAsg.classId,
      className: newAsg.className,
      passageTitle: newAsg.passageTitle,
      passageText: newAsg.passageText,
      language: newAsg.language,
      layout: newAsg.layout,
      targetWpm: newAsg.targetWpm,
      deadline: newAsg.deadline,
    });

    const finalAsg = savedFirestore || newAsg;
    const updated = [finalAsg, ...assignments];
    setAssignments(updated);
    saveStateToStorage("typemaster_assignments", updated);
    return finalAsg;
  };

  const submitAssignmentResult = async (wpm: number, accuracy: number, studentName: string, studentUid?: string) => {
    if (!activeAssignment) return false;

    const passed = wpm >= activeAssignment.targetWpm && accuracy >= 85;

    const newSub: AssignmentSubmissionRecord = {
      id: `sub-${Date.now()}`,
      assignmentId: activeAssignment.id,
      classId: activeAssignment.classId,
      studentUid: studentUid || "guest",
      studentName: studentName || "Student Learner",
      wpm,
      accuracy,
      passed,
      submittedAt: new Date().toISOString(),
    };

    await saveAssignmentSubmission({
      assignmentId: newSub.assignmentId,
      classId: newSub.classId,
      studentUid: newSub.studentUid,
      studentName: newSub.studentName,
      wpm,
      accuracy,
      passed,
    });

    const updated = [newSub, ...submissions];
    setSubmissions(updated);
    saveStateToStorage("typemaster_submissions", updated);
    return true;
  };

  return (
    <InstituteContext.Provider
      value={{
        instituteName,
        registerInstitute,
        classes,
        createClass,
        enrolledClasses,
        joinClassByCode,
        assignments,
        createAssignment,
        activeAssignment,
        setActiveAssignment,
        submissions,
        submitAssignmentResult,
        quota,
        deductInstituteQuota,
      }}
    >
      {children}
    </InstituteContext.Provider>
  );
}

export function useInstitute() {
  return useContext(InstituteContext);
}
