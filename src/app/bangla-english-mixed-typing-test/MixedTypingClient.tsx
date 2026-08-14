"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTypingStore, KeyboardLayout } from "../../store/typingStore";
import VirtualKeyboard from "../../components/VirtualKeyboard";
import { BANGLA_SENTENCES_LEVEL_2 } from "../../data/banglaSentences";
import { ENGLISH_SENTENCES_LEVEL_2 } from "../../data/englishSentences";
import { mapInputToBangla, avroTransliterate } from "../../utils/layouts";
import { RotateCcw, Timer, Award, Languages, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function MixedTypingClient() {
  const { activeLayout, setActiveLayout } = useTypingStore();

  const [timeDuration, setTimeDuration] = useState<number>(60);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [mixedBlocks, setMixedBlocks] = useState<{ id: number; lang: "bangla" | "english"; text: string }[]>([]);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [avroBuffer, setAvroBuffer] = useState("");
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [totalCorrectChars, setTotalCorrectChars] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const generateMixedPassage = () => {
    const blocks = [];
    const bnCount = BANGLA_SENTENCES_LEVEL_2.length;
    const enCount = ENGLISH_SENTENCES_LEVEL_2.length;
    const targetBlockCount = Math.max(15, Math.ceil(timeDuration / 4));

    for (let i = 0; i < targetBlockCount; i++) {
      const isBangla = i % 2 === 0;
      const text = isBangla
        ? BANGLA_SENTENCES_LEVEL_2[Math.floor(Math.random() * bnCount)]
        : ENGLISH_SENTENCES_LEVEL_2[Math.floor(Math.random() * enCount)];
      blocks.push({ id: i, lang: isBangla ? ("bangla" as const) : ("english" as const), text });
    }
    setMixedBlocks(blocks);
    setCurrentBlockIndex(0);
    setUserInput("");
    setAvroBuffer("");
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(timeDuration);
    setTotalTypedChars(0);
    setTotalCorrectChars(0);
    setTotalErrors(0);
  };

  useEffect(() => {
    generateMixedPassage();
  }, [timeDuration]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const currentBlock = mixedBlocks[currentBlockIndex] || { lang: "bangla", text: "" };
  const isBanglaBlock = currentBlock.lang === "bangla";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;
    if (!isActive && timeLeft > 0) {
      setIsActive(true);
    }

    const val = e.target.value;
    setUserInput(val);

    const currentTargetText = currentBlock.text;
    let correctCount = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === currentTargetText[i]) {
        correctCount++;
      }
    }

    if (val.length >= currentTargetText.length) {
      setTotalTypedChars((prev) => prev + val.length);
      setTotalCorrectChars((prev) => prev + correctCount);
      setTotalErrors((prev) => prev + (val.length - correctCount));

      if (currentBlockIndex < mixedBlocks.length - 1) {
        setCurrentBlockIndex((prev) => prev + 1);
        setUserInput("");
        setAvroBuffer("");
      } else {
        setIsActive(false);
        setIsFinished(true);
      }
    }
  };

  const elapsedTimeMinutes = (timeDuration - timeLeft) / 60 || 0.01;
  const grossWpm = Math.round((totalTypedChars + userInput.length) / 5 / elapsedTimeMinutes);
  const accuracy = totalTypedChars > 0 ? Math.round((totalCorrectChars / totalTypedChars) * 100) : 100;
  const netWpm = Math.max(0, Math.round(grossWpm * (accuracy / 100)));

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 fade-in">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Back Link */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link href="/practice" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} /> প্র্যাকটিস হাব-এ ফিরে যান
          </Link>
          <Badge variant="outline" className="text-xs font-mono font-bold border-primary/30 text-primary">
            BILINGUAL SPEED TEST
          </Badge>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge className="bg-primary/10 text-primary border-primary/30 px-3 py-1 text-xs rounded-full inline-flex items-center gap-1.5 font-bold">
            <Languages className="w-4 h-4 text-primary" /> দ্বিমুখী টাইপিং টেস্ট (Bilingual Practice)
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            বাংলা-ইংরেজি মিক্সড টাইপিং টেস্ট
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            সরকারি চাকরি (BPSC, ব্যাংক, সচিবালয়) নিয়োগ পরীক্ষার জন্য একটি টেস্টেই বাংলা ও ইংরেজি উভয় ভাষার টাইপিং গতি প্র্যাকটিস করুন।
          </p>
        </div>

        {/* Test Settings Bar */}
        <Card className="bg-card border border-border shadow-md rounded-2xl">
          <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
            
            {/* Duration Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Timer className="w-4 h-4 text-primary" /> সময়কাল:
              </span>
              {[60, 180, 300].map((dur) => (
                <Button
                  key={dur}
                  onClick={() => setTimeDuration(dur)}
                  disabled={isActive}
                  size="sm"
                  variant={timeDuration === dur ? "default" : "outline"}
                  className={timeDuration === dur ? "font-bold text-xs shadow-xs" : "border-border text-muted-foreground text-xs font-semibold"}
                >
                  {dur / 60} মিনিট
                </Button>
              ))}
            </div>

            {/* Layout Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">বাংলা লেআউট:</span>
              <select
                value={activeLayout}
                onChange={(e) => setActiveLayout(e.target.value as KeyboardLayout)}
                className="bg-background border border-border rounded-lg px-3 py-1.5 text-foreground text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="avro">Avro Phonetic (অভ্র)</option>
                <option value="unibijoy">Bijoy (ইউনিবিজয়)</option>
                <option value="jatiya">Jatiya (জাতীয় BCC)</option>
                <option value="probhat">Probhat (প্রভাত)</option>
                <option value="inscript">Inscript (ইনস্ক্রিপ্ট)</option>
                <option value="unicode">Unicode (ইউনিকোড)</option>
              </select>
            </div>

            {/* Restart Button */}
            <Button onClick={generateMixedPassage} size="sm" variant="outline" className="border-border text-foreground font-bold text-xs cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> রিসেট
            </Button>
          </CardContent>
        </Card>

        {/* Live Scorecard Metrics */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <Card className="bg-card border border-border p-4 shadow-xs rounded-2xl">
            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">অবশিষ্ট সময়</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-500 mt-1">{timeLeft} সে.</div>
          </Card>

          <Card className="bg-card border border-border p-4 shadow-xs rounded-2xl">
            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider font-mono">NET WPM</div>
            <div className="text-2xl sm:text-3xl font-black text-primary mt-1">{netWpm}</div>
          </Card>

          <Card className="bg-card border border-border p-4 shadow-xs rounded-2xl">
            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">নির্ভুলতা (Accuracy)</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-500 mt-1">{accuracy}%</div>
          </Card>
        </div>

        {/* Typing Arena */}
        {!isFinished ? (
          <Card className="bg-card border-2 border-primary/40 p-6 space-y-6 shadow-xl rounded-3xl relative">
            
            {/* Language Target Indicator Badge */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground">বর্তমান প্যাসেজ ভাষা:</span>
                <Badge className={isBanglaBlock ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-bold" : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 text-xs font-bold"}>
                  {isBanglaBlock ? `🇧🇩 বাংলা (${activeLayout.toUpperCase()})` : "🇬🇧 English (QWERTY)"}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground font-mono font-bold">
                ধাপ {currentBlockIndex + 1} / {mixedBlocks.length}
              </span>
            </div>

            {/* Target Text Display */}
            <div className="bg-secondary/60 p-6 rounded-2xl border border-border text-xl sm:text-2xl leading-relaxed font-bangla min-h-[100px] flex items-center shadow-inner">
              <div>
                {currentBlock.text.split("").map((char, index) => {
                  let colorClass = "text-muted-foreground";
                  if (index < userInput.length) {
                    colorClass = userInput[index] === char ? "text-emerald-500 font-black" : "text-destructive bg-destructive/10 rounded px-0.5 font-black";
                  }
                  return (
                    <span key={index} className={colorClass}>
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Text Input */}
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder={isActive ? "টাইপ শুরু করুন..." : "টাইপিং শুরু করতে এখানে ক্লিক করে টাইপ শুরু করুন..."}
              className="w-full bg-background border border-input rounded-2xl px-5 py-4 text-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-bangla font-medium shadow-xs"
              autoFocus
            />
          </Card>
        ) : (
          /* Test Results Modal Card */
          <Card className="bg-card border-2 border-primary/50 p-8 text-center space-y-6 shadow-2xl rounded-3xl">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full text-primary">
              <Award className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-foreground">টাইপিং টেস্ট সম্পন্ন হয়েছে!</h2>
              <p className="text-muted-foreground text-sm">বাংলা ও ইংরেজি মিক্সড টাইপিং টেস্টের চূড়ান্ত ফলাফল</p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto bg-secondary/50 p-4 rounded-2xl border border-border">
              <div>
                <div className="text-xs font-bold text-muted-foreground">Gross WPM</div>
                <div className="text-2xl font-black text-foreground">{grossWpm}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-muted-foreground">Net WPM</div>
                <div className="text-2xl font-black text-primary">{netWpm}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-muted-foreground">Accuracy</div>
                <div className="text-2xl font-black text-emerald-500">{accuracy}%</div>
              </div>
            </div>

            <Button onClick={generateMixedPassage} className="font-bold px-8 py-3 rounded-xl shadow-md cursor-pointer">
              <RotateCcw className="w-5 h-5 mr-2" /> পুনরায় পরীক্ষা দিন
            </Button>
          </Card>
        )}

        {/* Dynamic Virtual Keyboard Component Integration */}
        <Card className="border border-border bg-card shadow-xs rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2 text-foreground">
              <Sparkles className="text-primary" size={20} />
              <h2 className="text-base font-black text-foreground">ডাইনামিক ভার্চুয়াল কীবোর্ড (অটো-সুইচ)</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono border-border uppercase font-bold">
              CURRENT KEYMAP: {isBanglaBlock ? activeLayout.toUpperCase() : "ENGLISH QWERTY"}
            </Badge>
          </div>

          <VirtualKeyboard
            activeLayout={isBanglaBlock ? activeLayout : "english"}
            nextChar={currentBlock.text[userInput.length]}
          />
        </Card>

      </div>
    </div>
  );
}
