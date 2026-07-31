"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Square, Volume2, Sparkles, AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";

export default function TtsClient() {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
      setSupported(false);
    }
  }, []);

  const handlePlay = () => {
    if (!supported || !text) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "bn-BD";
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 fade-in text-foreground">
      {/* Page Header */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Volume2 size={14} className="text-primary animate-pulse" />
          <span>TEXT TO SPEECH AUDIO READER</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Bangla Text to Speech
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          বাংলা লেখা পেস্ট করুন এবং প্লে বাটনে চাপ দিয়ে স্পষ্ট ভয়েসে লেখা শুনুন।
        </p>
      </section>

      {/* Browser Support Check */}
      {!supported && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-3 shadow-xs">
          <AlertTriangle size={20} className="shrink-0" />
          <div>
            <span>আপনার ব্রাউজারে স্পিচ সিন্থেসিস সার্ভিস পাওয়া যায়নি। সেরা অভিজ্ঞতার জন্য Google Chrome বা Microsoft Edge ব্যবহার করুন।</span>
          </div>
        </div>
      )}

      {/* Main TTS Player Arena */}
      <Card className="border border-border bg-card shadow-xs rounded-2xl">
        <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
          <span className="text-xs font-black text-foreground">বাংলা টেক্সট ক্যানভাস</span>
          {text && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleStop();
                setText("");
              }}
              className="h-8 text-xs font-bold border-border gap-1 cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Clear</span>
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="এখানে বাংলা লেখা পেস্ট করুন... (যেমন: আমার সোনার বাংলা, আমি তোমায় ভালোবাসি)"
            className="w-full text-base p-5 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[240px] resize-y leading-relaxed font-sans"
          />

          {/* Player Controls Bar */}
          <div className="p-4 bg-secondary border-t border-border rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {!isPlaying ? (
                <Button
                  onClick={handlePlay}
                  className="bg-primary text-primary-foreground font-black text-xs gap-2 h-10 px-6 rounded-xl shadow-xs cursor-pointer hover:opacity-95"
                >
                  <Play size={16} />
                  <span>{isPaused ? "Resume Audio" : "Play Bangla Audio"}</span>
                </Button>
              ) : (
                <Button
                  onClick={handlePause}
                  variant="outline"
                  className="border-border text-foreground font-black text-xs gap-2 h-10 px-6 rounded-xl shadow-xs cursor-pointer"
                >
                  <Pause size={16} />
                  <span>Pause Audio</span>
                </Button>
              )}

              <Button
                onClick={handleStop}
                variant="outline"
                size="sm"
                className="h-10 px-4 border-border font-bold text-xs gap-1.5 cursor-pointer"
              >
                <Square size={14} />
                <span>Stop</span>
              </Button>
            </div>

            {/* Audio Tuning Sliders */}
            <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground w-full sm:w-auto">
              <div className="space-y-1 w-full sm:w-32">
                <div className="flex justify-between">
                  <span>গতি (Speed):</span>
                  <span className="text-primary font-black">{rate}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-1.5 bg-background rounded-lg"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
