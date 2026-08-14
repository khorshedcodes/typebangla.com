"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, CheckCircle2, ChevronRight, RotateCcw, Keyboard, Award, Info, Flame, Zap, Clock, Trophy, MousePointerClick } from "lucide-react";
import { useTypingStore, playTypewriterSound, KeyboardLayout } from "../store/typingStore";
import { UNI_BIJOY_MAP, JATIYA_MAP, PROBHAT_MAP, INSCRIPT_MAP, UNICODE_MAP, avroTransliterate, mapInputToBangla } from "../utils/layouts";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import VirtualKeyboard from "./VirtualKeyboard";

import { JUKTAKKHOR_DATA, JuktakkhorItem } from "../data/juktakkhorData";

export type { JuktakkhorItem };
export { JUKTAKKHOR_DATA };

export function JuktakkhorTrainer() {
  const { activeLayout, setActiveLayout } = useTypingStore();
  const [activeMode, setActiveMode] = useState<"breakdown" | "sprint">("breakdown");

  const practiceCardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Breakdown Mode States
  const [selectedCategory, setSelectedCategory] = useState<"all" | "essential" | "intermediate" | "advanced">("all");
  const [activeItem, setActiveItem] = useState<JuktakkhorItem>(JUKTAKKHOR_DATA[0]);
  const [inputVal, setInputVal] = useState("");
  const [score, setScore] = useState(0);
  const [completedSet, setCompletedSet] = useState<Set<string>>(new Set());
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [isSuccessing, setIsSuccessing] = useState(false);
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sprint Mode States
  const [isSprintRunning, setIsSprintRunning] = useState(false);
  const [sprintTimeLeft, setSprintTimeLeft] = useState(60);
  const [sprintIndex, setSprintIndex] = useState(0);
  const [sprintScore, setSprintScore] = useState(0);
  const [sprintInput, setSprintInput] = useState("");
  const [sprintCompleted, setSprintCompleted] = useState(false);

  const filteredList = selectedCategory === "all" 
    ? JUKTAKKHOR_DATA 
    : JUKTAKKHOR_DATA.filter((i) => i.category === selectedCategory);

  const handleCardSelect = (item: JuktakkhorItem) => {
    setActiveItem(item);
    setInputVal("");
    if (practiceCardRef.current) {
      practiceCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  };

  // Sprint Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSprintRunning && sprintTimeLeft > 0) {
      interval = setInterval(() => {
        setSprintTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (sprintTimeLeft === 0 && isSprintRunning) {
      queueMicrotask(() => {
        setIsSprintRunning(false);
        setSprintCompleted(true);
      });
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSprintRunning, sprintTimeLeft]);

  const advanceToNextItem = () => {
    setIsSuccessing(false);
    setInputVal("");
    const currentIdx = filteredList.findIndex((item) => item.id === activeItem.id);
    if (currentIdx !== -1 && currentIdx + 1 < filteredList.length) {
      setActiveItem(filteredList[currentIdx + 1]);
    }
  };

  const checkAndAdvance = (newVal: string) => {
    if (isSuccessing) return;
    setInputVal(newVal);

    if (newVal.trim() === activeItem.char || newVal.trim() === activeItem.exampleWord) {
      if (!completedSet.has(activeItem.id)) {
        const nextSet = new Set(completedSet).add(activeItem.id);
        setCompletedSet(nextSet);
        setScore((s) => s + 10);
      }

      try {
        playTypewriterSound("success");
      } catch {}

      setIsSuccessing(true);

      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);

      if (autoAdvance) {
        successTimeoutRef.current = setTimeout(() => {
          advanceToNextItem();
        }, 650);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSuccessing) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
        advanceToNextItem();
      }
      return;
    }

    if (e.key === "Backspace" || e.key === "Enter" || e.key === "Tab" || e.ctrlKey || e.altKey || e.metaKey) {
      return;
    }

    if (activeLayout === "unibijoy" || activeLayout === "jatiya" || activeLayout === "probhat" || activeLayout === "inscript" || activeLayout === "unicode") {
      const map =
        activeLayout === "unibijoy" ? UNI_BIJOY_MAP :
        activeLayout === "jatiya" ? JATIYA_MAP :
        activeLayout === "probhat" ? PROBHAT_MAP :
        activeLayout === "inscript" ? INSCRIPT_MAP :
        UNICODE_MAP;

      const mapping = map[e.code];
      if (mapping) {
        e.preventDefault();
        const mappedChar = e.shiftKey ? mapping.shift : mapping.normal;
        if (mappedChar) {
          checkAndAdvance(inputVal + mappedChar);
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (activeLayout === "avro") {
      const transliterated = avroTransliterate(val);
      checkAndAdvance(transliterated);
    } else if (activeLayout === "english") {
      checkAndAdvance(val);
    } else {
      const converted = mapInputToBangla(val, activeLayout);
      checkAndAdvance(converted || val);
    }
  };

  const handleVirtualKeyClick = (code: string, char: string, isShift?: boolean) => {
    if (code === "Backspace") {
      setInputVal((prev) => prev.slice(0, -1));
      return;
    }
    if (code === "Space") {
      checkAndAdvance(inputVal + " ");
      return;
    }

    let charToInsert = char;
    if (activeLayout === "unibijoy" || activeLayout === "jatiya" || activeLayout === "probhat" || activeLayout === "inscript" || activeLayout === "unicode") {
      const map =
        activeLayout === "unibijoy" ? UNI_BIJOY_MAP :
        activeLayout === "jatiya" ? JATIYA_MAP :
        activeLayout === "probhat" ? PROBHAT_MAP :
        activeLayout === "inscript" ? INSCRIPT_MAP :
        UNICODE_MAP;

      const mapping = map[code];
      if (mapping) {
        charToInsert = isShift ? mapping.shift : mapping.normal;
      }
    }

    if (charToInsert) {
      if (activeLayout === "avro" && /[a-zA-Z]/.test(charToInsert)) {
        const transliterated = avroTransliterate(inputVal + charToInsert);
        checkAndAdvance(transliterated);
      } else {
        checkAndAdvance(inputVal + charToInsert);
      }
    }
  };

  const handleSprintInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSprintRunning && !sprintCompleted) {
      setIsSprintRunning(true);
    }
    const val = e.target.value;
    setSprintInput(val);

    const targetItem = JUKTAKKHOR_DATA[sprintIndex % JUKTAKKHOR_DATA.length];
    if (val.trim() === targetItem.char || val.trim() === targetItem.exampleWord) {
      setSprintScore((s) => s + 15);
      setSprintInput("");
      setSprintIndex((prev) => prev + 1);
    }
  };

  const handleStartSprint = () => {
    setSprintTimeLeft(60);
    setSprintScore(0);
    setSprintIndex(0);
    setSprintInput("");
    setSprintCompleted(false);
    setIsSprintRunning(true);
  };

  const getLayoutKeyHelp = (item: JuktakkhorItem) => {
    if (activeLayout === "unibijoy") return item.bijoyKeys;
    if (activeLayout === "jatiya") return item.jatiyaKeys;
    return item.avroKeys;
  };

  const getCurrentStepChar = (input: string, item: JuktakkhorItem, layout: string) => {
    if (!item) return "";
    const trimmed = input.trim();

    if (layout === "avro") {
      const keys = item.avroKeys.split("+").map((k) => k.trim()).filter(Boolean);
      if (trimmed.length === 0) return keys[0] || item.components[0];
      if (trimmed.length < keys.length) return keys[trimmed.length] || item.components[0];
      return keys[keys.length - 1] || item.components[item.components.length - 1];
    }

    if (!item.components) return item.char;

    if (trimmed.length === 0) return item.components[0];

    let cumulative = "";
    for (let i = 0; i < item.components.length; i++) {
      cumulative += item.components[i];
      if (trimmed === cumulative) {
        return item.components[i + 1] || item.components[item.components.length - 1];
      }
    }

    const idx = Math.min(trimmed.length, item.components.length - 1);
    return item.components[idx];
  };

  const currentNextChar = activeMode === "sprint"
    ? getCurrentStepChar(sprintInput, JUKTAKKHOR_DATA[sprintIndex % JUKTAKKHOR_DATA.length], activeLayout)
    : getCurrentStepChar(inputVal, activeItem, activeLayout);

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-foreground fade-in">
      {/* Header Banner */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden bg-grid-pattern">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-xs font-bold border border-border">
            <Flame size={14} className="text-primary animate-pulse" />
            <span>BANGLA CONJUNCT LIGATURES MASTER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            যুক্তাক্ষর (Juktakkhor) Master Trainer
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl leading-relaxed">
            Master 30+ complex Bangla conjunct ligatures with step-by-step keystroke sequence breakdowns, interactive keyboard finger guides, and 60-second speed sprint time-trials.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="bg-secondary rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-2 border border-border text-foreground">
              <Award className="text-amber-500" size={16} />
              <span>Mastery Score: <strong className="text-foreground text-sm">{score} pts</strong></span>
            </div>
            <div className="bg-secondary rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-2 border border-border text-foreground">
              <CheckCircle2 className="text-emerald-500" size={16} />
              <span>Completed: <strong className="text-foreground text-sm">{completedSet.size} / {JUKTAKKHOR_DATA.length}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Mode Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-secondary p-1 rounded-xl border border-border">
            <button
              onClick={() => setActiveMode("breakdown")}
              className={`px-4 py-2 text-xs font-black rounded-lg transition-all flex items-center gap-2 ${
                activeMode === "breakdown"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Info size={14} /> 📖 Guided Breakdown Mode
            </button>
            <button
              onClick={() => setActiveMode("sprint")}
              className={`px-4 py-2 text-xs font-black rounded-lg transition-all flex items-center gap-2 ${
                activeMode === "sprint"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Zap size={14} className="text-amber-400" /> ⚡ 60s Speed Sprint
            </button>
          </div>

          {activeMode === "breakdown" && (
            <button
              type="button"
              onClick={() => setAutoAdvance(!autoAdvance)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                autoAdvance
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "bg-secondary border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Zap size={13} className={autoAdvance ? "text-emerald-500 fill-emerald-500" : ""} />
              <span>Auto-Advance: <strong>{autoAdvance ? "ON" : "OFF"}</strong></span>
            </button>
          )}
        </div>
      </div>

      {/* ── MODE 1: GUIDED BREAKDOWN MODE ── */}
      {activeMode === "breakdown" && (
        <div className="space-y-8 fade-in">
          {/* 1. TOP FULL-WIDTH ACTIVE PRACTICE CARD */}
          <div ref={practiceCardRef} className="w-full">
            <Card className="border border-border bg-card shadow-xs rounded-2xl">
              <CardContent className="p-6 sm:p-8 space-y-6">
                {/* Top Details */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <Badge variant="outline" className="border-primary text-primary font-black bg-primary/10 text-[10px] uppercase">
                      {activeItem.category} Ligature
                    </Badge>
                    <h2 className="text-2xl font-black text-foreground mt-1">{activeItem.name}</h2>
                  </div>
                  <div className="text-5xl sm:text-6xl font-bangla font-black text-foreground bg-secondary p-4 rounded-2xl border border-border shadow-xs">
                    {activeItem.char}
                  </div>
                </div>

                {/* Component Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Info size={14} className="text-primary" />
                    <span>Keystroke Decomposition Breakdown</span>
                  </h4>

                  <div className="flex items-center justify-center gap-2.5 sm:gap-4 p-4 bg-secondary/50 rounded-xl border border-border">
                    {activeItem.components.map((comp, idx) => {
                      const isCurrentStep = currentNextChar === comp;
                      return (
                        <React.Fragment key={idx}>
                          <div className="flex flex-col items-center">
                            <span className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-bangla text-2xl font-black transition-all shadow-xs ${
                              isCurrentStep
                                ? "bg-primary text-primary-foreground border-2 border-primary ring-4 ring-primary/20 scale-110 font-black shadow-md animate-pulse"
                                : "bg-card border border-border text-foreground"
                            }`}>
                              {comp}
                            </span>
                            <span className={`text-[10px] sm:text-xs font-bold mt-1.5 ${isCurrentStep ? "text-primary font-black" : "text-muted-foreground"}`}>
                              Step {idx + 1}
                            </span>
                          </div>
                          {idx < activeItem.components.length - 1 && (
                            <span className="text-muted-foreground font-black text-xl">+</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* Multi-Layout Interactive Shortcut Table */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                    <MousePointerClick size={13} className="text-primary" /> Click any layout below to switch active keyboard:
                  </span>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <button
                      type="button"
                      onClick={() => setActiveLayout("jatiya")}
                      className={`p-3 rounded-xl border text-xs transition-all flex flex-col justify-between items-center cursor-pointer ${
                        activeLayout === "jatiya"
                          ? "border-primary bg-primary/10 ring-2 ring-primary/40 font-black shadow-sm"
                          : "border-border bg-secondary hover:border-foreground/40"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Jatiya BCC</span>
                        {activeLayout === "jatiya" && (
                          <span className="text-[9px] font-black bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full uppercase">Active</span>
                        )}
                      </div>
                      <div className="font-mono font-black text-foreground text-sm mt-1">{activeItem.jatiyaKeys}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveLayout("unibijoy")}
                      className={`p-3 rounded-xl border text-xs transition-all flex flex-col justify-between items-center cursor-pointer ${
                        activeLayout === "unibijoy"
                          ? "border-primary bg-primary/10 ring-2 ring-primary/40 font-black shadow-sm"
                          : "border-border bg-secondary hover:border-foreground/40"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">UniBijoy 52</span>
                        {activeLayout === "unibijoy" && (
                          <span className="text-[9px] font-black bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full uppercase">Active</span>
                        )}
                      </div>
                      <div className="font-mono font-black text-foreground text-sm mt-1">{activeItem.bijoyKeys}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveLayout("avro")}
                      className={`p-3 rounded-xl border text-xs transition-all flex flex-col justify-between items-center cursor-pointer ${
                        activeLayout === "avro"
                          ? "border-primary bg-primary/10 ring-2 ring-primary/40 font-black shadow-sm"
                          : "border-border bg-secondary hover:border-foreground/40"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Avro Phonetic</span>
                        {activeLayout === "avro" && (
                          <span className="text-[9px] font-black bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full uppercase">Active</span>
                        )}
                      </div>
                      <div className="font-mono font-black text-foreground text-sm mt-1">{activeItem.avroKeys}</div>
                    </button>
                  </div>
                </div>

                {/* Interactive Practice Input */}
                <div className="space-y-3 pt-1">
                  {isSuccessing && (
                    <div className="bg-emerald-500 text-white dark:bg-emerald-600 p-4 rounded-xl font-bold flex items-center justify-between shadow-md transition-all animate-bounce">
                      <div className="flex items-center gap-2 font-bangla text-sm sm:text-base">
                        <Sparkles size={20} className="animate-spin" />
                        <span>🎉 চমৎকার! (+10 pts)</span>
                      </div>
                      {!autoAdvance ? (
                        <Button
                          size="sm"
                          onClick={advanceToNextItem}
                          className="bg-white text-emerald-800 hover:bg-zinc-100 font-black text-xs gap-1 cursor-pointer shadow-xs"
                        >
                          Next Ligature <ChevronRight size={14} />
                        </Button>
                      ) : (
                        <span className="text-xs text-white/90 font-mono font-semibold">Next ligature loading...</span>
                      )}
                    </div>
                  )}

                  <label className="text-xs font-bold text-foreground block">
                    Type <span className="text-foreground font-bangla font-black text-sm">{activeItem.char}</span> or word <span className="text-foreground font-bangla font-black text-sm">&quot;{activeItem.exampleWord}&quot;</span> to practice:
                  </label>

                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputVal}
                      onKeyDown={handleKeyDown}
                      onChange={handleInputChange}
                      placeholder={`Type ${activeItem.char} or ${activeItem.exampleWord} here...`}
                      className={`w-full px-5 py-4 rounded-xl border bg-background text-foreground font-bangla text-xl sm:text-2xl focus:outline-none focus:ring-2 shadow-xs transition-all ${
                        isSuccessing
                          ? "border-emerald-500 ring-2 ring-emerald-500/40 bg-emerald-500/5"
                          : "border-input focus:ring-primary"
                      }`}
                      autoFocus
                    />
                    {completedSet.has(activeItem.id) && !isSuccessing && (
                      <div className="absolute right-4 top-4 text-emerald-500 flex items-center gap-1.5 text-xs font-black">
                        <CheckCircle2 size={20} />
                        <span>Passed!</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 2. FULL-WIDTH VIRTUAL KEYBOARD & HAND PLACEMENT GUIDE */}
          <div className="pt-2 space-y-3">
            <h3 className="text-xs font-black uppercase text-foreground tracking-wider flex items-center gap-1.5">
              <Keyboard size={14} className="text-primary" />
              <span>Interactive Virtual Keyboard & Hand Placement Guide</span>
            </h3>
            <VirtualKeyboard nextChar={currentNextChar} onKeyClick={handleVirtualKeyClick} />
          </div>

          {/* 3. BOTTOM SECTION: JUKTAKKHOR GRID & CATEGORY FILTER */}
          <div className="pt-8 border-t border-border space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-foreground">যুক্তাক্ষর লাইব্রেরি (Ligature Grid)</h3>
                <p className="text-xs text-muted-foreground">অনুশীলন করতে নিচের যেকোনো যুক্তাক্ষর কার্ডে ক্লিক করুন</p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {(["all", "essential", "intermediate", "advanced"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all capitalize border ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat} ({cat === "all" ? JUKTAKKHOR_DATA.length : JUKTAKKHOR_DATA.filter(i => i.category === cat).length})
                  </button>
                ))}
              </div>
            </div>

            {/* Ligature Grid (1 col mobile, 2 sm, 3 md, 4 lg) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredList.map((item) => {
                const isDone = completedSet.has(item.id);
                const isSelected = activeItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardSelect(item)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                      isSelected
                        ? "border-primary ring-2 ring-primary bg-primary/5 shadow-md scale-[1.02]"
                        : isDone
                        ? "border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/70"
                        : "border-border bg-card hover:border-foreground/40 hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center font-bangla text-2xl font-black text-foreground border border-border group-hover:border-primary/50 transition-colors shadow-xs">
                        {item.char}
                      </div>

                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/30">
                          <CheckCircle2 size={14} /> Done
                        </span>
                      ) : (
                        <Badge variant="outline" className="border-border text-muted-foreground font-semibold text-[10px] uppercase">
                          {item.category}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{item.name}</h4>
                      <p className="text-xs text-muted-foreground leading-snug">
                        Example: <span className="font-bangla font-bold text-foreground">{item.exampleWord}</span> ({item.exampleMeaning})
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                      <span>{getLayoutKeyHelp(item)}</span>
                      <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── MODE 2: 60s SPEED SPRINT MODE ── */}
      {activeMode === "sprint" && (
        <Card className="border border-border bg-card shadow-xs rounded-2xl p-6 sm:p-8 space-y-6 fade-in">
          <CardContent className="p-0 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/40 text-[10px] font-black">
                  60-SECOND TIME TRIAL
                </Badge>
                <h2 className="text-2xl font-black text-foreground mt-1 flex items-center gap-2">
                  <Zap size={22} className="text-amber-500" /> Juktakkhor Speed Sprint
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">৬০ সেকেন্ডে যতগুলো সম্ভব যুক্তাক্ষর ও উদাহরণ শব্দ নির্ভুলভাবে টাইপ করুন</p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary text-sm py-1.5 px-4 gap-1.5">
                  <Clock size={16} className="text-primary" />
                  Time Left: <strong>{sprintTimeLeft}s</strong>
                </Badge>

                <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary text-sm py-1.5 px-4 gap-1.5">
                  <Trophy size={16} className="text-amber-500" />
                  Score: <strong>{sprintScore} pts</strong>
                </Badge>
              </div>
            </div>

            {sprintCompleted ? (
              <div className="text-center py-8 space-y-4 bg-secondary/50 rounded-2xl border border-border">
                <Trophy size={48} className="text-amber-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-black text-foreground">Sprint Completed!</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  You scored <strong>{sprintScore} points</strong> and completed <strong>{sprintIndex} conjuncts</strong> in 60 seconds!
                </p>

                <Button onClick={handleStartSprint} className="font-bold gap-2 px-8 shadow-xs">
                  <RotateCcw size={16} /> Try Sprint Again
                </Button>
              </div>
            ) : (
              <div className="space-y-6 text-center max-w-xl mx-auto py-4">
                {/* Active Sprint Target Card */}
                <div className="p-6 rounded-2xl bg-secondary border border-border space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Target Conjunct #{sprintIndex + 1}</span>
                  <div className="text-6xl font-bangla font-black text-foreground">
                    {JUKTAKKHOR_DATA[sprintIndex % JUKTAKKHOR_DATA.length].char}
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground">
                    Example: <span className="font-bangla font-bold text-foreground">{JUKTAKKHOR_DATA[sprintIndex % JUKTAKKHOR_DATA.length].exampleWord}</span> ({JUKTAKKHOR_DATA[sprintIndex % JUKTAKKHOR_DATA.length].exampleMeaning})
                  </div>
                </div>

                <input
                  type="text"
                  value={sprintInput}
                  onChange={handleSprintInputChange}
                  placeholder="Type the conjunct or example word here to start sprint..."
                  className="w-full px-6 py-4 rounded-xl border border-input bg-background text-foreground font-bangla text-2xl text-center focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
                  autoFocus
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
