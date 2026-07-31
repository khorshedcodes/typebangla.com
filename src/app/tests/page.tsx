import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Clock, ShieldCheck, Trophy, Award, FileText, ArrowRight, Sparkles, CheckCircle2, Zap, Keyboard } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export const metadata: Metadata = {
  title: "টাইপিং স্পিড টেস্ট ও পরীক্ষা | TypeBangla Tests Hub",
  description: "অভ্র, ইউনিবিজয়, জাতীয় ও QWERTY কীবোর্ডের ১, ৩ ও ৫ মিনিটের স্পিড টেস্ট, সরকারি চাকরির পরীক্ষা সিমুলেটর ও সনদপত্র।",
  alternates: { canonical: "https://typebangla.com/tests" },
};

const BANGLA_TESTS = [
  {
    href: "/exam/ranked",
    icon: Trophy,
    title: "3-Min National Ranked Challenge",
    titleBn: "জাতীয় র‍্যাঙ্কড কম্পিটিশন টেস্ট",
    desc: "অফিসিয়াল লিডারবোর্ড র‍্যাঙ্কিংয়ের জন্য ৩ মিনিটের প্রতিযোগিতা। ন্যূনতম ৮৫% অ্যাকুরেসি প্রয়োজন।",
    badge: "Official Ranked",
    stats: "180 Sec • Leaderboard Qualifier",
  },
  {
    href: "/tests/govt",
    icon: ShieldCheck,
    title: "Jatiya BCC Govt Exam Simulator",
    titleBn: "জাতীয় কীবোর্ড সরকারি পরীক্ষা",
    desc: "বাংলাদেশ কম্পিউটার কাউন্সিল (BCC) ও মন্ত্রণালয় নিয়োগ পরীক্ষার রিয়েল সিমুলেটর।",
    badge: "Govt Standard",
    stats: "BCC 20 WPM Criteria",
  },
  // Avro
  {
    href: "/tests/1min?layout=avro",
    icon: Clock,
    title: "Avro 1-Min Speed Test",
    titleBn: "অভ্র ফোনেটিক ১ মিনিট গতি পরীক্ষা",
    desc: "অভ্র ফোনেটিক কী ম্যাপিং দিয়ে ৬০ সেকেন্ডে বাংলা স্পিড পরিমাপ।",
    badge: "Avro 1-Min",
    stats: "60 Sec • Avro Phonetic",
  },
  {
    href: "/tests/5min?layout=avro",
    icon: Clock,
    title: "Avro 5-Min Official Test",
    titleBn: "অভ্র ৫ মিনিট পূর্ণাঙ্গ পরীক্ষা",
    desc: "পেশাদার কাজের মানদণ্ডে অভ্র ফোনেটিক কীবোর্ড ফুল-লেংথ স্পিড টেস্ট।",
    badge: "Avro 5-Min",
    stats: "300 Sec • Avro Full",
  },
  // UniBijoy
  {
    href: "/tests/1min?layout=unibijoy",
    icon: Keyboard,
    title: "UniBijoy 1-Min Speed Test",
    titleBn: "ইউনিবিজয় ১ মিনিট পরীক্ষা",
    desc: "SutonnyMJ স্ট্যান্ডার্ড ইউনিবিজয় কীবোর্ড ম্যাপে ৬০ সেকেন্ড গতি পরীক্ষা।",
    badge: "UniBijoy 1-Min",
    stats: "60 Sec • Bijoy Layout",
  },
  {
    href: "/tests/5min?layout=unibijoy",
    icon: Keyboard,
    title: "UniBijoy 5-Min Full Test",
    titleBn: "ইউনিবিজয় ৫ মিনিট পূর্ণাঙ্গ পরীক্ষা",
    desc: "প্রিন্টিং, প্রকাশনা ও সরকারি দাপ্তরিক কাজের মানসম্মত ৫ মিনিট বিজয় টেস্ট।",
    badge: "UniBijoy 5-Min",
    stats: "300 Sec • Bijoy Official",
  },
  // Jatiya
  {
    href: "/tests/1min?layout=jatiya",
    icon: Keyboard,
    title: "Jatiya 1-Min Speed Test",
    titleBn: "জাতীয় ১ মিনিট পরীক্ষা",
    desc: "বিসিসি জাতীয় কীবোর্ড লেআউটে ৬০ সেকেন্ডের স্পিড ড্রিল।",
    badge: "Jatiya 1-Min",
    stats: "60 Sec • Jatiya Layout",
  },
  {
    href: "/tests/5min?layout=jatiya",
    icon: Keyboard,
    title: "Jatiya 5-Min Official Test",
    titleBn: "জাতীয় ৫ মিনিট পূর্ণাঙ্গ পরীক্ষা",
    desc: "সরকারি টাইপিং পরীক্ষা মানসম্মত ৫ মিনিটের জাতীয় লেআউট টেস্ট।",
    badge: "Jatiya 5-Min",
    stats: "300 Sec • Jatiya Official",
  },
  // Probhat
  {
    href: "/tests/1min?layout=probhat",
    icon: FileText,
    title: "Probhat 1-Min Speed Test",
    titleBn: "প্রভাত কীবোর্ড ১ মিনিট গতি পরীক্ষা",
    desc: "প্রভাত লেআউটে ৬০ সেকেন্ডের গতি ও নির্ভুলতা টেস্ট।",
    badge: "Probhat 1-Min",
    stats: "60 Sec • Probhat Layout",
  },
  {
    href: "/tests/5min?layout=probhat",
    icon: FileText,
    title: "Probhat 5-Min Official Test",
    titleBn: "প্রভাত কীবোর্ড ৫ মিনিট পূর্ণাঙ্গ পরীক্ষা",
    desc: "প্রভাত কীবোর্ডে ৫ মিনিটের ফুল-লেংথ স্পিড টেস্ট।",
    badge: "Probhat 5-Min",
    stats: "300 Sec • Probhat Official",
  },
  // Inscript
  {
    href: "/tests/1min?layout=inscript",
    icon: Keyboard,
    title: "Inscript 1-Min Speed Test",
    titleBn: "ইনস্ক্রিপ্ট বাংলা ১ মিনিট গতি পরীক্ষা",
    desc: "জাতীয় ইনস্ক্রিপ্ট লেআউটে ৬০ সেকেন্ডের গতি পরীক্ষা।",
    badge: "Inscript 1-Min",
    stats: "60 Sec • Inscript Map",
  },
  {
    href: "/tests/5min?layout=inscript",
    icon: Keyboard,
    title: "Inscript 5-Min Official Test",
    titleBn: "ইনস্ক্রিপ্ট বাংলা ৫ মিনিট পূর্ণাঙ্গ পরীক্ষা",
    desc: "ইনস্ক্রিপ্ট কীবোর্ডে ৫ মিনিটের ফুল-লেংথ স্পিড টেস্ট।",
    badge: "Inscript 5-Min",
    stats: "300 Sec • Inscript Official",
  },
];

const ENGLISH_TESTS = [
  {
    href: "/tests/1min?layout=english",
    icon: Clock,
    title: "English 1-Min Speed Test",
    titleBn: "ইংরেজি ১ মিনিট গতি পরীক্ষা",
    desc: "স্ট্যান্ডার্ড QWERTY কীবোর্ডে ৬০ সেকেন্ডে আপনার WPM ও Accuracy পরিমাপ করুন।",
    badge: "QWERTY 1-Min",
    stats: "60 Sec • QWERTY Speed",
  },
  {
    href: "/tests/3min?layout=english",
    icon: Clock,
    title: "English 3-Min Endurance Test",
    titleBn: "ইংরেজি ৩ মিনিট সহনশীলতা পরীক্ষা",
    desc: "দীর্ঘ সময় ধরে টাইপিং গতি ও ধারাবাহিক নির্ভুলতা বজায় রাখার টেস্ট।",
    badge: "QWERTY 3-Min",
    stats: "180 Sec • Endurance",
  },
  {
    href: "/tests/5min?layout=english",
    icon: Clock,
    title: "English 5-Min Official Test",
    titleBn: "ইংরেজি ৫ মিনিট অফিসিয়াল পরীক্ষা",
    desc: "আন্তর্জাতিক ডেটা এন্ট্রি ও ফ্রিল্যান্সিং স্ট্যান্ডার্ড ৫ মিনিটের টেস্ট।",
    badge: "QWERTY 5-Min",
    stats: "300 Sec • Official",
  },
  {
    href: "/leaderboard",
    icon: Trophy,
    title: "National Leaderboard",
    titleBn: "জাতীয় স্পিড লিডারবোর্ড",
    desc: "বাংলাদেশের সেরা টাইপিস্টদের রিয়েল-টাইম জাতীয় র‍্যাঙ্কিং।",
    badge: "Rankings",
    stats: "Real-time Leaderboard",
  },
  {
    href: "/leaderboard",
    icon: Award,
    title: "Official Speed Scorecard",
    titleBn: "টাইপিং গতি ও নির্ভুলতা রিপোর্ট",
    desc: "পরীক্ষা শেষে তাৎক্ষণিক WPM, নেট গতি, ভুল কী-ম্যাপিং এবং অ্যাকুরেসি অ্যানালিটিক্স প্রতিবেদন।",
    badge: "Speed Analytics",
    stats: "Instant WPM Breakdown",
  },
];

export default function TestsHubPage() {
  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16 fade-in text-foreground">
      {/* Hero Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} />
          <span>STRICT TIMED SPEED EVALUATION CENTER</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Typing Speed Tests & Exam Simulators
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Evaluate your net WPM speed and typing accuracy under exam conditions with timed 1-min, 3-min, and 5-min tests across all 6 keyboard layouts.
        </p>
      </section>

      {/* ── FEATURED HERO: NATIONAL RANKED COMPETITION ── */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-primary/40 bg-card p-6 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-black">
              <Trophy size={14} />
              <span>OFFICIAL NATIONAL COMPETITION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              3-Minute National Speed Competition
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Test your speed on Avro, UniBijoy, Jatiya, Probhat, Inscript, or English. Score <strong>85%+ accuracy</strong> within 3 minutes to qualify for the National Leaderboard ranking.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs font-bold text-foreground">
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> 180 Seconds</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> 85%+ Accuracy Pass</span>
              <span className="flex items-center gap-1.5"><Award size={14} className="text-amber-500" /> National Scorecard</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <Link href="/exam/ranked" className="w-full">
              <Button size="lg" className="w-full font-black text-sm gap-2 h-12 shadow-sm">
                <Trophy size={16} /> Enter Competition Now
              </Button>
            </Link>
            <Link href="/leaderboard" className="w-full">
              <Button size="lg" variant="outline" className="w-full font-bold text-xs gap-2 h-11 border-border">
                View Leaderboard <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: BANGLA SPEED TESTS & EXAMS ── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="text-2xl">🇧🇩</span>
          <div>
            <h2 className="text-xl font-black text-foreground">Bangla Speed Tests & Exam Simulators</h2>
            <p className="text-xs text-muted-foreground">অভ্র ফোনেটিক, ইউনিবিজয়, জাতীয়, প্রভাত ও ইনস্ক্রিপ্ট কীবোর্ডে সময়ভিত্তিক পরীক্ষা</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BANGLA_TESTS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card
                key={idx}
                className="border border-border bg-card hover:border-foreground/50 transition-all rounded-xl shadow-xs flex flex-col justify-between"
              >
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-secondary text-foreground flex items-center justify-center border border-border">
                      <Icon size={20} />
                    </div>
                    <Badge variant="outline" className="border-border text-foreground font-semibold bg-secondary">
                      {card.badge}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-foreground">{card.title}</h3>
                    <div className="text-xs font-bold text-muted-foreground">{card.titleBn}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">{card.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-[11px] font-bold text-muted-foreground">{card.stats}</span>
                    <Link href={card.href}>
                      <Button size="sm" className="font-bold text-xs gap-1.5 h-9 rounded-md">
                        Start Test <ArrowRight size={13} />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 2: ENGLISH SPEED TESTS ── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <span className="text-2xl">🇺🇸</span>
          <div>
            <h2 className="text-xl font-black text-foreground">English Speed Tests & Scorecards</h2>
            <p className="text-xs text-muted-foreground">Standard English QWERTY 1-min, 3-min, and 5-min WPM speed evaluations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGLISH_TESTS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card
                key={idx}
                className="border border-border bg-card hover:border-foreground/50 transition-all rounded-xl shadow-xs flex flex-col justify-between"
              >
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-secondary text-foreground flex items-center justify-center border border-border">
                      <Icon size={20} />
                    </div>
                    <Badge variant="outline" className="border-border text-foreground font-semibold bg-secondary">
                      {card.badge}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-foreground">{card.title}</h3>
                    <div className="text-xs font-bold text-muted-foreground">{card.titleBn}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">{card.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-[11px] font-bold text-muted-foreground">{card.stats}</span>
                    <Link href={card.href}>
                      <Button size="sm" className="font-bold text-xs gap-1.5 h-9 rounded-md">
                        Start Test <ArrowRight size={13} />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Footer Banner */}
      <section className="border border-border bg-primary text-primary-foreground rounded-2xl p-8 text-center space-y-4 shadow-sm">
        <h2 className="text-2xl font-black">Ready to test your typing WPM?</h2>
        <p className="text-xs text-primary-foreground/80 max-w-lg mx-auto leading-relaxed">
          Take a 1-minute or 5-minute timed speed test across Avro, UniBijoy, Jatiya, Probhat, Inscript, or English QWERTY layouts and evaluate your net typing speed.
        </p>
        <div className="pt-2">
          <Link href="/tests/1min">
            <Button variant="secondary" className="font-extrabold text-xs h-11 px-7 rounded-xl">
              Start 1-Min Speed Test Now →
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
