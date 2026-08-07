import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck, Lock, Database, Mic, CreditCard,
  CheckCircle2, UserCheck, Key, FileText, Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Privacy Policy | TypeBangla — Payment & Data Protection",
  description: "Privacy policy, data protection, bKash/Nagad payment handling, online certificate verification, and security guidelines for typebangla.com.",
  alternates: { canonical: "https://typebangla.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 fade-in">
      {/* Header Banner */}
      <div className="space-y-3 text-center sm:text-left border-b border-border pb-6">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs font-semibold text-primary border-primary/30 bg-primary/5">
            <ShieldCheck size={13} />
            <span>Data Protection &amp; Payment Privacy</span>
          </Badge>
          <span className="text-xs text-muted-foreground">Effective Date: July 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          At <strong className="text-foreground font-semibold">typebangla.com</strong>, we prioritize user privacy, data security, and financial transparency. This Privacy Policy details how we collect, store, and safeguard your telemetry data, payment records, authentication details, and certificate verification records.
        </p>
      </div>

      {/* Main Privacy Card */}
      <Card className="border border-border bg-card shadow-sm">
        <CardContent className="p-6 sm:p-8 space-y-8 text-foreground">

          {/* Section 1 - Core Commitment */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">1</span>
              <UserCheck size={18} className="text-primary" />
              <span>Core Privacy Commitment</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We operate under a strict privacy model: we collect only essential data needed to calculate WPM speed, verify test authenticity, process certificate top-ups, and manage institutional student records. We never sell, rent, or monetize personal user information.
            </p>
          </section>

          {/* Section 2 - Payment & Financial Data Handling */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">2</span>
              <CreditCard size={18} className="text-emerald-500" />
              <span>Payment &amp; Financial Transaction Privacy</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When purchasing certificate top-up credits (৳50 for individual typists, ৳20 for bulk institutional accounts) via bKash or Nagad:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
              <li><strong>Transaction Records:</strong> We record the sender&apos;s phone number, bKash/Nagad Transaction ID (TrxID), payment amount, timestamp, and requested credit count in encrypted Google Cloud Firestore database.</li>
              <li><strong>No Financial PIN Storage:</strong> TypeBangla NEVER requests or stores your bKash/Nagad PIN, password, or credit card CVV. Payment transfers occur through official bKash/Nagad mobile banking channels.</li>
              <li><strong>Audit Rights:</strong> Payment logs are retained solely for transaction verification, credit allocation auditing, and tax compliance.</li>
            </ul>
          </section>

          {/* Section 3 - Certificate Verification & Public Audit Records */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">3</span>
              <FileText size={18} className="text-primary" />
              <span>Certificate Generation &amp; Public Verification Records</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When a user earns and issues an official Gold or Silver TypeBangla Certificate:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
              <li>A unique **Certificate Verification ID** (e.g. `CERT-2026-XXXX`) and anti-tamper QR code are generated and indexed in our public database.</li>
              <li>Anyone inspecting the verification page at <code>https://typebangla.com/verify/[certificateId]</code> can view the recipient&apos;s display name, test layout, WPM speed, accuracy rate, test duration, and issue date to confirm authenticity.</li>
              <li>Public verification prevents diploma fraud and allows employers or government portals to verify official performance scores.</li>
            </ul>
          </section>

          {/* Section 4 - Local Storage & Offline Telemetry */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">4</span>
              <Database size={18} className="text-primary" />
              <span>Local Storage &amp; Guest Mode</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Guest users can practice anonymously. Speed telemetry, custom text drafts, and key preferences are saved locally inside your browser via <strong>HTML5 LocalStorage</strong> and can be cleared at any time through your browser settings.
            </p>
          </section>

          {/* Section 5 - Cloud Sync & Account Data */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">5</span>
              <Lock size={18} className="text-primary" />
              <span>Account Registration &amp; Firebase Security</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Registered user accounts (via Email or Google OAuth) are secured through Firebase Authentication. Passwords are salted and hashed by Google Infrastructure. Users may request full account and data deletion by contacting <code>support@typebangla.com</code>.
            </p>
          </section>

          {/* Section 6 - Voice Input Privacy */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">6</span>
              <Mic size={18} className="text-primary" />
              <span>Bangla Voice Typing Audio Privacy</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our Voice Typing tool uses the browser-native <strong>Web Speech API</strong>. Audio processing occurs locally within your web browser. TypeBangla servers NEVER record, listen to, or store your voice audio recordings.
            </p>
          </section>

        </CardContent>
      </Card>
    </main>
  );
}
