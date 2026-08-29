"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Flame, Star, Trophy, Award, BarChart3, GraduationCap, Target, Clock, Zap,
  ChevronRight, Lock, User, ShieldCheck, CheckCircle2, ExternalLink, BookOpen, Play,
  LogOut, Sparkles, AlertTriangle, ArrowRight, Gamepad2, Settings, RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useGamificationStore, ALL_BADGES } from "../../store/gamificationStore";
import { useTypingStore } from "../../store/typingStore";
import { useAuth } from "../../context/AuthContext";
import { getAllProgress } from "../../utils/lessons/progress";
import { CertificateTopUpModal } from "../../components/CertificateTopUpModal";
import { AuthModal } from "../../components/AuthModal";

interface EarnedCertificate {
  certificateId: string;
  candidateName: string;
  wpm: number;
  accuracy: number;
  layout: string;
  language: string;
  issuedAt?: string;
}

interface EnrolledCourse {
  id: string;
  title: string;
  layout: string;
  progress: number;
}

function WpmSparkline({ records }: { records: { date: string; bestWpm: number }[] }) {
  if (records.length < 2) return <div className="text-xs text-muted-foreground">এখনও পর্যাপ্ত তথ্য জমা হয়নি।</div>;
  const max = Math.max(...records.map((r) => r.bestWpm), 10);
  const w = 240, h = 48;
  const pts = records.slice(-14).map((r, i, arr) => {
    const x = (i / (arr.length - 1)) * w;
    const y = h - (r.bestWpm / max) * h;
    return `${x},${y}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12" preserveAspectRatio="none">
      <polyline points={pts.join(" ")} fill="none" stroke="currentColor" className="text-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardClient() {
  const { user, role, signOut } = useAuth();
  const { currentStreak, longestStreak, totalXp, level, dailyHistory, unlockedBadgeIds, getXpProgress } = useGamificationStore();
  const { history } = useTypingStore();
  const xp = getXpProgress();

  const [certificates, setCertificates] = useState<EarnedCertificate[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [pendingPayment, setPendingPayment] = useState<{ count: number; trxId: string; method: string; date?: string } | null>(null);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const storedCerts = localStorage.getItem("typemaster_earned_certificates");
        if (storedCerts) {
          setCertificates(JSON.parse(storedCerts));
        }

        const storedRequests = localStorage.getItem("typemaster_payment_requests");
        if (storedRequests) {
          const reqs = JSON.parse(storedRequests);
          const pending = reqs.find((r: { status: string }) => r.status === "pending");
          if (pending) {
            setPendingPayment({
              count: pending.certCount || 1,
              trxId: pending.transactionId,
              method: pending.paymentMethod || "bKash/Nagad",
              date: pending.createdAt ? new Date(pending.createdAt).toLocaleDateString("bn-BD") : undefined,
            });
          }
        }

        const enrolledIds: string[] = JSON.parse(localStorage.getItem("typemaster_enrolled_courses") || "[]");
        const allProg = getAllProgress();
        const metaMap: Record<string, { title: string; layout: string; total: number }> = {
          "english-full": { title: "English QWERTY Full Course", layout: "english", total: 20 },
          "avro-full": { title: "Avro Phonetic Bangla Course", layout: "avro", total: 25 },
          "unibijoy-full": { title: "UniBijoy Full Course (Bijoy 52)", layout: "unibijoy", total: 25 },
          "jatiya-full": { title: "Jatiya BCC Govt Course", layout: "jatiya", total: 25 },
          "probhat-full": { title: "Probhat Layout Full Course", layout: "probhat", total: 20 },
        };

        const list: EnrolledCourse[] = enrolledIds.map((id) => {
          const meta = metaMap[id] || { title: id, layout: "english", total: 20 };
          let passedCount = 0;
          Object.values(allProg).forEach((p) => {
            if (p.passed && p.lessonId.startsWith(meta.layout)) passedCount++;
          });
          return {
            id,
            title: meta.title,
            layout: meta.layout,
            progress: Math.min(100, Math.round((passedCount / meta.total) * 100)),
          };
        });
        setEnrolledCourses(list);
      } catch (_e) {
        console.error("Failed to parse dashboard data:", _e);
      }
    });
  }, []);

  const recentSessions = [...history].reverse().slice(0, 5);
  const bestWpm = history.length > 0 ? Math.max(...history.map((h) => h.wpm)) : 0;
  const avgWpm = history.length > 0 ? Math.round(history.reduce((s, h) => s + h.wpm, 0) / history.length) : 0;
  const avgAccuracy = history.length > 0 ? Math.round(history.reduce((s, h) => s + h.accuracy, 0) / history.length) : 0;

  const unlockedBadges = ALL_BADGES.filter((b) => unlockedBadgeIds.includes(b.id));
  const lockedBadges   = ALL_BADGES.filter((b) => !unlockedBadgeIds.includes(b.id));

  // Smart AI Recommendation Logic
  let recommendationTitle = "দৈনিক টাইপিং প্র্যাকটিস রাখুন";
  let recommendationText = "নিয়মিত ১৫ মিনিট টাইপিং অনুশীলন করলে আপনার WPM গতি ও নির্ভুলতা দ্বিগুণ বৃদ্ধি পাবে।";
  let recommendationAction = { label: "প্র্যাকটিস শুরু করুন", href: "/practice" };

  if (bestWpm < 25) {
    recommendationTitle = "💡 গতি বৃদ্ধির মূল পাঠ্যক্রম সম্পন্ন করুন";
    recommendationText = "আপনার গতি ২৫ WPM এর নিচে। কিবোর্ড ফিঙ্গার পজিশনিং ও প্রাথমিক লেসন সম্পন্ন করার পরামর্শ দেয়া হচ্ছে।";
    recommendationAction = { label: "কোর্স শুরু করুন", href: "/courses" };
  } else if (avgAccuracy < 85) {
    recommendationTitle = "🎯 নির্ভুলতা (Accuracy) উন্নত করুন";
    recommendationText = "আপনার নির্ভুলতা ৮৫%-এর নিচে। সরকারি চাকরি বা সার্টিফিকেটের জন্য নির্ভুলতার ওপর বেশি নজর দিন।";
    recommendationAction = { label: "ড্রিল টেস্ট দিন", href: "/practice/test" };
  } else if (bestWpm >= 35 && avgAccuracy >= 90) {
    recommendationTitle = "🏆 সরকারি চাকরি সিমুলেটর বা জাতীয় র‍্যাংক এক্সাম";
    recommendationText = "আপনার টাইপিং স্কিল প্রশংসনীয়! সরকারি চাকরির ৫ মিনিটের এক্সাম সিমুলেটর বা জাতীয় প্রতিযোগিতায় অংশ নিন।";
    recommendationAction = { label: "এক্সাম সিমুলেটরে যান", href: "/exam/govt" };
  }

  if (!user) {
    return (
      <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-16 text-foreground fade-in">
        <Card className="border border-border bg-card shadow-sm p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
            <Lock size={32} />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <Badge variant="outline" className="text-xs font-bold text-primary border-primary/30 bg-primary/5 px-3 py-1">
              Sign In Required
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Sign In to Access Your Personal Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Track your typing speed history, unlock achievement badges, view daily practice streaks, and manage your verified course certificates.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button onClick={() => { setAuthModalMode("login"); setAuthModalOpen(true); }} className="w-full sm:w-auto text-xs font-bold h-11 px-6 gap-2 cursor-pointer">
              Sign In Now <ChevronRight size={14} />
            </Button>
            <Button onClick={() => { setAuthModalMode("signup"); setAuthModalOpen(true); }} variant="outline" className="w-full sm:w-auto text-xs font-bold h-11 px-6 border-border cursor-pointer">
              Create Free Learner Account
            </Button>
          </div>
        </Card>
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authModalMode}
        />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ── LOGGED-IN CUSTOM WORKSPACE TOP BAR HEADER ───────────── */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-xl">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 gap-4">
          
          {/* Left: Brand Logo & Workspace Identifier */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-105 transition-transform">
              <Image src="/images/logo/blackbg.png" alt="TypeBangla" width={28} height={28} className="w-7 h-7 hidden dark:block object-contain" priority />
              <Image src="/images/logo/whitebg_1.png" alt="TypeBangla" width={28} height={28} className="w-7 h-7 dark:hidden object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-foreground flex items-center gap-1">
                TypeBangla <span className="text-[10px] font-black uppercase text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">Workspace</span>
              </span>
            </div>
          </Link>

          {/* Center Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-secondary/60 p-1 rounded-xl border border-border">
            {[
              { label: "প্র্যাকটিস", href: "/practice" },
              { label: "সরকারি পরীক্ষা", href: "/exam/govt" },
              { label: "কোর্সসমূহ", href: "/courses" },
              { label: "আর্কেড গেম 🎮", href: "/game" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors rounded-lg">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: User Quick Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-xs border border-primary/20">
                {user?.displayName ? user.displayName.slice(0, 2).toUpperCase() : <User size={14} />}
              </div>
              <div className="text-left leading-tight">
                <span className="text-xs font-black text-foreground block truncate max-w-[120px]">{user?.displayName || "Learner"}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  <CheckCircle2 size={10} /> Online
                </span>
              </div>
            </div>

            <Button onClick={() => signOut()} variant="outline" size="sm" className="font-bold text-xs gap-1.5 h-9 px-3 border-border cursor-pointer">
              <LogOut size={13} />
              <span className="hidden sm:inline">লগআউট</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ── DASHBOARD MAIN CONTENT ARENA ────────────────────────── */}
      <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 fade-in flex-1">

        {/* ── Pending Payment Request Alert Banner ──────────────── */}
        {pendingPayment && (
          <div className="p-5 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-semibold shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                <Clock size={20} className="animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-foreground">⏳ পেমেন্ট ও সার্টিফিকেট ভেরিফিকেশন অপেক্ষমান</span>
                  <Badge variant="outline" className="border-amber-500/50 text-amber-600 dark:text-amber-400 text-[10px] font-black px-2 py-0.5">
                    PENDING APPROVAL
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  আপনার <strong className="text-foreground">{pendingPayment.method}</strong> ট্রানজেকশন আইডি: <code className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded">{pendingPayment.trxId}</code> ({pendingPayment.count}টি সনদ ক্রেডিট)। অ্যাডমিন কর্তৃক অ্যাপ্রুভ হওয়ার পর গোল্ড/সিলভার মেধা সার্টিফিকেট ফাইল ডাউনলোড সুবিধা উন্মুক্ত হবে।
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <Link href="/contact">
                <Button size="sm" variant="outline" className="text-xs font-bold border-amber-500/40 text-amber-700 dark:text-amber-300 h-9 px-4 cursor-pointer">
                  হেল্প ডেস্ক
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* ── Personal User Workspace Hero Banner ──────────────── */}
        <div className="border border-border bg-card rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden bg-grid-pattern">
          <div className="flex items-center gap-5 text-center sm:text-left z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-2xl shadow-md border border-primary/20 shrink-0">
              {user?.displayName ? user.displayName.slice(0, 2).toUpperCase() : <User size={28} />}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-foreground">স্বাগতম, {user?.displayName || "Typing Learner"}!</h1>
                <Badge variant="outline" className="text-[10px] font-black uppercase text-primary border-primary/30 bg-primary/10 px-2.5 py-0.5">
                  {role} Account
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 pt-0.5 justify-center sm:justify-start">
                <CheckCircle2 size={13} />
                <span>ফায়ারস্টোর ক্লাউড সিঙ্কড ড্যাশবোর্ড (Cloud Active)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 z-10">
            <Link href="/exam/govt">
              <Button className="font-bold text-xs h-11 px-6 gap-2 shadow-md cursor-pointer">
                <Target size={15} />
                <span>চাকরির পরীক্ষা দিন</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Personal Typing Coach AI Recommendation Card ─────── */}
        <Card className="border border-primary/30 bg-primary/5 shadow-xs rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-black uppercase text-primary tracking-wider block">পার্সোনাল টাইপিং কোচ গাইডেন্স</span>
                <h3 className="text-base font-extrabold text-foreground">{recommendationTitle}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                  {recommendationText}
                </p>
              </div>
            </div>

            <Link href={recommendationAction.href}>
              <Button size="sm" className="font-bold text-xs gap-1.5 h-9 px-4 shrink-0 shadow-xs cursor-pointer">
                <span>{recommendationAction.label}</span>
                <ArrowRight size={13} />
              </Button>
            </Link>
          </div>
        </Card>

        {/* ── Top Performance Telemetry Stats ─────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Streak */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardContent className="p-4 text-center space-y-1">
              <Flame size={22} className="text-amber-500 mx-auto mb-1" />
              <div className="text-3xl font-black text-foreground">{currentStreak}</div>
              <div className="text-[11px] font-bold text-muted-foreground">দিনের ধারাবাহিকতা</div>
              <div className="text-[10px] text-muted-foreground">সর্বোচ্চ: {longestStreak} দিন</div>
            </CardContent>
          </Card>

          {/* Level */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardContent className="p-4 text-center space-y-1">
              <Star size={22} className="text-yellow-500 mx-auto mb-1" />
              <div className="text-3xl font-black text-foreground">{level}</div>
              <div className="text-[11px] font-bold text-muted-foreground">বর্তমান লেভেল</div>
              <div className="text-[10px] text-muted-foreground">{xp.xp}/{xp.xpToNext} XP</div>
            </CardContent>
          </Card>

          {/* Best WPM */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardContent className="p-4 text-center space-y-1">
              <Zap size={22} className="text-primary mx-auto mb-1" />
              <div className="text-3xl font-black text-foreground">{bestWpm}</div>
              <div className="text-[11px] font-bold text-muted-foreground">সর্বোচ্চ WPM গতি</div>
              <div className="text-[10px] text-muted-foreground">গড়: {avgWpm} WPM</div>
            </CardContent>
          </Card>

          {/* Accuracy */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardContent className="p-4 text-center space-y-1">
              <Trophy size={22} className="text-emerald-500 mx-auto mb-1" />
              <div className="text-3xl font-black text-foreground">{avgAccuracy}%</div>
              <div className="text-[11px] font-bold text-muted-foreground">গড় নির্ভুলতা</div>
              <div className="text-[10px] text-muted-foreground">{history.length}টি প্র্যাকটিস সেশন</div>
            </CardContent>
          </Card>
        </div>

        {/* ── Enrolled Courses Widget ────────────────────────────── */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-extrabold flex items-center gap-2 text-foreground">
              <BookOpen size={16} className="text-primary" />
              এনরোলকৃত টাইপিং পাঠ্যক্রম ({enrolledCourses.length})
            </CardTitle>
            <Link href="/courses">
              <Button size="sm" variant="outline" className="text-xs font-bold gap-1 h-8 border-border cursor-pointer">
                <GraduationCap size={13} /> সকল কোর্স
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {enrolledCourses.length === 0 ? (
              <div className="py-5 text-center text-xs text-muted-foreground border border-dashed border-border rounded-xl bg-secondary/30">
                কোনো এনরোলকৃত কোর্স নেই। <Link href="/courses" className="text-primary underline font-bold">কোর্স ক্যাটালগ দেখুন</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {enrolledCourses.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl border border-border bg-secondary flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                          {c.layout.toUpperCase()} Layout
                        </span>
                        <span className="text-xs font-black text-foreground">{c.progress}%</span>
                      </div>
                      <h4 className="text-xs font-black text-foreground leading-tight pt-1">{c.title}</h4>
                    </div>

                    <div className="space-y-2">
                      <div className="w-full h-1.5 bg-card rounded-full overflow-hidden border border-border">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${Math.max(4, c.progress)}%` }} />
                      </div>
                      <Link href={`/courses/${c.layout}`} className="block">
                        <Button size="sm" className="w-full text-xs font-bold gap-1 h-8 shadow-xs cursor-pointer">
                          <Play size={12} /> চালিয়ে যান (Continue)
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── XP Progress Bar ─────────────────────────────────────── */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-xs border border-border">
                  {level}
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">লেভেল {level} অর্জন</div>
                  <div className="text-[10px] text-muted-foreground">মোট অর্জন: {totalXp} XP</div>
                </div>
              </div>
              <div className="text-xs font-bold text-muted-foreground">{xp.xp} / {xp.xpToNext} XP</div>
            </div>
            <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden border border-border">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${xp.percent}%` }} />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5 text-right">পরবর্তী লেভেল {level + 1} এর জন্য প্রয়োজন {xp.xpToNext - xp.xp} XP</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── WPM History Chart ──────────────────────────── */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-extrabold flex items-center gap-2 text-foreground">
                <BarChart3 size={16} className="text-primary" />
                WPM গতি ইতিহাস (শেষ ১৪ দিন)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {dailyHistory.length >= 2 ? (
                <div className="space-y-2">
                  <WpmSparkline records={dailyHistory} />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{dailyHistory[Math.max(0, dailyHistory.length - 14)]?.date}</span>
                    <span>আজ</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-muted-foreground space-y-2">
                  <BarChart3 size={24} className="mx-auto text-muted-foreground/30" />
                  <p>অনুশীলন সম্পন্ন করলে এখানে গ্রাফ দেখা যাবে।</p>
                  <Link href="/practice">
                    <Button size="sm" variant="outline" className="text-xs mt-2 border-border cursor-pointer">
                      প্র্যাকটিস শুরু করুন →
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Recent Sessions ────────────────────────────── */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-extrabold flex items-center gap-2 text-foreground">
                <Clock size={16} className="text-primary" />
                সাম্প্রতিক টাইপিং সেশন
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {recentSessions.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  এখনো কোনো সেশন রেকর্ড নেই। প্র্যাকটিস শুরু করুন!
                </div>
              ) : (
                <div className="space-y-2">
                  {recentSessions.map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-secondary rounded-lg border border-border text-xs">
                      <div className="space-y-0.5">
                        <div className="font-bold text-foreground capitalize">{session.layout}</div>
                        <div className="text-muted-foreground">{new Date(session.date).toLocaleDateString("bn-BD")}</div>
                      </div>
                      <div className="flex items-center gap-3 text-right">
                        <div>
                          <div className="font-extrabold text-foreground">{session.wpm} WPM</div>
                          <div className="text-muted-foreground">{session.accuracy}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link href="/exam/govt" className="block">
                    <Button variant="outline" size="sm" className="w-full text-xs mt-2 gap-1 border-border cursor-pointer">
                      নতুন পরীক্ষা দিন <ChevronRight size={12} />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Earned Certificates ────────────────────────────── */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-extrabold flex items-center gap-2 text-foreground">
              <Award size={16} className="text-amber-500" />
              অর্জিত মেধা সার্টিফিকেটসমূহ ({certificates.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowTopUpModal(true)}
                className="text-xs font-bold gap-1 h-8 border-primary/30 text-primary hover:bg-primary/10 cursor-pointer"
              >
                <Zap size={13} /> Buy Credits (50 Tk)
              </Button>
              <Link href="/exam/ranked">
                <Button size="sm" variant="outline" className="text-xs font-bold gap-1 h-8 border-border cursor-pointer">
                  <Trophy size={13} /> জাতীয় র‍্যাংক পরীক্ষা
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {certificates.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground space-y-2 border border-dashed border-border rounded-xl bg-secondary/30">
                <Award size={28} className="mx-auto text-muted-foreground/40" />
                <p className="font-semibold text-foreground">এখনও কোনো ভেরিফাইড সার্টিফিকেট অর্জন করেননি।</p>
                <p className="text-[11px] text-muted-foreground">জাতীয় প্রতিযোগিতা বা সরকারি পরীক্ষায় ৮৫%+ অ্যাকুরেসি পেয়ে ডিজিটাল সনদ লাভ করুন!</p>
                <Link href="/exam/ranked" className="inline-block pt-1">
                  <Button size="sm" className="font-bold text-xs gap-1.5 h-8 cursor-pointer">
                    জাতীয় প্রতিযোগিতা শুরু করুন <ChevronRight size={12} />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certificates.map((cert) => (
                  <div key={cert.certificateId} className="p-3.5 rounded-xl border border-border bg-secondary flex flex-col justify-between space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                          <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                          <span>{cert.candidateName}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          {cert.layout.toUpperCase()} Layout • {cert.certificateId}
                        </div>
                      </div>
                      <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10 text-[10px] font-black shrink-0">
                        🏆 VERIFIED CERT
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-border">
                      <div className="text-foreground">{cert.wpm} WPM ({cert.accuracy}%)</div>
                      <Link href={`/verify/${cert.certificateId}`} target="_blank">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px] font-bold gap-1 text-primary hover:text-primary cursor-pointer">
                          যাচাই ও ডাউনলোড <ExternalLink size={11} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Badges & Achievements Store Grid ───────────────── */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-extrabold flex items-center gap-2 text-foreground">
              <Award size={16} className="text-foreground" />
              অর্জিত ব্যাজ ও পুরস্কার ({unlockedBadges.length}/{ALL_BADGES.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {unlockedBadges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center text-center p-3 rounded-xl bg-secondary border border-border space-y-1.5">
                  <span className="text-2xl">{badge.icon}</span>
                  <div className="text-xs font-extrabold text-foreground">{badge.titleBn}</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">{badge.description}</div>
                </div>
              ))}
              {lockedBadges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center text-center p-3 rounded-xl bg-secondary/50 border border-border space-y-1.5 opacity-40">
                  <Lock size={18} className="text-muted-foreground" />
                  <div className="text-xs font-bold text-muted-foreground">{badge.titleBn}</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">{badge.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Quick Action Workspace Links ─────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/courses", icon: GraduationCap, label: "পাঠ্যক্রম শুরু করুন" },
            { href: "/practice/test", icon: Zap, label: "স্পিড টেস্ট দিন" },
            { href: "/exam/govt", icon: Trophy, label: "সরকারি পরীক্ষা সিমুলেটর" },
          ].map((cta) => {
            const Icon = cta.icon;
            return (
              <Link key={cta.href} href={cta.href}>
                <Button variant="outline" className="w-full text-xs gap-2 h-11 border-border font-semibold cursor-pointer">
                  <Icon size={15} />
                  {cta.label}
                </Button>
              </Link>
            );
          })}
        </div>

        <CertificateTopUpModal
          isOpen={showTopUpModal}
          onClose={() => setShowTopUpModal(false)}
          payerType="individual"
          userId={user?.uid}
        />
      </main>
    </div>
  );
}
