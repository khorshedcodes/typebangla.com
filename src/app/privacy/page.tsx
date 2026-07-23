import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck, ExternalLink, Lock, Database, Mic,
  Cookie, Keyboard, FileText, CheckCircle2, UserCheck, Type
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Privacy Policy — TypeBangla",
  description: "Privacy policy, data protection, font usage, voice processing details, and official keyboard layout credits for typebangla.com.",
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
            <span>Data Protection &amp; Privacy</span>
          </Badge>
          <span className="text-xs text-muted-foreground">Last Updated: July 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          At <strong className="text-foreground font-semibold">typebangla.com</strong>, we are committed to respecting and protecting your privacy. This policy details how we handle client data, authentication, tool privacy, font rendering, and third-party resources.
        </p>
      </div>

      {/* Main Privacy Card */}
      <Card className="border border-border bg-card shadow-sm">
        <CardContent className="p-6 sm:p-8 space-y-8 text-foreground">

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">1</span>
              <UserCheck size={18} className="text-primary" />
              <span>Core Privacy Commitment</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We operate under a simple principle: collect only the essential data required to provide accuracy telemetry, course progression, certificate verification, and a seamless typing training experience. We do not sell your personal information.
            </p>
          </section>

          {/* Section 2 - Client-Side Storage */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">2</span>
              <Database size={18} className="text-primary" />
              <span>Local Storage &amp; Offline Telemetry</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When using our practice drills, speed tests, and course lessons, your progress metrics (WPM, accuracy percentage, mistake analysis, completed lesson IDs, and custom key bindings) are stored locally inside your browser via <strong className="text-foreground font-semibold">HTML5 LocalStorage</strong>.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>This data remains on your personal device and can be cleared at any time through your browser settings.</li>
              <li>Guest users can practice anonymously without transmitting local score data to any cloud database.</li>
            </ul>
          </section>

          {/* Section 3 - Cloud Sync & Authentication */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">3</span>
              <Lock size={18} className="text-primary" />
              <span>Account Registration &amp; Cloud Sync</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you choose to create a registered account or sign in with Google:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>We securely store your display name, email address, user ID, and cloud progress statistics in Firebase Authentication &amp; Google Cloud Firestore.</li>
              <li>This allows your course completion status, certificate records (`/verify/[certificateId]`), and leaderboard entries to persist across devices.</li>
            </ul>
          </section>

          {/* Section 4 - Tool Privacy (Voice Typing & Converters) */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">4</span>
              <Mic size={18} className="text-primary" />
              <span>Utility Tools &amp; Bangla Voice Typing Privacy</span>
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <p>
                Our platform features built-in utility tools such as <Link href="/bangla-voice-typing" className="text-primary font-medium hover:underline">Bangla Voice Typing</Link>, <Link href="/unicode-to-bijoy-converter" className="text-primary font-medium hover:underline">Unicode ↔ Bijoy Converter</Link>, <Link href="/english-to-bangla-typing" className="text-primary font-medium hover:underline">Banglish Typing</Link>, and <Link href="/bangla-word-counter" className="text-primary font-medium hover:underline">Word Counter</Link>.
              </p>
              <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-2">
                <span className="font-bold text-foreground text-xs uppercase tracking-wider block">Voice Speech Processing Guarantee:</span>
                <p className="text-xs leading-relaxed">
                  The Bangla Voice Typing tool uses the standard W3C <strong className="text-foreground font-semibold">Web Speech API</strong> provided natively by modern browsers (e.g. Chrome, Edge). Voice input is processed directly in real-time by your browser engine. <strong className="text-foreground">typebangla.com does NOT record, store, capture, or transmit your voice audio files or spoken transcripts to any server.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 - Keyboard Layout Credits */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">5</span>
              <Keyboard size={18} className="text-primary" />
              <span>Keyboard Layout Intellectual Property &amp; Credits</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We provide virtual key maps and typing lessons for standard keyboard layouts. All official credit and copyright for the design specifications of these layout standards belong to their respective creators:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg border border-border bg-secondary/20">
                <strong className="text-foreground font-semibold">Avro Phonetic:</strong> Created by Mehdi Hasan Khan &amp; <a href="https://www.omicronlab.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OmicronLab</a>.
              </div>
              <div className="p-3 rounded-lg border border-border bg-secondary/20">
                <strong className="text-foreground font-semibold">Jatiya Layout:</strong> Standardized by <a href="https://bcc.gov.bd" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Bangladesh Computer Council (BCC)</a>.
              </div>
              <div className="p-3 rounded-lg border border-border bg-secondary/20">
                <strong className="text-foreground font-semibold">Bijoy / UniBijoy:</strong> Conceptualized by Mustafa Jabbar (Ananda Computers).
              </div>
              <div className="p-3 rounded-lg border border-border bg-secondary/20">
                <strong className="text-foreground font-semibold">Probhat Layout:</strong> Designed by Mustafa Qaium Khan.
              </div>
              <div className="p-3 rounded-lg border border-border bg-secondary/20 sm:col-span-2">
                <strong className="text-foreground font-semibold">Inscript Bangla Layout:</strong> Standardized by Government of India / TDIL.
              </div>
            </div>
          </section>

          {/* Section 6 - Web Fonts & Typography Data */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">6</span>
              <Type size={18} className="text-primary" />
              <span>Web Fonts &amp; Typography Data</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To accurately render Bangla script, complex conjunct characters (Juktakkhor), and overall site interface typography, our platform delivers web font files (such as <strong className="text-foreground font-semibold">Noto Sans Bengali, Inter, Kalpurush, and SolaimanLipi</strong>).
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Web fonts fetched via Google Fonts or content delivery networks require your browser to request font files from font delivery servers (e.g., <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">fonts.googleapis.com</code>).</li>
              <li>Font delivery servers handle technical network requests (including IP address and browser User-Agent) solely for serve performance, security, and font asset caching without tracking personal user identities.</li>
            </ul>
          </section>

          {/* Section 7 - Cookies & Analytics */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">7</span>
              <Cookie size={18} className="text-primary" />
              <span>Cookies &amp; Third-Party Services</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may use analytics tools and cookies to optimize user experience and keep our educational platform free for learners. Third-party vendors use cookies to analyze site traffic and enhance platform features.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>You can control cookie preferences directly through your web browser settings.</li>
            </ul>
          </section>

          {/* Section 8 - User Rights & Deletion */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">8</span>
              <span>Data Retention &amp; Deletion Rights</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You have the right to request deletion of your registered account data and performance logs from our servers at any time. To request complete account data deletion, please contact us via our <Link href="/contact" className="text-primary font-semibold hover:underline">Contact Page</Link>.
            </p>
          </section>

        </CardContent>
      </Card>
    </main>
  );
}
