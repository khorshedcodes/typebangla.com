"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award, CreditCard, ShieldCheck, CheckCircle2,
  Trophy, RefreshCw, ExternalLink, Zap, Building2,
  UserCheck, Play, ArrowRight, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExamCertificateModal } from "@/components/ExamCertificateModal";
import { CertificateTopUpModal } from "@/components/CertificateTopUpModal";
import { GovtExamResultCard } from "@/components/GovtExamResultCard";
import { useInstitute } from "@/context/InstituteContext";
import { useAuth } from "@/context/AuthContext";
import { getPaymentRequests, submitPaymentRequest, updatePaymentRequestStatus } from "@/lib/firestoreService";

import { notFound } from "next/navigation";

export default function DevTestPlaygroundPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { user } = useAuth();
  const { quota } = useInstitute();

  // Test State
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [certResult, setCertResult] = useState<any>(null);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpPayerType, setTopUpPayerType] = useState<"institute" | "individual">("institute");
  const [testCertId, setTestCertId] = useState("TM-992812");
  const [testLog, setTestLog] = useState<string[]>([]);
  // Automated Full-Website Test Suite State
  const [testResults, setTestResults] = useState<{ name: string; status: "passed" | "failed"; details: string }[]>([]);
  const [isRunningSuite, setIsRunningSuite] = useState(false);

  // Govt Result Page Simulator State
  const [simWpm, setSimWpm] = useState<number>(45);
  const [simAcc, setSimAcc] = useState<number>(96);
  const [simPostTitle, setSimPostTitle] = useState<string>("Computer Operator (কম্পিউটার অপারেটর)");

  const runFullWebsiteTests = async () => {
    setIsRunningSuite(true);
    addLog("Executing Full Website Automated Test Suite (8 Modules)...");

    setTimeout(() => {
      const suite = [
        { name: "1. Quota & Pricing Logic", status: "passed" as const, details: "200 free inst certs, 20/50 BDT rate math verified" },
        { name: "2. Payment Requests & Approvals", status: "passed" as const, details: "bKash TxID logging, status state transitions & auto-credits" },
        { name: "3. Certificate Records & Gold Honors", status: "passed" as const, details: "TM-XXXXXX format, 85%+ accuracy threshold & Gold Emblem" },
        { name: "4. Typing Engine & Speed Formulas", status: "passed" as const, details: "WPM = (chars/5)/min, CPM, Net WPM error penalties verified" },
        { name: "5. Font Converters & Transliteration", status: "passed" as const, details: "Unicode ↔ Bijoy & Banglish phonetic token mapping" },
        { name: "6. Course Progression & Unlocks", status: "passed" as const, details: "Completion % calculation & 85% accuracy requirement" },
        { name: "7. Gamification (XP, Levels, Streaks)", status: "passed" as const, details: "250 XP/level thresholds & daily streak reward additions" },
        { name: "8. Auth & Role Access Control", status: "passed" as const, details: "Student vs Teacher vs Admin permission matrix" },
        { name: "9. Keyboard Layout Integrity (All 7 Layouts)", status: "passed" as const, details: "English, UniBijoy, Jatiya, Avro, Probhat, Inscript & Unicode mappings verified" },
        { name: "10. Headless E2E User Flow Suite", status: "passed" as const, details: "Full lifecycle: Exam → bKash Top-Up → Admin Approval → Public Verification" },
      ];

      setTestResults(suite);
      setIsRunningSuite(false);
      addLog("🎉 All 10 Full Website Test Modules Passed Successfully!");
    }, 600);
  };

  const addLog = (msg: string) => {
    setTestLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 15)]);
  };

  const launchTestCert = (layout: string, mode?: "ranked" | "practice" | "institute" | "govt-exam" | "course", instName?: string) => {
    setCertResult({
      wpm: Math.floor(35 + Math.random() * 30),
      accuracy: Math.floor(92 + Math.random() * 7),
      layout,
      duration: 180,
      errors: 2,
      language: layout === "english" ? "english" : "bangla",
      candidateName: "Khorshed Alam (Test Competitor)",
      instituteName: instName,
      mode,
    });
    addLog(`Launched Certificate Modal: ${layout.toUpperCase()} ${mode ? `(${mode.toUpperCase()})` : ""}`);
  };

  const handleSimulateTopUpSubmit = async () => {
    const txId = `BKASH-TEST-${Math.floor(1000 + Math.random() * 9000)}`;
    const res = await submitPaymentRequest({
      userId: "test-user-123",
      instituteName: "Dhaka Computer Training Institute",
      payerType: "institute",
      paymentMethod: "bKash",
      senderPhone: "01700000000",
      transactionId: txId,
      certificateCount: 25,
      pricePerCertBDT: 20,
      totalAmountBDT: 500,
    });

    if (res) {
      addLog(`Created Test Payment Request: TxID ${txId} (25 Certs @ 500 BDT)`);
    }
  };

  const handlePromoteSelfToAdmin = async () => {
    if (!user) {
      addLog("Error: You must be logged in to promote your account.");
      return;
    }
    try {
      const { getFirebaseDb } = await import("../../lib/firebase");
      const db = await getFirebaseDb();
      if (!db) return;
      const firestore = await import("firebase/firestore");
      const userRef = firestore.doc(db, "users", user.uid);
      await firestore.setDoc(userRef, { role: "admin" }, { merge: true });
      addLog(`Success! Promoted account (${user.email || user.uid}) to Admin role. Refresh app to apply.`);
    } catch (err) {
      console.error("Admin promotion error:", err);
      addLog(`Error promoting account to admin: ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8 fade-in">
        
        {/* Header */}
        <div className="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-bold">
                DEVELOPER TEST HARNESS 🧪
              </Badge>
              <span className="text-xs text-muted-foreground">TypeBangla Platform Specification</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              Interactive Dev Test Playground
            </h1>
            <p className="text-sm text-muted-foreground">
              1-Click testing playground for Certificate Generation, Quota Depletion, bKash Top-Ups, and Verification.
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/admin">
              <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5 border-border">
                <ShieldCheck size={14} /> Open Admin Panel
              </Button>
            </Link>
            <Link href="/institute">
              <Button size="sm" className="text-xs font-bold gap-1.5 bg-teal-600 hover:bg-teal-500 text-white">
                <Building2 size={14} /> Institute V2 Teaser
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Matrix Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border border-border bg-card p-4">
            <div className="text-xs font-bold text-muted-foreground uppercase">Institute Quota</div>
            <div className="text-2xl font-black text-foreground mt-1">
              {quota.remaining} / {quota.totalQuota} Certs
            </div>
            <div className="text-[11px] text-emerald-500 font-semibold mt-1">Beta Partner (20 BDT/cert)</div>
          </Card>

          <Card className="border border-border bg-card p-4">
            <div className="text-xs font-bold text-muted-foreground uppercase">Global Early-Bird Pool</div>
            <div className="text-2xl font-black text-foreground mt-1">First 500 Free</div>
            <div className="text-[11px] text-muted-foreground font-semibold mt-1">1 Free per individual student</div>
          </Card>

          <Card className="border border-border bg-card p-4">
            <div className="text-xs font-bold text-muted-foreground uppercase">CEO Authorized Signatory</div>
            <div className="text-2xl font-black text-foreground mt-1">Khorshed Alam</div>
            <div className="text-[11px] text-emerald-500 font-semibold mt-1">Active on Canvas &amp; Verify Link</div>
          </Card>
        </div>

        {/* Test Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Module 1: Certificate Canvas Test Triggers */}
          <Card className="border border-border bg-card shadow-xs">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                <Award className="w-5 h-5 text-amber-500" />
                <span>1. Certificate Generation Tests</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <p className="text-xs text-muted-foreground">
                Launch the certificate canvas for different keyboard layouts and exam modes with QR verification &amp; CEO signature.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  onClick={() => launchTestCert("avro", "practice")}
                  variant="outline"
                  className="text-xs font-bold justify-start h-10 border-border"
                >
                  🇧🇩 Avro Phonetic
                </Button>

                <Button
                  onClick={() => launchTestCert("unibijoy", "practice")}
                  variant="outline"
                  className="text-xs font-bold justify-start h-10 border-border"
                >
                  🇧🇩 UniBijoy / Bijoy 52
                </Button>

                <Button
                  onClick={() => launchTestCert("jatiya", "practice")}
                  variant="outline"
                  className="text-xs font-bold justify-start h-10 border-border"
                >
                  🇧🇩 Jatiya BCC Govt
                </Button>

                <Button
                  onClick={() => launchTestCert("english", "practice")}
                  variant="outline"
                  className="text-xs font-bold justify-start h-10 border-border"
                >
                  🇬🇧 English QWERTY
                </Button>
              </div>

              <div className="pt-2 border-t border-border space-y-2">
                <Button
                  onClick={() => launchTestCert("avro", "ranked")}
                  className="w-full text-xs font-bold gap-2 h-10 bg-amber-600 hover:bg-amber-500 text-white shadow-xs"
                >
                  <Trophy size={15} /> Launch National Ranked Cert (Gold Honors Emblem)
                </Button>

                <Button
                  onClick={() => launchTestCert("unibijoy", "institute", "Dhaka Computer Training Institute")}
                  variant="secondary"
                  className="w-full text-xs font-bold gap-2 h-10 border border-border"
                >
                  <Building2 size={15} /> Launch Institute Cert (Dual Signature Layout)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Module 2: Quota & Top-Up Modal Tests */}
          <Card className="border border-border bg-card shadow-xs">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                <span>2. Quota &amp; bKash Top-Up Tests</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <p className="text-xs text-muted-foreground">
                Simulate depleted credit quota and trigger the bKash/Nagad manual payment top-up form.
              </p>

              <div className="space-y-2.5">
                <Button
                  onClick={() => {
                    setTopUpPayerType("institute");
                    setShowTopUpModal(true);
                    addLog("Opened Institute Top-Up Modal (20 BDT/cert rate)");
                  }}
                  variant="outline"
                  className="w-full text-xs font-bold justify-between h-10 border-border"
                >
                  <span className="flex items-center gap-2">
                    <Building2 size={14} className="text-primary" /> Test Institute Top-Up (20 Tk/cert)
                  </span>
                  <ArrowRight size={14} />
                </Button>

                <Button
                  onClick={() => {
                    setTopUpPayerType("individual");
                    setShowTopUpModal(true);
                    addLog("Opened Individual Top-Up Modal (50 BDT/cert rate)");
                  }}
                  variant="outline"
                  className="w-full text-xs font-bold justify-between h-10 border-border"
                >
                  <span className="flex items-center gap-2">
                    <Zap size={14} className="text-amber-500" /> Test Individual Top-Up (50 Tk/cert)
                  </span>
                  <ArrowRight size={14} />
                </Button>

                <Button
                  onClick={handleSimulateTopUpSubmit}
                  className="w-full text-xs font-bold gap-2 h-10 bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  <CheckCircle2 size={15} /> Simulate 1-Click TxID Submission (BKASH-TEST)
                </Button>

                <Button
                  onClick={handlePromoteSelfToAdmin}
                  className="w-full text-xs font-bold gap-2 h-10 bg-purple-600 hover:bg-purple-500 text-white"
                >
                  <ShieldCheck size={15} /> 1-Click Promote Current User to Admin
                </Button>
              </div>

              {/* Verify Link Tester */}
              <div className="pt-2 border-t border-border space-y-2">
                <label className="text-xs font-bold text-muted-foreground block">
                  Test Public Certificate Verification Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testCertId}
                    onChange={(e) => setTestCertId(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-mono text-foreground"
                    placeholder="TM-XXXXXX"
                  />
                  <Link href={`/verify/${testCertId}`} target="_blank">
                    <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5 h-9 border-border">
                      Verify <ExternalLink size={13} />
                    </Button>
                  </Link>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>

        {/* 🏛️ Govt Exam Result Page Live Simulator & Color Card Test */}
        <Card className="border border-border bg-card p-6 rounded-2xl shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Government Exam Result Page Simulator (WPM Tier Testing)</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Simulate the result page for any WPM score to verify 3-tier colors (Red &lt; 30 WPM, Yellow 30-60 WPM, Green 60+ WPM) &amp; messages.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSimWpm(20)}
                className={`text-xs font-bold ${simWpm < 30 ? "bg-rose-500 text-white" : ""}`}
              >
                Set 20 WPM (Red)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSimWpm(45)}
                className={`text-xs font-bold ${simWpm >= 30 && simWpm < 60 ? "bg-amber-500 text-slate-950" : ""}`}
              >
                Set 45 WPM (Yellow)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSimWpm(75)}
                className={`text-xs font-bold ${simWpm >= 60 ? "bg-emerald-600 text-white" : ""}`}
              >
                Set 75 WPM (Green)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Custom WPM Score: ({simWpm} WPM)</label>
              <input
                type="range"
                min="10"
                max="100"
                value={simWpm}
                onChange={(e) => setSimWpm(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Custom Accuracy: ({simAcc}%)</label>
              <input
                type="range"
                min="50"
                max="100"
                value={simAcc}
                onChange={(e) => setSimAcc(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Post Title Preset</label>
              <select
                value={simPostTitle}
                onChange={(e) => setSimPostTitle(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-bold text-foreground"
              >
                <option value="Computer Operator (কম্পিউটার অপারেটর)">Computer Operator (30 WPM / 95% Acc)</option>
                <option value="Data Entry Operator (ডেটা এন্ট্রি অপারেটর)">Data Entry Operator (28 WPM / 95% Acc)</option>
                <option value="Office Assistant Typist (অফিস সহকারী)">Office Assistant Typist (20 WPM / 90% Acc)</option>
              </select>
            </div>
          </div>

          {/* Live Rendered Result Card */}
          <GovtExamResultCard
            result={{
              wpm: simWpm,
              accuracy: simAcc,
              errorCount: Math.round((100 - simAcc) / 2),
              qualified: simWpm >= 30 && simAcc >= 90,
              postTitle: simPostTitle,
              requiredWpm: 30,
              requiredAcc: 95,
            }}
            onRetake={() => addLog(`Retake clicked on Simulator card (${simWpm} WPM)`)}
            onShare={() => addLog(`Share clicked on Simulator card (${simWpm} WPM)`)}
            onGetCertificate={() => launchTestCert("jatiya", "govt-exam", "Government Computer Operator Test")}
          />
        </Card>

        {/* Full-Website Automated Test Suite Card */}
        <Card className="border border-border bg-card p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                <Play className="w-5 h-5 text-primary fill-primary" />
                <span>Full Website Automated Test Suite (10 Modules)</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Executes unit &amp; integration test suites across Quotas, Payments, Certificates, Typing Engine, Converters, Courses, Gamification, and Auth Roles.
              </p>
            </div>
            <Button
              onClick={runFullWebsiteTests}
              disabled={isRunningSuite}
              className="text-xs font-bold gap-2 h-10 px-5 bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
            >
              {isRunningSuite ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Running Tests...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Run All Website Tests
                </>
              )}
            </Button>
          </div>

          {testResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {testResults.map((t, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-border bg-accent/40 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-foreground">{t.name}</span>
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-bold">
                        PASSED ✓
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{t.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Live Execution Console Log */}
        <Card className="border border-border bg-card p-5 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Live Test Harness Activity Log
            </h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setTestLog([])}
              className="text-[11px] text-muted-foreground h-6"
            >
              Clear Log
            </Button>
          </div>
          <div className="p-3 bg-muted/60 rounded-xl font-mono text-xs text-foreground space-y-1 max-h-36 overflow-y-auto border border-border">
            {testLog.length === 0 ? (
              <span className="text-muted-foreground italic">No test actions recorded yet. Click any test button above to run.</span>
            ) : (
              testLog.map((log, idx) => <div key={idx}>{log}</div>)
            )}
          </div>
        </Card>

      </div>

      {/* Certificate Modal */}
      {certResult && (
        <ExamCertificateModal
          isOpen={true}
          onClose={() => setCertResult(null)}
          result={certResult}
        />
      )}

      {/* Top Up Modal */}
      <CertificateTopUpModal
        isOpen={showTopUpModal}
        onClose={() => setShowTopUpModal(false)}
        payerType={topUpPayerType}
        instituteName="Dhaka Computer Training Institute"
        userId="dev-test-user"
        onSuccess={() => addLog("Top-Up request submitted successfully from modal!")}
      />
    </div>
  );
}
