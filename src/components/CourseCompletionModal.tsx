"use client";

import React, { useEffect, useRef } from "react";
import { Trophy, Award, Sparkles, ArrowRight, X, CheckCircle2, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface CourseCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  wpm: number;
  accuracy: number;
  onClaimCertificate: () => void;
}

export function CourseCompletionModal({
  isOpen,
  onClose,
  courseTitle,
  wpm,
  accuracy,
  onClaimCertificate,
}: CourseCompletionModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Lightweight Confetti Particles Engine
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ["#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6", "#14b8a6"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 16,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // Gravity
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
    }, 4000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeout);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md fade-in">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-lg bg-card border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center text-foreground animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Celebratory Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-500 shadow-lg relative">
          <Trophy size={40} className="animate-bounce" />
          <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-1.5 shadow-md">
            <Sparkles size={14} />
          </div>
        </div>

        {/* Title & Banner */}
        <div className="space-y-2">
          <Badge className="bg-emerald-600 text-white font-extrabold text-xs px-3 py-1 uppercase tracking-wider">
            🎉 COURSE COMPLETED!
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            অভিনন্দন! আপনি কোর্সটি সম্পন্ন করেছেন
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">{courseTitle}</strong> এর সকল লেসন সফলভাবে শেষ করে আপনি টাইপিং মাস্টারি অর্জন করেছেন।
          </p>
        </div>

        {/* Performance & Rewards Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-secondary/50 border border-border text-center">
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground font-bold uppercase block">চূড়ান্ত স্পিড</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{wpm} WPM</span>
          </div>

          <div className="space-y-0.5 border-x border-border">
            <span className="text-[10px] text-muted-foreground font-bold uppercase block">একিউরেসি</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{accuracy}%</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground font-bold uppercase block">XP বোনাস</span>
            <span className="text-lg font-black text-amber-500 flex items-center justify-center gap-0.5">
              <Zap size={14} className="fill-amber-500" />
              <span>+250 XP</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <Button
            onClick={() => {
              onClose();
              onClaimCertificate();
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-xl gap-2 shadow-lg cursor-pointer text-sm"
          >
            <Award size={18} />
            <span>সনদপত্র দাবি করুন (Claim Certificate)</span>
          </Button>

          <Button
            variant="outline"
            onClick={onClose}
            className="w-full font-bold text-xs border-border cursor-pointer"
          >
            বন্ধ করুন (Close)
          </Button>
        </div>

      </div>
    </div>
  );
}
