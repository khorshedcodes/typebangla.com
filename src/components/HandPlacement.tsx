"use client";

import React from "react";
import { cn } from "../utils/cn";

export type FingerId =
  | "L-Pinky"
  | "L-Ring"
  | "L-Middle"
  | "L-Index"
  | "L-Thumb"
  | "R-Thumb"
  | "R-Index"
  | "R-Middle"
  | "R-Ring"
  | "R-Pinky";

interface HandPlacementProps {
  activeCodes?: string[];
  activeShift?: boolean;
}

export const FINGER_MAP: Record<string, FingerId> = {
  Backquote: "L-Pinky",
  Digit1: "L-Pinky",
  KeyQ: "L-Pinky",
  KeyA: "L-Pinky",
  KeyZ: "L-Pinky",
  ShiftLeft: "L-Pinky",
  CapsLock: "L-Pinky",
  Tab: "L-Pinky",
  ControlLeft: "L-Pinky",

  Digit2: "L-Ring",
  KeyW: "L-Ring",
  KeyS: "L-Ring",
  KeyX: "L-Ring",

  Digit3: "L-Middle",
  KeyE: "L-Middle",
  KeyD: "L-Middle",
  KeyC: "L-Middle",

  Digit4: "L-Index",
  Digit5: "L-Index",
  KeyR: "L-Index",
  KeyT: "L-Index",
  KeyF: "L-Index",
  KeyG: "L-Index",
  KeyV: "L-Index",
  KeyB: "L-Index",

  Space: "L-Thumb", // or R-Thumb

  Digit6: "R-Index",
  Digit7: "R-Index",
  KeyY: "R-Index",
  KeyU: "R-Index",
  KeyH: "R-Index",
  KeyJ: "R-Index",
  KeyN: "R-Index",
  KeyM: "R-Index",

  Digit8: "R-Middle",
  KeyI: "R-Middle",
  KeyK: "R-Middle",
  Comma: "R-Middle",

  Digit9: "R-Ring",
  KeyO: "R-Ring",
  KeyL: "R-Ring",
  Period: "R-Ring",

  Digit0: "R-Pinky",
  Minus: "R-Pinky",
  Equal: "R-Pinky",
  Backspace: "R-Pinky",
  KeyP: "R-Pinky",
  BracketLeft: "R-Pinky",
  BracketRight: "R-Pinky",
  Semicolon: "R-Pinky",
  Quote: "R-Pinky",
  Enter: "R-Pinky",
  Slash: "R-Pinky",
  ShiftRight: "R-Pinky",
  ControlRight: "R-Pinky",
  AltRight: "R-Pinky",
  AltLeft: "L-Thumb",
};

const FINGER_CONFIG: Record<FingerId, { name: string; nameBn: string; colorClass: string; glowClass: string }> = {
  "L-Pinky": { name: "Left Pinky", nameBn: "বাম কনিষ্ঠা", colorClass: "text-rose-500 fill-rose-500/20 stroke-rose-500", glowClass: "stroke-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)] fill-rose-500/40" },
  "L-Ring": { name: "Left Ring", nameBn: "বাম অনামিকা", colorClass: "text-amber-500 fill-amber-500/20 stroke-amber-500", glowClass: "stroke-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] fill-amber-500/40" },
  "L-Middle": { name: "Left Middle", nameBn: "বাম মধ্যমা", colorClass: "text-emerald-500 fill-emerald-500/20 stroke-emerald-500", glowClass: "stroke-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] fill-emerald-500/40" },
  "L-Index": { name: "Left Index", nameBn: "বাম তর্জনী", colorClass: "text-sky-500 fill-sky-500/20 stroke-sky-500", glowClass: "stroke-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.8)] fill-sky-500/40" },
  "L-Thumb": { name: "Left Thumb", nameBn: "বাম বৃদ্ধা", colorClass: "text-indigo-500 fill-indigo-500/20 stroke-indigo-500", glowClass: "stroke-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] fill-indigo-500/40" },
  "R-Thumb": { name: "Right Thumb", nameBn: "ডান বৃদ্ধা", colorClass: "text-indigo-500 fill-indigo-500/20 stroke-indigo-500", glowClass: "stroke-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] fill-indigo-500/40" },
  "R-Index": { name: "Right Index", nameBn: "ডান তর্জনী", colorClass: "text-blue-500 fill-blue-500/20 stroke-blue-500", glowClass: "stroke-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] fill-blue-500/40" },
  "R-Middle": { name: "Right Middle", nameBn: "ডান মধ্যমা", colorClass: "text-teal-500 fill-teal-500/20 stroke-teal-500", glowClass: "stroke-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.8)] fill-teal-500/40" },
  "R-Ring": { name: "Right Ring", nameBn: "ডান অনামিকা", colorClass: "text-violet-500 fill-violet-500/20 stroke-violet-500", glowClass: "stroke-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] fill-violet-500/40" },
  "R-Pinky": { name: "Right Pinky", nameBn: "ডান কনিষ্ঠা", colorClass: "text-pink-500 fill-pink-500/20 stroke-pink-500", glowClass: "stroke-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] fill-pink-500/40" },
};

export default function HandPlacement({ activeCodes = [], activeShift = false }: HandPlacementProps) {
  // Determine which finger is currently active
  let activeFinger: FingerId | null = null;

  for (const code of activeCodes) {
    if (code !== "ShiftLeft" && code !== "ShiftRight" && FINGER_MAP[code]) {
      activeFinger = FINGER_MAP[code];
      break;
    }
  }

  if (!activeFinger && activeCodes.length > 0) {
    for (const code of activeCodes) {
      if (FINGER_MAP[code]) {
        activeFinger = FINGER_MAP[code];
        break;
      }
    }
  }

  if (!activeFinger && activeCodes.includes("Space")) {
    activeFinger = "L-Thumb";
  }

  const activeMeta = activeFinger ? FINGER_CONFIG[activeFinger] : null;

  return (
    <div className="flex flex-col items-center justify-center space-y-3 pt-3 border-t border-border select-none">
      {/* Active Finger Notification Badge */}
      <div className="flex items-center gap-2 text-xs font-bold">
        <span className="text-muted-foreground">Active Finger Guide:</span>
        {activeMeta ? (
          <span className={`px-3 py-1 rounded-full text-xs font-black border bg-secondary animate-pulse ${activeMeta.colorClass}`}>
            🖐️ {activeMeta.nameBn} ({activeMeta.name})
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-xs font-semibold border border-border text-muted-foreground bg-secondary/50">
            Ready to Type
          </span>
        )}
      </div>

      {/* SVG Dual-Hand Vector Diagram */}
      <div className="flex items-center justify-center gap-8 sm:gap-16 w-full max-w-lg py-2">
        {/* ── LEFT HAND DIAGRAM ── */}
        <div className="flex flex-col items-center space-y-1">
          <svg viewBox="0 0 160 170" className="w-32 h-32 sm:w-36 sm:h-36 overflow-visible">
            {/* Palm Base */}
            <path
              d="M 30 150 Q 80 165 130 150 Q 135 100 120 75 Q 70 85 30 100 Z"
              className="fill-secondary/60 stroke-border stroke-2"
            />

            {/* Left Pinky */}
            <rect
              x="20" y="55" width="16" height="55" rx="8"
              className={cn("stroke-2 transition-all duration-200", activeFinger === "L-Pinky" ? FINGER_CONFIG["L-Pinky"].glowClass : FINGER_CONFIG["L-Pinky"].colorClass)}
            />

            {/* Left Ring */}
            <rect
              x="44" y="32" width="17" height="70" rx="8.5"
              className={cn("stroke-2 transition-all duration-200", activeFinger === "L-Ring" ? FINGER_CONFIG["L-Ring"].glowClass : FINGER_CONFIG["L-Ring"].colorClass)}
            />

            {/* Left Middle */}
            <rect
              x="69" y="20" width="18" height="78" rx="9"
              className={cn("stroke-2 transition-all duration-200", activeFinger === "L-Middle" ? FINGER_CONFIG["L-Middle"].glowClass : FINGER_CONFIG["L-Middle"].colorClass)}
            />

            {/* Left Index */}
            <rect
              x="95" y="34" width="18" height="70" rx="9"
              className={cn("stroke-2 transition-all duration-200", activeFinger === "L-Index" ? FINGER_CONFIG["L-Index"].glowClass : FINGER_CONFIG["L-Index"].colorClass)}
            />

            {/* Left Thumb */}
            <rect
              x="122" y="80" width="16" height="48" rx="8" transform="rotate(32 122 80)"
              className={cn("stroke-2 transition-all duration-200", activeFinger === "L-Thumb" ? FINGER_CONFIG["L-Thumb"].glowClass : FINGER_CONFIG["L-Thumb"].colorClass)}
            />
          </svg>
          <span className="text-[11px] font-bold text-foreground">Left Hand (বাম হাত)</span>
        </div>

        {/* ── RIGHT HAND DIAGRAM ── */}
        <div className="flex flex-col items-center space-y-1">
          <svg viewBox="0 0 160 170" className="w-32 h-32 sm:w-36 sm:h-36 overflow-visible">
            {/* Palm Base */}
            <path
              d="M 30 150 Q 80 165 130 150 Q 130 100 90 85 Q 40 75 30 150 Z"
              className="fill-secondary/60 stroke-border stroke-2"
            />

            {/* Right Thumb */}
            <rect
              x="22" y="80" width="16" height="48" rx="8" transform="rotate(-32 22 80)"
              className={cn("stroke-2 transition-all duration-200", activeFinger === "R-Thumb" ? FINGER_CONFIG["R-Thumb"].glowClass : FINGER_CONFIG["R-Thumb"].colorClass)}
            />

            {/* Right Index */}
            <rect
              x="47" y="34" width="18" height="70" rx="9"
              className={cn("stroke-2 transition-all duration-200", activeFinger === "R-Index" ? FINGER_CONFIG["R-Index"].glowClass : FINGER_CONFIG["R-Index"].colorClass)}
            />

            {/* Right Middle */}
            <rect
              x="73" y="20" width="18" height="78" rx="9"
              className={cn("stroke-2 transition-all duration-200", activeFinger === "R-Middle" ? FINGER_CONFIG["R-Middle"].glowClass : FINGER_CONFIG["R-Middle"].colorClass)}
            />

            {/* Right Ring */}
            <rect
              x="99" y="32" width="17" height="70" rx="8.5"
              className={cn("stroke-2 transition-all duration-200", activeFinger === "R-Ring" ? FINGER_CONFIG["R-Ring"].glowClass : FINGER_CONFIG["R-Ring"].colorClass)}
            />

            {/* Right Pinky */}
            <rect
              x="124" y="55" width="16" height="55" rx="8"
              className={cn("stroke-2 transition-all duration-200", activeFinger === "R-Pinky" ? FINGER_CONFIG["R-Pinky"].glowClass : FINGER_CONFIG["R-Pinky"].colorClass)}
            />
          </svg>
          <span className="text-[11px] font-bold text-foreground">Right Hand (ডান হাত)</span>
        </div>
      </div>
    </div>
  );
}
