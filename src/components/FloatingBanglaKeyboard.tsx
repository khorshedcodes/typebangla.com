import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Move, Minus, Keyboard as KeyboardIcon } from "lucide-react";
import { cn } from "../utils/cn";
import { AVRO_BANGLA_LEGEND_MAP } from "../utils/layouts";
import { Button } from "./ui/button";

interface FloatingBanglaKeyboardProps {
  onKeyClick?: (code: string, char: string, isShift?: boolean) => void;
  className?: string;
}

interface KeyCap {
  code: string;
  enNormal?: string;
  enShift?: string;
  classWidth?: string;
  label?: string;
}

export default function FloatingBanglaKeyboard({ onKeyClick, className }: FloatingBanglaKeyboardProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Drag state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0, mouseY: 0, startX: 0, startY: 0
  });

  // Track physical keyboard shift and key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") setIsShiftActive(true);
      setPressedKeys((prev) => new Set(prev).add(e.code));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") setIsShiftActive(false);
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

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest(".keycap")) return;
    setIsDragging(true);
    const rect = dragRef.current?.getBoundingClientRect();
    const currentX = position ? position.x : rect ? rect.left : 0;
    const currentY = position ? position.y : rect ? rect.top : 0;

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: currentX,
      startY: currentY
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;
      setPosition({
        x: Math.max(10, Math.min(window.innerWidth - 320, dragStartRef.current.startX + dx)),
        y: Math.max(10, Math.min(window.innerHeight - 150, dragStartRef.current.startY + dy))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const row1: KeyCap[] = [
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
    { code: "Backspace", label: "Bksp", classWidth: "w-14 text-[9px]" },
  ];

  const row2: KeyCap[] = [
    { code: "Tab", label: "Tab", classWidth: "w-11 text-[9px]" },
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

  const row3: KeyCap[] = [
    { code: "CapsLock", label: "Caps", classWidth: "w-12 text-[9px]" },
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
    { code: "Enter", label: "Enter", classWidth: "w-14 text-[9px]" },
  ];

  const row4: KeyCap[] = [
    { code: "ShiftLeft", label: "Shift", classWidth: "w-16 text-[9px]" },
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
    { code: "ShiftRight", label: "Shift", classWidth: "w-16 text-[9px]" },
  ];

  const row5: KeyCap[] = [
    { code: "Space", label: "Spacebar (স্পেসবার)", classWidth: "w-64 sm:w-80 text-[10px]" },
  ];

  const renderKey = (key: KeyCap) => {
    const isPressed = pressedKeys.has(key.code);
    const isSystemKey = !!key.label;
    const isShiftKey = key.code.startsWith("Shift");

    const legend = AVRO_BANGLA_LEGEND_MAP[key.code];
    const banglaChar = legend
      ? (isShiftActive ? legend.shift : legend.normal)
      : (isShiftActive ? key.enShift : key.enNormal);

    const handleKeyClick = () => {
      if (isShiftKey) {
        setIsShiftActive(prev => !prev);
        return;
      }
      if (onKeyClick) {
        const charToPass = isSystemKey
          ? key.code
          : ((isShiftActive ? key.enShift : key.enNormal) || "");
        onKeyClick(key.code, charToPass, isShiftActive);
      }
    };

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleKeyClick}
        className={cn(
          "keycap h-9 sm:h-10 border border-border bg-card text-foreground rounded-lg flex items-center justify-center relative select-none cursor-pointer hover:border-emerald-500 active:scale-95 transition-all duration-100 touch-manipulation shadow-2xs",
          key.classWidth || "w-9 sm:w-10",
          {
            "bg-emerald-600 text-white border-emerald-700 dark:bg-emerald-500 font-bold": isShiftKey && isShiftActive,
            "bg-secondary text-muted-foreground border-border": isSystemKey && !isShiftActive,
            "bg-emerald-500/10 border-emerald-500 translate-y-[1px]": isPressed
          }
        )}
      >
        {!isSystemKey ? (
          <>
            {/* Top Left English Keycap Hint */}
            <span className="absolute top-0.5 left-1 text-[8px] font-mono text-muted-foreground">
              {isShiftActive ? key.enShift : key.enNormal}
            </span>

            {/* Main Prominent Bangla Character */}
            <span className="font-bangla text-sm sm:text-base font-bold text-foreground pt-0.5">
              {banglaChar}
            </span>
          </>
        ) : (
          <span className="text-[10px] font-bold text-foreground">
            {key.label}
          </span>
        )}
      </div>
    );
  };

  if (!mounted) return null;

  if (!isOpen) {
    return createPortal(
      <div className="fixed bottom-5 right-5 z-[9999]">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs gap-2 shadow-xl rounded-full px-5 py-3 cursor-pointer border border-emerald-400/30 animate-bounce"
        >
          <KeyboardIcon size={16} />
          <span>⌨️ ভাসমান বাংলা কীবোর্ড</span>
        </Button>
      </div>,
      document.body
    );
  }

  const floatingStyle: React.CSSProperties = position
    ? { position: "fixed", left: `${position.x}px`, top: `${position.y}px`, zIndex: 9999 }
    : { position: "fixed", bottom: "16px", left: "50%", transform: "translateX(-50%)", zIndex: 9999 };

  return createPortal(
    <div
      ref={dragRef}
      style={floatingStyle}
      className={cn(
        "bg-card/95 backdrop-blur-md border-2 border-emerald-500/60 rounded-2xl p-3 sm:p-4 shadow-2xl space-y-2 select-none text-foreground transition-all duration-75 max-w-[95vw] sm:max-w-max",
        className
      )}
    >
      {/* Drag Header Bar */}
      <div
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between pb-2 border-b border-border cursor-grab active:cursor-grabbing text-xs font-bold text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <Move size={14} className="text-emerald-500" />
          <span className="font-black text-foreground text-xs">ভাসমান ফোনেটিক বাংলা কীবোর্ড</span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-mono border border-emerald-500/20">
            {isShiftActive ? "SHIFT ACTIVE" : "Avro Mode"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsShiftActive(prev => !prev)}
            title="Shift Toggle"
            className={cn("h-6 w-6 text-xs font-bold rounded", { "bg-emerald-500 text-white": isShiftActive })}
          >
            ⇧
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            title="Minimize"
            className="h-6 w-6 text-muted-foreground hover:text-foreground rounded"
          >
            <Minus size={14} />
          </Button>
        </div>
      </div>

      {/* Keyboard Grid */}
      <div className="overflow-x-auto pb-1">
        <div className="flex flex-col space-y-1 sm:space-y-1.5 min-w-[580px]">
          <div className="flex justify-center gap-1 sm:gap-1.5">{row1.map(k => <React.Fragment key={k.code}>{renderKey(k)}</React.Fragment>)}</div>
          <div className="flex justify-center gap-1 sm:gap-1.5">{row2.map(k => <React.Fragment key={k.code}>{renderKey(k)}</React.Fragment>)}</div>
          <div className="flex justify-center gap-1 sm:gap-1.5">{row3.map(k => <React.Fragment key={k.code}>{renderKey(k)}</React.Fragment>)}</div>
          <div className="flex justify-center gap-1 sm:gap-1.5">{row4.map(k => <React.Fragment key={k.code}>{renderKey(k)}</React.Fragment>)}</div>
          <div className="flex justify-center gap-1 sm:gap-1.5">{row5.map(k => <React.Fragment key={k.code}>{renderKey(k)}</React.Fragment>)}</div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-[10px] text-center text-muted-foreground pt-1 flex justify-between items-center px-1">
        <span>কী-তে ক্লিক করে বা ড্র্যাগ করে যেকোনো স্থানে সরান</span>
        <span className="font-mono text-emerald-600 dark:text-emerald-400">TypeBangla Floating Bar</span>
      </div>
    </div>,
    document.body
  );
}
