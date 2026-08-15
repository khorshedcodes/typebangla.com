"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap, ArrowRight, BookOpen, Sparkles, CheckCircle2,
  Lock, Play, Keyboard, ShieldCheck, Trophy, RotateCcw
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useTypingStore, KeyboardLayout } from "../../store/typingStore";
import { getAllProgress } from "../../utils/lessons/progress";
import { useAuth } from "../../context/AuthContext";
import { AuthModal } from "../../components/AuthModal";

interface FullCourse {
  id: string;
  layout: KeyboardLayout;
  title: string;
  titleBn: string;
  desc: string;
  badge: string;
  lessonsCount: number;
  targetWpm: string;
  duration: string;
  flag: string;
}

const COURSES: FullCourse[] = [
  {
    id: "english-full",
    layout: "english",
    title: "English QWERTY Full Keyboard Course",
    titleBn: "ইংরেজি সম্পূর্ণ কীবোর্ড কোর্স",
    desc: "Complete touch-typing mastery from Home Row, Top Row, Bottom Row, and numbers to full 70+ WPM speed.",
    badge: "QWERTY Standard",
    lessonsCount: 20,
    targetWpm: "40–70+ WPM",
    duration: "4–6 Hours",
    flag: "🇺🇸",
  },
  {
    id: "avro-full",
    layout: "avro",
    title: "Avro Phonetic Bangla Full Course",
    titleBn: "অভ্র ফোনেটিক বাংলা সম্পূর্ণ কোর্স",
    desc: "Master modern Avro phonetic transliteration. Learn vowels, consonants, conjuncts (যুক্তাক্ষর), and speed drills.",
    badge: "Phonetic Popular",
    lessonsCount: 25,
    targetWpm: "35–60+ WPM",
    duration: "5–7 Hours",
    flag: "🇧🇩",
  },
  {
    id: "unibijoy-full",
    layout: "unibijoy",
    title: "UniBijoy Full Course (Bijoy 52)",
    titleBn: "ইউনিবিজয় সম্পূর্ণ কোর্স",
    desc: "Traditional Bijoy-style layout using Unicode character maps. Ideal for publishing, printing, and official work.",
    badge: "Publishing Standard",
    lessonsCount: 25,
    targetWpm: "30–55+ WPM",
    duration: "5–7 Hours",
    flag: "🇧🇩",
  },
  {
    id: "jatiya-full",
    layout: "jatiya",
    title: "Jatiya BCC Full Course",
    titleBn: "জাতীয় কীবোর্ড সরকারি কোর্স",
    desc: "Official Bangladesh Computer Council (BCC) national layout required for government jobs and ministry typing exams.",
    badge: "Govt Job Standard",
    lessonsCount: 25,
    targetWpm: "30–50+ WPM",
    duration: "5–7 Hours",
    flag: "🏛️",
  },
  {
    id: "probhat-full",
    layout: "probhat",
    title: "Probhat Layout Full Course",
    titleBn: "প্রভাত কীবোর্ড সম্পূর্ণ কোর্স",
    desc: "Intuitive fixed layout aligning similar sounding Bangla characters to English key positions for easy learning.",
    badge: "Intuitive Map",
    lessonsCount: 20,
    targetWpm: "25–45+ WPM",
    duration: "4–6 Hours",
    flag: "🇧🇩",
  },
  {
    id: "inscript-full",
    layout: "inscript",
    title: "Inscript Bangla Full Course",
    titleBn: "ইনস্ক্রিপ্ট বাংলা সম্পূর্ণ কোর্স",
    desc: "Official Inscript layout for West Bengal & National Indian standard Bangla typing. Master home row, consonants, matras, and conjuncts.",
    badge: "India National Standard",
    lessonsCount: 20,
    targetWpm: "30–50+ WPM",
    duration: "4–6 Hours",
    flag: "🇮🇳",
  },
];

export default function CoursesCatalogPage() {
  const { user } = useAuth();
  const { activeLayout, setActiveLayout } = useTypingStore();
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingEnrollCourse, setPendingEnrollCourse] = useState<FullCourse | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    queueMicrotask(() => {
      // Load enrolled course IDs from localStorage
      try {
        const stored = JSON.parse(localStorage.getItem("typemaster_enrolled_courses") || "[]");
        setEnrolledIds(stored);
      } catch {
        setEnrolledIds([]);
      }

      const all = getAllProgress();
      const map: Record<string, number> = {};

    COURSES.forEach((c) => {
      let passedCount = 0;
      Object.values(all).forEach((p) => {
        if (p.passed && p.lessonId.startsWith(c.layout)) {
          passedCount++;
        }
      });
      map[c.id] = Math.min(100, Math.round((passedCount / c.lessonsCount) * 100));
    });

    setProgressMap(map);
    });
  }, []);

  useEffect(() => {
    if (user && pendingEnrollCourse) {
      const updated = Array.from(new Set([...enrolledIds, pendingEnrollCourse.id]));
      setEnrolledIds(updated);
      try {
        localStorage.setItem("typemaster_enrolled_courses", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save enrollment:", e);
      }
      setActiveLayout(pendingEnrollCourse.layout);
      setPendingEnrollCourse(null);
    }
  }, [user, pendingEnrollCourse, enrolledIds, setActiveLayout]);

  const handleEnroll = (course: FullCourse) => {
    if (!user) {
      setPendingEnrollCourse(course);
      setAuthModalOpen(true);
      return;
    }
    const updated = Array.from(new Set([...enrolledIds, course.id]));
    setEnrolledIds(updated);
    try {
      localStorage.setItem("typemaster_enrolled_courses", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save enrollment:", e);
    }
    setActiveLayout(course.layout);
  };

  const enrolledCourses = user ? COURSES.filter((c) => enrolledIds.includes(c.id)) : [];

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 fade-in text-foreground">

      {/* Hero Header */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <GraduationCap size={14} />
          <span>FULL KEYBOARD CURRICULUM</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Typing Courses
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Select a layout-specific full course below. Enroll to track your progress and earn an official Course Completion Certificate.
        </p>
      </section>

      {/* Govt Job Exam Quick Access Banner */}
      <section className="border border-primary/30 bg-primary/5 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shrink-0 shadow-xs">
            🏛️
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm text-foreground">Government Job Typing Exam Prep</h2>
              <Badge variant="outline" className="text-[10px] border-primary text-primary font-bold">BCC Official 30 WPM</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Preparing for Computer Operator, Ministry, or Bank recruitment exams? Test your speed &amp; accuracy in real exam room conditions.
            </p>
          </div>
        </div>
        <Link href="/exam/govt" className="shrink-0 w-full sm:w-auto">
          <Button size="sm" className="w-full sm:w-auto text-xs font-bold gap-1.5 px-6 h-9">
            <span>Govt Exam Simulator</span>
            <ArrowRight size={14} />
          </Button>
        </Link>
      </section>

      {/* Active Enrolled Courses Banner */}
      {enrolledCourses.length > 0 && (
        <section className="border border-border bg-card rounded-2xl p-6 shadow-xs space-y-4 bg-grid-pattern">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-foreground" />
              <h2 className="text-sm font-extrabold text-foreground uppercase tracking-wider">Your Enrolled Courses ({enrolledCourses.length})</h2>
            </div>
            <span className="text-xs font-mono font-bold text-muted-foreground">Active Layout: {activeLayout.toUpperCase()}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.map((course) => {
              const progress = progressMap[course.id] || 0;
              return (
                <div key={course.id} className="border border-border bg-secondary p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-primary text-primary font-extrabold bg-primary/10 text-[10px]">
                      {course.flag} Enrolled
                    </Badge>
                    <span className="text-xs font-bold text-foreground">{progress}% Complete</span>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-foreground">{course.title}</h3>
                    <p className="text-xs text-muted-foreground">{course.titleBn}</p>
                  </div>
                  <div className="w-full h-2 bg-card rounded-full overflow-hidden border border-border">
                    <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${Math.max(5, progress)}%` }} />
                  </div>
                  <Link href={`/courses/${course.layout}`}>
                    <Button
                      size="sm"
                      onClick={() => setActiveLayout(course.layout)}
                      className="w-full font-bold text-xs gap-1.5 h-9 mt-1"
                    >
                      <Play size={13} /> Continue Course ({course.layout.toUpperCase()})
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Courses Grid */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">সকল কোর্স কারিকুলাম</span>
          <h2 className="text-2xl font-black text-foreground">Available Layout Courses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => {
            const isEnrolled = !!user && enrolledIds.includes(course.id);
            const isCurrentActive = activeLayout === course.layout;
            const progress = progressMap[course.id] || 0;

            return (
              <Card
                key={course.id}
                className={`border bg-card/80 backdrop-blur-md hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 rounded-2xl shadow-xs flex flex-col justify-between ${
                  isCurrentActive ? "border-emerald-500 ring-2 ring-emerald-500/40" : "border-border/80"
                }`}
              >
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{course.flag}</span>
                    {isEnrolled ? (
                      <Badge className="bg-emerald-500 text-white font-extrabold text-[10px]">
                        Enrolled ({progress}%)
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-border text-foreground font-semibold bg-secondary">
                        {course.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-foreground">{course.title}</h3>
                    <div className="text-xs font-bold text-muted-foreground">{course.titleBn}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">{course.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-border space-y-2 text-xs">
                    <div className="flex justify-between font-semibold text-foreground">
                      <span className="text-muted-foreground">📖 Curriculum</span>
                      <span>{course.lessonsCount} Lessons</span>
                    </div>
                    <div className="flex justify-between font-semibold text-foreground">
                      <span className="text-muted-foreground">⏱ Target Speed</span>
                      <span>{course.targetWpm}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold pt-1">
                      <Lock size={12} className="text-foreground shrink-0" />
                      <span>Layout Locked to: <strong>{course.layout.toUpperCase()}</strong></span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <Link href={`/courses/${course.layout}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setActiveLayout(course.layout)}
                        className="w-full font-bold text-xs gap-1.5 h-9 rounded-md border-border text-foreground hover:bg-secondary"
                      >
                        <BookOpen size={13} /> পাঠক্রম ও লেসন দেখুন (View Details)
                      </Button>
                    </Link>

                    {isEnrolled ? (
                      <Link href={`/courses/${course.layout}`}>
                        <Button
                          size="sm"
                          onClick={() => setActiveLayout(course.layout)}
                          className="w-full font-extrabold text-xs gap-1.5 h-9 rounded-md shadow-xs"
                        >
                          Continue Course →
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleEnroll(course)}
                        className="w-full font-black text-xs gap-1.5 h-9 rounded-md shadow-xs"
                      >
                        <Sparkles size={13} /> কোর্সে এনরোল করুন (Enroll Now)
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="signup"
      />
    </main>
  );
}
