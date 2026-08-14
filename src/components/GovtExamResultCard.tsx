"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy, Zap, AlertTriangle, CheckCircle2,
  RotateCcw, Share2, Check, Award, LayoutDashboard
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export interface GovtResultData {
  wpm: number;
  accuracy: number;
  errorCount: number;
  qualified: boolean;
  postTitle: string;
  requiredWpm: number;
  requiredAcc: number;
}

export function getGovtWpmTier(wpm: number) {
  if (wpm < 30) {
    return {
      tier: "red" as const,
      label: "🛑 ধীরগতি (BELOW 30 WPM BENCHMARK)",
      badgeBg: "bg-rose-500 text-white border-rose-600 font-bold",
      cardBorder: "border-rose-500 bg-rose-50/40 dark:bg-rose-950/20",
      textColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-500 text-white",
      message: "ধীরগতি — আপনার টাইপিং গতি ৩০ WPM-এর নিচে (কম্পিউটার অপারেটর পরীক্ষার নূন্যতম মানদণ্ড স্পর্শ করতে পারেনি)। নিয়মিত টাইপিং ড্রিল ও টাচ টাইপিং অনুশীলন করুন।",
    };
  } else if (wpm < 60) {
    return {
      tier: "yellow" as const,
      label: "⚡ মধ্যম মানদণ্ড (৩০ - ৬০ WPM MODERATE SPEED)",
      badgeBg: "bg-amber-500 text-slate-950 font-black border-amber-600",
      cardBorder: "border-amber-500 bg-amber-50/40 dark:bg-amber-950/20",
      textColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-500 text-slate-950",
      message: "মধ্যম মানদণ্ড স্পর্শ করেছে — আপনার গতি ৩০-৬০ WPM। আপনি প্রাথমিক সরকারি পরীক্ষার যোগ্য, তবে আরও বেশি একিউরেসি ও গতি অর্জন করতে নিয়মিত চর্চা প্রয়োজন।",
    };
  } else {
    return {
      tier: "green" as const,
      label: "🏆 প্রফেশনাল এক্সপার্ট র‍্যাংক (৬০ - ১০০+ WPM EXPERT SPEED)",
      badgeBg: "bg-emerald-600 text-white font-black border-emerald-700",
      cardBorder: "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20",
      textColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-600 text-white",
      message: "প্রফেশনাল এক্সপার্ট স্কোর — ৬০-১০০+ WPM! আপনি সকল সরকারি মন্ত্রণালয়, ব্যাংক ও প্রশাসনিক পদের টাইপিং পরীক্ষায় সর্বোচ্চ স্থানে উন্নীত হতে প্রস্তুত।",
    };
  }
}

interface GovtExamResultCardProps {
  result: GovtResultData;
  onRetake?: () => void;
  onShare?: () => void;
  onGetCertificate?: () => void;
  copied?: boolean;
}

export function GovtExamResultCard({
  result,
  onRetake,
  onShare,
  onGetCertificate,
  copied = false,
}: GovtExamResultCardProps) {
  const tierInfo = getGovtWpmTier(result.wpm);

  return (
    <Card className={`border-2 rounded-2xl p-6 sm:p-8 shadow-md space-y-6 transition-all ${tierInfo.cardBorder}`}>
      <CardContent className="p-0 space-y-6">
        
        {/* Header Bar with Dynamic WPM Tier Styling */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black shrink-0 shadow-sm ${tierInfo.iconBg}`}>
              {tierInfo.tier === "red" ? (
                <AlertTriangle size={30} />
              ) : tierInfo.tier === "yellow" ? (
                <Zap size={30} />
              ) : (
                <Trophy size={30} />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                  {result.wpm} WPM Score ({result.accuracy}% Accuracy)
                </h3>
                <Badge variant="outline" className={`text-[11px] px-3 py-0.5 rounded-full ${tierInfo.badgeBg}`}>
                  {tierInfo.label}
                </Badge>
              </div>
              <p className={`text-xs sm:text-sm font-semibold leading-relaxed max-w-2xl ${tierInfo.textColor}`}>
                {tierInfo.message}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 w-full lg:w-auto">
            {onRetake && (
              <Button variant="outline" size="sm" onClick={onRetake} className="text-xs font-bold gap-1.5 h-9 border-border">
                <RotateCcw size={13} /> Retake Test
              </Button>
            )}

            {result.qualified && onShare && (
              <Button variant="outline" size="sm" onClick={onShare} className="text-xs font-bold gap-1.5 h-9 border-border">
                {copied ? <Check size={13} className="text-emerald-500" /> : <Share2 size={13} />}
                {copied ? "Copied!" : "Share Result"}
              </Button>
            )}

            {result.qualified && onGetCertificate && (
              <Button
                size="sm"
                onClick={onGetCertificate}
                className="text-xs font-black gap-1.5 h-9 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              >
                <Award size={13} /> Get Govt Certificate
              </Button>
            )}

            <Link href="/dashboard">
              <Button variant="secondary" size="sm" className="text-xs font-bold gap-1.5 h-9 border border-border">
                <LayoutDashboard size={13} /> Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Breakdown Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="bg-background/80 p-4 rounded-xl border border-border text-center space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase block">Net Speed</span>
            <div className={`text-2xl font-black ${tierInfo.textColor}`}>{result.wpm} WPM</div>
            <span className="text-[10px] text-muted-foreground">Target: {result.requiredWpm} WPM</span>
          </div>

          <div className="bg-background/80 p-4 rounded-xl border border-border text-center space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase block">Accuracy Rate</span>
            <div className="text-2xl font-black text-foreground">{result.accuracy}%</div>
            <span className="text-[10px] text-muted-foreground">Required: {result.requiredAcc}%</span>
          </div>

          <div className="bg-background/80 p-4 rounded-xl border border-border text-center space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase block">Character Errors</span>
            <div className="text-2xl font-black text-rose-500">{result.errorCount}</div>
            <span className="text-[10px] text-muted-foreground">Error Penalties</span>
          </div>

          <div className="bg-background/80 p-4 rounded-xl border border-border text-center space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase block">Govt Qualification</span>
            <div className="text-sm font-black pt-1">
              {result.qualified ? (
                <span className="text-emerald-500 flex items-center justify-center gap-1">
                  <CheckCircle2 size={16} /> PASS 🏆
                </span>
              ) : (
                <span className="text-rose-500 flex items-center justify-center gap-1">
                  <AlertTriangle size={16} /> RETAKE
                </span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground">BCC Standard</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
