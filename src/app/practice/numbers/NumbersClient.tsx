"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { Binary, Sparkles, RefreshCw, Hash, Percent, DollarSign } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { cn } from "@/utils/cn";

export type NumberDrillType = "bangla-digits" | "english-digits" | "currency-dates" | "symbols-punct";

const BANGLA_NUMBERS_POOL = ["১২৩৪৫", "৬৭৮৯০", "১৯৭১", "২০২৪", "৫০০", "৭৫০০", "১০০০০০", "০১৭১১", "০১৮১২", "২৪/০৭/২০২৪", "৫০%", "২০০ টাকা", "৫০০০ বিডিটি"];
const ENGLISH_NUMBERS_POOL = ["12345", "67890", "1971", "2024", "500", "7500", "100000", "01711", "01812", "24/07/2024", "50%", "$250", "5000 BDT"];
const CURRENCY_DATES_POOL = ["100 BDT", "৫০০ টাকা", "10/12/2024", "৫০% ছাড়", "$150.50", "VAT 15%", "Ref# 987654", "Serial: 2024-88"];
const SYMBOLS_POOL = ["(10 + 20) = 30", "email@domain.com", "#1 Typing!", "100% Accuracy!", "https://typebangla.com", "{key: 'value'}", "[2024]"];

export default function NumbersClient() {
  const { activeLayout, setActiveLayout, setTargetText, resetTest } = useTypingStore();
  const [drillType, setDrillType] = useState<NumberDrillType>("bangla-digits");

  const generateNumberStream = () => {
    let pool: string[] = [];
    if (drillType === "bangla-digits") pool = BANGLA_NUMBERS_POOL;
    else if (drillType === "english-digits") pool = ENGLISH_NUMBERS_POOL;
    else if (drillType === "currency-dates") pool = CURRENCY_DATES_POOL;
    else pool = SYMBOLS_POOL;

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const repeated = [...shuffled, ...shuffled, ...shuffled];
    const text = repeated.join(" ");

    setTargetText(text);
    resetTest();
  };

  useEffect(() => {
    generateNumberStream();
  }, [drillType, activeLayout]);

  return (
    <div className="space-y-6">
      {/* Back to Hub Link */}
      <Link href="/practice" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
        ← প্র্যাকটিস হাব-এ ফিরে যান
      </Link>

      {/* Controls Card */}
      <Card className="border border-border bg-card p-6 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2">
            <Binary size={16} className="text-amber-500" />
            <span>১. সংখ্যা ও পাঙ্কচুয়েশন ড্রিল নির্বাচন করুন:</span>
          </h2>
          <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/40 text-xs font-bold">
            নুমেরিক কীবোর্ড দক্ষতা
          </Badge>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { id: "bangla-digits", label: "🔢 বাংলা সংখ্যা (১, ২, ৩...)", desc: "০-৯ বাংলা গাণিতিক ডিজিট" },
            { id: "english-digits", label: "🔢 English Digits (1, 2, 3...)", desc: "0-9 Numeric Keypad" },
            { id: "currency-dates", label: "💰 টাকা, তারিখ ও পার্সেন্টেজ", desc: "টাকা, BDT, %, /, -" },
            { id: "symbols-punct", label: "🔣 বিশেষ প্রতীক ও ব্র্যাকেট", desc: "(! @ # $ % ^ & * () _ +)" },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDrillType(d.id as NumberDrillType)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-bold border transition-all text-left space-y-0.5",
                drillType === d.id
                  ? "bg-amber-500/10 border-amber-500 text-amber-600 shadow-xs ring-1 ring-amber-500"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <div>{d.label}</div>
              <div className="text-[10px] font-normal text-muted-foreground">{d.desc}</div>
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t border-border">
          <Button size="sm" onClick={generateNumberStream} className="gap-1.5 font-bold text-xs">
            <RefreshCw size={13} />
            <span>নতুন ডিজিট স্ট্রিম লোড করুন</span>
          </Button>
        </div>
      </Card>

      {/* Typing Area */}
      <TypingArea />

      {/* Visual Keyboard Guide */}
      <div className="pt-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase text-foreground tracking-wider">
            কিবোর্ড লেআউট নির্বাচন:
          </h3>
          <Badge variant="outline" className="border-primary text-primary font-bold text-xs uppercase">
            {activeLayout}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "avro", label: "Avro Phonetic" },
            { id: "unibijoy", label: "UniBijoy" },
            { id: "jatiya", label: "Jatiya (BCC)" },
            { id: "probhat", label: "Probhat" },
            { id: "inscript", label: "Inscript" },
            { id: "unicode", label: "Unicode" },
            { id: "english", label: "English QWERTY" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLayout(l.id as KeyboardLayout)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                activeLayout === l.id
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>

        <VirtualKeyboard />
      </div>
    </div>
  );
}
