"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Target, Keyboard, Clock, CheckCircle2, AlertTriangle,
  RotateCcw, Share2, Check, Award, LayoutDashboard, Zap, Activity,
  X, ChevronRight,
  ShieldCheck
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { useTypingStore, KeyboardLayout } from "../../../../store/typingStore";
import { getRandomPassage, getPassageForDuration } from "../../../../utils/lessons/exam/examPassages";
import { saveTypingSession } from "../../../../lib/firestoreService";
import { useAuth } from "../../../../context/AuthContext";
import TypingArea from "../../../../components/TypingArea";
import { ExamCertificateModal } from "../../../../components/ExamCertificateModal";

interface GovtPostMeta {
  titleBn: string;
  wpmBn: number;
  wpmEn: number;
  minAcc: number;
}

const POST_METAS: Record<string, GovtPostMeta> = {
  "computer-operator": {
    titleBn: "কম্পিউটার অপারেটর (Computer Operator)",
    wpmBn: 30,
    wpmEn: 35,
    minAcc: 95,
  },
  "data-entry": {
    titleBn: "ডেটা এন্ট্রি অপারেটর (Data Entry Operator)",
    wpmBn: 28,
    wpmEn: 30,
    minAcc: 95,
  },
  "office-assistant": {
    titleBn: "অফিস সহকারী কাম মুদ্রাক্ষরিক (Office Assistant)",
    wpmBn: 20,
    wpmEn: 20,
    minAcc: 90,
  },
  "custom": {
    titleBn: "কাস্টম গভ্ প্রিসেট (Custom Target)",
    wpmBn: 30,
    wpmEn: 30,
    minAcc: 90,
  },
};

export default function GovtTestArenaClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const {
    activeLayout,
    setActiveLayout,
    setSelectedDuration,
    setTargetText,
    resetTest,
    isStarted,
    isCompleted,
    elapsedTime,
    updateElapsedTime,
    typedText,
    targetText,
    errorIndices,
  } = useTypingStore();

  const postId = searchParams.get("post") || "computer-operator";
  const customWpmParam = parseInt(searchParams.get("customWpm") || "30", 10);
  const durationSec = parseInt(searchParams.get("duration") || "300", 10);
  const layoutParam = (searchParams.get("layout") as KeyboardLayout) || "jatiya";

  const isCustom = postId === "custom";
  const defaultMeta = POST_METAS[postId] || POST_METAS["computer-operator"];
  const postTitle = isCustom ? `Custom Govt Preset (${customWpmParam} WPM)` : defaultMeta.titleBn;
  const requiredWpm = isCustom ? customWpmParam : (layoutParam === "english" ? defaultMeta.wpmEn : defaultMeta.wpmBn);
  const requiredAcc = defaultMeta.minAcc;

  const [testResult, setTestResult] = useState<{
    wpm: number;
    accuracy: number;
    errorCount: number;
    qualified: boolean;
    postTitle: string;
    requiredWpm: number;
    requiredAcc: number;
  } | null>(null);

  const [showCertModal, setShowCertModal] = useState(false);
  const [showAuthGateModal, setShowAuthGateModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync setup with store on mount
  useEffect(() => {
    setActiveLayout(layoutParam);
    setSelectedDuration(durationSec);
    const lang = layoutParam === "english" ? "english" : "bangla";
    const p = getPassageForDuration(lang, durationSec);
    setTargetText(p.text);
    resetTest();
  }, [layoutParam, durationSec, setActiveLayout, setSelectedDuration, setTargetText, resetTest]);

  // Timer Ticking Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStarted && !isCompleted) {
      interval = setInterval(() => {
        updateElapsedTime();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStarted, isCompleted, updateElapsedTime]);

  // Live Telemetry Calculations
  const liveWpm = elapsedTime === 0 ? 0 : Math.round((typedText.length / 5) / (elapsedTime / 60));
  const liveAccuracy = typedText.length === 0 ? 100 : Math.max(0, Math.round(((typedText.length - errorIndices.length) / typedText.length) * 100));
  const remainingSec = Math.max(0, durationSec - elapsedTime);
  const displayMins = Math.floor(remainingSec / 60);
  const displaySecs = (remainingSec % 60).toString().padStart(2, "0");

  const handleSessionComplete = async (wpm: number, accuracy: number) => {
    const qualified = wpm >= requiredWpm && accuracy >= requiredAcc;
    const errorCount = errorIndices.length; // capture snapshot before any reset

    setTestResult({
      wpm,
      accuracy,
      errorCount,
      qualified,
      postTitle,
      requiredWpm,
      requiredAcc,
    });

    if (qualified) {
      await saveTypingSession({
        userId: user?.uid || "guest",
        name: user?.displayName || "Govt Candidate",
        wpm,
        netWpm: wpm,
        accuracy,
        cpm: wpm * 5,
        errors: errorCount, // ✅ Fixed: was always 0
        layout: layoutParam,
        language: layoutParam === "english" ? "english" : "bangla",
        mode: "govt-exam",
        duration: durationSec,
      });
    }
  };

  const handleRestart = () => {
    resetTest();
    setTestResult(null);
    const lang = layoutParam === "english" ? "english" : "bangla";
    const p = getRandomPassage(lang);
    setTargetText(p.text);
  };

  const handleShareResult = () => {
    if (!testResult) return;
    const text = `🏛️ I passed the ${testResult.postTitle} Govt Exam Simulator on TypeBangla! Score: ${testResult.wpm} WPM with ${testResult.accuracy}% Accuracy! Take the test: https://typebangla.com/exam/govt`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6 fade-in text-foreground">

      {/* ── LIVE TELEMETRY TOP BAR ── */}
      <div className="border border-border bg-card rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/exam/govt">
            <Button variant="outline" size="sm" className="text-xs font-bold gap-1.5 h-9 border-border">
              <ArrowLeft size={14} /> Setup Portal
            </Button>
          </Link>

          <div>
            <div className="text-xs font-black text-foreground flex items-center gap-1.5">
              <Target size={14} className="text-primary shrink-0" />
              <span>Target: {postTitle}</span>
            </div>
            <div className="text-[10px] text-muted-foreground font-semibold">
              Pass Marks: {requiredWpm} WPM • {requiredAcc}% Accuracy
            </div>
          </div>
        </div>

        {/* Live Metrics Display */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary text-xs py-1 px-3 gap-1">
            <Zap size={13} className="text-amber-500" />
            Live WPM: <strong>{liveWpm}</strong>
          </Badge>

          <Badge variant="outline" className={`font-bold text-xs py-1 px-3 gap-1 ${
            liveAccuracy >= 95 ? "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" :
            liveAccuracy >= 85 ? "border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/40" :
            "border-rose-500 text-rose-600 bg-rose-50 dark:bg-rose-950/40"
          }`}>
            <Activity size={13} />
            Accuracy: <strong>{liveAccuracy}%</strong>
          </Badge>

          <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary text-xs py-1 px-3 gap-1">
            <Keyboard size={12} className="text-primary" />
            Layout: <strong>{layoutParam.toUpperCase()}</strong>
          </Badge>

          <Badge variant="outline" className={`font-black text-xs py-1 px-3 gap-1 ${
            !isStarted || isCompleted
              ? "border-border text-foreground bg-secondary"
              : remainingSec <= 30
              ? "border-rose-500 text-rose-600 bg-rose-50 dark:bg-rose-950/50 animate-pulse"
              : remainingSec <= 60
              ? "border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/40"
              : "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 animate-pulse"
          }`}>
            <Clock size={13} />
            {!isStarted ? "Ready" : isCompleted ? "Done" : `${displayMins}:${displaySecs}`}
          </Badge>
        </div>
      </div>

      {/* ── QUALIFICATION REPORT CARD OR TYPING ARENA ── */}
      {testResult ? (
        <Card className={`border rounded-2xl p-6 sm:p-8 shadow-md space-y-6 ${testResult.qualified ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20" : "border-rose-500 bg-rose-50/30 dark:bg-rose-950/20"
          }`}>
          <CardContent className="p-0 space-y-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border pb-5">
              <div className="flex items-center gap-3">
                {testResult.qualified ? (
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shrink-0 shadow-xs">
                    <CheckCircle2 size={32} />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center font-black shrink-0 shadow-xs">
                    <AlertTriangle size={32} />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-black text-foreground">
                      {testResult.qualified
                        ? `QUALIFIED FOR ${testResult.postTitle.toUpperCase()}! 🏆`
                        : `NOT QUALIFIED FOR ${testResult.postTitle.toUpperCase()}`}
                    </h3>
                    <Badge variant="outline" className={`text-[10px] font-black ${testResult.qualified ? "border-emerald-500 text-emerald-600 bg-emerald-100 dark:bg-emerald-900/60" : "border-rose-500 text-rose-600 bg-rose-100 dark:bg-rose-900/60"
                      }`}>
                      {testResult.qualified ? "TYPEBANGLA VERIFIED QUALIFIED" : "DID NOT MEET THRESHOLD"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xl">
                    {testResult.qualified
                      ? `Congratulations! Your score of ${testResult.wpm} WPM with ${testResult.accuracy}% accuracy satisfies the official hiring standard.`
                      : `Minimum requirement is ${testResult.requiredWpm} WPM with ${testResult.requiredAcc}% accuracy. Your score was ${testResult.wpm} WPM at ${testResult.accuracy}%.`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 w-full lg:w-auto">
                <Button variant="outline" size="sm" onClick={handleRestart} className="text-xs font-bold gap-1.5 h-9 border-border">
                  <RotateCcw size={13} /> Retake Test
                </Button>

                {testResult.qualified && (
                  <>
                    <Button variant="outline" size="sm" onClick={handleShareResult} className="text-xs font-bold gap-1.5 h-9 border-border">
                      {copied ? <Check size={13} className="text-emerald-500" /> : <Share2 size={13} />}
                      {copied ? "Copied!" : "Share Result"}
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => {
                        if (!user) {
                          setShowAuthGateModal(true);
                          return;
                        }
                        setShowCertModal(true);
                      }}
                      className="text-xs font-black gap-1.5 h-9 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                    >
                      <Award size={13} /> Get Govt Certificate
                    </Button>

                    <Link href="/dashboard">
                      <Button variant="secondary" size="sm" className="text-xs font-bold gap-1.5 h-9 border border-border">
                        <LayoutDashboard size={13} /> Dashboard
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Score Breakdown Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Net Speed (WPM)</div>
                <div className={`text-2xl font-black ${
                  testResult.wpm < 30
                    ? "text-rose-600 dark:text-rose-400"
                    : testResult.wpm <= 60
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}>
                  {testResult.wpm} WPM
                </div>
                <div className="text-[10px] text-muted-foreground font-semibold">Required: {testResult.requiredWpm} WPM</div>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Accuracy</div>
                <div className="text-2xl font-black text-foreground">{testResult.accuracy}%</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Required: {testResult.requiredAcc}%</div>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Exam Duration</div>
                <div className="text-2xl font-black text-foreground">{durationSec / 60} Min</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Official Timer</div>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Layout Keymap</div>
                <div className="text-2xl font-black text-foreground uppercase">{layoutParam}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Active Layout</div>
              </div>
            </div>

            {/* 🏛️ Official Bangladesh Govt Exam Marking & Penalty Simulator */}
            <div className="p-4 sm:p-5 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-primary" />
                  <h4 className="text-xs font-black text-foreground uppercase tracking-wide">
                    বাংলাদেশ সরকারি নিয়োগ পরীক্ষা পোনাল্টি হিসাব (Govt Penalty Breakdown)
                  </h4>
                </div>
                <Badge variant="outline" className="text-[10px] font-bold text-primary border-primary/30 bg-background">
                  BD Govt Standard Rules
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs pt-1">
                <div className="p-3 bg-background rounded-lg border border-border">
                  <div className="text-muted-foreground text-[11px]">Gross WPM (মোট স্পিড)</div>
                  <div className="text-lg font-black text-foreground">
                    {testResult.wpm + Math.round(testResult.errorCount / 5)} WPM
                  </div>
                </div>
                <div className="p-3 bg-background rounded-lg border border-border">
                  <div className="text-rose-600 dark:text-rose-400 text-[11px] font-bold">Error Deduction (ভুল অক্ষর)</div>
                  <div className="text-lg font-black text-rose-600 dark:text-rose-400">-{testResult.errorCount} অক্ষর</div>
                </div>
                <div className="p-3 bg-background rounded-lg border border-primary/30">
                  <div className="text-primary text-[11px] font-bold">Final Govt Net WPM (চূড়ান্ত নিট)</div>
                  <div className="text-lg font-black text-primary">{testResult.wpm} WPM</div>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                💡 <strong>পরীক্ষা নীতি নোট:</strong> বাংলাদেশ সরকারি মন্ত্রণালয় ও ব্যাংকের টাইপিং টেস্ট নীতি অনুসারে প্রতি ভুলের জন্য নিট শব্দ থেকে বাদ দেয়া হয় এবং ৯৫% এর নিচে সঠিকতা হলে অকৃতকার্য গণ্য করা হয়।
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="border border-border bg-card rounded-2xl p-6 shadow-xs space-y-4">
          {/* Typing Progress Bar */}
          {isStarted && !isCompleted && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground">
                <span>প্রগতি (Progress)</span>
                <span>{Math.min(100, Math.round((typedText.length / targetText.length) * 100))}%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (typedText.length / targetText.length) * 100)}%` }}
                />
              </div>
            </div>
          )}
          <TypingArea hideModeHeader={true} onSessionComplete={handleSessionComplete} />
        </div>
      )}

      {/* ── GOVT CERTIFICATE MODAL ── */}
      {showCertModal && testResult && (
        <ExamCertificateModal
          isOpen={true}
          onClose={() => setShowCertModal(false)}
          result={{
            wpm: testResult.wpm,
            accuracy: testResult.accuracy,
            layout: layoutParam,
            duration: durationSec,
            errors: 0,
            language: layoutParam === "english" ? "english" : "bangla",
            candidateName: user?.displayName || "Govt Exam Candidate",
          }}
        />
      )}

      {/* Auth Gate Modal for Govt Certification */}
      {showAuthGateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card className="max-w-md w-full border border-border bg-card shadow-2xl p-6 space-y-6 relative">
            <button
              onClick={() => setShowAuthGateModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto">
                <Award size={24} />
              </div>
              <Badge variant="outline" className="text-[10px] font-bold text-primary border-primary/30 bg-primary/5 px-2.5 py-0.5">
                Sign In Required
              </Badge>
              <h3 className="text-xl font-black text-foreground">Sign In to Claim Govt Certificate</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Generating and verifying an official Government Computer Operator Certificate requires a free TypeBangla Learner account.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Button
                onClick={() => router.push("/login?redirect=/exam/govt/test")}
                className="w-full text-xs font-bold h-10 gap-2"
              >
                Sign In to Claim Certificate <ChevronRight size={14} />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/signup?redirect=/exam/govt/test")}
                className="w-full text-xs font-bold h-10 border-border"
              >
                Create Free Account
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
