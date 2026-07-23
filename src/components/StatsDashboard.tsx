"use client";

import React, { useEffect } from "react";
import { useTypingStore } from "../store/typingStore";
import { BarChart3, RotateCcw, TrendingUp, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function StatsDashboard({ minimal = false }: { minimal?: boolean }) {
  const {
    typedText,
    errorIndices,
    elapsedTime,
    history,
    loadHistory,
    clearHistory,
    keyStats,
    clearKeyStats
  } = useTypingStore();

  useEffect(() => { loadHistory(); }, [loadHistory]);

  const liveWpm = elapsedTime === 0 ? 0 : Math.round((typedText.length / 5) / (elapsedTime / 60));
  const liveAccuracy = typedText.length === 0 ? 100 : Math.round(((typedText.length - errorIndices.length) / typedText.length) * 100);

  if (minimal) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 fade-in">
        <div className="border border-border bg-card hover:bg-secondary p-4 rounded-xl text-center transition-colors shadow-xs">
          <div className="text-2xl font-black text-foreground">{liveWpm}</div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">WPM</div>
        </div>
        <div className="border border-border bg-card hover:bg-secondary p-4 rounded-xl text-center transition-colors shadow-xs">
          <div className="text-2xl font-black text-foreground">{liveAccuracy}%</div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">Accuracy</div>
        </div>
        <div className="border border-border bg-card hover:bg-secondary p-4 rounded-xl text-center transition-colors shadow-xs">
          <div className="text-2xl font-black text-foreground">{elapsedTime}s</div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">Time</div>
        </div>
        <div className="border border-border bg-card hover:bg-secondary p-4 rounded-xl text-center transition-colors shadow-xs">
          <div className="text-2xl font-black text-red-500">{errorIndices.length}</div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">Errors</div>
        </div>
      </div>
    );
  }

  const trendHistory = [...history].reverse().slice(-7);
  const maxWpm = trendHistory.length > 0 ? Math.max(...trendHistory.map(h => h.wpm)) : 0;

  const totalTests = history.length;
  const avgWpm = totalTests > 0 ? Math.round(history.reduce((sum, h) => sum + h.wpm, 0) / totalTests) : 0;
  const peakWpm = totalTests > 0 ? Math.max(...history.map(h => h.wpm)) : 0;
  const avgAccuracy = totalTests > 0 ? Math.round(history.reduce((sum, h) => sum + h.accuracy, 0) / totalTests) : 0;

  const mistypedKeys = Object.entries(keyStats || {})
    .filter(([_, stats]) => stats.total >= 3)
    .map(([char, stats]) => {
      const accuracy = Math.round((stats.correct / stats.total) * 100);
      return { char: char === " " ? "Space" : char, accuracy, total: stats.total };
    })
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);

  const drawLineChart = () => {
    if (trendHistory.length === 0) {
      return (
        <p className="text-xs text-muted-foreground text-center w-full py-10">
          টেস্ট দিন এবং আপনার অগ্রগতি দেখুন।
        </p>
      );
    }

    const stepX = trendHistory.length > 1 ? 320 / (trendHistory.length - 1) : 320;
    const maxY = 140;
    const minY = 20;
    const maxLimit = Math.max(60, maxWpm);

    const points = trendHistory.map((item, idx) => {
      const x = 40 + idx * stepX;
      const y = maxY - ((item.wpm / maxLimit) * (maxY - minY));
      return { x, y, val: item.wpm, date: item.date };
    });

    const pathD = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaD = points.length > 0 ? `${pathD} L ${points[points.length - 1].x} 140 L ${points[0].x} 140 Z` : "";

    return (
      <svg viewBox="0 0 400 170" className="w-full h-full select-none">
        <line x1="40" y1="20" x2="360" y2="20" stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="40" y1="80" x2="360" y2="80" stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="40" y1="140" x2="360" y2="140" stroke="currentColor" className="text-border" strokeWidth="1.5" />

        <text x="15" y="24" fontSize="9" fontWeight="600" fill="currentColor" className="text-muted-foreground">{maxLimit}</text>
        <text x="15" y="84" fontSize="9" fontWeight="600" fill="currentColor" className="text-muted-foreground">{Math.round(maxLimit / 2)}</text>
        <text x="15" y="144" fontSize="9" fontWeight="600" fill="currentColor" className="text-muted-foreground">0</text>

        {areaD && <path d={areaD} fill="url(#chartGradient)" opacity="0.15" />}

        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" className="text-foreground" />
            <stop offset="100%" stopColor="currentColor" className="text-foreground" stopOpacity="0" />
          </linearGradient>
        </defs>

        {pathD && <path d={pathD} fill="none" stroke="currentColor" className="text-foreground" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}

        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r="4" className="fill-foreground stroke-background" strokeWidth="2" />
            <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor" className="text-foreground">{p.val}</text>
            <text x={p.x} y="158" textAnchor="middle" fontSize="8" fontWeight="600" fill="currentColor" className="text-muted-foreground">
              {p.date ? p.date.substring(0, 5) : ""}
            </text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="flex flex-col space-y-6 fade-in">
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-muted-foreground tracking-widest uppercase flex items-center gap-1.5">
          <Trophy size={14} className="text-foreground" />
          <span>লাইফটাইম অ্যানালিটিক্স</span>
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "গড় গতি (WPM)", value: avgWpm, color: "text-foreground" },
            { label: "সর্বোচ্চ গতি (WPM)", value: peakWpm, color: "text-foreground font-black" },
            { label: "গড় সঠিকতা", value: `${avgAccuracy}%`, color: "text-foreground" },
            { label: "সম্পূর্ণ টেস্ট", value: totalTests, color: "text-foreground" },
          ].map((stat) => (
            <div key={stat.label} className="border border-border bg-card p-4 rounded-xl text-center shadow-xs hover:border-foreground/50 transition-all">
              <div className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border rounded-xl bg-card shadow-xs md:col-span-1 flex flex-col justify-between">
          <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold text-foreground">ভুল কী বিশ্লেষণ</CardTitle>
            {mistypedKeys.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearKeyStats}
                className="text-destructive hover:bg-destructive/10 text-[10px] h-6 px-1.5 font-bold"
              >
                রিসেট
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            {mistypedKeys.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-8">
                আরও টাইপ করুন — ভুলের প্যাটার্ন দেখা যাবে।
              </p>
            ) : (
              <div className="flex flex-col space-y-3 w-full">
                {mistypedKeys.map((k) => (
                  <div key={k.char} className="flex flex-col gap-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono bg-secondary px-2 py-0.5 rounded text-foreground font-bold border border-border">
                        {k.char}
                      </span>
                      <span className="font-bold text-xs text-foreground">
                        {k.accuracy}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-foreground transition-all duration-500"
                        style={{ width: `${k.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border rounded-xl bg-card shadow-xs md:col-span-2">
          <CardHeader className="pb-3 flex flex-row items-center space-x-2 space-y-0">
            <TrendingUp size={16} className="text-muted-foreground" />
            <CardTitle className="text-sm font-bold text-foreground">গতির ট্রেন্ড (WPM)</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-end justify-center">
            {drawLineChart()}
          </CardContent>
        </Card>
      </div>

      {history.length > 0 && (
        <Card className="border border-border rounded-xl bg-card shadow-xs">
          <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <BarChart3 size={16} className="text-muted-foreground" />
              <CardTitle className="text-sm font-bold text-foreground">সাম্প্রতিক ফলাফল</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-destructive hover:bg-destructive/10 text-[10px] h-7 px-2.5 font-bold gap-1"
            >
              <RotateCcw size={10} /> মুছুন
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {history.slice(0, 10).map((h) => (
                <div key={h.id} className="flex justify-between items-center py-2 px-3 bg-secondary border border-border rounded-md text-xs">
                  <div>
                    <span className="font-bold text-foreground">{h.wpm} WPM</span>
                    <span className="text-muted-foreground ml-2">({h.accuracy}% সঠিক)</span>
                  </div>
                  <span className="text-muted-foreground font-mono text-[10px] capitalize">
                    {h.layout} · {h.duration}s · {h.date}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
