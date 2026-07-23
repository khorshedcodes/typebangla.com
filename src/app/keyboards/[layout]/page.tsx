import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { KeyboardLayout } from "../../../store/typingStore";
import { ArrowLeft, GraduationCap, Play, ShieldCheck } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import VirtualKeyboard from "../../../components/VirtualKeyboard";

interface Props {
  params: Promise<{ layout: string }>;
}

const LAYOUT_DETAILS: Record<string, { name: string; nameBn: string; desc: string; bestFor: string; tips: string[] }> = {
  avro: {
    name: "Avro Phonetic",
    nameBn: "অভ্র ফোনেটিক",
    desc: "ইংরেজি কিবোর্ডে উচ্চরণ লিখে (যেমন 'ami' = 'আমি') অতি সহজে বাংলা লেখার আধুনিক মাধ্যম।",
    bestFor: "নতুনদের জন্য, সামাজিক যোগাযোগ মাধ্যম ও দ্রুত বার্তা পাঠানোর কাজে।",
    tips: [
      "উচ্চারণ অনুযায়ী টাইপ করুন: 'k' = ক, 'kh' = খ, 'g' = গ",
      "যুক্তবর্ণের জন্য মাঝে বর্ণ জোড়া দিন: 'k+k' = ক্ক",
      "হসন্ত বা আলাদা বর্ণের জন্য Shift বা স্বরবর্ণ নিয়ম জানুন",
    ],
  },
  unibijoy: {
    name: "UniBijoy",
    nameBn: "ইউনিবিজয়",
    desc: "প্রথাগত বিজয় বায়ান্ন কীবোর্ডের ইউনিকোড সংস্করণ। সরকারি দপ্তর ও প্রেস প্রকাশনায় সর্বাধিক প্রচলিত।",
    bestFor: "অফিস-আদালত, সরকারি কাজ ও প্রকাশনা শিল্প।",
    tips: [
      "জাতীয় কীবোর্ডের সাথে বিজয়ের লেআউটের মিল রয়েছে",
      "হসন্ত (g) দিয়ে যুক্তবর্ণ তৈরি হয়: ক + g + ক = ক্ক",
      "স্বরবর্ণের কার চিহ্ন ব্যঞ্জনবর্ণের পর টাইপ হয়",
    ],
  },
  jatiya: {
    name: "Jatiya Standard",
    nameBn: "জাতীয় কিবোর্ড (BCC)",
    desc: "বাংলাদেশ কম্পিউটার কাউন্সিল (BCC) কর্তৃক প্রস্তুতকৃত ও অনুমোদিত মানদণ্ড বাংলা কীবোর্ড।",
    bestFor: "সরকারি চাকরির প্র্যাকটিক্যাল পরীক্ষা (মন্ত্রণালয়, ব্যাংক, বিসিএস)।",
    tips: [
      "সরকারি সব পরীক্ষায় জাতীয় কীবোর্ড আবশ্যক",
      "বিজয় বায়ান্নর সাথে কী পজিশন প্রায় হুবহু এক",
      "Shift ব্যবহার করে দ্বিতীয় স্তরের বর্ণসমূহ লিখুন",
    ],
  },
  probhat: {
    name: "Probhat",
    nameBn: "প্রভাত লেআউট",
    desc: "সহজ ও ধারাবাহিক স্থির কীবোর্ড লেআউট। বিজয় এর জটিল যুক্তবর্ণের বিকল্প হিসেবে জনপ্রিয়।",
    bestFor: "যাঁরা বিজয়ের জটিলতা ছাড়া স্থির কীবোর্ড পছন্দ করেন।",
    tips: [
      "ফোনেটিক ভিত্তিক বর্ণ সাজানো",
      "যুক্তবর্ণ তৈরি করা বিজয় এর চেয়ে সহজ",
    ],
  },
  english: {
    name: "English QWERTY",
    nameBn: "ইংরেজি কোয়ার্টি (QWERTY)",
    desc: "বিশ্বজুড়ে বহুল ব্যবহৃত স্ট্যান্ডার্ড ইংরেজি টাচ-টাইপিং কীবোর্ড।",
    bestFor: "আন্তর্জাতিক যোগাযোগ, প্রোগ্রামিং, দাপ্তরিক কাজ।",
    tips: [
      "Home Row (A S D F — J K L ;) পজিশনে হাত রাখুন",
      "না তাকিয়ে টাইপ করার (Touch Typing) অভ্যাস গড়ে তুলুন",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { layout } = await params;
  const detail = LAYOUT_DETAILS[layout];
  if (!detail) return { title: "কীবোর্ড লেআউট | TypeBangla" };
  return {
    title: `${detail.nameBn} (${detail.name}) — কিবোর্ড ম্যাপ ও নির্দেশিকা | TypeBangla`,
    description: detail.desc,
    alternates: { canonical: `https://typebangla.com/keyboards/${layout}` },
  };
}

export default async function KeyboardDetailPage({ params }: Props) {
  const { layout } = await params;
  const detail = LAYOUT_DETAILS[layout];

  if (!detail) redirect("/keyboards");

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 fade-in">
      <div className="flex items-center gap-2">
        <Link href="/keyboards">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft size={13} />
            <span>সব লেআউট</span>
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">{detail.nameBn}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{detail.name}</p>
          </div>
          <Link href={`/learn/${layout}`}>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs gap-2">
              <Play size={13} />
              <span>এই লেআউটে শিখুন</span>
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{detail.desc}</p>

        <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl px-3 py-2">
          <ShieldCheck size={15} />
          <span>উপযুক্ত: {detail.bestFor}</span>
        </div>
      </div>

      {/* Virtual Keyboard Map */}
      <div className="space-y-3">
        <h2 className="text-base font-extrabold text-foreground">কীবোর্ড লেআউট ম্যাপ (Interactive Map)</h2>
        <div className="border border-border bg-card p-4 rounded-2xl">
          <VirtualKeyboard nextChar="" />
        </div>
      </div>

      {/* Tips */}
      <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-border rounded-2xl p-6 space-y-3">
        <h3 className="text-sm font-extrabold text-foreground flex items-center gap-2">
          <GraduationCap size={16} className="text-emerald-600" />
          টিপস ও নিয়মাবলী
        </h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          {detail.tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
