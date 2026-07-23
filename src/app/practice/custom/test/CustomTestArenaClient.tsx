"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Target, Keyboard, Clock, CheckCircle2, AlertTriangle,
  RotateCcw, Share2, Check, Award, LayoutDashboard, Zap, Activity, FileText
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { useTypingStore, KeyboardLayout } from "../../../../store/typingStore";
import { saveTypingSession } from "../../../../lib/firestoreService";
import { useAuth } from "../../../../context/AuthContext";
import TypingArea from "../../../../components/TypingArea";

const DEFAULT_SAMPLE_TEXT = "বাংলাদেশের ঐতিহাসিক ঐতিহ্য ও প্রাকৃতিক রূপ সুজলা সুফলা শস্য শ্যামলা। টাইপিং দক্ষতা অর্জনের জন্য প্রতিনিয়ত অনুশীলন অতীব জরুরি।";

export default function CustomTestArenaClient() {
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
    errorIndices,
  } = useTypingStore();

  const durationSec = parseInt(searchParams.get("duration") || "300", 10);
  const layoutParam = (searchParams.get("layout") as KeyboardLayout) || "jatiya";
  const goalParam = parseInt(searchParams.get("goal") || "30", 10);

  const [testResult, setTestResult] = useState<{
    wpm: number;
    accuracy: number;
    qualified: boolean;
    targetWpm: number;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Sync setup & custom text from sessionStorage on mount
  useEffect(() => {
    let customText = DEFAULT_SAMPLE_TEXT;
    if (typeof window !== "undefined") {
      const storedText = sessionStorage.getItem("typemaster_custom_text");
      if (storedText) {
        customText = storedText;
      }
    }

    setActiveLayout(layoutParam);
    setSelectedDuration(durationSec);
    setTargetText(customText);
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
    const qualified = wpm >= goalParam && accuracy >= 90;

    setTestResult({
      wpm,
      accuracy,
      qualified,
      targetWpm: goalParam,
    });

    await saveTypingSession({
      userId: user?.uid || "guest",
      name: user?.displayName || "Custom Practice User",
      wpm,
      netWpm: wpm,
      accuracy,
      cpm: wpm * 5,
      errors: 0,
      layout: layoutParam,
      language: layoutParam === "english" ? "english" : "bangla",
      mode: "custom-practice",
      duration: durationSec,
    });
  };

  const handleRestart = () => {
    resetTest();
    setTestResult(null);
  };

  const handleShareResult = () => {
    if (!testResult) return;
    const text = `📄 I practiced custom document typing on TypeBangla! Score: ${testResult.wpm} WPM with ${testResult.accuracy}% Accuracy! Practice online: https://typebangla.com/practice/custom`;
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
          <Link href="/practice/custom">
            <Button variant="outline" size="sm" className="text-xs font-bold gap-1.5 h-9 border-border">
              <ArrowLeft size={14} /> Setup Portal
            </Button>
          </Link>

          <div>
            <div className="text-xs font-black text-foreground flex items-center gap-1.5">
              <FileText size={14} className="text-primary shrink-0" />
              <span>Custom Document Practice Arena</span>
            </div>
            <div className="text-[10px] text-muted-foreground font-semibold">
              Target Goal: {goalParam} WPM • Min Accuracy: 90%
            </div>
          </div>
        </div>

        {/* Live Metrics Display */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary text-xs py-1 px-3 gap-1">
            <Zap size={13} className="text-amber-500" />
            Live WPM: <strong>{liveWpm}</strong>
          </Badge>

          <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary text-xs py-1 px-3 gap-1">
            <Activity size={13} className="text-emerald-500" />
            Accuracy: <strong>{liveAccuracy}%</strong>
          </Badge>

          <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary text-xs py-1 px-3 gap-1">
            <Keyboard size={12} className="text-primary" />
            Layout: <strong>{layoutParam.toUpperCase()}</strong>
          </Badge>

          {durationSec > 0 ? (
            <Badge variant="outline" className={`font-black text-xs py-1 px-3 gap-1 ${
              isStarted && !isCompleted ? "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 animate-pulse" : "border-border text-foreground bg-secondary"
            }`}>
              <Clock size={13} />
              Time Left: <strong>{displayMins}:{displaySecs}</strong>
            </Badge>
          ) : (
            <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary text-xs py-1 px-3 gap-1">
              <Clock size={12} className="text-primary" />
              Untimed Mode
            </Badge>
          )}
        </div>
      </div>

      {/* ── QUALIFICATION REPORT CARD OR TYPING ARENA ── */}
      {testResult ? (
        <Card className={`border rounded-2xl p-6 sm:p-8 shadow-md space-y-6 ${
          testResult.qualified ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20" : "border-amber-500 bg-amber-50/30 dark:bg-amber-950/20"
        }`}>
          <CardContent className="p-0 space-y-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border pb-5">
              <div className="flex items-center gap-3">
                {testResult.qualified ? (
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shrink-0 shadow-xs">
                    <CheckCircle2 size={32} />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center font-black shrink-0 shadow-xs">
                    <AlertTriangle size={32} />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-black text-foreground">
                      {testResult.qualified
                        ? `TARGET GOAL ACHIEVED (${testResult.wpm} WPM)! 🏆`
                        : `GOAL NEARLY ACHIEVED (${testResult.wpm} WPM)`}
                    </h3>
                    <Badge variant="outline" className={`text-[10px] font-black ${
                      testResult.qualified ? "border-emerald-500 text-emerald-600 bg-emerald-100 dark:bg-emerald-900/60" : "border-amber-500 text-amber-600 bg-amber-100 dark:bg-amber-900/60"
                    }`}>
                      {testResult.qualified ? "GOAL COMPLETED" : "PRACTICE COMPLETED"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xl">
                    {testResult.qualified
                      ? `Great job! Your performance of ${testResult.wpm} WPM with ${testResult.accuracy}% accuracy satisfies your target goal of ${testResult.targetWpm} WPM.`
                      : `Your target goal was ${testResult.targetWpm} WPM. You achieved ${testResult.wpm} WPM with ${testResult.accuracy}% accuracy. Keep practicing!`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 w-full lg:w-auto">
                <Button variant="outline" size="sm" onClick={handleRestart} className="text-xs font-bold gap-1.5 h-9 border-border">
                  <RotateCcw size={13} /> Retake Practice
                </Button>

                <Button variant="outline" size="sm" onClick={handleShareResult} className="text-xs font-bold gap-1.5 h-9 border-border">
                  {copied ? <Check size={13} className="text-emerald-500" /> : <Share2 size={13} />}
                  {copied ? "Copied!" : "Share Result"}
                </Button>

                <Link href="/practice/custom">
                  <Button variant="outline" size="sm" className="text-xs font-bold gap-1.5 h-9 border-border">
                    <FileText size={13} /> Load Different Text
                  </Button>
                </Link>

                <Link href="/dashboard">
                  <Button variant="secondary" size="sm" className="text-xs font-bold gap-1.5 h-9 border border-border">
                    <LayoutDashboard size={13} /> Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Score Breakdown Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Achieved WPM</div>
                <div className="text-2xl font-black text-foreground">{testResult.wpm}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Target Goal: {testResult.targetWpm} WPM</div>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Accuracy</div>
                <div className="text-2xl font-black text-foreground">{testResult.accuracy}%</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Min Target: 90%</div>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Practice Duration</div>
                <div className="text-2xl font-black text-foreground">{durationSec > 0 ? `${durationSec / 60} Min` : "Untimed"}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Session Timer</div>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Layout Keymap</div>
                <div className="text-2xl font-black text-foreground uppercase">{layoutParam}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Active Layout</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="border border-border bg-card rounded-2xl p-6 shadow-xs">
          <TypingArea hideModeHeader={true} onSessionComplete={handleSessionComplete} />
        </div>
      )}
    </div>
  );
}
