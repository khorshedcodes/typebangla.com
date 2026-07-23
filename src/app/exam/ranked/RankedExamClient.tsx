"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, Clock, ShieldCheck, Award, ArrowLeft, RotateCcw, AlertTriangle, CheckCircle2, Share2, Check, LayoutDashboard } from "lucide-react";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import { getRandomPassage } from "../../../utils/lessons/exam/examPassages";
import { saveTypingSession } from "../../../lib/firestoreService";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";
import TypingArea from "../../../components/TypingArea";
import { ExamCertificateModal } from "../../../components/ExamCertificateModal";

export default function RankedExamClient() {
  const { user } = useAuth();
  const {
    activeLayout,
    setActiveLayout,
    setSelectedDuration,
    setTargetText,
    targetText,
    isCompleted,
    resetTest,
  } = useTypingStore();

  const [testResult, setTestResult] = useState<{ wpm: number; accuracy: number; qualified: boolean } | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSelectedDuration(180); // Fixed 3 Minutes
    const p = getRandomPassage(activeLayout === "english" ? "english" : "bangla");
    setTargetText(p.text);
  }, [activeLayout, setSelectedDuration, setTargetText]);

  const handleShareScore = () => {
    if (!testResult) return;
    const shareText = `🏆 I scored ${testResult.wpm} WPM with ${testResult.accuracy}% Accuracy in the TypeBangla National Ranked Competition! Join the challenge: https://typebangla.com/exam/ranked`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLayoutChange = (l: KeyboardLayout) => {
    setActiveLayout(l);
    resetTest();
    const p = getRandomPassage(l === "english" ? "english" : "bangla");
    setTargetText(p.text);
    setTestResult(null);
  };

  const handleSessionComplete = async (wpm: number, accuracy: number) => {
    const qualified = accuracy >= 85;
    setTestResult({ wpm, accuracy, qualified });

    if (qualified) {
      await saveTypingSession({
        userId: user?.uid || "guest",
        name: user?.displayName || "Ranked Competitor",
        wpm,
        netWpm: wpm,
        accuracy,
        cpm: wpm * 5,
        errors: 0,
        layout: activeLayout,
        language: activeLayout === "english" ? "english" : "bangla",
        mode: "ranked",
        duration: 180,
      });
    }
  };

  const handleRestart = () => {
    resetTest();
    setTestResult(null);
    const p = getRandomPassage(activeLayout === "english" ? "english" : "bangla");
    setTargetText(p.text);
  };

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 fade-in text-foreground">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link href="/tests" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> Back to Tests Hub
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary text-primary font-extrabold bg-primary/10 flex items-center gap-1.5">
            <Trophy size={12} />
            <span>Mode: <strong>NATIONAL RANKED COMPETITION</strong></span>
          </Badge>
          <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary flex items-center gap-1.5">
            <Clock size={12} />
            <span>Duration: <strong>3 MINUTES (180s)</strong></span>
          </Badge>
        </div>
      </div>

      {/* Header Banner */}
      <div className="border border-border bg-card rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 bg-grid-pattern">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck size={14} />
            <span>Official Leaderboard Qualifier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">3-Minute National Competition Exam</h1>
          <p className="text-xs text-muted-foreground">Only scores with <strong>85%+ Accuracy</strong> qualify for the National Speed Leaderboard.</p>
        </div>

        <Link href="/leaderboard">
          <Button variant="outline" className="text-xs font-bold gap-1.5 h-10 px-5 border-border">
            <Trophy size={14} /> View Leaderboard
          </Button>
        </Link>
      </div>

      {/* Layout Selector */}
      {!isCompleted && !testResult && (
        <div className="flex items-center gap-2 border-b border-border pb-4 overflow-x-auto">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0">Layout:</span>
          {[
            { id: "avro", label: "Avro Phonetic" },
            { id: "unibijoy", label: "UniBijoy 52" },
            { id: "jatiya", label: "Jatiya BCC" },
            { id: "english", label: "English QWERTY" },
            { id: "probhat", label: "Probhat" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleLayoutChange(tab.id as KeyboardLayout)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                activeLayout === tab.id
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Qualification Result Banner */}
      {testResult && (
        <Card className={`border rounded-2xl p-6 shadow-md space-y-4 ${
          testResult.qualified ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20" : "border-rose-500 bg-rose-50/30 dark:bg-rose-950/20"
        }`}>
          <CardContent className="p-0 space-y-4 text-center sm:text-left">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {testResult.qualified ? (
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shrink-0 shadow-xs">
                    <CheckCircle2 size={28} />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center font-black shrink-0 shadow-xs">
                    <AlertTriangle size={28} />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black text-foreground">
                      {testResult.qualified ? "QUALIFIED FOR NATIONAL LEADERBOARD! 🏆" : "NOT QUALIFIED FOR LEADERBOARD"}
                    </h3>
                    {testResult.qualified && (
                      <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-[10px] font-black">
                        OFFICIAL QUALIFIER
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {testResult.qualified
                      ? `Your score of ${testResult.wpm} WPM at ${testResult.accuracy}% accuracy has been posted to the National Leaderboard!`
                      : `Minimum 85% accuracy is required. Your accuracy was ${testResult.accuracy}%. Try again to qualify.`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 w-full lg:w-auto">
                <Button variant="outline" size="sm" onClick={handleRestart} className="text-xs font-bold gap-1.5 h-9 border-border">
                  <RotateCcw size={13} /> Try Again
                </Button>
                
                {testResult.qualified && (
                  <>
                    <Button variant="outline" size="sm" onClick={handleShareScore} className="text-xs font-bold gap-1.5 h-9 border-border">
                      {copied ? <Check size={13} className="text-emerald-500" /> : <Share2 size={13} />}
                      {copied ? "Copied!" : "Share Score"}
                    </Button>

                    <Button size="sm" onClick={() => setShowCertModal(true)} className="text-xs font-black gap-1.5 h-9 bg-primary text-primary-foreground shadow-xs">
                      <Award size={13} /> Get Certificate
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
          </CardContent>
        </Card>
      )}

      {/* Typing Runner */}
      <TypingArea hideModeHeader={true} onSessionComplete={handleSessionComplete} />

      {/* Certificate Modal */}
      {showCertModal && testResult && (
        <ExamCertificateModal
          isOpen={true}
          onClose={() => setShowCertModal(false)}
          result={{
            wpm: testResult.wpm,
            accuracy: testResult.accuracy,
            layout: activeLayout,
            duration: 180,
            errors: 0,
            language: activeLayout === "english" ? "english" : "bangla",
            candidateName: user?.displayName || "Ranked Competitor",
            mode: "ranked",
          }}
        />
      )}
    </main>
  );
}
