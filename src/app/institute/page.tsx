"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Building2, Users, GraduationCap, BookOpen,
  Award, CheckCircle2, ArrowRight, BarChart2,
  ClipboardList, ShieldCheck, UserPlus, Keyboard,
  Clock, Lock, Plus, Play, Sparkles, Copy, Check,
  X, AlertCircle, FileText
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { useInstitute } from "../../context/InstituteContext";
import { useTypingStore, KeyboardLayout } from "../../store/typingStore";
import { useAuth } from "../../context/AuthContext";
import TypingArea from "../../components/TypingArea";
import { ExamCertificateModal } from "../../components/ExamCertificateModal";
import { CertificateTopUpModal } from "../../components/CertificateTopUpModal";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Class Management",
    titleBn: "ক্লাস ম্যানেজমেন্ট",
    desc: "Create typing classes with specific keyboard layouts (Avro, UniBijoy, Jatiya, English). Invite students via unique class codes.",
  },
  {
    icon: ClipboardList,
    title: "Assignment Engine",
    titleBn: "অ্যাসাইনমেন্ট ইঞ্জিন",
    desc: "Assign typing passages with target WPM goals and deadlines. Track submissions and auto-grade student performance.",
  },
  {
    icon: BarChart2,
    title: "Student Progress Tracking",
    titleBn: "শিক্ষার্থী অগ্রগতি ট্র্যাকিং",
    desc: "Monitor individual and class-wide WPM trends, accuracy scores, practice streaks, and identify struggling students.",
  },
  {
    icon: Award,
    title: "Verified Certificate Issuer",
    titleBn: "সনদপত্র ইস্যু",
    desc: "Issue verifiable typing speed certificates to students upon course completion with unique certificate IDs.",
  },
];

export default function InstitutionPortalPage() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { setActiveLayout } = useTypingStore();
  const {
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
  } = useInstitute();

  const [showTopUpModal, setShowTopUpModal] = useState(false);

  const [activeTab, setActiveTab] = useState<"overview" | "teacher" | "student" | "register">("overview");
  const [registerType, setRegisterType] = useState<"student" | "institute">("student");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "register") {
      setActiveTab("register");
      setRegisterType("institute");
    } else if (tabParam === "teacher") {
      setActiveTab("teacher");
    } else if (tabParam === "student") {
      setActiveTab("student");
    }
  }, [searchParams]);

  // Registration states
  const [studentName, setStudentName] = useState(user?.displayName || "");
  const [studentEmail, setStudentEmail] = useState(user?.email || "");
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const [joinFeedback, setJoinFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  const [instNameInput, setInstNameInput] = useState("");
  const [adminNameInput, setAdminNameInput] = useState("");
  const [adminEmailInput, setAdminEmailInput] = useState("");
  const [adminPhoneInput, setAdminPhoneInput] = useState("");
  const [instFeedback, setInstFeedback] = useState<string | null>(null);

  // Modals state
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newClassLayout, setNewClassLayout] = useState<KeyboardLayout>("unibijoy");
  const [newClassWpm, setNewClassWpm] = useState(35);

  const [showCreateAsgModal, setShowCreateAsgModal] = useState(false);
  const [asgClassId, setAsgClassId] = useState("");
  const [asgTitle, setAsgTitle] = useState("");
  const [asgText, setAsgText] = useState("");
  const [asgLang, setAsgLang] = useState<"bangla" | "english">("bangla");
  const [asgWpm, setAsgWpm] = useState(35);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [certModalResult, setCertModalResult] = useState<any | null>(null);

  const handleRegisterStudent = async () => {
    if (!studentName.trim()) return;
    if (joinCodeInput.trim()) {
      const res = await joinClassByCode(joinCodeInput, studentName);
      setJoinFeedback(res);
      if (res.success) {
        setActiveTab("student");
      }
    } else {
      setJoinFeedback({ success: true, message: "Student account created! You can join classes anytime using a Class Code." });
      setActiveTab("student");
    }
  };

  const handleRegisterInstituteSubmit = async () => {
    if (!instNameInput.trim() || !adminNameInput.trim()) return;
    await registerInstitute(instNameInput, adminNameInput, adminEmailInput, adminPhoneInput);
    setInstFeedback("Institute registered successfully! Teacher Dashboard activated.");
    setActiveTab("teacher");
  };

  const handleCreateClassSubmit = async () => {
    if (!newClassName.trim()) return;
    await createClass(newClassName, newClassLayout, Number(newClassWpm));
    setShowCreateClassModal(false);
    setNewClassName("");
  };

  const handleCreateAssignmentSubmit = async () => {
    if (!asgTitle.trim() || !asgText.trim() || !asgClassId) return;
    const targetCls = classes.find((c) => c.id === asgClassId);
    if (!targetCls) return;

    await createAssignment(
      asgClassId,
      targetCls.className,
      asgTitle,
      asgText,
      asgLang,
      targetCls.layout as KeyboardLayout,
      Number(asgWpm)
    );
    setShowCreateAsgModal(false);
    setAsgTitle("");
    setAsgText("");
  };

  const handleStartAssignment = (asg: any) => {
    setActiveAssignment(asg);
    setActiveLayout(asg.layout as KeyboardLayout);
  };

  const copyClassCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // ── Assignment Typing Runner View ──────────────────────────────────────────
  if (activeAssignment) {
    return (
      <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 fade-in text-foreground">
        <div className="border border-border bg-card rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary text-primary-foreground font-bold text-xs">
                Class Assignment
              </Badge>
              <span className="text-xs font-bold text-muted-foreground">{activeAssignment.className}</span>
            </div>
            <h1 className="text-xl font-black text-foreground mt-1">{activeAssignment.passageTitle}</h1>
            <p className="text-xs text-muted-foreground">Target Goal: {activeAssignment.targetWpm} WPM | Accuracy: 85%+</p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary px-3 py-1 flex items-center gap-1.5">
              <Lock size={12} />
              <span>Layout Locked: <strong>{activeAssignment.layout.toUpperCase()}</strong></span>
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveAssignment(null)}
              className="text-xs font-bold border-border"
            >
              Exit Assignment
            </Button>
          </div>
        </div>

        <TypingArea
          onSessionComplete={(wpm, accuracy) => {
            submitAssignmentResult(wpm, accuracy, studentName || user?.displayName || "Student Learner", user?.uid);
          }}
        />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 fade-in">

        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
            <Building2 size={14} />
            <span>INSTITUTE PORTAL & CLASSROOM ENGINE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Manage Your Typing Institute
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Create classes, assign homework, track student progress with layout locking, and issue verified typing speed certificates.
          </p>

          {/* Navigation Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeTab === "overview" ? "bg-primary text-primary-foreground border-primary shadow-xs" : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
            >
              Overview & Features
            </button>
            <button
              onClick={() => setActiveTab("teacher")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeTab === "teacher" ? "bg-primary text-primary-foreground border-primary shadow-xs" : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
            >
              <Building2 size={13} className="inline mr-1.5" />
              Teacher Dashboard ({classes.length} Classes)
            </button>
            <button
              onClick={() => setActiveTab("student")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeTab === "student" ? "bg-primary text-primary-foreground border-primary shadow-xs" : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
            >
              <UserPlus size={13} className="inline mr-1.5" />
              Student Classroom ({enrolledClasses.length} Enrolled)
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeTab === "register" ? "bg-primary text-primary-foreground border-primary shadow-xs" : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
            >
              Register Account
            </button>
          </div>
        </section>

        {/* ── TAB 1: OVERVIEW & FEATURES ───────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURES.map((f) => (
                <Card key={f.title} className="border border-border bg-card p-5 rounded-xl hover:border-foreground/30 transition-all shadow-xs">
                  <CardContent className="p-0 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center">
                      <f.icon size={18} className="text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-foreground">{f.title}</h3>
                      <p className="text-[10px] font-bold text-muted-foreground">{f.titleBn}</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Action Banner */}
            <div className="border border-border bg-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs bg-grid-pattern">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-xl font-black text-foreground">Ready to Launch Your Classroom?</h3>
                <p className="text-xs text-muted-foreground">Create a teacher dashboard or join an existing class with a Class Code.</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setActiveTab("teacher")} className="text-xs font-bold gap-1.5 h-10 px-5">
                  <Building2 size={14} /> Open Teacher Dashboard
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("student")} className="text-xs font-bold gap-1.5 h-10 px-5 border-border">
                  <UserPlus size={14} /> Student Join Class
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: TEACHER DASHBOARD ─────────────────────────────────────── */}
        {activeTab === "teacher" && (
          !user ? (
            <Card className="border border-border bg-card shadow-sm p-8 sm:p-12 text-center space-y-6 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
                <Building2 size={32} />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <Badge variant="outline" className="text-xs font-bold text-primary border-primary/30 bg-primary/5 px-3 py-1">
                  Teacher Sign-In Required 🏫
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                  Access Your Institute Classroom Dashboard
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Sign in to create typing classes, generate unique class codes, lock keyboard layouts (Avro, UniBijoy, Jatiya, English), assign drills, and issue verified student certificates.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link href="/login?redirect=/institute?tab=teacher" className="w-full sm:w-auto">
                  <Button className="w-full text-xs font-bold h-11 px-6 gap-2">
                    Sign In as Teacher <ArrowRight size={14} />
                  </Button>
                </Link>
                <Link href="/signup?redirect=/institute?tab=register" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full text-xs font-bold h-11 px-6 border-border">
                    Register Computer Institute
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Institute Operator</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold px-2 py-0.5">
                    BETA PARTNER — 200 FREE CERTS
                  </Badge>
                </div>
                <h2 className="text-2xl font-black text-foreground">{instituteName || "Dhaka Computer Training Institute"}</h2>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowCreateClassModal(true)} className="text-xs font-bold gap-1.5 h-9">
                  <Plus size={14} /> Create New Class
                </Button>
                <Button variant="outline" onClick={() => setShowCreateAsgModal(true)} disabled={classes.length === 0} className="text-xs font-bold gap-1.5 h-9 border-border">
                  <FileText size={14} /> Create Assignment
                </Button>
              </div>
            </div>

            {/* Quota Progress Banner */}
            <Card className="border border-primary/20 bg-primary/5 p-4 rounded-xl shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">Institute Certificate Quota</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">{quota.remaining}</strong> of {quota.totalQuota} free certificate credits remaining. (Bulk rate: 20 BDT/cert)
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-32 bg-secondary rounded-full h-2.5 overflow-hidden border border-border">
                    <div
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, (quota.remaining / quota.totalQuota) * 100))}%` }}
                    />
                  </div>
                  <Button
                    onClick={() => setShowTopUpModal(true)}
                    variant="outline"
                    className="text-xs font-bold border-primary/30 text-primary hover:bg-primary/10 h-8 px-3"
                  >
                    Buy Credits (20 Tk/cert)
                  </Button>
                </div>
              </div>
            </Card>

            {/* Classes Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Classes & Layout Locks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classes.map((cls) => (
                  <Card key={cls.id} className="border border-border bg-card p-5 rounded-xl shadow-xs space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-black text-foreground">{cls.className}</h4>
                        <span className="text-xs text-muted-foreground">Target WPM: {cls.targetWpm} WPM</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-secondary px-2.5 py-1 rounded-md border border-border">
                        <span className="text-xs font-mono font-extrabold text-foreground">{cls.classCode}</span>
                        <button onClick={() => copyClassCode(cls.classCode)} className="text-muted-foreground hover:text-foreground">
                          {copiedCode === cls.classCode ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users size={14} />
                        <span>{cls.studentCount} Registered Students</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold border-border text-foreground bg-secondary">
                        <Lock size={10} className="mr-1" />
                        Locked to: {cls.layout.toUpperCase()}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Assignments List */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Class Assignments ({assignments.length})</h3>
              <div className="grid grid-cols-1 gap-3">
                {assignments.map((asg) => (
                  <div key={asg.id} className="border border-border bg-card p-4 rounded-xl flex items-center justify-between gap-4 shadow-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">{asg.passageTitle}</span>
                        <Badge variant="outline" className="text-[9px] font-bold uppercase">{asg.className}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{asg.passageText}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-foreground font-mono">{asg.targetWpm} WPM</span>
                      <Button size="sm" onClick={() => handleStartAssignment(asg)} className="text-xs font-bold h-8 gap-1">
                        <Play size={12} /> Test Run
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Submissions Roster */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Student Performance Roster</h3>
              <Card className="border border-border bg-card shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-secondary text-muted-foreground uppercase font-bold border-b border-border">
                    <tr>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Speed (WPM)</th>
                      <th className="p-3">Accuracy</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { name: "Tanvir Ahmed", wpm: 42, accuracy: 96, passed: true, layout: "unibijoy" },
                      { name: "Anika Rahman", wpm: 38, accuracy: 94, passed: true, layout: "avro" },
                      ...submissions.map((s) => ({ name: s.studentName, wpm: s.wpm, accuracy: s.accuracy, passed: s.passed, layout: "unibijoy" }))
                    ].map((sub, i) => (
                      <tr key={i} className="hover:bg-secondary/50">
                        <td className="p-3 font-bold text-foreground">{sub.name}</td>
                        <td className="p-3 font-mono font-extrabold text-foreground">{sub.wpm} WPM</td>
                        <td className="p-3 font-bold">{sub.accuracy}%</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${sub.passed ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                            }`}>
                            {sub.passed ? "PASSED 🏆" : "RETRY NEEDED"}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {sub.passed && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCertModalResult({
                                wpm: sub.wpm,
                                accuracy: sub.accuracy,
                                layout: sub.layout,
                                candidateName: sub.name,
                                instituteName: instituteName || "Dhaka Computer Training Institute",
                                language: sub.layout === "english" ? "english" : "bangla",
                                duration: 300,
                                errors: 2
                              })}
                              className="text-[10px] font-bold h-7 border-border gap-1"
                            >
                              <Award size={11} /> Issue Cert
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        )
      )}

        {/* ── TAB 3: STUDENT CLASSROOM ─────────────────────────────────────── */}
        {activeTab === "student" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Join Code Banner */}
            <div className="border border-border bg-card rounded-2xl p-6 shadow-xs space-y-4 bg-grid-pattern">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-foreground">Join an Institute Class</h3>
                  <p className="text-xs text-muted-foreground">Enter the unique Class Code provided by your instructor (e.g. UB-2026-X).</p>
                </div>
                <div className="flex gap-2 max-w-sm w-full">
                  <Input
                    placeholder="Enter Class Code..."
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value)}
                    className="h-10 text-xs border-border uppercase font-mono font-bold"
                  />
                  <Button
                    onClick={async () => {
                      const res = await joinClassByCode(joinCodeInput, studentName || user?.displayName);
                      setJoinFeedback(res);
                    }}
                    className="text-xs font-bold h-10 px-5 shrink-0"
                  >
                    Join Class
                  </Button>
                </div>
              </div>

              {joinFeedback && (
                <div className={`p-3 rounded-lg text-xs font-bold flex items-center gap-2 ${joinFeedback.success ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}>
                  {joinFeedback.success ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                  <span>{joinFeedback.message}</span>
                </div>
              )}
            </div>

            {/* Enrolled Classes List */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Enrolled Classes ({enrolledClasses.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrolledClasses.map((cls) => (
                  <Card key={cls.id} className="border border-border bg-card p-5 rounded-xl shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-black text-foreground">{cls.className}</h4>
                        <p className="text-xs text-muted-foreground">{cls.instituteName}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold border-border bg-secondary text-foreground">
                        <Lock size={10} className="mr-1" />
                        Target: {cls.layout.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="border-t border-border pt-3 space-y-2">
                      <div className="text-xs font-bold text-foreground">Active Assignments:</div>
                      {assignments.filter(a => a.classId === cls.id || a.layout === cls.layout).map((asg) => (
                        <div key={asg.id} className="bg-secondary p-3 rounded-lg flex items-center justify-between border border-border text-xs">
                          <div>
                            <div className="font-bold text-foreground">{asg.passageTitle}</div>
                            <div className="text-[10px] text-muted-foreground">Target Goal: {asg.targetWpm} WPM</div>
                          </div>
                          <Button size="sm" onClick={() => handleStartAssignment(asg)} className="text-xs font-bold h-8 gap-1">
                            <Play size={12} /> Start Assignment
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: REGISTRATION FORMS ────────────────────────────────────── */}
        {activeTab === "register" && (
          <section className="max-w-lg mx-auto space-y-6 border border-border bg-card rounded-xl p-6 sm:p-8 shadow-xs animate-in fade-in duration-200">
            <div className="flex gap-1 p-1 bg-secondary rounded-lg">
              <button
                onClick={() => setRegisterType("student")}
                className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${registerType === "student" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <UserPlus size={12} className="inline mr-1.5" /> Register as Student
              </button>
              <button
                onClick={() => setRegisterType("institute")}
                className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${registerType === "institute" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Building2 size={12} className="inline mr-1.5" /> Register as Institute
              </button>
            </div>

            {registerType === "student" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-black text-foreground">Student Registration</h3>
                  <p className="text-xs text-muted-foreground">Create account to join classes, track homework, and earn certificates.</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Full Name</label>
                    <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="আপনার পূর্ণ নাম" className="h-9 text-xs border-border" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Email Address</label>
                    <Input value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} type="email" placeholder="email@example.com" className="h-9 text-xs border-border" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Class Code (Optional)</label>
                    <Input value={joinCodeInput} onChange={(e) => setJoinCodeInput(e.target.value)} placeholder="e.g. UB-2026-X" className="h-9 text-xs border-border uppercase font-mono font-bold" />
                  </div>
                </div>
                <Button onClick={handleRegisterStudent} className="w-full text-xs font-bold h-10 gap-2">
                  <UserPlus size={14} /> Complete Student Setup
                </Button>
              </div>
            )}

            {registerType === "institute" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-black text-foreground">Institute Registration</h3>
                  <p className="text-xs text-muted-foreground">Register your center to manage classes, assign homework, and issue certificates.</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Institute Name</label>
                    <Input value={instNameInput} onChange={(e) => setInstNameInput(e.target.value)} placeholder="e.g. Dhaka Computer Training Institute" className="h-9 text-xs border-border" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Admin Full Name</label>
                    <Input value={adminNameInput} onChange={(e) => setAdminNameInput(e.target.value)} placeholder="প্রশাসকের পূর্ণ নাম" className="h-9 text-xs border-border" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Admin Email</label>
                    <Input value={adminEmailInput} onChange={(e) => setAdminEmailInput(e.target.value)} type="email" placeholder="admin@institute.edu" className="h-9 text-xs border-border" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Phone Number</label>
                    <Input value={adminPhoneInput} onChange={(e) => setAdminPhoneInput(e.target.value)} placeholder="+880 1XXXXXXXXX" className="h-9 text-xs border-border" />
                  </div>
                </div>
                <Button onClick={handleRegisterInstituteSubmit} className="w-full text-xs font-bold h-10 gap-2">
                  <Building2 size={14} /> Register Institute & Open Dashboard
                </Button>
              </div>
            )}
          </section>
        )}

      </main>

      {/* MODAL 1: CREATE CLASS */}
      {showCreateClassModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-black text-foreground">Create New Class</h3>
              <button onClick={() => setShowCreateClassModal(false)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Class Name</label>
                <Input value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="e.g. Computer Operator Batch #5" className="h-9 border-border" />
              </div>
              <div>
                <label className="font-bold block mb-1">Required Keyboard Layout Lock</label>
                <select
                  value={newClassLayout}
                  onChange={(e) => setNewClassLayout(e.target.value as KeyboardLayout)}
                  className="w-full h-9 rounded-md border border-border bg-background px-3 text-xs font-bold text-foreground"
                >
                  <option value="unibijoy">UniBijoy (Publishing Standard)</option>
                  <option value="jatiya">Jatiya BCC (Govt Job Standard)</option>
                  <option value="avro">Avro Phonetic (Bengali Standard)</option>
                  <option value="english">English QWERTY</option>
                  <option value="probhat">Probhat Layout</option>
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1">Target WPM Requirement</label>
                <Input type="number" value={newClassWpm} onChange={(e) => setNewClassWpm(Number(e.target.value))} className="h-9 border-border" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowCreateClassModal(false)}>Cancel</Button>
              <Button size="sm" onClick={handleCreateClassSubmit} className="font-bold">Create Class & Generate Code</Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATE ASSIGNMENT */}
      {showCreateAsgModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-black text-foreground">Create Class Assignment</h3>
              <button onClick={() => setShowCreateAsgModal(false)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Select Target Class</label>
                <select
                  value={asgClassId}
                  onChange={(e) => setAsgClassId(e.target.value)}
                  className="w-full h-9 rounded-md border border-border bg-background px-3 text-xs font-bold text-foreground"
                >
                  <option value="">-- Choose Class --</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>{c.className} ({c.layout.toUpperCase()})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1">Passage Title</label>
                <Input value={asgTitle} onChange={(e) => setAsgTitle(e.target.value)} placeholder="e.g. সরকারি আদেশ ও টাইপিং প্র্যাকটিস" className="h-9 border-border" />
              </div>
              <div>
                <label className="font-bold block mb-1">Passage Content</label>
                <textarea
                  value={asgText}
                  onChange={(e) => setAsgText(e.target.value)}
                  rows={4}
                  placeholder="Paste the passage text for students to type..."
                  className="w-full p-3 rounded-md border border-border bg-background text-foreground font-bangla text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Language</label>
                  <select value={asgLang} onChange={(e) => setAsgLang(e.target.value as any)} className="w-full h-9 rounded-md border border-border bg-background px-3 font-bold">
                    <option value="bangla">Bangla</option>
                    <option value="english">English</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Target Speed Goal (WPM)</label>
                  <Input type="number" value={asgWpm} onChange={(e) => setAsgWpm(Number(e.target.value))} className="h-9 border-border" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowCreateAsgModal(false)}>Cancel</Button>
              <Button size="sm" onClick={handleCreateAssignmentSubmit} className="font-bold">Distribute Assignment</Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CERTIFICATE GENERATOR */}
      {certModalResult && (
        <ExamCertificateModal
          isOpen={true}
          onClose={() => setCertModalResult(null)}
          result={certModalResult}
        />
      )}

      {/* MODAL 4: TOP-UP PAYMENTS */}
      <CertificateTopUpModal
        isOpen={showTopUpModal}
        onClose={() => setShowTopUpModal(false)}
        payerType="institute"
        instituteName={instituteName || undefined}
        userId={user?.uid}
      />
    </div>
  );
}

