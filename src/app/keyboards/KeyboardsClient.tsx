"use client";

import React, { useState } from "react";
import { useTypingStore, KeyboardLayout } from "../../store/typingStore";
import VirtualKeyboard from "../../components/VirtualKeyboard";
import { JATIYA_MAP, UNI_BIJOY_MAP, PROBHAT_MAP, INSCRIPT_MAP, UNICODE_MAP, avroTransliterate } from "../../utils/layouts";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Keyboard, Info, RotateCcw, Sparkles } from "lucide-react";

export default function KeyboardsClient() {
  const { activeLayout, setActiveLayout } = useTypingStore();
  const [sandboxText, setSandboxText] = useState("");
  const [avroBuffer, setAvroBuffer] = useState("");

  const layoutsList: { id: KeyboardLayout; name: string; desc: string; type: string }[] = [
    { 
      id: "avro", 
      name: "Avro Phonetic", 
      desc: "Transliteration layout. Type Bangla using English characters phonetically (e.g. type 'ami' to get 'আমি'). Excellent for fast, modern typing.",
      type: "Phonetic / Transliteration"
    },
    { 
      id: "unibijoy", 
      name: "UniBijoy", 
      desc: "Uniform Bijoy-style layout utilizing Unicode character mappings. Very popular for traditional printing, publishing, and official typing.",
      type: "Unicode Bijoy"
    },
    { 
      id: "jatiya", 
      name: "Jatiya", 
      desc: "The National Standard Layout approved by Bangladesh Computer Council (BCC). Uses standard layout mappings for Bangla characters.",
      type: "BCC National Standard"
    },
    { 
      id: "probhat", 
      name: "Probhat", 
      desc: "An alternative, highly intuitive layout designed to align similar sounding Bangla characters to their English key equivalents, making it easy to learn.",
      type: "Phonetic Fixed Map"
    },
    { 
      id: "inscript", 
      name: "Inscript", 
      desc: "Standardized layout for Indian and South Asian scripts. Placements are optimized for ergonomic keying of native vowels and consonants.",
      type: "South Asian Standard"
    },
    { 
      id: "unicode", 
      name: "Unicode", 
      desc: "Standard fixed Unicode mapping. Maps each key directly to a Bangla character code point for clean layout rendering without font translations.",
      type: "Standard Unicode Map"
    },
    { 
      id: "english", 
      name: "English QWERTY", 
      desc: "Standard worldwide English QWERTY keyboard map.",
      type: "Latin Standard"
    }
  ];

  const activeInfo = layoutsList.find((l) => l.id === activeLayout) || layoutsList[0];

  const handleSandboxKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Backspace") {
      if (activeLayout === "avro" && avroBuffer) {
        setAvroBuffer(prev => prev.slice(0, -1));
      } else {
        setSandboxText(prev => prev.slice(0, -1));
      }
      e.preventDefault();
      return;
    }
    
    if (e.code === "Space") {
      if (activeLayout === "avro" && avroBuffer) {
        const ban = avroTransliterate(avroBuffer);
        setSandboxText(prev => prev + ban + " ");
        setAvroBuffer("");
      } else {
        setSandboxText(prev => prev + " ");
      }
      e.preventDefault();
      return;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.altKey) {
      e.preventDefault();

      if (activeLayout === "english") {
        setSandboxText(prev => prev + e.key);
      } else if (activeLayout === "avro") {
        if (/[a-zA-Z]/i.test(e.key)) {
          setAvroBuffer(prev => prev + e.key);
        } else {
          let committed = "";
          if (avroBuffer) {
            committed = avroTransliterate(avroBuffer);
            setAvroBuffer("");
          }
          let mappedChar = e.key;
          if (e.key >= "0" && e.key <= "9") {
            const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
            mappedChar = banglaDigits[parseInt(e.key, 10)];
          } else if (e.key === ".") {
            mappedChar = "।";
          }
          setSandboxText(prev => prev + committed + mappedChar);
        }
      } else {
        const map = 
          activeLayout === "unibijoy" ? UNI_BIJOY_MAP :
          activeLayout === "jatiya" ? JATIYA_MAP :
          activeLayout === "probhat" ? PROBHAT_MAP :
          activeLayout === "inscript" ? INSCRIPT_MAP :
          activeLayout === "unicode" ? UNICODE_MAP :
          null;

        if (map && map[e.code]) {
          const resolved = e.shiftKey ? map[e.code].shift : map[e.code].normal;
          if (resolved) {
            setSandboxText(prev => prev + resolved);
          }
        } else {
          setSandboxText(prev => prev + e.key);
        }
      }
    }
  };

  const currentAvroPreview = avroBuffer ? avroTransliterate(avroBuffer) : "";

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 fade-in">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
            <Keyboard size={28} className="text-emerald-600" />
            <span>Keyboard Layouts Explorer</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Explore maps, test keystrokes dynamically, and master Bangla and English keyboard standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns: Selector and Interactive Keyboard */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {/* Layout Selector Pill Row */}
          <Card className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl bg-gradient-to-br from-white to-zinc-50/30 dark:from-zinc-900 dark:to-zinc-950/30 p-4 shadow-sm">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-xs uppercase font-extrabold tracking-widest text-zinc-400">
                Select Layout Model
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-wrap gap-2">
              {layoutsList.map((layout) => {
                const isActive = activeLayout === layout.id;
                return (
                  <button
                    key={layout.id}
                    onClick={() => {
                      setActiveLayout(layout.id);
                      setSandboxText("");
                      setAvroBuffer("");
                    }}
                    className={cn(
                      "px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer select-none",
                      {
                        "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-transparent shadow-sm": isActive,
                        "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-850": !isActive
                      }
                    )}
                  >
                    {layout.name}
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Interactive Virtual Keyboard */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                Keyboard Layout Map (Press keys on physical keyboard to test)
              </span>
              {activeLayout !== "english" && activeLayout !== "avro" && (
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Sparkles size={11} /> Shift highlights alternative symbols
                </span>
              )}
            </div>
            
            <VirtualKeyboard nextChar="" />
          </div>

          {/* Sandbox Typing Field */}
          <Card className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl bg-gradient-to-br from-white to-zinc-50/30 dark:from-zinc-900 dark:to-zinc-950/30 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Interactive Typing Sandbox
                </CardTitle>
                <p className="text-[10px] text-muted-foreground">
                  Focus this textarea to practice layout keying without constraints.
                </p>
              </div>
              
              {sandboxText.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSandboxText("");
                    setAvroBuffer("");
                  }}
                  className="text-red-500 hover:text-red-600 text-xs px-2 h-7 gap-1"
                >
                  <RotateCcw size={11} /> Clear Sandbox
                </Button>
              )}
            </div>

            <div className="relative">
              <textarea
                value={sandboxText + (activeLayout === "avro" ? avroBuffer : "")}
                onKeyDown={handleSandboxKeyDown}
                readOnly
                placeholder="Click here and begin typing to test character combinations..."
                className="w-full h-24 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-sm bg-zinc-50 dark:bg-zinc-850/50 text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none focus:ring-1 focus:ring-emerald-500 font-sans cursor-text leading-relaxed"
              />
              
              {activeLayout === "avro" && avroBuffer.length > 0 && (
                <div className="absolute right-3 bottom-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono">
                  Phonetic Buffer: <span className="font-bold">{avroBuffer}</span> {currentAvroPreview && `➔ ${currentAvroPreview}`}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Layout Details Card */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <Card className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl bg-gradient-to-br from-white to-zinc-50/30 dark:from-zinc-900 dark:to-zinc-950/30 p-5 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-border pb-3">
              <Info size={16} className="text-emerald-600" />
              <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Layout Specifications
              </CardTitle>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">Layout Standard</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm block">{activeInfo.name}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">Mapping Framework</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block">{activeInfo.type}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">System Description</span>
                <p className="text-zinc-650 dark:text-zinc-400 leading-relaxed font-medium">{activeInfo.desc}</p>
              </div>

              {activeLayout === "avro" && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-450 rounded-xl leading-relaxed space-y-1.5">
                  <span className="font-bold block text-[10px] uppercase tracking-wider text-amber-700">Avro Typing Shortcuts</span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px]">
                    <li>Type <code>khor</code> to get <code>খর</code></li>
                    <li>Type <code>o</code> to get <code>ও</code> or <code>a</code> to get <code>আ</code></li>
                    <li>Type <code>rri</code> to get <code>ঋ</code></li>
                    <li>Use capital <code>NG</code> for <code>ঞ</code></li>
                    <li>Press <code>Space</code> to commit phonetic characters</li>
                  </ul>
                </div>
              )}

              {activeLayout !== "english" && activeLayout !== "avro" && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 rounded-xl leading-relaxed space-y-1">
                  <span className="font-bold block text-[10px] uppercase tracking-wider text-emerald-700">Fixed Layout Tip</span>
                  <p className="text-[10px]">
                    To type joint/conjunct characters (like <code>ক্ষ</code> or <code>জ্ঞ</code>), connect the two consonants with the Hasant key (linkage sign <code>্</code>). 
                    For Jatiya/UniBijoy, the Hasant modifier is mapped to the <code>G</code> key. E.g., type <code>k</code> + <code>g</code> + <code>Shift+N</code> to get <code>ক্ষ</code>.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Key Differences Matrix (UniBijoy vs Jatiya) */}
          <Card className="border border-border bg-card rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-border pb-2">
              <span className="text-sm font-extrabold text-foreground">UniBijoy vs Jatiya Differences</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              UniBijoy and BCC Jatiya look similar, but key positions for <strong>Key F</strong> and <strong>Key H</strong> are swapped:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] divide-y divide-border">
                <thead className="text-muted-foreground font-bold border-b border-border">
                  <tr>
                    <th className="py-1.5">Key</th>
                    <th className="py-1.5">UniBijoy</th>
                    <th className="py-1.5">Jatiya (BCC)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-1 font-mono font-bold text-foreground">Key F</td>
                    <td className="py-1 font-bold text-emerald-600">া (akar) / অ</td>
                    <td className="py-1 font-bold text-blue-600">ব / ভ</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-bold text-foreground">Key H</td>
                    <td className="py-1 font-bold text-emerald-600">ব / ভ</td>
                    <td className="py-1 font-bold text-blue-600">া (akar) / অ</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-mono font-bold text-foreground">Key Z</td>
                    <td className="py-1 font-bold text-emerald-600">্য (jafala) / ্র</td>
                    <td className="py-1 font-bold text-blue-600">ঁ / ঃ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
