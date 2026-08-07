"use client";

import React, { useState, useEffect, useRef } from "react";
import { Copy, Check, RotateCcw, Download, Sparkles, BookOpen, Search, Keyboard, Info, MousePointerClick } from "lucide-react";
import { avroTransliterate } from "../../utils/layouts";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { cn } from "../../utils/cn";
import FloatingBanglaKeyboard from "../../components/FloatingBanglaKeyboard";
import { useTypingStore } from "../../store/typingStore";

interface KeymapRule {
  roman: string;
  bangla: string;
  category: "vowels" | "consonants" | "folas" | "specials";
  note?: string;
}

const AVRO_KEYMAP_RULES: KeymapRule[] = [
  // Vowels & Kar
  { roman: "a", bangla: "আ / া (কার)", category: "vowels", note: "Word start = আ, after consonant = া" },
  { roman: "i", bangla: "ই / ি (কার)", category: "vowels", note: "Word start = ই, after consonant = ি" },
  { roman: "I", bangla: "ঈ / ী (কার)", category: "vowels", note: "Capital I = দীর্ঘ-ঈ / ী" },
  { roman: "u", bangla: "উ / ু (কার)", category: "vowels", note: "Word start = উ, after consonant = ু" },
  { roman: "U", bangla: "ঊ / ূ (কার)", category: "vowels", note: "Capital U = দীর্ঘ-ঊ / ূ" },
  { roman: "e", bangla: "এ / ে (কার)", category: "vowels", note: "Word start = এ, after consonant = ে" },
  { roman: "O", bangla: "ও / ো (কার)", category: "vowels", note: "Capital O = ও / ো" },
  { roman: "OI", bangla: "ঐ / ৈ (কার)", category: "vowels", note: "Capital OI = ঐ / ৈ" },
  { roman: "OU", bangla: "ঔ / ৌ (কার)", category: "vowels", note: "Capital OU = ঔ / ৌ" },
  { roman: "rri", bangla: "ঋ / ৃ (কার)", category: "vowels", note: "rri = ঋ / ৃত" },
  { roman: "o", bangla: "অ (অদৃশ্য inherent)", category: "vowels", note: "o = inherent vowel (অ)" },
  { roman: "A", bangla: "অ (পূর্ণ স্বর)", category: "vowels", note: "Capital A = অ" },

  // Consonants
  { roman: "k", bangla: "ক", category: "consonants" },
  { roman: "kh", bangla: "খ", category: "consonants" },
  { roman: "g", bangla: "গ", category: "consonants" },
  { roman: "gh", bangla: "ঘ", category: "consonants" },
  { roman: "Ng", bangla: "ঙ", category: "consonants" },
  { roman: "c", bangla: "চ", category: "consonants" },
  { roman: "ch", bangla: "ছ", category: "consonants" },
  { roman: "j", bangla: "জ", category: "consonants" },
  { roman: "jh", bangla: "ঝ", category: "consonants" },
  { roman: "NG", bangla: "ঞ", category: "consonants" },
  { roman: "T", bangla: "ট", category: "consonants", note: "Capital T = ট" },
  { roman: "Th", bangla: "ঠ", category: "consonants", note: "Capital Th = ঠ" },
  { roman: "D", bangla: "ড", category: "consonants", note: "Capital D = ড" },
  { roman: "Dh", bangla: "ঢ", category: "consonants", note: "Capital Dh = ঢ" },
  { roman: "N", bangla: "ণ", category: "consonants", note: "Capital N = ণ" },
  { roman: "t", bangla: "ত", category: "consonants" },
  { roman: "th", bangla: "থ", category: "consonants" },
  { roman: "d", bangla: "দ", category: "consonants" },
  { roman: "dh", bangla: "ধ", category: "consonants" },
  { roman: "n", bangla: "ন", category: "consonants" },
  { roman: "p", bangla: "প", category: "consonants" },
  { roman: "f / ph", bangla: "ফ", category: "consonants" },
  { roman: "b", bangla: "ব", category: "consonants" },
  { roman: "v / bh", bangla: "ভ", category: "consonants" },
  { roman: "m", bangla: "ম", category: "consonants" },
  { roman: "z", bangla: "য", category: "consonants" },
  { roman: "r", bangla: "র", category: "consonants" },
  { roman: "l", bangla: "ল", category: "consonants" },
  { roman: "sh / S", bangla: "শ", category: "consonants", note: "sh / Capital S = শ" },
  { roman: "Sh", bangla: "ষ", category: "consonants", note: "Capital Sh = ষ" },
  { roman: "s", bangla: "স", category: "consonants" },
  { roman: "h", bangla: "হ", category: "consonants" },
  { roman: "R", bangla: "ড়", category: "consonants", note: "Capital R = ড়" },
  { roman: "Rh", bangla: "ঢ়", category: "consonants", note: "Capital Rh = ঢ়" },
  { roman: "Y", bangla: "য়", category: "consonants", note: "Capital Y = য়" },
  { roman: "q", bangla: "ক", category: "consonants", note: "q = ক (alias)" },
  { roman: "G", bangla: "গ", category: "consonants", note: "Capital G = গ (alias)" },

  // Folas & Conjuncts
  { roman: "y / z", bangla: "্য (য-ফলা)", category: "folas", note: "by = ব্য, ky = ক্য" },
  { roman: "w", bangla: "্ব (ব-ফলা) / ও", category: "folas", note: "bw = ব্ব, sw = স্ব" },
  { roman: "r", bangla: "্র (র-ফলা)", category: "folas", note: "br = ব্র, gr = গ্র" },
  { roman: "rr", bangla: "র্ (রেফ)", category: "folas", note: "rr before consonant (rk = র্ক)" },
  { roman: "m", bangla: "্ম (ম-ফলা)", category: "folas", note: "pm = প্ম, sm = স্ম" },
  { roman: "kSh / kkh / kx", bangla: "ক্ষ", category: "folas", note: "kSh = ক্ষ (k+Sh)" },
  { roman: "gg / jNG", bangla: "জ্ঞ", category: "folas", note: "gg / jNG = জ্ঞ" },
  { roman: "x", bangla: "ক্স", category: "folas", note: "x = ক্স (ks)" },
  { roman: "+", bangla: "্ (হসন্ত/ম্যানুয়াল লিংক)", category: "folas", note: "k+t = ক্ত, k+s = ক্স" },

  // Specials
  { roman: "ng", bangla: "ং (অনুস্বার)", category: "specials" },
  { roman: "H / :", bangla: "ঃ (বিসর্গ)", category: "specials" },
  { roman: "^", bangla: "ঁ (চন্দ্রবিন্দু)", category: "specials" },
  { roman: "Z / t``", bangla: "ৎ (খণ্ড-ত)", category: "specials" },
  { roman: "$", bangla: "৳ (টাকা চিহ্ন)", category: "specials" },
  { roman: ".", bangla: "। (দাঁড়ি)", category: "specials", note: "type .` for English dot ." },
  { roman: ",,", bangla: "্ (হসন্ত)", category: "specials" },
  { roman: "`", bangla: "(যুক্তবর্ণ রোধক)", category: "specials", note: "Accent key prevents auto-joining" },
];

export default function PhoneticClient() {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showKeyboard, setShowKeyboard] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const setActiveLayout = useTypingStore((state) => state.setActiveLayout);

  useEffect(() => {
    setActiveLayout("avro");
  }, [setActiveLayout]);

  const outputText = inputText
    ? inputText.split("\n").map(line => line.split(" ").map(word => avroTransliterate(word)).join(" ")).join("\n")
    : "";

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bangla-phonetic-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleVirtualKeyClick = (code: string, char: string) => {
    if (code === "Backspace") {
      setInputText(prev => prev.slice(0, -1));
    } else if (code === "Enter") {
      setInputText(prev => prev + "\n");
    } else if (code === "Space") {
      setInputText(prev => prev + " ");
    } else if (code === "Tab" || code === "CapsLock" || code.startsWith("Shift") || code.startsWith("Control") || code.startsWith("Alt") || code.startsWith("Meta")) {
      // Do nothing for meta system keys
      return;
    } else {
      setInputText(prev => prev + char);
    }
    textareaRef.current?.focus();
  };

  const handleRuleClick = (token: string) => {
    const rawToken = token.split("/")[0].trim();
    setInputText(prev => (prev && !prev.endsWith(" ") ? prev + " " + rawToken : prev + rawToken));
    textareaRef.current?.focus();
  };

  const filteredRules = AVRO_KEYMAP_RULES.filter(rule => {
    const matchesCategory = selectedCategory === "all" || rule.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || rule.roman.toLowerCase().includes(q) || rule.bangla.includes(q) || (rule.note && rule.note.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 fade-in text-foreground">
      {/* Page Header */}
      <section className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
          <Sparkles size={14} className="text-emerald-500 animate-pulse" />
          <span>OFFICIAL AVRO PHONETIC ENGINE & KEYMAP GUIDE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          English to Bangla Typing
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          ইংরেজিতে টাইপ করুন (যেমন: <code>ami banglay gan gai</code>) এবং তাৎক্ষণিক সঠিক বাংলা ইউনিকোড পান (<code>আমি বাংলায় গান গাই</code>)। নিচে ইন্টারেক্টিভ কীবোর্ড এবং সম্পূর্ণ কীম্যাপ গাইড থেকে সরাসরি সিলেক্ট করুন।
        </p>
      </section>

      {/* Editor Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Banglish Input Panel */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Keyboard size={16} className="text-emerald-500" />
              <span className="text-xs font-black text-foreground uppercase tracking-wider">English (Banglish) Input</span>
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border">Avro Phonetic</span>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <textarea
              ref={textareaRef}
              className="w-full text-base p-5 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[220px] resize-y leading-relaxed font-mono"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="এখানে ফোনেটিক রোমান হরফে লিখুন... (e.g. amar sonar bangla, ami tomay valobashi)"
            />
            <div className="p-3.5 flex justify-between items-center text-xs font-bold text-muted-foreground bg-secondary/80 border-t border-border rounded-b-2xl">
              <span>অক্ষর: <strong className="text-foreground">{inputText.length}</strong></span>
              {inputText && (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText("")} 
                  className="h-7 text-xs gap-1 border-border font-bold cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <RotateCcw size={12} />
                  <span>মুছে ফেলুন</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bangla Output Panel */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <span className="text-xs font-black text-primary uppercase tracking-wider">Bangla Unicode Output</span>
            </div>
            {outputText && (
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleCopy} 
                  className={cn("gap-1.5 h-8 border-border text-xs font-bold cursor-pointer transition-all", {
                    "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30": copied
                  })}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? "কপি হয়েছে!" : "কপি করুন"}</span>
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleDownload} 
                  className="gap-1.5 h-8 border-border text-xs font-bold cursor-pointer hover:border-primary hover:text-primary"
                >
                  <Download size={12} />
                  <span>ডাউনলোড</span>
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <div className="p-5 text-base sm:text-lg min-h-[220px] bg-transparent leading-relaxed text-foreground break-words font-bangla font-semibold">
              {outputText || (
                <span className="text-muted-foreground text-xs font-sans font-normal italic">
                  আপনার লেখার তাৎক্ষণিক বাংলা রূপান্তর এখানে লাইভ দেখা যাবে...
                </span>
              )}
            </div>
            <div className="p-3.5 flex justify-between items-center text-xs font-bold text-muted-foreground bg-secondary/80 border-t border-border rounded-b-2xl">
              <span>অক্ষর: <strong className="text-foreground">{outputText.length}</strong></span>
              <span className="text-[10px] text-muted-foreground">Unicode Standard 15.0</span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Interactive On-Screen Virtual Keyboard Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="text-emerald-500" size={18} />
            <h2 className="text-lg font-black text-foreground">Interactive Clickable Virtual Keyboard</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowKeyboard(!showKeyboard)}
            className="text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {showKeyboard ? "কীবোর্ড হাইড করুন ▲" : "কীবোর্ড দেখান ▼"}
          </Button>
        </div>

        {showKeyboard && (
          <div className="fade-in space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-lg border border-border">
              <MousePointerClick size={14} className="text-emerald-500 shrink-0" />
              <span>নিচের যেকোনো কী-তে ক্লিক করে সরাসরি ইনপুট বক্সে টাইপ করুন:</span>
            </div>
            <FloatingBanglaKeyboard onKeyClick={handleVirtualKeyClick} />
          </div>
        )}
      </section>

      {/* Comprehensive Searchable Avro Keymap Guide Section */}
      <section className="space-y-4 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary" size={20} />
              <h2 className="text-xl font-black text-foreground">Avro Phonetic Keymaps Guide (কীম্যাপ নির্দেশিকা)</h2>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              যেকোনো ফোনেটিক কোডে ক্লিক করলে তা সরাসরি আপনার ইনপুট বক্সে যুক্ত হবে।
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <Input
              type="text"
              placeholder="কীম্যাপ খুঁজুন (e.g. kh, kSh, rri)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl bg-card border-border"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "সব কীম্যাপ" },
            { id: "vowels", label: "স্বরবর্ণ ও কার" },
            { id: "consonants", label: "ব্যঞ্জনবর্ণ" },
            { id: "folas", label: "ফলা ও যুক্তাক্ষর" },
            { id: "specials", label: "বিশেষ চিহ্ন" },
          ].map(cat => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn("text-xs font-bold rounded-xl h-8 cursor-pointer", {
                "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500": selectedCategory === cat.id
              })}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Grid of Clickable Keymap Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {filteredRules.map((rule, idx) => (
            <div
              key={idx}
              onClick={() => handleRuleClick(rule.roman)}
              className="group relative flex flex-col justify-between p-3 rounded-xl border border-border bg-card hover:border-emerald-500/80 hover:bg-emerald-500/5 transition-all cursor-pointer select-none active:scale-95 shadow-2xs"
            >
              <div className="flex justify-between items-start gap-1">
                <code className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {rule.roman}
                </code>
                <span className="font-bangla font-black text-sm text-foreground">
                  {rule.bangla}
                </span>
              </div>
              {rule.note && (
                <span className="text-[10px] text-muted-foreground mt-2 pt-1 border-t border-border/50 line-clamp-1">
                  {rule.note}
                </span>
              )}
            </div>
          ))}
        </div>

        {filteredRules.length === 0 && (
          <div className="text-center py-8 bg-card border border-border rounded-xl text-xs text-muted-foreground">
            কোনো কীম্যাপ পাওয়া যায়নি: &quot;{searchQuery}&quot;
          </div>
        )}

        {/* Tips and Conjunct Usage Box */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl mt-6">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Info className="text-amber-500" size={16} />
              <CardTitle className="text-sm font-bold text-foreground">Phones &amp; Conjunct Typing Tips (গুরুত্বপূর্ণ টিপস)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground leading-relaxed">
            <div className="space-y-2">
              <div>
                <strong className="text-foreground font-semibold">দাঁড়ি (।) টাইপ করতে:</strong> <code>.</code> চাপুন। সাধারণ ডট টাইপ করতে <code>.`</code> চাপুন।
              </div>
              <div>
                <strong className="text-foreground font-semibold">যুক্তাক্ষর তৈরি (ম্যাজিক লিংক):</strong> পরপর ব্যঞ্জনবর্ণ টাইপ করলে স্বয়ংক্রিয় যুক্তাক্ষর তৈরি হয় (যেমন <code>k+t</code> &rarr; ক্ত, <code>kSh</code> &rarr; ক্ষ, <code>gg</code> &rarr; জ্ঞ)।
              </div>
              <div>
                <strong className="text-foreground font-semibold">যুক্তাক্ষর রোকা (`):</strong> দুটি ব্যঞ্জনবর্ণের মাঝে <code>`</code> (backtick) ব্যবহার করুন (যেমন <code>b`r</code> &rarr; বর, <code>k`t</code> &rarr; কত)।
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <strong className="text-foreground font-semibold">র-ফলা (r):</strong> ব্যঞ্জনবর্ণের পর <code>r</code> চাপুন (যেমন <code>br</code> &rarr; ব্র, <code>gr</code> &rarr; গ্র)।
              </div>
              <div>
                <strong className="text-foreground font-semibold">রেফ (rr):</strong> ব্যঞ্জনবর্ণের পূর্বে <code>rr</code> চাপুন (যেমন <code>rk</code> &rarr; র্ক, <code>rm</code> &rarr; র্ম)।
              </div>
              <div>
                <strong className="text-foreground font-semibold">ঋ-কার (rri):</strong> ব্যঞ্জনবর্ণের পর <code>rri</code> চাপুন (যেমন <code>krrishoK</code> &rarr; কৃষক, <code>smrriti</code> &rarr; স্মৃতি)।
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
