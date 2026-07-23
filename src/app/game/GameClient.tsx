/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTypingStore, KeyboardLayout, playTypewriterSound } from "../../store/typingStore";
import VirtualKeyboard from "../../components/VirtualKeyboard";
import { avroTransliterate, JATIYA_MAP, UNI_BIJOY_MAP, PROBHAT_MAP, INSCRIPT_MAP, UNICODE_MAP } from "../../utils/layouts";
import { Heart, Play, Pause, RotateCcw, Volume2, VolumeX, Award, Star, ArrowRight, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { cn } from "@/utils/cn";

interface FallingWord {
  id: string;
  text: string;
  phonetic: string;
  x: number;
  y: number;
  speed: number;
}

const ENGLISH_WORDS = [
  "about", "above", "after", "again", "agree", "allow", "along", "apple", "arena", "artist",
  "basic", "beach", "begin", "black", "board", "brain", "brave", "breeze", "brown", "build",
  "clean", "clear", "clock", "cloud", "coast", "color", "count", "course", "craft", "cyber",
  "daily", "dance", "delay", "depth", "digit", "dirty", "dream", "drill", "drive", "dusk",
  "early", "earth", "eight", "elite", "empty", "enemy", "enjoy", "equal", "event", "every",
  "faith", "false", "field", "fight", "final", "first", "focus", "force", "forest", "front",
  "giant", "glass", "globe", "glory", "grace", "grand", "graph", "grass", "green", "guide",
  "happy", "heart", "heavy", "hello", "honor", "hopeful", "house", "human", "hurry", "hybrid",
  "ideal", "image", "index", "inner", "input", "intel", "intro", "irony", "issue", "ivory",
  "joint", "joker", "judge", "juice", "jumbo", "jumpy", "junky", "juror", "just", "juvenile",
  "keyboard", "knight", "knock", "koala", "kudos", "krill", "labor", "layout", "learn", "lemon",
  "level", "light", "limit", "local", "magic", "major", "match", "media", "metal", "micro",
  "might", "minor", "mixed", "model", "music", "muscle", "mystic", "myth", "macro", "marine",
  "matrix", "melody", "merit", "method", "novel", "never", "night", "noise", "north", "nexus"
];

const BANGLA_WORD_PAIRS: { bangla: string; phonetic: string }[] = [
  { bangla: "আমার", phonetic: "amar" },
  { bangla: "সোনার", phonetic: "sonar" },
  { bangla: "বাংলা", phonetic: "bangla" },
  { bangla: "ভাষা", phonetic: "bhaSha" },
  { bangla: "শিক্ষা", phonetic: "shikkha" },
  { bangla: "টাইপিং", phonetic: "taiping" },
  { bangla: "কীবোর্ড", phonetic: "kibord" },
  { bangla: "গতি", phonetic: "goti" },
  { bangla: "নির্ভুল", phonetic: "nirvul" },
  { bangla: "অভ্যাস", phonetic: "obhyas" },
  { bangla: "খেলা", phonetic: "khela" },
  { bangla: "স্কোর", phonetic: "skor" },
  { bangla: "জীবন", phonetic: "jibon" },
  { bangla: "শব্দ", phonetic: "shobdo" },
  { bangla: "বাংলাদেশ", phonetic: "bangladesh" },
  { bangla: "ঢাকা", phonetic: "dhaka" },
  { bangla: "নদী", phonetic: "nodi" },
  { bangla: "আকাশ", phonetic: "akash" },
  { bangla: "বাতাস", phonetic: "batash" },
  { bangla: "সূর্য", phonetic: "surjo" },
  { bangla: "চন্দ্র", phonetic: "candro" },
  { bangla: "নক্ষত্র", phonetic: "nokhotro" },
  { bangla: "পৃথিবী", phonetic: "prithibi" },
  { bangla: "দেশ", phonetic: "desh" },
  { bangla: "প্রেম", phonetic: "prem" },
  { bangla: "কবিতা", phonetic: "kobita" },
  { bangla: "গল্প", phonetic: "golpo" },
  { bangla: "ইতিহাস", phonetic: "itihash" },
  { bangla: "বিজ্ঞান", phonetic: "biggan" },
  { bangla: "প্রযুক্তি", phonetic: "projukti" },
  { bangla: "ভবিষ্যৎ", phonetic: "bhovishot" },
  { bangla: "উন্নয়ন", phonetic: "unnoyon" },
  { bangla: "স্বপ্ন", phonetic: "shopno" },
  { bangla: "আলো", phonetic: "alo" },
  { bangla: "ছায়া", phonetic: "chaya" },
  { bangla: "সবুজ", phonetic: "sobuj" },
  { bangla: "লাল", phonetic: "lal" },
  { bangla: "হলুদ", phonetic: "holud" },
  { bangla: "নীল", phonetic: "nil" },
  { bangla: "সাদা", phonetic: "shada" },
  { bangla: "কালো", phonetic: "kalo" },
  { bangla: "পানি", phonetic: "pani" },
  { bangla: "মাটি", phonetic: "mati" },
  { bangla: "ফুল", phonetic: "ful" },
  { bangla: "ফল", phonetic: "fol" },
  { bangla: "গাছ", phonetic: "gach" },
  { bangla: "বন", phonetic: "bon" },
  { bangla: "পাহাড়", phonetic: "pahar" },
  { bangla: "সাগর", phonetic: "shagor" },
  { bangla: "মেঘ", phonetic: "megh" },
  { bangla: "বৃষ্টি", phonetic: "brishti" },
  { bangla: "খবর", phonetic: "khabor" },
  { bangla: "পত্রিকা", phonetic: "potrika" },
  { bangla: "সময়", phonetic: "somoy" },
  { bangla: "নিয়ম", phonetic: "niyom" },
  { bangla: "কাজ", phonetic: "kaj" },
  { bangla: "সাফল্য", phonetic: "shafolyo" },
  { bangla: "অনন্দ", phonetic: "anondo" },
  { bangla: "বেদনা", phonetic: "bedona" },
  { bangla: "সাহস", phonetic: "sahosh" },
  { bangla: "ভয়", phonetic: "bhoy" },
  { bangla: "আইন", phonetic: "ain" },
  { bangla: "ছাত্র", phonetic: "chatro" },
  { bangla: "শিক্ষক", phonetic: "shikkhok" },
  { bangla: "বিদ্যালয়", phonetic: "biddaloy" },
  { bangla: "জ্ঞান", phonetic: "ggan" },
  { bangla: "বুদ্ধি", phonetic: "buddhi" },
  { bangla: "ভাবনা", phonetic: "bhabna" },
  { bangla: "চিন্তা", phonetic: "cinta" },
  { bangla: "মন", phonetic: "mon" },
  { bangla: "হৃদয়", phonetic: "hridoy" },
  { bangla: "বই", phonetic: "boi" },
  { bangla: "খাতা", phonetic: "khata" },
  { bangla: "কলম", phonetic: "kolom" },
  { bangla: "লেখা", phonetic: "lekha" },
  { bangla: "পড়া", phonetic: "pora" },
  { bangla: "সহজ", phonetic: "shohoj" },
  { bangla: "কঠিন", phonetic: "kothin" },
  { bangla: "সুন্দর", phonetic: "shundor" },
  { bangla: "ভালো", phonetic: "bhalo" },
  { bangla: "মন্দ", phonetic: "mondo" },
  { bangla: "নতুন", phonetic: "notun" },
  { bangla: "পুরানো", phonetic: "purano" },
  { bangla: "প্রথম", phonetic: "prothom" },
  { bangla: "শেষ", phonetic: "shesh" },
  { bangla: "মানুষ", phonetic: "manush" },
  { bangla: "বন্ধু", phonetic: "bondhu" },
  { bangla: "পরিবার", phonetic: "poribar" },
  { bangla: "সমাজ", phonetic: "shomaj" },
  { bangla: "জাতি", phonetic: "jati" },
  { bangla: "সুখ", phonetic: "shukh" },
  { bangla: "দুঃখ", phonetic: "dukkho" },
  { bangla: "আশা", phonetic: "asha" },
  { bangla: "খুশি", phonetic: "khushi" },
  { bangla: "হাসি", phonetic: "hashi" },
  { bangla: "দল", phonetic: "dol" },
  { bangla: "নেতা", phonetic: "neta" },
  { bangla: "দেশপ্রেম", phonetic: "deshprem" },
  { bangla: "মুক্তি", phonetic: "mukti" },
  { bangla: "কৃষি", phonetic: "krishi" },
  { bangla: "মাঠ", phonetic: "math" },
  { bangla: "শহর", phonetic: "shohor" },
  { bangla: "গ্রাম", phonetic: "gram" },
  { bangla: "রাস্তা", phonetic: "rasta" },
  { bangla: "গাড়ি", phonetic: "gari" },
  { bangla: "নৌকা", phonetic: "nouka" },
  { bangla: "জাহাজ", phonetic: "jahaj" }
];

export default function GameClient() {
  const {
    activeLayout,
    setActiveLayout,
    soundEnabled,
    setSoundEnabled
  } = useTypingStore();

  const [gameState, setGameState] = useState<"idle" | "playing" | "paused" | "game-over">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);

  const [words, setWords] = useState<FallingWord[]>([]);
  const [typedBuffer, setTypedBuffer] = useState("");
  const [targetWordId, setTargetWordId] = useState<string | null>(null);

  const arenaRef = useRef<HTMLDivElement | null>(null);
  const tickIntervalRef = useRef<number | null>(null);
  const spawnTimeoutRef = useRef<number | null>(null);

  const stopGameTimers = () => {
    if (tickIntervalRef.current) {
      window.clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
    if (spawnTimeoutRef.current) {
      window.clearTimeout(spawnTimeoutRef.current);
      spawnTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`typemaster_game_highscore_${activeLayout}`);
      setHighScore(stored ? parseInt(stored, 10) : 0);
    }
  }, [activeLayout]);

  useEffect(() => {
    return () => {
      stopGameTimers();
    };
  }, []);

  const startGame = () => {
    setWords([]);
    setTypedBuffer("");
    setTargetWordId(null);
    setScore(0);
    setLevel(1);
    setLives(3);
    setGameState("playing");

    const stored = localStorage.getItem(`typemaster_game_highscore_${activeLayout}`);
    setHighScore(stored ? parseInt(stored, 10) : 0);

    spawnWord();
  };

  const playSound = (type: "click" | "error" | "success" | "space") => {
    if (soundEnabled) {
      playTypewriterSound(type);
    }
  };

  const spawnWord = () => {
    if (gameState !== "idle" && gameState !== "playing") return;

    setWords((prev) => {
      const limit = Math.min(3 + level, 8);
      if (prev.length >= limit) return prev;

      let wordText = "";
      let phoneticTarget = "";

      if (activeLayout === "english") {
        const rand = ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
        wordText = rand;
        phoneticTarget = rand;
      } else {
        const rand = BANGLA_WORD_PAIRS[Math.floor(Math.random() * BANGLA_WORD_PAIRS.length)];
        wordText = rand.bangla;
        phoneticTarget = rand.phonetic;
      }

      if (prev.some((w) => w.text === wordText)) {
        return prev;
      }

      const baseSpeed = 1.0 + (level - 1) * 0.25;
      const speed = baseSpeed + Math.random() * 0.4;
      const x = 12 + Math.random() * 70;

      const newWord: FallingWord = {
        id: Math.random().toString(36).substring(2, 9),
        text: wordText,
        phonetic: phoneticTarget,
        x,
        y: -30,
        speed
      };

      return [...prev, newWord];
    });

    const spawnDelay = Math.max(3500 - level * 250, 1200);
    spawnTimeoutRef.current = window.setTimeout(spawnWord, spawnDelay);
  };

  useEffect(() => {
    if (gameState === "playing") {
      tickIntervalRef.current = window.setInterval(() => {
        setWords((prev) => {
          const arenaHeight = arenaRef.current?.clientHeight || 450;
          const limitLine = arenaHeight - 45;

          let lifeLostCount = 0;
          const remaining = prev.filter((w) => {
            if (w.y >= limitLine) {
              lifeLostCount++;
              if (w.id === targetWordId) {
                setTargetWordId(null);
                setTypedBuffer("");
              }
              return false;
            }
            return true;
          });

          if (lifeLostCount > 0) {
            playSound("error");
            setLives((currentLives) => {
              const nextLives = Math.max(0, currentLives - lifeLostCount);
              if (nextLives <= 0) {
                setGameState("game-over");
                stopGameTimers();
              }
              return nextLives;
            });
          }

          return remaining.map((w) => ({
            ...w,
            y: w.y + w.speed
          }));
        });
      }, 30);
    } else {
      stopGameTimers();
    }

    return () => {
      stopGameTimers();
    };
  }, [gameState, level, targetWordId]);

  useEffect(() => {
    if (gameState === "playing" && !spawnTimeoutRef.current) {
      spawnWord();
    }
    return () => {
      if (spawnTimeoutRef.current) {
        window.clearTimeout(spawnTimeoutRef.current);
        spawnTimeoutRef.current = null;
      }
    };
  }, [gameState, level]);

  useEffect(() => {
    if (gameState === "game-over") {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(`typemaster_game_highscore_${activeLayout}`, score.toString());
      }
    }
  }, [gameState, score, highScore, activeLayout]);

  useEffect(() => {
    const nextLevel = Math.floor(score / 150) + 1;
    if (nextLevel !== level) {
      setLevel(nextLevel);
    }
  }, [score, level]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

      const key = e.key;
      const code = e.code;
      const isShift = e.shiftKey;

      if (key === "Escape" || (key === "Backspace" && typedBuffer.length === 0)) {
        setTargetWordId(null);
        setTypedBuffer("");
        playSound("click");
        return;
      }

      if (key === "Backspace") {
        playSound("click");
        setTypedBuffer((prev) => prev.slice(0, -1));
        return;
      }

      if (key.length > 1 && !key.startsWith("Digit") && !key.startsWith("Key")) {
        return;
      }

      let typedChar = "";
      if (activeLayout === "english" || activeLayout === "avro") {
        typedChar = key;
      } else {
        const map = 
          activeLayout === "jatiya" ? JATIYA_MAP : 
          activeLayout === "unibijoy" ? UNI_BIJOY_MAP : 
          activeLayout === "probhat" ? PROBHAT_MAP : 
          activeLayout === "inscript" ? INSCRIPT_MAP : 
          activeLayout === "unicode" ? UNICODE_MAP : 
          UNI_BIJOY_MAP;
        const mapped = map[code];
        if (mapped) {
          typedChar = isShift ? mapped.shift : mapped.normal;
        }
      }

      if (!typedChar) return;

      if (key === " ") {
        e.preventDefault();
      }

      setWords((currentWords) => {
        let currentTargetId = targetWordId;
        let nextTyped = typedBuffer + typedChar;

        if (!currentTargetId) {
          const candidates = currentWords.filter((w) => {
            const matchTarget = activeLayout === "english" || activeLayout === "avro" ? w.phonetic : w.text;
            return matchTarget.startsWith(typedChar);
          });

          if (candidates.length > 0) {
            candidates.sort((a, b) => b.y - a.y);
            const chosen = candidates[0];
            currentTargetId = chosen.id;
            nextTyped = typedChar;
            setTargetWordId(chosen.id);
          } else {
            playSound("error");
            return currentWords;
          }
        }

        const targetedWord = currentWords.find((w) => w.id === currentTargetId);
        if (!targetedWord) {
          setTargetWordId(null);
          setTypedBuffer("");
          return currentWords;
        }

        const matchReference = activeLayout === "english" || activeLayout === "avro" ? targetedWord.phonetic : targetedWord.text;

        if (matchReference.startsWith(nextTyped)) {
          playSound("click");

          if (nextTyped === matchReference) {
            playSound("success");
            setScore((s) => s + targetedWord.text.length * 10);
            setTargetWordId(null);
            setTypedBuffer("");
            return currentWords.filter((w) => w.id !== currentTargetId);
          } else {
            setTypedBuffer(nextTyped);
          }
        } else {
          playSound("error");
        }

        return currentWords;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState, activeLayout, typedBuffer, targetWordId]);

  let nextKeyHighlight = "";
  if (targetWordId && words.length > 0) {
    const target = words.find((w) => w.id === targetWordId);
    if (target) {
      const matchReference = activeLayout === "english" || activeLayout === "avro" ? target.phonetic : target.text;
      nextKeyHighlight = matchReference[typedBuffer.length] || "";
    }
  }

  const layouts: { id: KeyboardLayout; label: string }[] = [
    { id: "english", label: "English" },
    { id: "unibijoy", label: "UniBijoy" },
    { id: "jatiya", label: "Jatiya" },
    { id: "avro", label: "Avro Phonetic" },
    { id: "probhat", label: "Probhat" },
    { id: "inscript", label: "Inscript" },
    { id: "unicode", label: "Unicode" }
  ];

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <Star className="text-amber-500 fill-amber-500" size={18} />
            <span>Falling Words Game</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            Destroy the words before they hit the bottom! Switch layouts to build muscle memory.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`h-8 gap-1.5 border-zinc-200 ${soundEnabled ? "border-emerald-200 text-emerald-700 bg-emerald-50/50" : "text-zinc-500"}`}
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>{soundEnabled ? "Sound On" : "Muted"}</span>
          </Button>
        </div>
      </div>

      {/* Layout Switcher */}
      <div className="flex bg-zinc-100 p-0.5 rounded-md border border-zinc-200 w-fit">
        {layouts.map((l) => (
          <button
            key={l.id}
            onClick={() => {
              if (gameState !== "playing" && gameState !== "paused") {
                setActiveLayout(l.id);
              }
            }}
            disabled={gameState === "playing" || gameState === "paused"}
            className={`px-3 py-1 text-xs font-semibold rounded-sm transition-all ${activeLayout === l.id
                ? "bg-white text-zinc-950 shadow-sm"
                : "text-zinc-500 hover:text-zinc-900"
              }`}
            style={{
              opacity: (gameState === "playing" || gameState === "paused") && activeLayout !== l.id ? 0.4 : 1,
              cursor: gameState === "playing" || gameState === "paused" ? "not-allowed" : "pointer"
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Main HUD and Game Area */}
      <div className="grid grid-cols-1 gap-4">

        {/* HUD Bar */}
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex space-x-6 sm:space-x-8">
              <div>
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Score</div>
                <div className="text-xl font-extrabold text-zinc-900 leading-tight">{score}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">High Score</div>
                <div className="text-xl font-extrabold text-zinc-900 leading-tight">{highScore}</div>
              </div>
              <div>
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Level</div>
                <div className="text-xl font-extrabold text-emerald-600 leading-tight">{level}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Health / Hearts */}
              <div className="flex space-x-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart
                    key={i}
                    size={16}
                    className={cn("transition-all duration-300", {
                      "fill-red-500 text-red-500": i < lives,
                      "text-zinc-200 fill-none": i >= lives
                    })}
                  />
                ))}
              </div>

              {/* Play/Pause controls */}
              {gameState === "playing" && (
                <Button variant="outline" size="sm" onClick={() => setGameState("paused")} className="h-8 border-zinc-250 gap-1.5 px-3">
                  <Pause size={12} />
                  <span>Pause</span>
                </Button>
              )}
              {gameState === "paused" && (
                <Button variant="outline" size="sm" onClick={() => setGameState("playing")} className="h-8 border-zinc-250 gap-1.5 px-3">
                  <Play size={12} />
                  <span>Resume</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Game Arena Box */}
        <div
          ref={arenaRef}
          className="relative w-full h-[400px] bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden select-none shadow-inner"
        >
          {/* Falling Words Rendering */}
          {words.map((w) => {
            const isTargeted = w.id === targetWordId;
            let highlighted = "";
            let remaining = w.text;

            if (isTargeted) {
              if (activeLayout === "english" || activeLayout === "avro") {
                highlighted = w.phonetic.substring(0, typedBuffer.length);
                remaining = w.phonetic.substring(typedBuffer.length);
              } else {
                highlighted = w.text.substring(0, typedBuffer.length);
                remaining = w.text.substring(typedBuffer.length);
              }
            }

            return (
              <div
                key={w.id}
                className={cn(
                  "absolute -translate-x-1/2 flex flex-col items-center justify-center py-1 px-3 border rounded-full text-xs font-semibold shadow-[0_2px_4px_rgba(0,0,0,0.03)] bg-white transition-all select-none duration-100",
                  {
                    "border-zinc-200 text-zinc-700": !isTargeted,
                    "border-emerald-400 bg-emerald-50/50 text-emerald-950 font-bold scale-[1.04] ring-2 ring-emerald-500/10 z-10 shadow-sm": isTargeted,
                    "font-sans": activeLayout === "english",
                    "font-bangla text-[13px]": activeLayout !== "english"
                  }
                )}
                style={{
                  left: `${w.x}%`,
                  top: `${w.y}px`,
                }}
              >
                {isTargeted ? (
                  <div>
                    <span className="text-emerald-600">{highlighted}</span>
                    <span>{remaining}</span>
                  </div>
                ) : (
                  <span>{w.text}</span>
                )}

                {/* Show Phonetic Guide for Avro mode */}
                {activeLayout === "avro" && (
                  <div className="text-[9px] font-mono text-zinc-400 font-medium">
                    {isTargeted ? (
                      <div>
                        <span className="text-emerald-500">{highlighted}</span>
                        <span>{remaining}</span>
                      </div>
                    ) : (
                      w.phonetic
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Danger Line (Lava line) */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-400/80 animate-pulse" />

          {/* Current typing buffer preview overlay for Avro phonetic */}
          {gameState === "playing" && activeLayout === "avro" && typedBuffer.length > 0 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-zinc-200 px-4 py-1.5 rounded-full text-xs font-mono flex items-center space-x-2 shadow-lg">
              <span>Typed: <code className="text-white font-bold">{typedBuffer}</code></span>
              <span className="text-zinc-600">→</span>
              <span className="text-emerald-400 font-bold font-bangla">{avroTransliterate(typedBuffer)}</span>
            </div>
          )}

          {/* Start Screen Overlay */}
          {gameState === "idle" && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                <Award size={28} />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-zinc-900">
                  Ready to test your layout speed?
                </h2>
                <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                  Practice <span className="font-semibold text-zinc-700 capitalize">{activeLayout}</span> layout. Words will drop down; type them correctly to destroy them!
                </p>
              </div>
              <Button onClick={startGame} className="bg-zinc-950 text-white hover:bg-zinc-800 gap-1.5 h-10 px-6">
                Start Practice Game
                <ArrowRight size={15} />
              </Button>
            </div>
          )}

          {/* Paused Screen Overlay */}
          {gameState === "paused" && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-[1px] z-20 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <h2 className="text-lg font-bold text-zinc-900">Game Paused</h2>
              <div className="flex gap-2">
                <Button onClick={() => setGameState("playing")} className="bg-zinc-950 text-white hover:bg-zinc-800 gap-1.5 h-9 px-5">
                  <Play size={13} />
                  <span>Resume</span>
                </Button>
                <Button variant="outline" onClick={startGame} className="h-9 px-5 border-zinc-250 gap-1.5">
                  <RotateCcw size={13} />
                  <span>Restart</span>
                </Button>
              </div>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === "game-over" && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-6 text-center space-y-5">
              <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500">
                <X size={20} className="stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-zinc-900">Game Over!</h2>
                <p className="text-xs text-muted-foreground">The words reached the danger line. Here is your run:</p>
              </div>

              <div className="flex gap-3 justify-center w-full max-w-xs">
                <div className="border border-border bg-card p-3 rounded-lg flex-1 shadow-sm">
                  <div className="text-xl font-extrabold text-emerald-600">{score}</div>
                  <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Score</div>
                </div>
                <div className="border border-border bg-card p-3 rounded-lg flex-1 shadow-sm">
                  <div className="text-xl font-extrabold text-zinc-900">{highScore}</div>
                  <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">High Score</div>
                </div>
                <div className="border border-border bg-card p-3 rounded-lg flex-1 shadow-sm">
                  <div className="text-xl font-extrabold text-zinc-900">{level}</div>
                  <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Level</div>
                </div>
              </div>

              <Button onClick={startGame} className="bg-zinc-950 text-white hover:bg-zinc-800 gap-1.5 h-10 px-6">
                <RotateCcw size={14} />
                <span>Play Again</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard Fingering Guide */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase">
          Keyboard Fingering Guide
        </h3>
        <VirtualKeyboard nextChar={nextKeyHighlight} />
      </div>
    </main>
  );
}
