"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTypingStore } from "../../store/typingStore";
import VirtualKeyboard from "../../components/VirtualKeyboard";
import { BANGLA_SENTENCES_LEVEL_2 } from "../../data/banglaSentences";
import { ENGLISH_SENTENCES_LEVEL_2 } from "../../data/englishSentences";
import { RotateCcw, Timer, Award, Languages } from "lucide-react";
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
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [totalCorrectChars, setTotalCorrectChars] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const generateMixedPassage = () => {
    const blocks = [];
    const bnCount = BANGLA_SENTENCES_LEVEL_2.length;
    const enCount = ENGLISH_SENTENCES_LEVEL_2.length;

    for (let i = 0; i < 10; i++) {
      const isBangla = i % 2 === 0;
      const text = isBangla
        ? BANGLA_SENTENCES_LEVEL_2[Math.floor(Math.random() * bnCount)]
        : ENGLISH_SENTENCES_LEVEL_2[Math.floor(Math.random() * enCount)];
      blocks.push({ id: i, lang: isBangla ? ("bangla" as const) : ("english" as const), text });
    }
    setMixedBlocks(blocks);
    setCurrentBlockIndex(0);
    setUserInput("");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;
    if (!isActive && timeLeft > 0) {
      setIsActive(true);
    }

    const val = e.target.value;
    setUserInput(val);

    const currentTargetText = mixedBlocks[currentBlockIndex]?.text || "";

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
      } else {
        setIsActive(false);
        setIsFinished(true);
      }
    }
  };

  const currentBlock = mixedBlocks[currentBlockIndex] || { lang: "bangla", text: "" };
  const elapsedTimeMinutes = (timeDuration - timeLeft) / 60 || 0.01;
  const grossWpm = Math.round((totalTypedChars + userInput.length) / 5 / elapsedTimeMinutes);
  const accuracy = totalTypedChars > 0 ? Math.round((totalCorrectChars / totalTypedChars) * 100) : 100;
  const netWpm = Math.max(0, Math.round(grossWpm * (accuracy / 100)));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-3 py-1 text-sm rounded-full inline-flex items-center gap-1.5">
            <Languages className="w-4 h-4" /> দ্বিমুখী টাইপিং টেস্ট (Bilingual Practice)
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            বাংলা-ইংরেজি মিক্সড টাইপিং টেস্ট
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            সরকারি চাকরি (BPSC, ব্যাংক, সচিবালয়) নিয়োগ পরীক্ষার জন্য একটি টেস্টেই বাংলা ও ইংরেজি উভয় ভাষার টাইপিং গতি প্র্যাকটিস করুন।
          </p>
        </div>

        {/* Test Settings Bar */}
        <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-md">
          <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
            
            {/* Duration Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Timer className="w-4 h-4 text-indigo-400" /> সময়কাল:
              </span>
              {[60, 180, 300].map((dur) => (
                <Button
                  key={dur}
                  onClick={() => setTimeDuration(dur)}
                  disabled={isActive}
                  size="sm"
                  variant={timeDuration === dur ? "default" : "outline"}
                  className={timeDuration === dur ? "bg-indigo-600 hover:bg-indigo-500" : "border-slate-700 text-slate-300 hover:bg-slate-800"}
                >
                  {dur / 60} মিনিট
                </Button>
              ))}
            </div>

            {/* Layout Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">কিবোর্ড লেআউট:</span>
              <select
                value={activeLayout}
                onChange={(e) => setActiveLayout(e.target.value as any)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="english">English QWERTY</option>
                <option value="unijoy">Bijoy (UniBijoy)</option>
                <option value="phonetic">Avro Phonetic</option>
                <option value="jatiya">Jatiya (জাতীয়)</option>
              </select>
            </div>

            {/* Restart Button */}
            <Button onClick={generateMixedPassage} size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <RotateCcw className="w-4 h-4 mr-1.5" /> রিসেট
            </Button>
          </CardContent>
        </Card>

        {/* Live Scorecard Metrics */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">অবশিষ্ট সময়</div>
            <div className="text-3xl font-extrabold text-indigo-400 mt-1">{timeLeft} সে.</div>
          </Card>

          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">স্পিড (Net WPM)</div>
            <div className="text-3xl font-extrabold text-purple-400 mt-1">{netWpm}</div>
          </Card>

          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">নির্ভুলতা (Accuracy)</div>
            <div className="text-3xl font-extrabold text-pink-400 mt-1">{accuracy}%</div>
          </Card>
        </div>

        {/* Typing Arena */}
        {!isFinished ? (
          <Card className="bg-slate-900 border-slate-800 p-6 space-y-6 shadow-2xl relative">
            
            {/* Language Target Indicator Badge */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">বর্তমান ভাষা:</span>
                <Badge className={currentBlock.lang === "bangla" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-blue-500/20 text-blue-300 border-blue-500/30"}>
                  {currentBlock.lang === "bangla" ? "বাংলা (Bangla)" : "English"}
                </Badge>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                ধাপ {currentBlockIndex + 1} / {mixedBlocks.length}
              </span>
            </div>

            {/* Target Text Display */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-xl leading-relaxed font-sans min-h-[100px] flex items-center">
              <div>
                {currentBlock.text.split("").map((char, index) => {
                  let colorClass = "text-slate-400";
                  if (index < userInput.length) {
                    colorClass = userInput[index] === char ? "text-emerald-400 font-bold" : "text-rose-500 bg-rose-950/40 rounded px-0.5 font-bold";
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
              placeholder={isActive ? "টাইপ শুরু করুন..." : "টাইপিং শুরু করতে এখানে ক্লিক করে টাইপ করা শুরু করুন..."}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-5 py-4 text-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
              autoFocus
            />
          </Card>
        ) : (
          /* Test Results Modal Card */
          <Card className="bg-slate-900 border-slate-800 p-8 text-center space-y-6 shadow-2xl">
            <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full text-indigo-400">
              <Award className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-100">টাইপিং টেস্ট সম্পন্ন হয়েছে!</h2>
              <p className="text-slate-400 text-sm">বাংলা ও ইংরেজি মিক্সড টাইপিং টেস্টের চূড়ান্ত ফলাফল</p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <div className="text-xs text-slate-500">Gross WPM</div>
                <div className="text-2xl font-bold text-slate-200">{grossWpm}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Net WPM</div>
                <div className="text-2xl font-bold text-indigo-400">{netWpm}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Accuracy</div>
                <div className="text-2xl font-bold text-emerald-400">{accuracy}%</div>
              </div>
            </div>

            <Button onClick={generateMixedPassage} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl">
              <RotateCcw className="w-5 h-5 mr-2" /> পুনরায় পরীক্ষা দিন
            </Button>
          </Card>
        )}

        {/* Virtual Keyboard Component Integration */}
        <div className="mt-8">
          <VirtualKeyboard nextChar={currentBlock.text[userInput.length]} />
        </div>

      </div>
    </div>
  );
}
