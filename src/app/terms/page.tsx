import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck, ExternalLink, Award, Sparkles, BookOpen,
  Keyboard, FileText, CheckCircle2, HelpCircle, CreditCard, RefreshCw, AlertTriangle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Terms of Service | TypeBangla — Certificate & Licensing Terms",
  description: "Terms of Service, certificate top-up payment rules, refund policies, anti-cheat enforcement, and official keyboard layout credits for typebangla.com.",
  alternates: { canonical: "https://typebangla.com/terms" },
};

export default function TermsPage() {
  return (
    <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 fade-in">
      {/* Header Banner */}
      <div className="space-y-3 text-center sm:text-left border-b border-border pb-6">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs font-semibold text-primary border-primary/30 bg-primary/5">
            <FileText size={13} />
            <span>Legal &amp; Financial Agreement</span>
          </Badge>
          <span className="text-xs text-muted-foreground">Effective Date: July 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          Welcome to <strong className="text-foreground font-semibold">typebangla.com</strong>. By using our typing practice hub, timed exams, certificate issuance engine, payment services, or institutional portal, you agree to comply with the terms outlined below.
        </p>
      </div>

      {/* Terms Content Card */}
      <Card className="border border-border bg-card shadow-sm">
        <CardContent className="p-6 sm:p-8 space-y-8 text-foreground">

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">1</span>
              <span>Acceptance of Educational Service</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">typebangla.com</strong> provides interactive touch-typing instruction, government exam preparation drills, telemetry analytics, certificate verification, and Bengali text utility tools. Free practice modes are accessible to all users. Paid certificate credits and institutional portal features are governed by these Terms.
            </p>
          </section>

          {/* Section 2 - Paid Certificate Issuance & Payment Terms */}
          <section className="space-y-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">2</span>
                <CreditCard size={18} className="text-emerald-500" />
                <span>Certificate Top-Up &amp; Payment Terms (bKash / Nagad)</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Users and partner institutions may purchase certificate credits to generate official downloadable PDF certificates upon achieving qualifying test scores (minimum 85% accuracy):
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="font-extrabold text-sm text-foreground">Individual Typist Credit</span>
                <div className="text-emerald-500 font-black text-lg">৳50 / Certificate</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Allows individual candidates to generate 1 official Gold/Silver PDF certificate with unique QR verification.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="font-extrabold text-sm text-foreground">Institute Bulk License</span>
                <div className="text-teal-500 font-black text-lg">৳20 / Certificate (Bulk)</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Special bulk rate for registered training centers, schools, and colleges (minimum 25 credits).
                </p>
              </div>
            </div>

            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5 pt-2">
              <li><strong>Payment Submission:</strong> Payments are processed via bKash Send Money / Merchant transfer to official TypeBangla numbers. Users must submit their valid sender phone number and bKash/Nagad Transaction ID (TrxID) in the Top-Up Modal.</li>
              <li><strong>Verification SLA:</strong> Transaction verification and credit allocation are processed within 1 to 24 hours. Users receive email or dashboard notification upon approval.</li>
            </ul>
          </section>

          {/* Section 3 - Refund & Cancellation Policy */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">3</span>
              <RefreshCw size={18} className="text-primary" />
              <span>Refund, Cancellation &amp; Expiration Policy</span>
            </h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
              <li><strong>Unused Credit Refunds:</strong> Certificate credits purchased in error are eligible for a 100% refund within 7 days of purchase, provided no credits from that transaction have been consumed.</li>
              <li><strong>Issued Certificates:</strong> Once a certificate has been generated, issued, or downloaded, the associated credit is permanently consumed and non-refundable.</li>
              <li><strong>Failed Transactions:</strong> If a bKash/Nagad transaction fails or is rejected due to invalid TrxID, our support team will assist in re-verifying or refunding the amount within 3 business days upon proof of transfer.</li>
              <li><strong>Credit Expiration:</strong> Purchased certificate credits never expire while your account remains active.</li>
            </ul>
          </section>

          {/* Section 4 - Anti-Cheat & Anti-Tamper Enforcement */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">4</span>
              <AlertTriangle size={18} className="text-amber-500" />
              <span>Anti-Cheat Enforcement &amp; Certificate Revocation</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To preserve the official validity of TypeBangla certificates for government recruitment and employers:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5">
              <li>Automated macro scripts, keystroke injection bots, fake browser automation, or falsification of telemetry metrics are strictly prohibited.</li>
              <li>TypeBangla employs algorithmic typing cadence diagnostics. If cheating is detected, the test attempt will be invalidated, credits refunded or confiscated, and associated certificates permanently revoked from the public verification system (`/verify/[id]`).</li>
            </ul>
          </section>

          {/* Section 5 - Keyboard Layout IP & Official Credits */}
          <section className="space-y-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">5</span>
                <Keyboard size={18} className="text-primary" />
                <span>Third-Party Keyboard Layout Credits</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our typing engine provides virtual keymaps for standardized Bangla and English keyboard layouts. We recognize and honor the original creators and standardizing bodies:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="font-bold text-sm text-foreground">Avro Phonetic Layout</span>
                <p className="text-xs text-muted-foreground">
                  Created and developed by <strong>Mehdi Hasan Khan</strong> &amp; <strong>OmicronLab</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="font-bold text-sm text-foreground">Bijoy 52 Layout</span>
                <p className="text-xs text-muted-foreground">
                  Created and copyrighted by <strong>Mustafa Jabbar</strong> &amp; <strong>Ananda Computers</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="font-bold text-sm text-foreground">Jatiya Keyboard Layout</span>
                <p className="text-xs text-muted-foreground">
                  National Standard defined by <strong>Bangladesh Computer Council (BCC)</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="font-bold text-sm text-foreground">Inscript Bangla Layout</span>
                <p className="text-xs text-muted-foreground">
                  Indian Script National Standard by <strong>Government of India (TDIL)</strong>.
                </p>
              </div>
            </div>
          </section>

        </CardContent>
      </Card>
    </main>
  );
}
