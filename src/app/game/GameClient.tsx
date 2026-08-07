/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTypingStore, KeyboardLayout, playTypewriterSound } from "../../store/typingStore";
import VirtualKeyboard from "../../components/VirtualKeyboard";
import { avroTransliterate, JATIYA_MAP, UNI_BIJOY_MAP, PROBHAT_MAP, INSCRIPT_MAP, UNICODE_MAP } from "../../utils/layouts";
import {
  Heart, Play, Pause, RotateCcw, Volume2, VolumeX, Award, Star, ArrowRight, X,
  Trophy, Gauge, Zap, Flame, Timer, Sparkles, CheckCircle2, ChevronRight, Flag
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { cn } from "@/utils/cn";

export type GameMode = "falling" | "race" | "speed" | "time-attack";

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
  "might", "minor", "mixed", "model", "music", "muscle", "mystic", "myth", "macro", "marine"
];

const BANGLA_WORD_PAIRS: { bangla: string; phonetic: string }[] = [
  { bangla: "আমার", phonetic: "amar" },
  { bangla: "সোনার", phonetic: "sonar" },
  { bangla: "বাংলা", phonetic: "bangla" },
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
  { bangla: "নদী", phonetic: "nodi" },
  { bangla: "আকাশ", phonetic: "akash" },
  { bangla: "বাতাস", phonetic: "batash" },
  { bangla: "সূর্য", phonetic: "surjo" },
  { bangla: "বিজ্ঞান", phonetic: "biggan" },
  { bangla: "প্রযুক্তি", phonetic: "projukti" },
  { bangla: "ভবিষ্যৎ", phonetic: "bhovishot" },
  { bangla: "উন্নয়ন", phonetic: "unnoyon" },
  { bangla: "স্বপ্ন", phonetic: "shopno" },
  { bangla: "সাহস", phonetic: "sahosh" },
  { bangla: "জ্ঞান", phonetic: "ggan" },
  { bangla: "সুন্দর", phonetic: "shundor" },
  { bangla: "সাফল্য", phonetic: "shafolyo" }
];

export default function GameClient() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get("mode") as GameMode) || "race";

  const { activeLayout, setActiveLayout, soundEnabled, setSoundEnabled } = useTypingStore();

  const [mode, setMode] = useState<GameMode>(initialMode);
  const [gameState, setGameState] = useState<"idle" | "playing" | "paused" | "game-over" | "victory">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);

  // Common input states
  const [typedBuffer, setTypedBuffer] = useState("");
  const [targetWordId, setTargetWordId] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Mode 1: Falling Words State
  // ---------------------------------------------------------------------------
  const [words, setWords] = useState<FallingWord[]>([]);
  const tickIntervalRef = useRef<number | null>(null);
  const spawnTimeoutRef = useRef<number | null>(null);

  // ---------------------------------------------------------------------------
  // Mode 2: Word Race State
  // ---------------------------------------------------------------------------
  const [playerPosition, setPlayerPosition] = useState(0); // 0 to 500 meters
  const [cpu1Position, setCpu1Position] = useState(0);
  const [cpu2Position, setCpu2Position] = useState(0);
  const [cpu3Position, setCpu3Position] = useState(0);
  const [raceRank, setRaceRank] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const raceIntervalRef = useRef<number | null>(null);

  // ---------------------------------------------------------------------------
  // Mode 3 & 4: Speed Challenge & Time Attack State
  // ---------------------------------------------------------------------------
  const [timeLeft, setTimeLeft] = useState(60); // 60s for speed, 15s for time-attack
  const [wordsCleared, setWordsCleared] = useState(0);
  const timerIntervalRef = useRef<number | null>(null);

  const stopAllTimers = () => {
    if (tickIntervalRef.current) window.clearInterval(tickIntervalRef.current);
    if (spawnTimeoutRef.current) window.clearTimeout(spawnTimeoutRef.current);
    if (raceIntervalRef.current) window.clearInterval(raceIntervalRef.current);
    if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
    tickIntervalRef.current = null;
    spawnTimeoutRef.current = null;
    raceIntervalRef.current = null;
    timerIntervalRef.current = null;
  };

  useEffect(() => {
    return () => stopAllTimers();
  }, []);

  useEffect(() => {
    const urlMode = searchParams.get("mode") as GameMode;
    if (urlMode && urlMode !== mode) {
      setMode(urlMode);
      setGameState("idle");
      stopAllTimers();
    }
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`typemaster_game_${mode}_highscore_${activeLayout}`);
      setHighScore(stored ? parseInt(stored, 10) : 0);
    }
  }, [mode, activeLayout]);

  const playSound = (type: "click" | "error" | "success" | "space") => {
    if (soundEnabled) playTypewriterSound(type);
  };

  // ---------------------------------------------------------------------------
  // Start Game Controller
  // ---------------------------------------------------------------------------
  const startGame = () => {
    stopAllTimers();
    setTypedBuffer("");
    setTargetWordId(null);
    setScore(0);
    setLevel(1);
    setLives(3);
    setCombo(0);
    setWordsCleared(0);

    if (mode === "falling") {
      setWords([]);
      setGameState("playing");
      spawnWord();
    } else if (mode === "race") {
      setPlayerPosition(0);
      setCpu1Position(0);
      setCpu2Position(0);
      setCpu3Position(0);
      setRaceRank(1);
      setCurrentWordIndex(0);
      setGameState("playing");

      // Start CPU racing loop
      raceIntervalRef.current = window.setInterval(() => {
        setCpu1Position((p) => Math.min(500, p + 1.2 + Math.random() * 0.8));
        setCpu2Position((p) => Math.min(500, p + 1.5 + Math.random() * 0.9));
        setCpu3Position((p) => Math.min(500, p + 1.8 + Math.random() * 1.0));
      }, 500);
    } else if (mode === "speed") {
      setTimeLeft(60);
      setCurrentWordIndex(0);
      setGameState("playing");

      timerIntervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopAllTimers();
            setGameState("game-over");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (mode === "time-attack") {
      setTimeLeft(15);
      setCurrentWordIndex(0);
      setGameState("playing");

      timerIntervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.1) {
            stopAllTimers();
            setGameState("game-over");
            return 0;
          }
          return parseFloat((prev - 0.1).toFixed(1));
        });
      }, 100);
    }
  };

  // ---------------------------------------------------------------------------
  // Falling Words Logic
  // ---------------------------------------------------------------------------
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

      if (prev.some((w) => w.text === wordText)) return prev;

      const speed = 1.0 + (level - 1) * 0.25 + Math.random() * 0.4;
      const x = 12 + Math.random() * 70;

      return [...prev, { id: Math.random().toString(36).substring(2, 9), text: wordText, phonetic: phoneticTarget, x, y: -30, speed }];
    });
  };

  useEffect(() => {
    if (mode !== "falling") return;

    if (gameState === "playing") {
      tickIntervalRef.current = window.setInterval(() => {
        setWords((prevWords) => {
          const updated = prevWords.map((w) => ({ ...w, y: w.y + w.speed * 2.5 }));
          const overflow = updated.filter((w) => w.y > 380);

          if (overflow.length > 0) {
            playSound("error");
            setLives((l) => {
              const newLives = l - overflow.length;
              if (newLives <= 0) {
                stopAllTimers();
                setGameState("game-over");
              }
              return Math.max(0, newLives);
            });
            if (targetWordId && overflow.some((w) => w.id === targetWordId)) {
              setTargetWordId(null);
              setTypedBuffer("");
            }
          }
          return updated.filter((w) => w.y <= 380);
        });
      }, 50);
    } else {
      stopAllTimers();
    }

    return () => {
      if (tickIntervalRef.current) window.clearInterval(tickIntervalRef.current);
    };
  }, [gameState, level, targetWordId, mode]);

  useEffect(() => {
    if (mode !== "falling" || gameState !== "playing") return;
    spawnTimeoutRef.current = window.setTimeout(() => {
      spawnWord();
      spawnTimeoutRef.current = null;
    }, Math.max(800, 2200 - level * 150));
  }, [gameState, level, words.length, mode]);

  // ---------------------------------------------------------------------------
  // Check Race Finish Line & Ranks
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (mode !== "race" || gameState !== "playing") return;

    const positions = [
      { name: "player", pos: playerPosition },
      { name: "cpu1", pos: cpu1Position },
      { name: "cpu2", pos: cpu2Position },
      { name: "cpu3", pos: cpu3Position },
    ].sort((a, b) => b.pos - a.pos);

    const rank = positions.findIndex((p) => p.name === "player") + 1;
    setRaceRank(rank);

    if (playerPosition >= 500) {
      stopAllTimers();
      setGameState(rank === 1 ? "victory" : "game-over");
      playSound("success");
    }
  }, [playerPosition, cpu1Position, cpu2Position, cpu3Position, mode, gameState]);

  // High Score Saver
  useEffect(() => {
    if (gameState === "game-over" || gameState === "victory") {
      const currentHigh = highScore;
      if (score > currentHigh) {
        setHighScore(score);
        localStorage.setItem(`typemaster_game_${mode}_highscore_${activeLayout}`, score.toString());
      }
    }
  }, [gameState, score, highScore, mode, activeLayout]);

  // ---------------------------------------------------------------------------
  // Key Down Handler for Games
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

      if (e.key === "Escape") {
        setGameState("paused");
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        setTypedBuffer((prev) => prev.slice(0, -1));
        playSound("click");
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const char = e.key;
        playSound("click");

        const newBuffer = typedBuffer + char;
        setTypedBuffer(newBuffer);

        // Helper to check target word
        const getTargetWord = (): { bangla: string; phonetic: string } => {
          if (activeLayout === "english") {
            const w = ENGLISH_WORDS[currentWordIndex % ENGLISH_WORDS.length];
            return { bangla: w, phonetic: w };
          }
          return BANGLA_WORD_PAIRS[currentWordIndex % BANGLA_WORD_PAIRS.length];
        };

        // ---------------------------------------------------------------------
        // FALLING MODE KEY MATCHING
        // ---------------------------------------------------------------------
        if (mode === "falling") {
          let currentTarget = words.find((w) => w.id === targetWordId);

          if (!currentTarget) {
            currentTarget = words.find((w) => {
              if (activeLayout === "english") return w.text.startsWith(newBuffer);
              if (activeLayout === "avro") return w.phonetic.startsWith(newBuffer) || w.text.startsWith(avroTransliterate(newBuffer));
              return w.text.startsWith(newBuffer);
            });

            if (currentTarget) setTargetWordId(currentTarget.id);
          }

          if (currentTarget) {
            let isExactMatch = false;
            if (activeLayout === "english") isExactMatch = currentTarget.text === newBuffer;
            else if (activeLayout === "avro") isExactMatch = currentTarget.phonetic === newBuffer || currentTarget.text === avroTransliterate(newBuffer);
            else isExactMatch = currentTarget.text === newBuffer;

            if (isExactMatch) {
              playSound("success");
              const basePoints = currentTarget.text.length * 15;
              const points = basePoints * level;
              setScore((s) => s + points);
              setCombo((c) => c + 1);
              setWords((prev) => prev.filter((w) => w.id !== currentTarget!.id));
              setTargetWordId(null);
              setTypedBuffer("");

              if ((score + points) > level * 300) setLevel((l) => l + 1);
            }
          }
        }

        // ---------------------------------------------------------------------
        // RACE MODE KEY MATCHING
        // ---------------------------------------------------------------------
        else if (mode === "race") {
          const target = getTargetWord();
          let isMatch = false;

          if (activeLayout === "english") isMatch = target.bangla === newBuffer;
          else if (activeLayout === "avro") isMatch = target.phonetic === newBuffer || target.bangla === avroTransliterate(newBuffer);
          else isMatch = target.bangla === newBuffer;

          if (isMatch) {
            playSound("success");
            setPlayerPosition((p) => Math.min(500, p + 35));
            setScore((s) => s + 150);
            setCombo((c) => c + 1);
            setCurrentWordIndex((idx) => idx + 1);
            setTypedBuffer("");
          }
        }

        // ---------------------------------------------------------------------
        // SPEED CHALLENGE MODE KEY MATCHING
        // ---------------------------------------------------------------------
        else if (mode === "speed") {
          const target = getTargetWord();
          let isMatch = false;

          if (activeLayout === "english") isMatch = target.bangla === newBuffer;
          else if (activeLayout === "avro") isMatch = target.phonetic === newBuffer || target.bangla === avroTransliterate(newBuffer);
          else isMatch = target.bangla === newBuffer;

          if (isMatch) {
            playSound("success");
            const multiplier = combo >= 20 ? 5 : combo >= 10 ? 3 : combo >= 5 ? 2 : 1;
            setScore((s) => s + 100 * multiplier);
            setCombo((c) => c + 1);
            setWordsCleared((w) => w + 1);
            setCurrentWordIndex((idx) => idx + 1);
            setTypedBuffer("");
          }
        }

        // ---------------------------------------------------------------------
        // TIME ATTACK SURVIVAL MODE KEY MATCHING
        // ---------------------------------------------------------------------
        else if (mode === "time-attack") {
          const target = getTargetWord();
          let isMatch = false;

          if (activeLayout === "english") isMatch = target.bangla === newBuffer;
          else if (activeLayout === "avro") isMatch = target.phonetic === newBuffer || target.bangla === avroTransliterate(newBuffer);
          else isMatch = target.bangla === newBuffer;

          if (isMatch) {
            playSound("success");
            setTimeLeft((t) => Math.min(30, t + 3.5)); // +3.5s bonus time
            setScore((s) => s + 200);
            setCombo((c) => c + 1);
            setWordsCleared((w) => w + 1);
            setCurrentWordIndex((idx) => idx + 1);
            setTypedBuffer("");
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, typedBuffer, targetWordId, words, mode, activeLayout, combo, level, score, currentWordIndex]);

  // Current Target Word for Race/Speed/Time-Attack
  const currentTargetObj = activeLayout === "english"
    ? { bangla: ENGLISH_WORDS[currentWordIndex % ENGLISH_WORDS.length], phonetic: ENGLISH_WORDS[currentWordIndex % ENGLISH_WORDS.length] }
    : BANGLA_WORD_PAIRS[currentWordIndex % BANGLA_WORD_PAIRS.length];

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 fade-in text-foreground">
      {/* Top Header & Game Mode Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-2">
            <Sparkles size={13} />
            <span>INTERACTIVE TYPING ARCADE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            {mode === "race" && "🏎️ Word Race Arena"}
            {mode === "falling" && "🌠 Falling Words Arcade"}
            {mode === "speed" && "⚡ 60s Speed Sprint"}
            {mode === "time-attack" && "⏱️ Time Attack Survival"}
          </h1>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-secondary p-1.5 rounded-xl border border-border">
          {[
            { id: "race", label: "🏎️ Word Race" },
            { id: "falling", label: "🌠 Falling Words" },
            { id: "speed", label: "⚡ Speed Sprint" },
            { id: "time-attack", label: "⏱️ Time Attack" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id as GameMode);
                setGameState("idle");
                stopAllTimers();
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0",
                mode === m.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Game Screen Card */}
      <Card className="border border-border bg-card shadow-lg rounded-2xl overflow-hidden">
        {/* HUD Top Bar */}
        <div className="bg-secondary/60 border-b border-border px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-sm font-black px-3 py-1">
              Score: {score}
            </Badge>

            <Badge variant="outline" className="border-border text-foreground text-xs font-bold px-3 py-1">
              🏆 High Score: {highScore}
            </Badge>

            {mode === "falling" && (
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((h) => (
                  <Heart
                    key={h}
                    size={18}
                    className={cn(
                      "transition-all",
                      h <= lives ? "text-rose-500 fill-rose-500 scale-110" : "text-muted border-dashed"
                    )}
                  />
                ))}
              </div>
            )}

            {(mode === "speed" || mode === "time-attack") && (
              <Badge variant="outline" className="border-amber-500 text-amber-500 text-xs font-black px-3 py-1 gap-1">
                <Timer size={14} />
                <span>{timeLeft}s</span>
              </Badge>
            )}

            {mode === "race" && (
              <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs font-black px-3 py-1 gap-1">
                <Flag size={14} />
                <span>Rank: #{raceRank}</span>
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg border border-border bg-card text-foreground hover:bg-secondary transition-colors"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {gameState === "playing" && (
              <Button size="sm" variant="outline" onClick={() => setGameState("paused")} className="gap-1 font-bold text-xs">
                <Pause size={13} /> Pause
              </Button>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* GAME DISPLAY ARENA */}
        {/* ------------------------------------------------------------------- */}
        <div className="relative min-h-[380px] bg-gradient-to-b from-background via-secondary/20 to-background flex flex-col items-center justify-center p-6 overflow-hidden">

          {/* 🏎️ MODE 1: WORD RACE ARENA */}
          {mode === "race" && (
            <div className="w-full space-y-6">
              {/* Race Track Lines */}
              <div className="space-y-3 bg-secondary/80 border border-border rounded-xl p-4 relative overflow-hidden">
                {[
                  { label: "YOU 🏎️", pos: playerPosition, color: "bg-emerald-500", name: "Player" },
                  { label: "BOT 1 🏎️", pos: cpu1Position, color: "bg-blue-500", name: "AlphaBot" },
                  { label: "BOT 2 🏎️", pos: cpu2Position, color: "bg-amber-500", name: "SpeedBot" },
                  { label: "BOT 3 🏎️", pos: cpu3Position, color: "bg-purple-500", name: "TurboBot" },
                ].map((racer, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-extrabold text-foreground">
                      <span>{racer.label}</span>
                      <span>{Math.round(racer.pos)}m / 500m</span>
                    </div>
                    <div className="h-4 w-full bg-background rounded-full border border-border relative overflow-hidden">
                      <div
                        className={cn("h-full transition-all duration-300 rounded-full", racer.color)}
                        style={{ width: `${Math.min(100, (racer.pos / 500) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Race Target Word Card */}
              {gameState === "playing" && (
                <div className="text-center space-y-3 bg-card border border-border p-6 rounded-2xl shadow-md">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Type to Accelerate Your Supercar</span>
                  <div className="text-3xl sm:text-4xl font-black text-foreground font-bangla">
                    {currentTargetObj.bangla}
                  </div>
                  {activeLayout === "avro" && (
                    <div className="text-xs font-mono text-primary font-bold">
                      Phonetic: {currentTargetObj.phonetic}
                    </div>
                  )}
                  <div className="text-sm font-mono text-emerald-500 font-bold">
                    Buffer: {typedBuffer || "..."}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 🌠 MODE 2: FALLING WORDS ARENA */}
          {mode === "falling" && (
            <div className="w-full h-[360px] relative border border-border/50 rounded-xl bg-background overflow-hidden">
              {words.map((w) => {
                const isTargeted = targetWordId === w.id;
                let highlighted = "";
                let remaining = w.text;

                if (isTargeted) {
                  if (activeLayout === "english") {
                    highlighted = w.text.slice(0, typedBuffer.length);
                    remaining = w.text.slice(typedBuffer.length);
                  } else if (activeLayout === "avro") {
                    highlighted = w.phonetic.slice(0, typedBuffer.length);
                    remaining = w.phonetic.slice(typedBuffer.length);
                  } else {
                    highlighted = w.text.slice(0, typedBuffer.length);
                    remaining = w.text.slice(typedBuffer.length);
                  }
                }

                return (
                  <div
                    key={w.id}
                    className={cn(
                      "absolute px-3 py-1.5 rounded-xl font-bold text-sm shadow-md transition-transform border",
                      isTargeted
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-600 scale-110 z-10"
                        : "bg-card border-border text-foreground"
                    )}
                    style={{ left: `${w.x}%`, top: `${w.y}px` }}
                  >
                    {isTargeted ? (
                      <div>
                        <span className="text-emerald-500 font-black">{highlighted}</span>
                        <span>{remaining}</span>
                      </div>
                    ) : (
                      <span>{w.text}</span>
                    )}
                  </div>
                );
              })}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-rose-500/80 animate-pulse" />
            </div>
          )}

          {/* ⚡ MODE 3 & ⏱️ MODE 4: SPEED SPRINT & TIME ATTACK ARENA */}
          {(mode === "speed" || mode === "time-attack") && (
            <div className="w-full max-w-xl text-center space-y-6">
              {gameState === "playing" && (
                <div className="space-y-4 bg-card border border-border p-8 rounded-2xl shadow-lg">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-secondary border border-border text-foreground">
                    <Flame size={14} className="text-amber-500" />
                    <span>Streak Multiplier: {combo >= 20 ? "5x SUPER CHARGE!" : combo >= 10 ? "3x" : combo >= 5 ? "2x" : "1x"}</span>
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-foreground font-bangla tracking-tight">
                    {currentTargetObj.bangla}
                  </div>

                  {activeLayout === "avro" && (
                    <div className="text-sm font-mono text-primary font-bold">
                      Phonetic: {currentTargetObj.phonetic}
                    </div>
                  )}

                  <div className="text-base font-mono text-emerald-500 font-bold bg-secondary/80 py-2 rounded-xl border border-border">
                    Typed: {typedBuffer || "Start typing..."}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* START OVERLAY */}
          {gameState === "idle" && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Trophy size={32} />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-black text-foreground">
                  Ready to test your {activeLayout.toUpperCase()} typing reflexes?
                </h2>
                <p className="text-xs text-muted-foreground max-w-md">
                  Select your keyboard layout below and click Start Game to launch your practice session!
                </p>
              </div>
              <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-11 px-8 rounded-xl font-bold text-sm shadow-md">
                <Play size={16} /> Start Game
              </Button>
            </div>
          )}

          {/* PAUSED OVERLAY */}
          {gameState === "paused" && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <h2 className="text-xl font-black text-foreground">Game Paused</h2>
              <div className="flex gap-3">
                <Button onClick={() => setGameState("playing")} className="gap-2 font-bold h-10 px-6">
                  <Play size={14} /> Resume
                </Button>
                <Button variant="outline" onClick={startGame} className="gap-2 font-bold h-10 px-6">
                  <RotateCcw size={14} /> Restart
                </Button>
              </div>
            </div>
          )}

          {/* GAME OVER / VICTORY OVERLAY */}
          {(gameState === "game-over" || gameState === "victory") && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                {gameState === "victory" ? <Trophy size={32} /> : <X size={32} className="text-rose-500" />}
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-black text-foreground">
                  {gameState === "victory" ? "🏆 Victory! Champion Racer!" : "Game Over!"}
                </h2>
                <p className="text-xs text-muted-foreground">Great effort! Here is your final performance breakdown:</p>
              </div>

              <div className="flex gap-4 justify-center w-full max-w-sm">
                <div className="border border-border bg-card p-4 rounded-xl flex-1 shadow-xs">
                  <div className="text-2xl font-black text-emerald-500">{score}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">Final Score</div>
                </div>
                <div className="border border-border bg-card p-4 rounded-xl flex-1 shadow-xs">
                  <div className="text-2xl font-black text-foreground">{highScore}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">High Score</div>
                </div>
              </div>

              <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-11 px-8 rounded-xl font-bold text-sm shadow-md">
                <RotateCcw size={16} /> Play Again
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Keyboard Layout Selector & Virtual Keyboard */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase text-foreground tracking-wider">
            Select Active Keyboard Layout:
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
                "px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all",
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
    </main>
  );
}
