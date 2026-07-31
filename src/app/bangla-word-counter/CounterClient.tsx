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
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 fade-in text-foreground">
      {/* Page Header */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary animate-pulse" />
          <span>TEXT METRICS ANALYZER</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Word &amp; Character Counter
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          বাংলা ও ইংরেজি লেখার মোট শব্দ, বর্ণ, স্পেসহীন অক্ষর, অনুচ্ছেদ ও পড়ার আনুমানিক সময়সীমা বিশ্লেষণ।
        </p>
      </section>

      {/* Analytics Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Writing Canvas */}
        <div className="lg:col-span-2">
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
              <span className="text-xs font-black text-foreground">রাইটিং ক্যানভাস (Writing Canvas)</span>
              {text && (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setText("")} 
                  className="h-8 text-xs border-border gap-1.5 font-bold cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Clear Canvas</span>
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                className="w-full text-base p-5 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[320px] resize-y leading-relaxed font-sans"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="এখানে আপনার টেক্সট পেস্ট করুন অথবা সরাসরি টাইপ করুন..."
              />
              <div className="p-4 flex justify-between items-center text-xs font-bold text-muted-foreground bg-secondary border-t border-border rounded-b-2xl">
                <span>Status: <strong className="text-primary">Ready</strong></span>
                <span>লাইন সংখ্যা: <strong className="text-foreground">{text ? text.split("\n").length : 0}</strong></span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Sticky Analytics Info Panels */}
        <div className="space-y-6 lg:sticky lg:top-20">
          
          {/* Key Stats Cards */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-black text-foreground flex items-center gap-1.5">
                <BarChart3 size={16} className="text-primary" />
                <span>টেক্সট এনালাইটিক্স (Text Metrics)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5">
              {/* Word Count */}
              <div className="flex justify-between items-center bg-secondary border border-border px-3.5 py-2.5 rounded-xl text-xs font-bold">
                <div className="flex items-center space-x-2">
                  <Type size={14} className="text-primary" />
                  <span className="text-muted-foreground">শব্দ (Words)</span>
                </div>
                <span className="text-base font-black text-foreground">{words}</span>
              </div>

              {/* Characters With Space */}
              <div className="flex justify-between items-center bg-secondary border border-border px-3.5 py-2.5 rounded-xl text-xs font-bold">
                <div className="flex items-center space-x-2">
                  <AlignLeft size={14} className="text-primary" />
                  <span className="text-muted-foreground">অক্ষর (স্পেসসহ)</span>
                </div>
                <span className="text-base font-black text-foreground">{charsWithSpace}</span>
              </div>

              {/* Characters No Space */}
              <div className="flex justify-between items-center bg-secondary border border-border px-3.5 py-2.5 rounded-xl text-xs font-bold">
                <div className="flex items-center space-x-2">
                  <AlignLeft size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">স্পেসহীন অক্ষর</span>
                </div>
                <span className="text-sm font-black text-foreground">{charsNoSpace}</span>
              </div>

              {/* Paragraphs Count */}
              <div className="flex justify-between items-center bg-secondary border border-border px-3.5 py-2.5 rounded-xl text-xs font-bold">
                <div className="flex items-center space-x-2">
                  <AlignLeft size={14} className="text-primary" />
                  <span className="text-muted-foreground">অনুচ্ছেদ (Paragraphs)</span>
                </div>
                <span className="text-sm font-black text-foreground">{paragraphs}</span>
              </div>
            </CardContent>
          </Card>

          {/* Graphical Meters Panel */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-black text-foreground flex items-center gap-1.5">
                <Clock size={16} className="text-primary" />
                <span>পড়ার সময়সীমা (Reading Speed)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {/* Read Time Estimation */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-muted-foreground">
                  <span>আনুমানিক পড়ার সময়</span>
                  <span className="font-black text-foreground">{readTime} {readTime === 1 ? "মিনিট" : "মিনিট"}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden border border-border">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(5, (readTime / 10) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Character Density Percentage Meter */}
              <div className="space-y-2 pt-3 border-t border-border">
                <div className="flex justify-between text-xs font-bold text-muted-foreground">
                  <span className="flex items-center gap-1"><Percent size={12} /> টেক্সট ডেনসিটি</span>
                  <span className="font-black text-foreground">{charDensityPercent}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden border border-border">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${charDensityPercent || 5}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </main>
  );
}
