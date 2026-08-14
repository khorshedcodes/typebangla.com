"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, CheckCircle2, XCircle, ArrowLeft, Calendar, ShieldCheck, Clock, AlignLeft, Sparkles } from "lucide-react";
import { getCertificateRecord } from "../../../lib/firestoreService";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";

interface CertificateData {
  certificateId?: string;
  candidateName?: string;
  wpm?: number;
  accuracy?: number;
  layout?: string;
  language?: string;
  mode?: string;
  instituteName?: string;
  issuedAt?: unknown;
  createdAt?: string;
}

interface VerifyPageProps {
  params: Promise<{ certificateId: string }>;
}

export default function CertificateVerificationPage({ params }: VerifyPageProps) {
  const { certificateId } = use(params);
  const [certData, setCertData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCert() {
      if (!certificateId) return;
      const data = await getCertificateRecord(certificateId);
      setCertData(data);
      setLoading(false);
    }
    loadCert();
  }, [certificateId]);

  return (
    <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 fade-in text-foreground">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> হোমপেজে ফিরে যান (Home)
        </Link>

        <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1.5 px-3 py-1">
          <ShieldCheck size={14} /> Official Public Verification System
        </Badge>
      </div>

      {/* Main Verification Card */}
      <Card className="border border-border bg-card rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex items-center gap-3.5">
            <Image
              src="/images/logo/icon.svg"
              alt="TypeBangla emblem"
              width={44}
              height={44}
              className="w-11 h-11 rounded-xl shadow-xs"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">TypeBangla Credential Verification</h1>
              <p className="text-xs text-muted-foreground font-semibold">Official Bangladesh Typing Speed Certification Portal</p>
            </div>
          </div>

          <Badge variant="outline" className="border-primary/40 text-primary font-mono text-xs px-3 py-1 bg-primary/10">
            ID: {certificateId}
          </Badge>
        </div>

        {loading ? (
          <div className="py-20 text-center text-muted-foreground space-y-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold uppercase tracking-wider">সনদপত্রের রেকর্ড অনুসন্ধান করা হচ্ছে...</p>
          </div>
        ) : certData ? (
          <div className="space-y-8 fade-in">
            {/* Qualification Banner */}
            {certData.mode === "ranked" && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex items-center gap-3 text-amber-600 dark:text-amber-400 shadow-xs">
                <Award size={28} className="shrink-0 text-amber-500" />
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wide">🏆 National Ranking Competition Qualified Credential</h3>
                  <p className="text-xs opacity-90">This official certificate was earned under standard 3-minute national competition rules with verified accuracy.</p>
                </div>
              </div>
            )}

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-3 text-emerald-700 dark:text-emerald-400 shadow-xs">
              <CheckCircle2 size={28} className="shrink-0 text-emerald-500" />
              <div>
                <h3 className="font-black text-sm">বৈধ ও যাচাইকৃত সনদপত্র (Official Verified Certificate)</h3>
                <p className="text-xs opacity-90">এই সনদপত্রটি টাইপবাংলা প্ল্যাটফর্মের সিস্টেম ডাটাবেজে আসল পরীক্ষার ফলাফলের সাথে নিশ্চিতভাবে মিলেছে।</p>
              </div>
            </div>

            {/* Scorecard Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-2xl p-5 space-y-1 border border-border">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">পরীক্ষার্থীর নাম (Candidate Name)</span>
                <p className="text-lg font-black text-foreground">{certData.candidateName || "Learner Candidate"}</p>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-5 space-y-1 border border-border">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">সনদপত্র আইডি (Certificate ID)</span>
                <p className="text-sm font-mono font-black text-primary">{certData.certificateId || certificateId}</p>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-5 space-y-1 border border-border">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">টাইপিং স্পিড (Net WPM)</span>
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{certData.wpm || 0} WPM</p>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-5 space-y-1 border border-border">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">সঠিকতা (Accuracy)</span>
                <p className="text-3xl font-black text-foreground">{certData.accuracy || 100}%</p>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-5 space-y-1 border border-border">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">কীবোর্ড লেআউট</span>
                <p className="text-sm font-bold capitalize text-foreground">{certData.layout || "Avro"}</p>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-5 space-y-1 border border-border">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">পরীক্ষার ভাষা</span>
                <p className="text-sm font-bold uppercase text-foreground">{certData.language || "Bangla"}</p>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-5 space-y-1 border border-border sm:col-span-2">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">অনুমোদিত স্বাক্ষরকারী (Authorized Signatory)</span>
                <p className="text-sm font-black text-foreground">Khorshed Alam</p>
                <p className="text-xs text-muted-foreground">Founder &amp; Chief Engineer, TypeBangla (khorshed-alam.com)</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center space-y-4">
            <XCircle size={52} className="text-rose-500 mx-auto opacity-80" />
            <div className="space-y-1">
              <h3 className="text-lg font-black text-foreground">সনদপত্রটি খুঁজে পাওয়া যায়নি (Certificate Not Found)</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                আইডি <span className="font-mono text-foreground font-bold">{certificateId}</span> দিয়ে কোনো রেকর্ড পাওয়া যায়নি। অনুগ্রহ করে আইডিটি পুনরায় পরীক্ষা করুন।
              </p>
            </div>
          </div>
        )}
      </Card>
    </main>
  );
}
