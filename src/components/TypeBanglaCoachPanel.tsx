"use client";

import React from "react";
import { useTypingStore } from "../store/typingStore";
import { Activity, Compass, ShieldAlert, Sparkles, TrendingUp, Flame, Rocket, Hourglass } from "lucide-react";
import { Badge } from "./ui/badge";

export default function TypeBanglaCoachPanel() {
  const {
    errorIndices,
    typedText,
    elapsedTime,
    flightTimeVarianceMs,
    fatigueSignature,
    problematicPairs,
    delayOnConjunctsMs,
  } = useTypingStore();

  const netWpm = elapsedTime === 0 ? 0 : Math.round(((typedText.length - errorIndices.length) / 5) / (elapsedTime / 60));
  const rawWpm = elapsedTime === 0 ? 0 : Math.round((typedText.length / 5) / (elapsedTime / 60));
  const accuracy = typedText.length === 0 ? 100 : Math.round(((typedText.length - errorIndices.length) / typedText.length) * 100);

  const getCoachMessage = () => {
    if (typedText.length < 5) {
      return {
        text: "Begin typing to initialize the TypeBangla Engine diagnostic calibration stream.",
        level: "info",
        icon: <Compass size={15} className="text-foreground" />
      };
    }

    if (accuracy < 90) {
      return {
        text: "Critical focus: Accuracy has fallen below 90%. Prioritize correct strokes over high pacing to reinforce muscle memory.",
        level: "warning",
        icon: <ShieldAlert size={15} className="text-foreground" />
      };
    }

    if (fatigueSignature !== "none") {
      return {
        text: "Fatigue patterns detected. Your keystroke intervals are showing significant muscle fatigue. We recommend a 2-minute hand stretch break.",
        level: "warning",
        icon: <ShieldAlert size={15} className="text-foreground" />
      };
    }

    if (delayOnConjunctsMs > 350) {
      return {
        text: "Detected conjunct latency. The shift transition for complex Juktakkhor ligatures is causing delay. Practice light, rapid pinky shifts.",
        level: "suggest",
        icon: <Sparkles size={15} className="text-foreground" />
      };
    }

    if (flightTimeVarianceMs > 100) {
      return {
        text: "Uneven rhythm detected. Focus on standardizing the key flight duration. Typing in a consistent cadence improves speed.",
        level: "suggest",
        icon: <TrendingUp size={15} className="text-foreground" />
      };
    }

    return {
      text: "Excellent typing posture and speed-accuracy harmony! Keep your wrists raised and maintain this typing rhythm.",
      level: "success",
      icon: <Sparkles size={15} className="text-foreground" />
    };
  };

  const coachInfo = getCoachMessage();

  const metrics = [
    { label: "Raw Speed", val: rawWpm, unit: "WPM", icon: <Flame size={14} className="text-foreground" /> },
    { label: "Net Speed", val: netWpm, unit: "WPM", icon: <Rocket size={14} className="text-foreground" /> },
    { label: "Cadence Jitter", val: flightTimeVarianceMs, unit: "ms", icon: <Activity size={14} className="text-foreground" /> },
    { label: "Conjunct Delay", val: delayOnConjunctsMs, unit: "ms", icon: <Hourglass size={14} className="text-foreground" /> }
  ];

  return (
    <div className="border border-border bg-card p-5 rounded-xl shadow-xs space-y-4 fade-in">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <Activity size={16} className="text-foreground animate-pulse" />
          <span className="text-xs font-bold text-foreground">TypeBangla Coach</span>
        </div>
        <Badge variant="outline" className="text-[9px] py-0.5 px-2 font-bold bg-secondary text-foreground border-border flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
          <span>LIVE ANALYTICS</span>
        </Badge>
      </div>

      <div className="p-3 rounded-md border border-border bg-secondary text-foreground text-xs leading-relaxed flex gap-2.5 shadow-xs">
        <div className="flex-shrink-0 mt-0.5">{coachInfo.icon}</div>
        <p className="font-medium">{coachInfo.text}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="p-3 bg-secondary border border-border rounded-lg flex flex-col justify-between hover:border-foreground/40 transition-colors shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">{m.label}</span>
              {m.icon}
            </div>
            <div className="text-base font-extrabold text-foreground mt-2 flex items-baseline gap-0.5">
              <span>{m.val}</span>
              <span className="text-[9px] font-normal text-muted-foreground ml-0.5">{m.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-3 border-t border-border">
        <div className="flex justify-between text-xs font-semibold py-1">
          <span className="text-muted-foreground">Fatigue Signature</span>
          <span className="font-bold text-[11px] px-2 py-0.5 rounded-full border border-border bg-secondary text-foreground">
            {fatigueSignature === "detected_after_120_seconds" ? "Fatigued (120s+)" : 
             fatigueSignature === "detected_high_variance" ? "Jitter Detected" : "Optimal"}
          </span>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-muted-foreground block">Transition Gaps</span>
          {problematicPairs.length === 0 ? (
            <div className="text-[11px] text-muted-foreground italic bg-secondary border border-border p-2 rounded-lg text-center">
              No transition errors recorded yet.
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5 max-h-[88px] overflow-y-auto pr-1">
              {problematicPairs.map((pair, idx) => {
                const [target, typed] = pair.split("-");
                return (
                  <div key={idx} className="inline-flex items-center text-[10px] bg-secondary border border-border text-foreground rounded-md px-2.5 py-0.5 gap-1 font-mono font-bold">
                    <span>{target === " " ? "␣" : target}</span>
                    <span className="opacity-40">➔</span>
                    <span className="text-muted-foreground">{typed === " " ? "␣" : typed}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
