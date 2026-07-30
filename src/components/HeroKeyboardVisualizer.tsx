"use client";

import React from "react";
import { cn } from "../utils/cn";

export interface KeyItem {
  code: string;
  en: string;
  bn: string;
  width?: string;
  avro?: string;
  unibijoy?: string;
  jatiya?: string;
  finger?: string;
}

export interface HeroKeyboardVisualizerProps {
  activeLayout: string;
  nextTargetChar?: string;
  lastPressedKey?: string;
}

// Keycap rows layout specification
const KEYBOARD_ROWS: KeyItem[][] = [
  // Row 1 - Numbers
  [
    { code: "Backquote", en: "`", bn: "`" },
    { code: "Digit1", en: "1", bn: "১" },
    { code: "Digit2", en: "2", bn: "২" },
    { code: "Digit3", en: "3", bn: "৩" },
    { code: "Digit4", en: "4", bn: "৪" },
    { code: "Digit5", en: "5", bn: "৫" },
    { code: "Digit6", en: "6", bn: "৬" },
    { code: "Digit7", en: "7", bn: "৭" },
    { code: "Digit8", en: "8", bn: "৮" },
    { code: "Digit9", en: "9", bn: "৯" },
    { code: "Digit0", en: "0", bn: "০" },
    { code: "Minus", en: "-", bn: "-" },
    { code: "Equal", en: "=", bn: "=" },
    { code: "Backspace", en: "←", bn: "←", width: "w-14 sm:w-16" },
  ],
  // Row 2 - Top Row
  [
    { code: "Tab", en: "Tab", bn: "Tab", width: "w-12 sm:w-14" },
    { code: "KeyQ", en: "Q", bn: "ঙ", avro: "q", unibijoy: "ঙ", jatiya: "ঙ" },
    { code: "KeyW", en: "W", bn: "য", avro: "w", unibijoy: "য", jatiya: "য" },
    { code: "KeyE", en: "E", bn: "ড", avro: "e", unibijoy: "ড", jatiya: "ড" },
    { code: "KeyR", en: "R", bn: "প", avro: "r", unibijoy: "প", jatiya: "প" },
    { code: "KeyT", en: "T", bn: "ট", avro: "t", unibijoy: "ট", jatiya: "ট" },
    { code: "KeyY", en: "Y", bn: "চ", avro: "y", unibijoy: "চ", jatiya: "চ" },
    { code: "KeyU", en: "U", bn: "জ", avro: "u", unibijoy: "জ", jatiya: "জ" },
    { code: "KeyI", en: "I", bn: "হ", avro: "i", unibijoy: "হ", jatiya: "হ" },
    { code: "KeyO", en: "O", bn: "গ", avro: "o", unibijoy: "গ", jatiya: "গ" },
    { code: "KeyP", en: "P", bn: "ড়", avro: "p", unibijoy: "ড়", jatiya: "ড়" },
    { code: "BracketLeft", en: "[", bn: "ে" },
    { code: "BracketRight", en: "]", bn: "ো" },
  ],
  // Row 3 - Home Row (Primary Anchor)
  [
    { code: "CapsLock", en: "Caps", bn: "Caps", width: "w-14 sm:w-16" },
    { code: "KeyA", en: "A", bn: "ৃ", avro: "a", unibijoy: "ৃ", jatiya: "ৃ", finger: "Left Pinky" },
    { code: "KeyS", en: "S", bn: "ু", avro: "s", unibijoy: "ু", jatiya: "ু", finger: "Left Ring" },
    { code: "KeyD", en: "D", bn: "ি", avro: "d", unibijoy: "ি", jatiya: "ি", finger: "Left Middle" },
    { code: "KeyF", en: "F", bn: "া", avro: "f", unibijoy: "া", jatiya: "ব", finger: "Left Index" },
    { code: "KeyG", en: "G", bn: "্", avro: "g", unibijoy: "্", jatiya: "্", finger: "Left Index" },
    { code: "KeyH", en: "H", bn: "ব", avro: "h", unibijoy: "ব", jatiya: "া", finger: "Right Index" },
    { code: "KeyJ", en: "J", bn: "ক", avro: "j", unibijoy: "ক", jatiya: "ক", finger: "Right Index" },
    { code: "KeyK", en: "K", bn: "ত", avro: "k", unibijoy: "ত", jatiya: "ত", finger: "Right Middle" },
    { code: "KeyL", en: "L", bn: "দ", avro: "l", unibijoy: "দ", jatiya: "দ", finger: "Right Ring" },
    { code: "Semicolon", en: ";", bn: ";", finger: "Right Pinky" },
    { code: "Quote", en: "'", bn: "'" },
    { code: "Enter", en: "↵ Enter", bn: "↵", width: "w-14 sm:w-20" },
  ],
  // Row 4 - Bottom Row
  [
    { code: "ShiftLeft", en: "⇧ Shift", bn: "⇧ Shift", width: "w-16 sm:w-20" },
    { code: "KeyZ", en: "Z", bn: "্য", avro: "z", unibijoy: "্য", jatiya: "্য" },
    { code: "KeyX", en: "X", bn: "ো", avro: "x", unibijoy: "ো", jatiya: "ো" },
    { code: "KeyC", en: "C", bn: "ে", avro: "c", unibijoy: "ে", jatiya: "ে" },
    { code: "KeyV", en: "V", bn: "র", avro: "v", unibijoy: "র", jatiya: "র" },
    { code: "KeyB", en: "B", bn: "ন", avro: "b", unibijoy: "ন", jatiya: "ন" },
    { code: "KeyN", en: "N", bn: "স", avro: "n", unibijoy: "স", jatiya: "স" },
    { code: "KeyM", en: "M", bn: "ম", avro: "m", unibijoy: "ম", jatiya: "ম" },
    { code: "Comma", en: ",", bn: "," },
    { code: "Period", en: ".", bn: "।" },
    { code: "Slash", en: "/", bn: "/" },
    { code: "ShiftRight", en: "⇧ Shift", bn: "⇧ Shift", width: "w-16 sm:w-20" },
  ],
  // Row 5 - Spacebar
  [
    { code: "Space", en: "Spacebar", bn: "স্পেসবার", width: "w-64 sm:w-80", finger: "Thumb" },
  ],
];

export function HeroKeyboardVisualizer({
  activeLayout,
  nextTargetChar = "",
  lastPressedKey = "",
}: HeroKeyboardVisualizerProps) {
  // Helper to determine if key matches nextTargetChar
  const isTargetKey = (keyObj: { en: string; bn?: string; code?: string; unibijoy?: string; jatiya?: string }) => {
    if (!nextTargetChar) return false;
    const lowerTarget = nextTargetChar.toLowerCase();

    if (activeLayout === "english") {
      return keyObj.en.toLowerCase() === lowerTarget;
    }
    if (activeLayout === "avro") {
      return keyObj.en.toLowerCase() === lowerTarget || keyObj.bn === nextTargetChar;
    }
    if (activeLayout === "unibijoy") {
      return keyObj.unibijoy === nextTargetChar || keyObj.en.toLowerCase() === lowerTarget;
    }
    if (activeLayout === "jatiya") {
      return keyObj.jatiya === nextTargetChar || keyObj.en.toLowerCase() === lowerTarget;
    }
    return false;
  };

  // Find active finger guide for next key
  let activeFinger = "Home Row Position";
  for (const row of KEYBOARD_ROWS) {
    for (const k of row) {
      if (isTargetKey(k) && k.finger) {
        activeFinger = `${k.finger} → Press ${k.en}`;
        break;
      }
    }
  }

  return (
    <div className="space-y-3 select-none">
      {/* Visualizer Header Banner */}
      <div className="flex items-center justify-between px-1 text-[11px] font-bold text-muted-foreground">
        <span className="flex items-center gap-1.5 text-foreground">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          ভার্চুয়াল কীবোর্ড গাইড ({activeLayout.toUpperCase()})
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-secondary border border-border text-foreground font-mono text-[10px]">
          {activeFinger}
        </span>
      </div>

      {/* Keyboard Grid */}
      <div className="p-3 sm:p-4 bg-secondary/40 backdrop-blur-md rounded-xl border border-border space-y-1.5 shadow-inner overflow-x-auto">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5 min-w-[500px]">
            {row.map((k) => {
              const isTarget = isTargetKey(k);
              const isPressed = lastPressedKey === k.code || lastPressedKey.toUpperCase() === `KEY${k.en}`;
              const keyWidth = k.width || "w-7 sm:w-9";

              // Get layout-specific Bangla label
              let banglaLabel = k.bn;
              if (activeLayout === "unibijoy" && k.unibijoy) banglaLabel = k.unibijoy;
              if (activeLayout === "jatiya" && k.jatiya) banglaLabel = k.jatiya;

              return (
                <div
                  key={k.code}
                  className={cn(
                    "h-8 sm:h-10 rounded-md border flex flex-col items-center justify-center transition-all duration-100 relative group text-center cursor-default shadow-xs",
                    keyWidth,
                    {
                      // Normal Default Key
                      "bg-card border-border text-foreground hover:bg-secondary": !isTarget && !isPressed,
                      // Pulsing Target Key
                      "bg-emerald-500/20 border-emerald-500 text-emerald-500 font-extrabold ring-2 ring-emerald-500/50 animate-pulse scale-105 z-10": isTarget,
                      // Active Pressed Key
                      "bg-primary text-primary-foreground border-primary translate-y-0.5 shadow-none font-bold": isPressed,
                    }
                  )}
                >
                  {/* Top English Legend */}
                  <span className="text-[9px] sm:text-[10px] font-mono leading-none opacity-60">
                    {k.en}
                  </span>
                  
                  {/* Bottom Bangla Legend (Only if non-English layout) */}
                  {activeLayout !== "english" && (
                    <span className="text-[10px] sm:text-xs font-bangla font-bold leading-none mt-0.5">
                      {banglaLabel}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
