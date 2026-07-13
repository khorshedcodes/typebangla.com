"use client";

import React, { useEffect, useState } from "react";
import { useTypingStore, KeyboardLayout } from "../store/typingStore";
import { JATIYA_MAP, UNI_BIJOY_MAP } from "../utils/layouts";

interface VirtualKeyboardProps {
  nextChar: string;
}

interface KeyboardKey {
  code: string;
  label?: string;
  enNormal?: string;
  enShift?: string;
  class?: string;
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

// Determine which physical key code should be highlighted next
const getHighlightKeys = (char: string, layout: KeyboardLayout): { codes: string[]; needsShift: boolean } => {
  if (!char) return { codes: [], needsShift: false };

  // Spacebar check
  if (char === " ") {
    return { codes: ["Space"], needsShift: false };
  }

  if (layout === "english" || layout === "avro") {
    // English typing lookup / Avro Latin drills
    const code = getEnglishKeyCode(char.toLowerCase());
    const needsShift = char !== char.toLowerCase() && /[A-Z]/.test(char);
    return { codes: code ? [code] : [], needsShift };
  }

  const map = layout === "jatiya" ? JATIYA_MAP : layout === "unibijoy" ? UNI_BIJOY_MAP : null;
  if (!map) return { codes: [], needsShift: false };

  // Search mapping tables for the key code that produces the character
  for (const [code, mappings] of Object.entries(map)) {
    if (mappings.normal === char) {
      return { codes: [code], needsShift: false };
    }
    if (mappings.shift === char) {
      return { codes: [code, "ShiftLeft", "ShiftRight"], needsShift: true };
    }
  }

  // Handles conjunct indicators: if char is hasanta/virama link '্'
  if (char === "্") {
    const hKey = layout === "jatiya" ? "KeyD" : "KeyG";
    return { codes: [hKey], needsShift: false };
  }

  return { codes: [], needsShift: false };
};

export default function VirtualKeyboard({ nextChar }: VirtualKeyboardProps) {
  const activeLayout = useTypingStore((state) => state.activeLayout);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  // Monitor physical keystrokes for active key lighting effects
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

  // Keyboard Rows definition
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
    { code: "Backspace", label: "Backspace", enNormal: "", enShift: "", class: "key-backspace" },
  ];

  const row2 = [
    { code: "Tab", label: "Tab", enNormal: "", enShift: "", class: "key-tab" },
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
    { code: "CapsLock", label: "Caps Lock", enNormal: "", enShift: "", class: "key-capslock" },
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
    { code: "Enter", label: "Enter", enNormal: "", enShift: "", class: "key-enter" },
  ];

  const row4 = [
    { code: "ShiftLeft", label: "Shift", enNormal: "", enShift: "", class: "key-leftshift" },
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
    { code: "ShiftRight", label: "Shift", enNormal: "", enShift: "", class: "key-rightshift" },
  ];

  const row5 = [
    { code: "ControlLeft", label: "Ctrl", class: "key-control" },
    { code: "MetaLeft", label: "Win" },
    { code: "AltLeft", label: "Alt", class: "key-alt" },
    { code: "Space", label: "", class: "key-spacebar" },
    { code: "AltRight", label: "Alt", class: "key-alt" },
    { code: "ControlRight", label: "Ctrl", class: "key-control" },
  ];

  const renderKey = (key: KeyboardKey) => {
    const isPressed = pressedKeys.has(key.code);
    const isHighlighted = highlightCodes.includes(key.code) || (highlightShift && key.code.startsWith("Shift"));
    
    // Resolve legends depending on active layout
    let normalLegend = key.label || key.enNormal;
    let shiftLegend = key.label ? "" : key.enShift;
    
    if (activeLayout === "unibijoy" && UNI_BIJOY_MAP[key.code]) {
      normalLegend = UNI_BIJOY_MAP[key.code].normal;
      shiftLegend = UNI_BIJOY_MAP[key.code].shift;
    } else if (activeLayout === "jatiya" && JATIYA_MAP[key.code]) {
      normalLegend = JATIYA_MAP[key.code].normal;
      shiftLegend = JATIYA_MAP[key.code].shift;
    } else if (activeLayout === "avro" && UNI_BIJOY_MAP[key.code]) {
      // For Avro, we display the English keys but can show a small phonetic hint
      normalLegend = key.enNormal;
      shiftLegend = key.enShift;
    }

    return (
      <div
        key={key.code}
        className={`key-cap ${key.class || ""} ${isPressed ? "depressed" : ""} ${isHighlighted ? "next-key-highlight" : ""}`}
      >
        {!key.label && (
          <>
            <span className="primary-label">{key.enNormal}</span>
            {activeLayout !== "english" && (
              <>
                <span className="bangla-label">{normalLegend}</span>
                {shiftLegend && <span className="bangla-shift-label">{shiftLegend}</span>}
              </>
            )}
          </>
        )}
        {key.label && <span>{key.label}</span>}
      </div>
    );
  };

  return (
    <div className="keyboard-wrapper">
      <div className="keyboard-row">{row1.map(renderKey)}</div>
      <div className="keyboard-row">{row2.map(renderKey)}</div>
      <div className="keyboard-row">{row3.map(renderKey)}</div>
      <div className="keyboard-row">{row4.map(renderKey)}</div>
      <div className="keyboard-row">{row5.map(renderKey)}</div>
      
      {activeLayout === "avro" && (
        <div className="bangla-help-tooltip" style={{ marginTop: "1rem", textAlign: "center" }}>
          <strong>Avro Phonetic Mode:</strong> Type standard roman letters to phonetically transliterate into Bangla (e.g. <code>a</code> <code>m</code> <code>i</code> becomes <code>আমি</code>). Press <strong>Space</strong> to commit the word.
        </div>
      )}
    </div>
  );
}
