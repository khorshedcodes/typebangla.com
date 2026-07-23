"use client";

import React, { useState } from "react";
import { RotateCcw, BarChart3, Clock, Type, AlignLeft, Percent, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function CounterClient() {
  const [text, setText] = useState("");

  const clean = text.trim();
  const words = clean ? clean.split(/\s+/).filter(Boolean).length : 0;
  const charsWithSpace = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const paragraphs = clean ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
  const readTime = Math.ceil(words / 130);

  // Character density percentage metric (non-spaces compared to spaces)
  const charDensityPercent = charsWithSpace > 0 ? Math.round((charsNoSpace / charsWithSpace) * 100) : 0;

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 fade-in">
      {/* Page Header */}
      <div className="space-y-0.5">
        <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
          <Sparkles className="text-emerald-600" size={18} />
          <span>Real-time Word &amp; Text Counter</span>
        </h1>
        <p className="text-xs text-muted-foreground">
          Analyze words, characters, spacing, readability, and estimation for Bangla and English text.
        </p>
      </div>

      {/* Analytics Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Writing Canvas */}
        <div className="lg:col-span-2">
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
              <span className="text-xs font-bold text-zinc-900">Writing Canvas</span>
              {text && (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setText("")} 
                  className="h-8 text-xs border-zinc-200 gap-1.5"
                >
                  <RotateCcw size={12} className="text-zinc-400" />
                  <span>Clear Canvas</span>
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                className="w-full text-base p-5 border-0 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none min-h-[300px] resize-y leading-relaxed font-bangla"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type your text here to begin instant word analysis..."
              />
              <div className="p-4 flex justify-between items-center text-[10px] font-medium text-muted-foreground bg-zinc-50 border-t border-border rounded-b-lg">
                <span>Status: Ready to count</span>
                <span>Lines: {text ? text.split("\n").length : 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Sticky Analytics Info Panels */}
        <div className="space-y-6 lg:sticky lg:top-20">
          
          {/* Key Stats Cards */}
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                <BarChart3 size={15} className="text-emerald-600" />
                <span>Text Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {/* Word Count */}
              <div className="flex justify-between items-center bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 rounded-md text-xs font-semibold">
                <div className="flex items-center space-x-2">
                  <Type size={13} className="text-emerald-600" />
                  <span className="text-zinc-600">Words</span>
                </div>
                <span className="text-base font-extrabold text-zinc-900">{words}</span>
              </div>

              {/* Characters With Space */}
              <div className="flex justify-between items-center bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 rounded-md text-xs font-semibold">
                <div className="flex items-center space-x-2">
                  <AlignLeft size={13} className="text-amber-500" />
                  <span className="text-zinc-600">Characters</span>
                </div>
                <span className="text-base font-extrabold text-zinc-900">{charsWithSpace}</span>
              </div>

              {/* Characters No Space */}
              <div className="flex justify-between items-center bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 rounded-md text-xs font-semibold">
                <div className="flex items-center space-x-2">
                  <AlignLeft size={13} className="text-zinc-400" />
                  <span className="text-zinc-500">Without Spaces</span>
                </div>
                <span className="text-sm font-extrabold text-zinc-800">{charsNoSpace}</span>
              </div>

              {/* Paragraphs Count */}
              <div className="flex justify-between items-center bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 rounded-md text-xs font-semibold">
                <div className="flex items-center space-x-2">
                  <AlignLeft size={13} className="text-blue-500" />
                  <span className="text-zinc-600">Paragraphs</span>
                </div>
                <span className="text-sm font-extrabold text-zinc-800">{paragraphs}</span>
              </div>
            </CardContent>
          </Card>

          {/* Graphical Meters Panel */}
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                <Clock size={15} className="text-emerald-600" />
                <span>Readability Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Read Time Estimation */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-zinc-700">
                  <span>Estimated Reading Time</span>
                  <span className="font-extrabold text-zinc-900">{readTime} {readTime === 1 ? "minute" : "minutes"}</span>
                </div>
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(5, (readTime / 10) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Character Density Percentage Meter */}
              <div className="space-y-2 pt-3 border-t border-zinc-100">
                <div className="flex justify-between text-xs font-semibold text-zinc-700">
                  <span className="flex items-center gap-1"><Percent size={12} /> Character Density</span>
                  <span className="font-extrabold text-zinc-900">{charDensityPercent}%</span>
                </div>
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${charDensityPercent || 5}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground leading-normal block pt-0.5">
                  Percentage of characters excluding white spacing and line breaks.
                </span>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </main>
  );
}
