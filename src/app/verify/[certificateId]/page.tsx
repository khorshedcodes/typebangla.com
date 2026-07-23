"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, CheckCircle2, XCircle, ArrowLeft, Calendar, ShieldCheck, Clock, AlignLeft } from "lucide-react";
import { getCertificateRecord } from "../../../lib/firestoreService";
import { Button } from "../../../components/ui/button";

interface VerifyPageProps {
  params: Promise<{ certificateId: string }>;
}

export default function CertificateVerificationPage({ params }: VerifyPageProps) {
  const { certificateId } = use(params);
  const [certData, setCertData] = useState<any>(null);
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
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} />
          হোমপেজে ফিরে যান
        </Link>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo/icon.svg"
                alt="typebangla logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl"
              />
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">typebangla Certificate Verification</h1>
                <p className="text-xs text-muted-foreground">Official Bangladesh Typing Speed Certification Portal</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck size={14} />
              <span>Verified System</span>
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-muted-foreground space-y-3">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-medium">সনদপত্রের রেকর্ড অনুসন্ধান করা হচ্ছে...</p>
            </div>
          ) : certData ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {certData.mode === "ranked" && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3 text-amber-600 dark:text-amber-400">
                  <Award size={24} className="shrink-0 text-amber-500" />
                  <div>
                    <h3 className="font-extrabold text-sm uppercase tracking-wide">🏆 National Ranking Competition Qualified Credential</h3>
                    <p className="text-xs opacity-90">This official certificate was earned under standard 3-minute national competition rules.</p>
                  </div>
                </div>
              )}

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 size={24} className="shrink-0 text-emerald-500" />
                <div>
                  <h3 className="font-bold text-sm">বৈধ ও যাচাইকৃত সনদপত্র (Official Verified Certificate)</h3>
                  <p className="text-xs opacity-90">এই সনদপত্রটি টাইপবাংলা প্ল্যাটফর্মের আসল পরীক্ষার ফলাফলের সাথে পুরোপুরি মিলেছে।</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-accent/40 rounded-2xl p-4 space-y-1 border border-border">
                  <span className="text-[11px] text-muted-foreground font-semibold">পরীক্ষার্থীর নাম</span>
                  <p className="text-base font-extrabold text-foreground">{certData.candidateName}</p>
                </div>

                <div className="bg-accent/40 rounded-2xl p-4 space-y-1 border border-border">
                  <span className="text-[11px] text-muted-foreground font-semibold">সনদপত্র আইডি (Certificate ID)</span>
                  <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{certData.certificateId}</p>
                </div>

                <div className="bg-accent/40 rounded-2xl p-4 space-y-1 border border-border">
                  <span className="text-[11px] text-muted-foreground font-semibold">টাইপিং স্পিড (Net WPM)</span>
                  <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{certData.wpm} WPM</p>
                </div>

                <div className="bg-accent/40 rounded-2xl p-4 space-y-1 border border-border">
                  <span className="text-[11px] text-muted-foreground font-semibold">সঠিকতা (Accuracy)</span>
                  <p className="text-2xl font-extrabold text-foreground">{certData.accuracy}%</p>
                </div>

                <div className="bg-accent/40 rounded-2xl p-4 space-y-1 border border-border">
                  <span className="text-[11px] text-muted-foreground font-semibold">কীবোর্ড লেআউট</span>
                  <p className="text-sm font-bold capitalize text-foreground">{certData.layout}</p>
                </div>

                <div className="bg-accent/40 rounded-2xl p-4 space-y-1 border border-border">
                  <span className="text-[11px] text-muted-foreground font-semibold">পরীক্ষার ভাষা</span>
                  <p className="text-sm font-bold uppercase text-foreground">{certData.language}</p>
                </div>

                <div className="bg-accent/40 rounded-2xl p-4 space-y-1 border border-border sm:col-span-2">
                  <span className="text-[11px] text-muted-foreground font-semibold">অনুমোদিত স্বাক্ষরকারী (Authorized Signatory)</span>
                  <p className="text-sm font-bold text-foreground">Khorshed Alam</p>
                  <p className="text-xs text-muted-foreground">Chief Executive Officer, TypeBangla (typebangla.com)</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <XCircle size={48} className="text-rose-500 mx-auto opacity-80" />
              <div className="space-y-1">
                <h3 className="text-base font-bold">সনদপত্রটি খুঁজে পাওয়া যায়নি (Certificate Not Found)</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  আইডি <span className="font-mono text-foreground font-bold">{certificateId}</span> দিয়ে কোনো সনদপত্র পাওয়া যায়নি। অনুগ্রহ করে আইডিটি পুনরায় পরীক্ষা করুন।
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
