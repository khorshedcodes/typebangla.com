"use client";

import React, { useState } from "react";
import { Search, Sparkles, BookOpen } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

interface JuktakkhorItem {
  char: string;
  breakdown: string;
  avro: string;
  bijoy: string;
  jatiya: string;
  examples: string[];
}

const JUKTAKKHOR_DATABASE: JuktakkhorItem[] = [
  { char: "ক্ষ", breakdown: "ক + ষ", avro: "kS / kSh", bijoy: "k + shift+N", jatiya: "k + Z", examples: ["শিক্ষা", "পরীক্ষা", "ক্ষমা"] },
  { char: "জ্ঞ", breakdown: "জ + ঞ", avro: "jNg / GG", bijoy: "j + shift+I", jatiya: "j + Shift+U", examples: ["বিজ্ঞান", "জ্ঞান", "বিজ্ঞপ্তি"] },
  { char: "ষ্ণ", breakdown: "ষ + ণ", avro: "SN / ShN", bijoy: "shift+N + shift+B", jatiya: "Z + Shift+B", examples: ["তৃষ্ণা", "উষ্ণ", "কৃষ্ণ"] },
  { char: "ঙ্ক", breakdown: "ঙ + ক", avro: "Ngk", bijoy: "shift+U + k", jatiya: "Shift+U + k", examples: ["অঙ্ক", "আকাঙ্ক্ষা", "শঙ্কা"] },
  { char: "ঙ্গ", breakdown: "ঙ + গ", avro: "Ngg", bijoy: "shift+U + g", jatiya: "Shift+U + g", examples: ["সঙ্গীত", "গঙ্গা", "বঙ্গ"] },
  { char: "ঞ্চ", breakdown: "ঞ + চ", avro: "Njc", bijoy: "shift+I + c", jatiya: "Shift+U + c", examples: ["অঞ্চল", "সঞ্চয়", "পঞ্চম"] },
  { char: "ঞ্জ", breakdown: "ঞ + জ", avro: "Njj", bijoy: "shift+I + j", jatiya: "Shift+U + j", examples: ["অঞ্জলি", "গুঞ্জন", "গঞ্জ"] },
  { char: "ত্ত", breakdown: "ত + ত", avro: "tt", bijoy: "k + k", jatiya: "k + k", examples: ["উত্তম", "উত্তর", "বিত্ত"] },
  { char: "দ্ধ", breakdown: "দ + ধ", avro: "ddh", bijoy: "l + d", jatiya: "l + d", examples: ["বুদ্ধি", "শুদ্ধ", "সিদ্ধান্ত"] },
  { char: "শ্র", breakdown: "শ + র", avro: "shr / Sr", bijoy: "shift+M + z", jatiya: "M + z", examples: ["শ্রদ্ধা", "শ্রাবণ", "শ্রী"] },
  { char: "ব্রহ্ম", breakdown: "হ + ম", avro: "hm", bijoy: "h + m", jatiya: "h + m", examples: ["ব্রহ্মপুত্র", "ব্রাহ্মণ"] },
  { char: "স্থ", breakdown: "স + থ", avro: "sth", bijoy: "m + K", jatiya: "m + K", examples: ["স্থান", "স্বাস্থ্য", "আস্থা"] },
];

export default function FinderClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = JUKTAKKHOR_DATABASE.filter(
    (item) =>
      item.char.includes(searchQuery) ||
      item.breakdown.includes(searchQuery) ||
      item.avro.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.examples.some((ex) => ex.includes(searchQuery))
  );

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 fade-in text-foreground">
      {/* Page Header */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <BookOpen size={14} className="text-primary animate-pulse" />
          <span>JUKTAKKHOR KEYSTROKE GUIDE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Bangla Juktakkhor Finder
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          কঠিন বাংলা যুক্তাক্ষরের কী-সিকোয়েন্স ব্রেকডাউন (Avro, Bijoy 52 &amp; Jatiya layout keystrokes)।
        </p>
      </section>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search size={18} className="absolute left-4 top-3.5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="যুক্তবর্ণ বা কী খুঁজুন (যেমন: ক্ষ, জ্ঞ, kS)..."
          className="w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-3 text-sm font-bold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
        />
      </div>

      {/* Juktakkhor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, i) => (
          <Card key={i} className="border border-border bg-card shadow-xs rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-3xl font-black text-primary">{item.char}</span>
              <Badge variant="outline" className="text-xs font-bold border-border bg-secondary">
                {item.breakdown}
              </Badge>
            </div>
            <div className="space-y-2 text-xs font-bold text-muted-foreground">
              <div className="flex justify-between">
                <span>Avro / Phonetic:</span>
                <strong className="text-foreground font-mono">{item.avro}</strong>
              </div>
              <div className="flex justify-between">
                <span>Bijoy 52 Keystrokes:</span>
                <strong className="text-foreground font-mono">{item.bijoy}</strong>
              </div>
            </div>
            <div className="pt-2 border-t border-border flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-muted-foreground">উদাহরণ:</span>
              {item.examples.map((ex, idx) => (
                <span key={idx} className="text-xs font-bold bg-secondary px-2 py-0.5 rounded-md border border-border text-foreground">
                  {ex}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
