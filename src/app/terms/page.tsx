import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck, ExternalLink, Award, Sparkles, BookOpen,
  Keyboard, FileText, CheckCircle2, HelpCircle, Type
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Terms of Service — TypeBangla",
  description: "Terms of Service, font licensing, and official keyboard layout credits for typebangla.com online Bangla & English typing platform.",
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
            <span>Legal Agreement</span>
          </Badge>
          <span className="text-xs text-muted-foreground">Last Updated: July 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          Welcome to <strong className="text-foreground font-semibold">typebangla.com</strong>. By accessing our typing courses, practice drills, exam simulators, and utility tools, you agree to comply with the terms outlined below.
        </p>
      </div>

      {/* Terms Content Card */}
      <Card className="border border-border bg-card shadow-sm">
        <CardContent className="p-6 sm:p-8 space-y-8 text-foreground">

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">1</span>
              <span>Acceptance &amp; Educational Purpose</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">typebangla.com</strong> provides free and premium interactive touch-typing instruction, government exam preparation drills, telemetry analytics, and Bengali text utility tools. These services are provided for educational and skill development purposes. By using our website, you agree to these Terms.
            </p>
          </section>

          {/* Section 2 - Keyboard Layout Intellectual Property & Credits */}
          <section className="space-y-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">2</span>
                <Keyboard size={18} className="text-primary" />
                <span>Third-Party Keyboard Layouts &amp; Official Credits</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our typing engine provides virtual keyboard overlays and typing practice for several standardized Bangla and English keyboard layouts. We explicitly recognize, credit, and honor the original creators and regulatory authorities of these layout standards:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">

              {/* Avro */}
              <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">Avro Phonetic Layout</span>
                  <Badge variant="outline" className="text-[10px]">Phonetic Standard</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Originally created and developed by <strong className="text-foreground">Mehdi Hasan Khan</strong> &amp; <strong className="text-foreground">OmicronLab</strong>.
                </p>
                <a
                  href="https://www.omicronlab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline pt-1"
                >
                  <span>Official Site: omicronlab.com</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Jatiya */}
              <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">Jatiya Layout (BCC)</span>
                  <Badge variant="outline" className="text-[10px]">Govt Exam Standard</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  National Keyboard Layout standardized by the <strong className="text-foreground">Bangladesh Computer Council (BCC)</strong>, ICT Division.
                </p>
                <a
                  href="https://bcc.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline pt-1"
                >
                  <span>Official Portal: bcc.gov.bd</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* UniBijoy / Bijoy */}
              <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">Bijoy &amp; UniBijoy Layout</span>
                  <Badge variant="outline" className="text-[10px]">Publishing Standard</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Conceptualized and created by <strong className="text-foreground">Mustafa Jabbar</strong> (Ananda Computers).
                </p>
                <span className="block text-xs text-muted-foreground italic pt-1">
                  UniBijoy adapts the Bijoy layout mapping for standard Unicode characters.
                </span>
              </div>

              {/* Probhat */}
              <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">Probhat Layout</span>
                  <Badge variant="outline" className="text-[10px]">Intuitive Map</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Designed by <strong className="text-foreground">Mustafa Qaium Khan</strong> (Bengali Computing Solutions).
                </p>
                <span className="block text-xs text-muted-foreground italic pt-1">
                  Fixed phonetic layout aligning Bangla letters with English keys.
                </span>
              </div>

              {/* Inscript */}
              <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-1.5 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">Inscript Bangla Layout</span>
                  <Badge variant="outline" className="text-[10px]">India National Standard 🇮🇳</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Standardized by the <strong className="text-foreground">Government of India / TDIL</strong> (Technology Development for Indian Languages) for Indic script input across Indian government &amp; state administration.
                </p>
              </div>

            </div>

            <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs leading-relaxed">
              <strong>Disclaimer:</strong> typebangla.com is an independent educational training platform and is not officially affiliated with or endorsed by OmicronLab, Ananda Computers, or the Bangladesh Computer Council. All product names, layout names, logos, and registered trademarks belong to their respective owners.
            </div>
          </section>

          {/* Section 3 - Third-Party Fonts & Typography Licensing */}
          <section className="space-y-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">3</span>
                <Type size={18} className="text-primary" />
                <span>Third-Party Fonts &amp; Typography Licensing</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our platform incorporates open-source and free-to-use Bangla and Latin font families to ensure accurate rendering of complex conjuncts (Juktakkhor), phonetic glyphs, and UI layouts. All font software utilized adheres strictly to their respective open-source licenses:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="font-bold text-foreground block text-sm">Noto Sans Bengali &amp; Inter</span>
                <p className="text-muted-foreground leading-relaxed">
                  Developed by Google &amp; Rasmus Andersson. Distributed under the <strong className="text-foreground">SIL Open Font License (OFL)</strong>.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="font-bold text-foreground block text-sm">Kalpurush &amp; SolaimanLipi</span>
                <p className="text-muted-foreground leading-relaxed">
                  Designed by Ekushey / Avro / Solaiman Karim. Distributed under open-source licenses for free public, educational, and commercial text rendering.
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Users may freely type, copy, format, and export content generated using these fonts for personal or commercial projects. Font trademarks and copyright ownership remain with their respective designers and foundries.
            </p>
          </section>

          {/* Section 4 - Platform Content & Use of Tools */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">4</span>
              <span>Use of Courses, Drills &amp; Conversion Tools</span>
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <p>
                You may access all interactive typing lessons, government job speed tests, and utility converters (<Link href="/unicode-to-bijoy-converter" className="text-primary hover:underline font-medium">Unicode ↔ Bijoy Converter</Link>, <Link href="/english-to-bangla-typing" className="text-primary hover:underline font-medium">Banglish Typing</Link>, <Link href="/bangla-voice-typing" className="text-primary hover:underline font-medium">Bangla Voice Typing</Link>, <Link href="/bangla-word-counter" className="text-primary hover:underline font-medium">Word Counter</Link>) for personal learning and professional training.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You agree not to scrape, automate, or systematically copy our unique typing drill content or code without permission.</li>
                <li>You agree not to attempt to manipulate speed test results or post falsified scores on public leaderboards.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 - Account Registration & Certificates */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">5</span>
              <Award size={18} className="text-primary" />
              <span>User Accounts &amp; Verified Certificates</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creating an account allows sync across devices, certificate generation, and leaderboard entry. Verification of course completion certificates (`/verify/[certificateId]`) relies on stored test telemetry. Certificates issued on typebangla.com verify user performance within our simulated environment.
            </p>
          </section>

          {/* Section 6 - Disclaimers & Limitation of Liability */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">6</span>
              <span>Disclaimer of Warranties &amp; Limitation of Liability</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This site and all software tools are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. While our government exam simulator aligns with standard BCC and ministry test formats, typebangla.com does not guarantee official employment exam results. We shall not be held liable for any data loss, browser cache clears, or indirect damages arising from site usage.
            </p>
          </section>

          {/* Section 7 - Modifications & Contact */}
          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-black">7</span>
              <span>Updates &amp; Contact Information</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms as our features expand. For inquiries regarding licensing, credits, or service terms, please visit our <Link href="/contact" className="text-primary font-semibold hover:underline">Contact Page</Link>.
            </p>
          </section>

        </CardContent>
      </Card>
    </main>
  );
}
