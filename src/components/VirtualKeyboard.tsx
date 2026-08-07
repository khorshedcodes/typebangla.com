"use client";

import React, { useEffect, useState } from "react";
import { useTypingStore, KeyboardLayout } from "../store/typingStore";
import { JATIYA_MAP, UNI_BIJOY_MAP, PROBHAT_MAP, INSCRIPT_MAP, UNICODE_MAP } from "../utils/layouts";
import { cn } from "../utils/cn";
import HandPlacement, { FINGER_MAP } from "./HandPlacement";

interface VirtualKeyboardProps {
  nextChar?: string;
  onKeyClick?: (code: string, char: string, isShift?: boolean) => void;
}

interface KeyboardKey {
  code: string;
  label?: string;
  enNormal?: string;
  enShift?: string;
  classWidth?: string;
}

const getEnglishKeyCode = (char: string): string => {
  if (/[a-z]/.test(char)) return `Key${char.toUpperCase()}`;
  if (/[0-9]/.test(char)) return `Digit${char}`;
  const symbolMap: { [key: string]: string } = {
    "-": "Minus", "=": "Equal", "[": "BracketLeft", "]": "BracketRight",
    ";": "Semicolon", "'": "Quote", ",": "Comma", ".": "Period", "/": "Slash"
  };
  return symbolMap[char] || "";
};

const getHighlightKeys = (char: string, layout: KeyboardLayout): { codes: string[]; needsShift: boolean } => {
  if (!char) return { codes: [], needsShift: false };

  if (char === " ") {
    return { codes: ["Space"], needsShift: false };
  }

  if (layout === "english" || layout === "avro") {
    const target = char.length > 1 && !/[a-zA-Z0-9]/.test(char) ? char[0] : char;
    const code = getEnglishKeyCode(target.toLowerCase());
    const needsShift = target !== target.toLowerCase() && /[A-Z]/.test(target);
    return { codes: code ? [code] : [], needsShift };
  }

  const map =
    layout === "jatiya" ? JATIYA_MAP :
    layout === "unibijoy" ? UNI_BIJOY_MAP :
    layout === "probhat" ? PROBHAT_MAP :
    layout === "inscript" ? INSCRIPT_MAP :
    layout === "unicode" ? UNICODE_MAP :
    null;
  if (!map) return { codes: [], needsShift: false };

  // 1. Direct character match in layout table
  for (const [code, mappings] of Object.entries(map)) {
    if (mappings.normal === char) {
      return { codes: [code], needsShift: false };
    }
    if (mappings.shift === char) {
      return { codes: [code, "ShiftLeft", "ShiftRight"], needsShift: true };
    }
    if (mappings.altgr === char) {
      return { codes: [code], needsShift: false };
    }
    if (mappings.altgr_shift === char) {
      return { codes: [code, "ShiftLeft", "ShiftRight"], needsShift: true };
    }
  }

  // 2. Hasanta (্ / \u09cd) check
  if (char === "্" || char === "\u09cd") {
    for (const [code, mappings] of Object.entries(map)) {
      if (mappings.normal === "\u09cd" || mappings.shift === "\u09cd") {
        const needsShift = mappings.shift === "\u09cd";
        return { codes: needsShift ? [code, "ShiftLeft", "ShiftRight"] : [code], needsShift };
      }
    }
    const hKey =
      layout === "probhat" ? "Slash" :
      layout === "inscript" ? "KeyD" :
      "KeyG";
    return { codes: [hKey], needsShift: false };
  }

  // 3. Fallback for multi-char composite strings (e.g. conjunct ligatures like "ক্ষ")
  if (char.length > 1) {
    const firstChar = char[0];
    for (const [code, mappings] of Object.entries(map)) {
      if (mappings.normal === firstChar) {
        return { codes: [code], needsShift: false };
      }
      if (mappings.shift === firstChar) {
        return { codes: [code, "ShiftLeft", "ShiftRight"], needsShift: true };
      }
    }
  }

  return { codes: [], needsShift: false };
};

const FINGER_KEY_ACCENT: Record<string, string> = {
  "L-Pinky": "border-t-rose-500/80 hover:border-rose-500/60",
  "L-Ring": "border-t-amber-500/80 hover:border-amber-500/60",
  "L-Middle": "border-t-emerald-500/80 hover:border-emerald-500/60",
  "L-Index": "border-t-sky-500/80 hover:border-sky-500/60",
  "L-Thumb": "border-t-indigo-500/80 hover:border-indigo-500/60",
  "R-Thumb": "border-t-indigo-500/80 hover:border-indigo-500/60",
  "R-Index": "border-t-blue-500/80 hover:border-blue-500/60",
  "R-Middle": "border-t-teal-500/80 hover:border-teal-500/60",
  "R-Ring": "border-t-violet-500/80 hover:border-violet-500/60",
  "R-Pinky": "border-t-pink-500/80 hover:border-pink-500/60",
};

export default function VirtualKeyboard({ nextChar = "", onKeyClick }: VirtualKeyboardProps) {
  const activeLayout = useTypingStore((state) => state.activeLayout);
  const keyStats = useTypingStore((state) => state.keyStats) || {};
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const getKeyAccuracyColor = (key: KeyboardKey, normLeg: string, shftLeg: string) => {
    const charsToCheck: string[] = [];
    if (key.code === "Space") {
      charsToCheck.push(" ");
    } else {
      if (activeLayout === "english" || activeLayout === "avro") {
        if (key.enNormal) charsToCheck.push(key.enNormal.toLowerCase());
        if (key.enShift) charsToCheck.push(key.enShift.toLowerCase());
      } else {
        if (normLeg) charsToCheck.push(normLeg.toLowerCase());
        if (shftLeg) charsToCheck.push(shftLeg.toLowerCase());
      }
    }

    let totalCorrect = 0;
    let totalStrokes = 0;
    charsToCheck.forEach(char => {
      const stats = keyStats[char];
      if (stats) {
        totalCorrect += stats.correct;
        totalStrokes += stats.total;
      }
    });

    if (totalStrokes < 3) return null;
    const accuracy = totalCorrect / totalStrokes;
    const normalizedAcc = Math.max(0, Math.min(1, (accuracy - 0.5) / 0.5));
    const hue = Math.round(normalizedAcc * 120);
    return `hsla(${hue}, 0%, 50%, 0.15)`;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(e.code);
        return next;
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const { codes: highlightCodes, needsShift: highlightShift } = getHighlightKeys(nextChar, activeLayout);

  const row1 = [
    { code: "Backquote", enNormal: "`", enShift: "~" },
    { code: "Digit1", enNormal: "1", enShift: "!" },
    { code: "Digit2", enNormal: "2", enShift: "@" },
    { code: "Digit3", enNormal: "3", enShift: "#" },
    { code: "Digit4", enNormal: "4", enShift: "$" },
    { code: "Digit5", enNormal: "5", enShift: "%" },
    { code: "Digit6", enNormal: "6", enShift: "^" },
    { code: "Digit7", enNormal: "7", enShift: "&" },
    { code: "Digit8", enNormal: "8", enShift: "*" },
    { code: "Digit9", enNormal: "9", enShift: "(" },
    { code: "Digit0", enNormal: "0", enShift: ")" },
    { code: "Minus", enNormal: "-", enShift: "_" },
    { code: "Equal", enNormal: "=", enShift: "+" },
    { code: "Backspace", label: "Backspace", classWidth: "w-[68px] sm:w-[78px] text-[10px]" },
  ];

  const row2 = [
    { code: "Tab", label: "Tab", classWidth: "w-[54px] sm:w-[62px] text-[10px]" },
    { code: "KeyQ", enNormal: "q", enShift: "Q" },
    { code: "KeyW", enNormal: "w", enShift: "W" },
    { code: "KeyE", enNormal: "e", enShift: "E" },
    { code: "KeyR", enNormal: "r", enShift: "R" },
    { code: "KeyT", enNormal: "t", enShift: "T" },
    { code: "KeyY", enNormal: "y", enShift: "Y" },
    { code: "KeyU", enNormal: "u", enShift: "U" },
    { code: "KeyI", enNormal: "i", enShift: "I" },
    { code: "KeyO", enNormal: "o", enShift: "O" },
    { code: "KeyP", enNormal: "p", enShift: "P" },
    { code: "BracketLeft", enNormal: "[", enShift: "{" },
    { code: "BracketRight", enNormal: "]", enShift: "}" },
    { code: "Backslash", enNormal: "\\", enShift: "|" },
  ];

  const row3 = [
    { code: "CapsLock", label: "Caps", classWidth: "w-[60px] sm:w-[68px] text-[10px]" },
    { code: "KeyA", enNormal: "a", enShift: "A" },
    { code: "KeyS", enNormal: "s", enShift: "S" },
    { code: "KeyD", enNormal: "d", enShift: "D" },
    { code: "KeyF", enNormal: "f", enShift: "F" },
    { code: "KeyG", enNormal: "g", enShift: "G" },
    { code: "KeyH", enNormal: "h", enShift: "H" },
    { code: "KeyJ", enNormal: "j", enShift: "J" },
    { code: "KeyK", enNormal: "k", enShift: "K" },
    { code: "KeyL", enNormal: "l", enShift: "L" },
    { code: "Semicolon", enNormal: ";", enShift: ":" },
    { code: "Quote", enNormal: "'", enShift: '"' },
    { code: "Enter", label: "Enter", classWidth: "w-[72px] sm:w-[82px] text-[10px]" },
  ];

  const row4 = [
    { code: "ShiftLeft", label: "Shift", classWidth: "w-[80px] sm:w-[92px] text-[10px]" },
    { code: "KeyZ", enNormal: "z", enShift: "Z" },
    { code: "KeyX", enNormal: "x", enShift: "X" },
    { code: "KeyC", enNormal: "c", enShift: "C" },
    { code: "KeyV", enNormal: "v", enShift: "V" },
    { code: "KeyB", enNormal: "b", enShift: "B" },
    { code: "KeyN", enNormal: "n", enShift: "N" },
    { code: "KeyM", enNormal: "m", enShift: "M" },
    { code: "Comma", enNormal: ",", enShift: "<" },
    { code: "Period", enNormal: ".", enShift: ">" },
    { code: "Slash", enNormal: "/", enShift: "?" },
    { code: "ShiftRight", label: "Shift", classWidth: "w-[92px] sm:w-[104px] text-[10px]" },
  ];

  const row5 = [
    { code: "ControlLeft", label: "Ctrl", classWidth: "w-[50px] sm:w-[56px] text-[10px]" },
    { code: "MetaLeft", label: "Win", classWidth: "w-[44px] sm:w-[48px] text-[10px]" },
    { code: "AltLeft", label: "Alt", classWidth: "w-[48px] sm:w-[52px] text-[10px]" },
    { code: "Space", label: "Space", classWidth: "flex-1 max-w-[280px] sm:max-w-[320px] text-[10px]" },
    { code: "AltRight", label: "Alt", classWidth: "w-[48px] sm:w-[52px] text-[10px]" },
    { code: "ControlRight", label: "Ctrl", classWidth: "w-[50px] sm:w-[56px] text-[10px]" },
  ];

  const renderKey = (key: KeyboardKey) => {
    const isPressed = pressedKeys.has(key.code);
    const isHighlighted = highlightCodes.includes(key.code) || (highlightShift && key.code.startsWith("Shift"));

    let normalLegend = key.label || key.enNormal;
    let shiftLegend = key.label ? "" : key.enShift;

    const map =
      activeLayout === "unibijoy" ? UNI_BIJOY_MAP :
      activeLayout === "jatiya" ? JATIYA_MAP :
      activeLayout === "probhat" ? PROBHAT_MAP :
      activeLayout === "inscript" ? INSCRIPT_MAP :
      activeLayout === "unicode" ? UNICODE_MAP :
      null;

    if (map && map[key.code]) {
      normalLegend = map[key.code].normal;
      shiftLegend = map[key.code].shift;
    }

    const isSystemKey = !!key.label;
    const isHomeRowBump = key.code === "KeyF" || key.code === "KeyJ";

    const accuracyColor = !isSystemKey && !isHighlighted && !isPressed
      ? getKeyAccuracyColor(key, normalLegend || "", shiftLegend || "")
      : null;
    const accuracyStyle = accuracyColor ? { backgroundColor: accuracyColor } : {};

    const fingerId = FINGER_MAP[key.code];
    const fingerAccentClass = !isSystemKey && fingerId ? FINGER_KEY_ACCENT[fingerId] : "";

    const isShiftActive = highlightShift || pressedKeys.has("ShiftLeft") || pressedKeys.has("ShiftRight");

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          if (onKeyClick) {
            let charToPass = "";
            if (activeLayout !== "english" && activeLayout !== "avro") {
              charToPass = isShiftActive ? (shiftLegend || normalLegend || "") : (normalLegend || "");
            } else {
              charToPass = isShiftActive ? (key.enShift || key.enNormal || "") : (key.enNormal || "");
            }
            onKeyClick(key.code, charToPass, isShiftActive);
          }
        }}
        style={accuracyStyle}
        className={cn(
          "h-11 sm:h-12 border border-border border-t-2 bg-card text-foreground rounded-lg flex items-center justify-center relative select-none cursor-pointer hover:border-primary/80 active:scale-95 font-sans text-xs transition-all duration-100 keycap-tactile touch-manipulation",
          key.classWidth || "w-11 sm:w-12",
          fingerAccentClass,
          {
            "bg-secondary border-border border-t-2 font-medium text-muted-foreground": isSystemKey,
            "border-emerald-500 bg-emerald-600 text-white dark:bg-emerald-500 z-20 font-black shadow-lg scale-[1.05] key-target-glow": isHighlighted,
            "bg-secondary translate-y-[2px] shadow-none border-border": isPressed
          }
        )}
      >
        {!isSystemKey && (
          <>
            <span className={`absolute top-0.5 left-1 text-[8px] sm:text-[9px] font-mono ${
              isHighlighted ? "text-primary-foreground/90 font-bold" : "text-muted-foreground"
            }`}>
              {isShiftActive && key.enShift ? key.enShift : key.enNormal}
            </span>

            {activeLayout !== "english" && activeLayout !== "avro" && (
              <span className={`font-bangla text-xs sm:text-sm font-semibold pt-1 ${
                isHighlighted ? "text-primary-foreground font-black text-sm sm:text-base" : "text-foreground"
              }`}>
                {isShiftActive && shiftLegend ? shiftLegend : normalLegend}
              </span>
            )}

            {(activeLayout === "english" || activeLayout === "avro") && (
              <span className={`font-mono text-xs sm:text-sm font-medium ${
                isHighlighted ? "text-primary-foreground font-black text-sm sm:text-base" : "text-foreground"
              }`}>
                {isShiftActive && key.enShift ? key.enShift : key.enNormal}
              </span>
            )}

            {activeLayout !== "english" && activeLayout !== "avro" && shiftLegend && (
              <span className={`absolute top-0.5 right-1 text-[8px] sm:text-[9px] font-bangla ${
                isHighlighted ? "text-primary-foreground/90 font-bold" : "text-muted-foreground"
              }`}>
                {isShiftActive ? normalLegend : shiftLegend}
              </span>
            )}

            {/* Tactile Home Row Bumps for F and J keys */}
            {isHomeRowBump && (
              <span className={`w-3 h-0.5 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 ${
                isHighlighted ? "bg-primary-foreground" : "bg-foreground/60"
              }`} />
            )}
          </>
        )}

        {isSystemKey && (
          <span className={isHighlighted ? "text-primary-foreground font-black" : "text-muted-foreground"}>
            {key.label}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="border border-border bg-card p-4 sm:p-5 rounded-2xl flex flex-col space-y-4 shadow-xs">
      <div className="relative">
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent z-10 sm:hidden rounded-r-xl" />

        <div className="overflow-x-auto pb-1">
          <div className="flex flex-col space-y-1 sm:space-y-1.5 min-w-[620px]">
            <div className="flex justify-center gap-1 sm:gap-1.5">{row1.map((k) => <React.Fragment key={k.code}>{renderKey(k)}</React.Fragment>)}</div>
            <div className="flex justify-center gap-1 sm:gap-1.5">{row2.map((k) => <React.Fragment key={k.code}>{renderKey(k)}</React.Fragment>)}</div>
            <div className="flex justify-center gap-1 sm:gap-1.5">{row3.map((k) => <React.Fragment key={k.code}>{renderKey(k)}</React.Fragment>)}</div>
            <div className="flex justify-center gap-1 sm:gap-1.5">{row4.map((k) => <React.Fragment key={k.code}>{renderKey(k)}</React.Fragment>)}</div>
            <div className="flex justify-center gap-1 sm:gap-1.5">{row5.map((k) => <React.Fragment key={k.code}>{renderKey(k)}</React.Fragment>)}</div>
          </div>
        </div>

        <p className="sm:hidden text-center text-[10px] text-muted-foreground mt-1.5 select-none">
          ← স্ক্রোল করুন →
        </p>
      </div>

      {/* Interactive Dual-Hand Placement Component */}
      <HandPlacement activeCodes={highlightCodes} activeShift={highlightShift} />

      {activeLayout === "avro" && (
        <div className="text-[10px] text-muted-foreground font-medium pt-2 text-center select-none bg-secondary py-1.5 border border-border rounded-lg max-w-lg mx-auto w-full">
          <strong>Avro Phonetic Mode:</strong> রোমান লেটার টাইপ করুন (e.g. <code>a</code> <code>m</code> <code>i</code> → <code>আমি</code>). <strong>Space</strong> চাপুন শব্দ কনফার্ম করতে।
        </div>
      )}
    </div>
  );
}
