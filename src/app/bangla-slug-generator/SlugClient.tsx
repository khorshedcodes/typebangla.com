"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Globe, Info, Settings2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

const BANGLA_PHONETIC_MAP: { [key: string]: string } = {
  "অ": "o", "আ": "a", "ই": "i", "ঈ": "i", "উ": "u", "ঊ": "u", "ঋ": "ri", "এ": "e", "ঐ": "oi", "ও": "o", "ঔ": "ou",
  "া": "a", "ি": "i", "ী": "i", "ু": "u", "ূ": "u", "ৃ": "ri", "ে": "e", "ৈ": "oi", "ো": "o", "ৌ": "ou",
  "ক": "k", "খ": "kh", "গ": "g", "ঘ": "gh", "ঙ": "ng", "চ": "c", "ছ": "ch", "জ": "j", "ঝ": "jh", "ঞ": "n",
  "ট": "t", "ঠ": "th", "ড": "d", "ঢ": "dh", "ণ": "n", "ত": "t", "থ": "th", "দ": "d", "ধ": "dh", "ন": "n",
  "প": "p", "ফ": "f", "ব": "b", "ভ": "v", "ম": "m", "য": "z", "র": "r", "ল": "l", "শ": "sh", "ষ": "sh",
  "স": "s", "হ": "h", "ড়": "r", "ঢ়": "rh", "য়": "y", "ৎ": "t",
  "ং": "ng", "ঃ": "h", "ঁ": "n", "্য": "y", "್ರ": "r"
};

export default function SlugClient() {
  const [inputText, setInputText] = useState("");
  const [separator, setSeparator] = useState("-");
  const [copiedType, setCopiedType] = useState<"unicode" | "phonetic" | null>(null);
  const [domainName, setDomainName] = useState("yoursite.com");
  const [urlPrefix, setUrlPrefix] = useState("blog");

  const generateUnicodeSlug = (text: string) => {
    if (!text) return "";
    const regex = /[^\u0980-\u09FFa-zA-Z0-9]+/g;
    let slug = text
      .trim()
      .replace(regex, separator)
      .toLowerCase();

    const escapedSep = separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const duplicateRegex = new RegExp(`${escapedSep}+`, "g");
    const leadingRegex = new RegExp(`^${escapedSep}+`);
    const trailingRegex = new RegExp(`${escapedSep}+$`);

    slug = slug
      .replace(duplicateRegex, separator)
      .replace(leadingRegex, "")
      .replace(trailingRegex, "");

    return slug;
  };

  const generatePhoneticSlug = (text: string) => {
    if (!text) return "";

    const words = text.trim().split(/\s+/).filter(Boolean);
    const phoneticWords = words.map((word) => {
      let mappedWord = "";
      const chars = Array.from(word);
      
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        if (BANGLA_PHONETIC_MAP[char] !== undefined) {
          mappedWord += BANGLA_PHONETIC_MAP[char];
        } else if (/[a-zA-Z0-9]/.test(char)) {
          mappedWord += char.toLowerCase();
        }
      }

      return mappedWord
        .replace(/aa+/g, "a")
        .replace(/ee+/g, "e")
        .replace(/ii+/g, "i")
        .replace(/oo+/g, "o")
        .replace(/uu+/g, "u")
        .replace(/uu+/g, "u")
        .replace(/yy+/g, "y");
    });

    const slug = phoneticWords.filter(Boolean).join(separator);
    
    const escapedSep = separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const leadingRegex = new RegExp(`^${escapedSep}+`);
    const trailingRegex = new RegExp(`${escapedSep}+$`);

    return slug.replace(leadingRegex, "").replace(trailingRegex, "");
  };

  const unicodeSlug = generateUnicodeSlug(inputText);
  const phoneticSlug = generatePhoneticSlug(inputText);

  const handleCopy = (slugText: string, type: "unicode" | "phonetic") => {
    if (!slugText) return;
    navigator.clipboard.writeText(slugText);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 fade-in">
      {/* Page Header */}
      <div className="space-y-0.5">
        <h1 className="text-xl font-bold text-zinc-900">
          Bangla URL Slug Generator
        </h1>
        <p className="text-xs text-muted-foreground">
          Convert Bangla text into SEO-friendly, clean URL slugs in phonetic English or formatted Unicode.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Columns: Input & Output */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Input Panel */}
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-zinc-800">Bangla Input Text</CardTitle>
              <CardDescription className="text-[11px]">Type or paste Bangla paragraphs to format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <textarea
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="এখানে বাংলা লিখুন বা পেস্ট করুন... (যেমন: আমার সোনার বাংলা)"
                className="w-full text-sm p-3.5 border border-zinc-200 bg-background text-zinc-800 rounded-md placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 resize-y leading-relaxed font-bangla"
              />
              {inputText && (
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setInputText("")} 
                    className="gap-1.5 h-8 border-zinc-200"
                  >
                    <RotateCcw size={12} className="text-zinc-400" />
                    <span>Clear Input</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Slugs Outputs */}
          <div className="space-y-4">
            {/* Output 1: Unicode Bangla Slug */}
            <Card className="border border-border bg-card shadow-sm">
              <CardContent className="p-5 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-zinc-900 block">Unicode Bangla Slug</span>
                    <span className="text-[10px] text-muted-foreground block">
                      SEO-friendly Bangla characters. Browser will percent-encode this slug.
                    </span>
                  </div>
                  {unicodeSlug && (
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(unicodeSlug, "unicode")} 
                      className={`gap-1.5 h-8 ${copiedType === "unicode" ? "border-emerald-200 text-emerald-700 bg-emerald-50/50" : "border-zinc-200 text-zinc-500"}`}
                    >
                      {copiedType === "unicode" ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedType === "unicode" ? "Copied" : "Copy"}</span>
                    </Button>
                  )}
                </div>
                <div className="border border-zinc-200 bg-zinc-50 p-4 rounded-md font-bangla text-base min-h-[50px] flex items-center text-zinc-800 break-all select-all">
                  {unicodeSlug || <span className="text-zinc-400 text-xs font-sans">Unicode slug will appear here...</span>}
                </div>
              </CardContent>
            </Card>

            {/* Output 2: Phonetic English Slug */}
            <Card className="border border-border bg-card shadow-sm">
              <CardContent className="p-5 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-emerald-700 block">Phonetic English Slug (Recommended)</span>
                    <span className="text-[10px] text-muted-foreground block">
                      English phonetic equivalent. Safe from percent-encoding when shared online.
                    </span>
                  </div>
                  {phoneticSlug && (
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(phoneticSlug, "phonetic")} 
                      className={`gap-1.5 h-8 ${copiedType === "phonetic" ? "border-emerald-200 text-emerald-700 bg-emerald-50/50" : "border-zinc-200 text-zinc-500"}`}
                    >
                      {copiedType === "phonetic" ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedType === "phonetic" ? "Copied" : "Copy"}</span>
                    </Button>
                  )}
                </div>
                <div className="border border-zinc-200 bg-zinc-50 p-4 rounded-md font-mono text-sm min-h-[50px] flex items-center text-zinc-800 break-all select-all">
                  {phoneticSlug || <span className="text-zinc-400 text-xs font-sans">Phonetic slug will appear here...</span>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* URL Address Bar Preview */}
          {(unicodeSlug || phoneticSlug) && (
            <Card className="border border-emerald-200 bg-emerald-50/5/50 p-5 shadow-sm">
              <CardContent className="p-0 space-y-3">
                <span className="text-xs font-bold text-zinc-700 block">
                  Live URL Address Bar Preview
                </span>
                <div className="bg-white border border-zinc-200 rounded-md p-3 font-mono text-xs flex items-center space-x-2 overflow-x-auto shadow-inner text-zinc-700 select-all">
                  <Globe size={13} className="text-emerald-600 flex-shrink-0" />
                  <span className="text-zinc-400">https://</span>
                  <span className="text-zinc-800">{domainName}</span>
                  <span className="text-zinc-400">/{urlPrefix}/</span>
                  <span className="text-emerald-600 font-bold">{phoneticSlug || unicodeSlug}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Settings & Info */}
        <div className="space-y-6">
          {/* Settings Panel */}
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                <Settings2 size={15} className="text-emerald-600" />
                <span>Slug Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Separator Select */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-zinc-700 block">Slug Separator</span>
                <div className="flex gap-2">
                  {[
                    { value: "-", label: "Hyphen (-)" },
                    { value: "_", label: "Underscore (_)" }
                  ].map((s) => (
                    <Button
                      key={s.value}
                      variant={separator === s.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSeparator(s.value)}
                      className={`flex-1 h-8 text-xs ${
                        separator === s.value ? "bg-zinc-950 text-white hover:bg-zinc-900" : "border-zinc-200"
                      }`}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Mock Site Customization */}
              <div className="space-y-3 pt-3 border-t border-border">
                <span className="text-[11px] font-bold text-zinc-700 block">Mock Domain Prefix</span>
                <div className="flex flex-col space-y-2">
                  <Input 
                    type="text" 
                    value={domainName} 
                    onChange={(e) => setDomainName(e.target.value)}
                    className="h-8 text-xs border-zinc-200"
                    placeholder="e.g. mysite.com"
                  />
                  <Input 
                    type="text" 
                    value={urlPrefix} 
                    onChange={(e) => setUrlPrefix(e.target.value)}
                    className="h-8 text-xs border-zinc-200"
                    placeholder="e.g. posts"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Explanation block */}
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center space-x-2 space-y-0">
              <Info size={15} className="text-amber-500" />
              <CardTitle className="text-xs font-bold text-zinc-900">Sharing Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-[11px] text-zinc-600 leading-relaxed space-y-2">
              <p>
                Browsers display clean Bangla words in the address bar (e.g. <code>/আমার-বাংলা</code>). 
                However, when you **copy-paste** that URL into a chat, document, or email, it turns into a long string of percent-encoded characters:
              </p>
              <div className="bg-zinc-50 border border-zinc-150 p-2 rounded text-[10px] font-mono text-red-650 word-break-all">
                /%E0%A6%86%E0%A6%AE%E0%A6%BE%E0%A6%B0-%E0%A6%AC...
              </div>
              <p>
                This causes broken formatting in messaging apps and makes URLs extremely long.
              </p>
              <p>
                <strong>Solution:</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Use **Phonetic Slugs** (like <code>amar-bangla</code>) to guarantee perfect sharing compatibility across Slack, Facebook, and emails.</li>
                <li>Use **Unicode Slugs** if you strictly target Bangla Search Engine Optimization (SEO).</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
