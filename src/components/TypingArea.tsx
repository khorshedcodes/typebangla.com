"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useTypingStore } from "../store/typingStore";
import { parse_phonetic_input } from "../utils/phoneticEngine";
import { getClusterRanges } from "../utils/grapheme";
import { cn } from "../utils/cn";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

function ConfettiBurst() {
  const PIECES = [
    { color: "#09090B", delay: "0ms",   left: "20%", rotate: "12deg"  },
    { color: "#71717A", delay: "80ms",  left: "35%", rotate: "-20deg" },
    { color: "#A1A1AA", delay: "40ms",  left: "50%", rotate: "30deg"  },
    { color: "#18181B", delay: "120ms", left: "65%", rotate: "-8deg"  },
    { color: "#52525B", delay: "60ms",  left: "80%", rotate: "45deg"  },
    { color: "#27272A", delay: "20ms",  left: "10%", rotate: "-35deg" },
    { color: "#71717A", delay: "100ms", left: "90%", rotate: "22deg"  },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            backgroundColor: p.color,
            left: p.left,
            top: "10%",
            animationDelay: p.delay,
            transform: `rotate(${p.rotate})`,
          }}
        />
      ))}
    </div>
  );
}

interface TypingAreaProps {
  onSessionComplete?: (wpm: number, accuracy: number) => void;
  backLink?: string;
  backLabel?: string;
  hideModeHeader?: boolean;
}

export default function TypingArea({
  onSessionComplete,
  backLink,
  backLabel,
  hideModeHeader = false,
}: TypingAreaProps = {}) {
  const {
    targetText,
    typedText,
    phoneticBuffer,
    activeLayout,
    isCompleted,
    handleKeystroke,
    inputLanguage,
    outputPreview,
    targetWpm,
    setTargetText,
    setFocusModeActive,
    isStarted,
    startTime,
    elapsedTime,
    errorIndices,
    updateElapsedTime,
  } = useTypingStore();

  const [isFocused, setIsFocused] = useState(false);
  const [ghostPosition, setGhostPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCursorRef = useRef<HTMLSpanElement | null>(null);

  // Auto-scroll 3-line viewport window so current typing line stays centered
  useEffect(() => {
    if (activeCursorRef.current) {
      activeCursorRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [typedText.length]);

  useEffect(() => {
    if (isCompleted && onSessionComplete) {
      const calcWpm = elapsedTime < 1 ? 0 : Math.round((typedText.length / 5) / (elapsedTime / 60));
      const liveWpm = Math.min(500, Math.max(0, isNaN(calcWpm) ? 0 : calcWpm));
      const liveAccuracy = typedText.length === 0 ? 100 : Math.round(((typedText.length - errorIndices.length) / typedText.length) * 100);
      onSessionComplete(liveWpm, liveAccuracy);
    }
  }, [isCompleted, elapsedTime, typedText.length, errorIndices.length, onSessionComplete]);


  // Distraction-Free: hide Header & Footer for entire practice/test session
  // Activates on mount, deactivates on unmount (navigation away)
  useEffect(() => {
    setFocusModeActive(true);
    return () => {
      setFocusModeActive(false);
    };
  }, [setFocusModeActive]);

  useEffect(() => {
    if (containerRef.current) containerRef.current.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted) return;

      if (!isFocused) {
        if (
          e.code === "Tab" ||
          e.code === "Space" ||
          (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey)
        ) {
          e.preventDefault();
          containerRef.current?.focus();
          setIsFocused(true);
          if (e.code !== "Tab") {
            handleKeystroke(e.code, e.key, e.shiftKey);
          }
        }
        return;
      }

      if (
        e.code === "Space" ||
        e.code === "Backspace" ||
        (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey)
      ) {
        e.preventDefault();
        handleKeystroke(e.code, e.key, e.shiftKey);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, isCompleted, handleKeystroke]);

  // Live Timer Interval (Increments elapsedTime every 1 sec while active)
  useEffect(() => {
    if (!isStarted || isCompleted) return;
    const timer = setInterval(() => {
      updateElapsedTime();
    }, 1000);
    return () => clearInterval(timer);
  }, [isStarted, isCompleted, updateElapsedTime]);

  useEffect(() => {
    if (!isStarted || targetWpm <= 0 || !startTime) {
      const handle = requestAnimationFrame(() => {
        setGhostPosition(0);
      });
      return () => cancelAnimationFrame(handle);
    }

    const interval = setInterval(() => {
      const elapsedMs = Date.now() - startTime;
      const elapsedSec = elapsedMs / 1000;
      const charPerSec = (targetWpm * 5) / 60;
      const currentPos = Math.floor(elapsedSec * charPerSec);
      setGhostPosition(currentPos);
    }, 100);

    return () => clearInterval(interval);
  }, [isStarted, startTime, targetWpm]);

  const handleBlur = () => setIsFocused(false);
  const handleFocus = () => setIsFocused(true);

  const words = targetText.split(/(\s+)/);
  let charCounter = 0;
  const wordRanges: { start: number; end: number; isWord: boolean }[] = [];

  for (const w of words) {
    const start = charCounter;
    const end = charCounter + w.length;
    wordRanges.push({ start, end, isWord: !/\s/.test(w) });
    charCounter = end;
  }

  const renderCharacters = () => {
    let charIndex = 0;
    const targetWordsList = targetText.split(" ");

    return targetWordsList.map((word, wordIdx) => {
      const isLastWord = wordIdx === targetWordsList.length - 1;
      const wordWithSpace = isLastWord ? word : word + " ";
      const clusterRanges = getClusterRanges(wordWithSpace);

      const wordStart = charIndex;
      charIndex += wordWithSpace.length;

      return (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {clusterRanges.map(({ cluster, start, end }, cIdx) => {
            const absStart = wordStart + start;
            const absEnd = wordStart + end;

            const isFullyTyped = typedText.length >= absEnd;
            const isPartiallyTyped = typedText.length > absStart && typedText.length < absEnd;
            const isCurrent = typedText.length >= absStart && typedText.length < absEnd;

            let isCorrect = false;
            if (isFullyTyped) {
              isCorrect = typedText.slice(absStart, absEnd) === cluster;
            } else if (isPartiallyTyped) {
              const typedSeg = typedText.slice(absStart, typedText.length);
              isCorrect = typedSeg === cluster.slice(0, typedSeg.length);
            }

            const hasTyped = isFullyTyped || isPartiallyTyped;
            const isGhostCurrent = absStart <= ghostPosition && ghostPosition < absEnd && targetWpm > 0 && isStarted;

            return (
              <span
                key={cIdx}
                ref={isCurrent ? activeCursorRef : undefined}
                className={cn("relative transition-all duration-75 select-none font-medium rounded-xs", {
                  "text-muted-foreground/60": !hasTyped && !isCurrent,
                  "text-foreground font-bold": hasTyped && isCorrect,
                  "text-red-500 bg-red-500/10 font-bold underline decoration-red-500": hasTyped && !isCorrect,
                  "text-foreground bg-primary/20 font-extrabold underline decoration-primary": isCurrent,
                })}
              >
                {isCurrent && (
                  <span className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[2px] h-[1.1em] bg-primary animate-pulse" />
                )}
                {isGhostCurrent && (
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-muted-foreground/60 rounded-full" title="Ghost Pacer Cursor" />
                )}
                {cluster === " " ? "\u00A0" : cluster}
              </span>
            );
          })}
        </span>
      );
    });
  };

  const isBanglaText = !targetText.match(/[a-zA-Z]/);

  const targetWords = targetText.split(/\s+/);
  const typedWords = typedText.split(/\s+/);
  const currentWordIdx = Math.max(0, typedWords.length - 1);
  const targetedWord = targetWords[currentWordIdx] || "";
  const phoneticAnalysis = parse_phonetic_input(phoneticBuffer, targetedWord);

  const pathname = usePathname();
  const isExamMode = pathname?.startsWith("/practice/test") || pathname?.startsWith("/exam") || pathname?.startsWith("/tests");

  // Dynamic backLink and backLabel computation with intelligent route fallbacks
  let computedBackLink = backLink;
  let computedBackLabel = backLabel;

  if (!computedBackLink) {
    if (pathname?.startsWith("/exam/govt")) {
      computedBackLink = "/exam/govt";
      computedBackLabel = "Back to Govt Portal";
    } else if (pathname?.startsWith("/exam/ranked")) {
      computedBackLink = "/exam/ranked";
      computedBackLabel = "Back to Ranked Exam";
    } else if (pathname?.startsWith("/courses")) {
      computedBackLink = "/courses";
      computedBackLabel = "Back to Courses";
    } else if (pathname?.startsWith("/tests")) {
      computedBackLink = "/tests";
      computedBackLabel = "Back to Tests";
    } else {
      computedBackLink = "/practice";
      computedBackLabel = "Back to Practice";
    }
  }

  const liveWpm = elapsedTime === 0 ? 0 : Math.round((typedText.length / 5) / (elapsedTime / 60));
  const liveAccuracy = typedText.length === 0 ? 100 : Math.max(0, Math.round(((typedText.length - errorIndices.length) / typedText.length) * 100));

  return (
    <div className="flex flex-col space-y-4">
      {/* Live Telemetry HUD Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-panel rounded-xl p-3 flex flex-col items-center justify-center border border-border/80 shadow-xs transition-all">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">WPM (Speed)</span>
          <span className="text-xl sm:text-2xl font-black text-foreground">{liveWpm}</span>
        </div>
        <div className="glass-panel rounded-xl p-3 flex flex-col items-center justify-center border border-border/80 shadow-xs transition-all">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Accuracy</span>
          <span className={`text-xl sm:text-2xl font-black ${liveAccuracy >= 95 ? "text-emerald-500" : liveAccuracy >= 85 ? "text-amber-500" : "text-rose-500"}`}>
            {liveAccuracy}%
          </span>
        </div>
        <div className="glass-panel rounded-xl p-3 flex flex-col items-center justify-center border border-border/80 shadow-xs transition-all">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Time</span>
          <span className="text-xl sm:text-2xl font-black text-foreground font-mono">{elapsedTime}s</span>
        </div>
      </div>

      {/* Mode Header Banner */}
      {!hideModeHeader && (
        <div className="border border-border/80 bg-card/60 backdrop-blur-md p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-foreground flex items-center gap-1.5 text-xs">
              {isExamMode ? "🏛️ TypeBangla Timed Exam Mode" : "🌱 Free Practice Mode"}
            </span>
            {isExamMode ? (
              <>
                <Badge variant="outline" className="border-border text-foreground font-semibold bg-secondary text-[10px]">
                  Countdown Timer Active
                </Badge>
              </>
            ) : (
              <>
                <Badge variant="outline" className="border-border text-foreground font-semibold bg-secondary text-[10px]">
                  Untimed Practice
                </Badge>
                <Badge variant="outline" className="border-border text-foreground font-semibold bg-secondary text-[10px]">
                  Instant Restart
                </Badge>
              </>
            )}
          </div>

          <Link href={computedBackLink}>
            <Button variant="outline" size="sm" className="h-7 text-xs font-bold gap-1.5 border-border bg-secondary hover:bg-secondary/80 text-foreground">
              <ArrowLeft size={12} />
              <span>{computedBackLabel}</span>
            </Button>
          </Link>
        </div>
      )}

      {/* Avro preview */}
      {activeLayout === "avro" && inputLanguage === "latin" && outputPreview && (
        <div className="text-sm font-bangla border border-border bg-secondary text-foreground p-3 rounded-xl leading-relaxed shadow-xs">
          <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">
            বাংলা প্রিভিউ
          </span>
          {outputPreview}
        </div>
      )}

      {/* Typing container */}
      <div className="relative">
        {!isFocused && !isCompleted && (
          <div
            onClick={() => containerRef.current?.focus()}
            className="absolute inset-0 bg-background/80 backdrop-blur-xs border border-dashed border-border z-10 flex items-center justify-center rounded-xl cursor-pointer transition-all hover:bg-background/90"
          >
            <span className="text-xs font-semibold text-foreground flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border shadow-xs">
              <span className="w-2 h-2 rounded-full bg-foreground animate-ping" />
              ক্লিক করুন বা Tab চাপুন — টাইপিং শুরু করুন
            </span>
          </div>
        )}

        {isCompleted && <ConfettiBurst />}

        <div
          ref={containerRef}
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "border rounded-xl bg-card p-5 max-h-[135px] sm:max-h-[150px] overflow-hidden scroll-smooth outline-none cursor-text transition-all leading-relaxed tracking-normal break-words whitespace-pre-wrap shadow-xs border-border text-foreground",
            {
              "border-ring ring-1 ring-ring": isFocused,
              "blur-[2px]": !isFocused && !isCompleted,
              "font-bangla text-xl sm:text-2xl": isBanglaText,
              "font-mono text-base sm:text-lg": !isBanglaText,
              "slide-up": isCompleted,
            }
          )}
        >
          {renderCharacters()}
        </div>
      </div>

      {/* Avro buffer indicator */}
      {activeLayout === "avro" && phoneticBuffer.length > 0 && (
        <div className="flex gap-4 flex-wrap items-center text-xs">
          <div className="text-muted-foreground flex items-center gap-1.5 font-semibold">
            <span>ফোনেটিক কী:</span>
            <code className="bg-secondary border border-border px-2 py-0.5 rounded text-foreground font-mono">
              {phoneticBuffer}
            </code>
          </div>

          {phoneticAnalysis.predictedOutput && (
            <div className="text-foreground flex items-center gap-1.5 font-semibold">
              <span>পরামর্শ:</span>
              <kbd className="bg-secondary border border-border px-2 py-0.5 rounded text-foreground font-mono text-[10px]">
                {phoneticAnalysis.predictedOutput}
              </kbd>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
