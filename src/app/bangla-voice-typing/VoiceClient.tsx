/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Copy, Check, RotateCcw, Download, Sparkles, AlertTriangle, Info } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { cn } from "../../utils/cn";

interface ISpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: ISpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
}

interface ISpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

interface ISpeechRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [key: number]: {
      isFinal: boolean;
      [key: number]: {
        transcript: string;
      };
    };
  };
}

export default function VoiceClient() {
  const [inputText, setInputText] = useState("");
  const [interimText, setInterimText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [lang, setLang] = useState("bn-BD");
  const [copied, setCopied] = useState(false);
  const [supported, setSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const shouldListenRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = typeof window !== "undefined" && (
      (window as Window & { SpeechRecognition?: new () => ISpeechRecognition }).SpeechRecognition || 
      (window as Window & { webkitSpeechRecognition?: new () => ISpeechRecognition }).webkitSpeechRecognition
    );
    if (!SpeechRecognition) { 
      setSupported(false); 
      return; 
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = lang;
    rec.onstart = () => {
      setIsListening(true);
      setError(null);
    };
    rec.onend = () => { 
      if (shouldListenRef.current) {
        try {
          rec.start();
        } catch {
          setIsListening(false);
          shouldListenRef.current = false;
        }
      } else {
        setIsListening(false); 
        setInterimText("");
      }
    };
    rec.onerror = (event: ISpeechRecognitionErrorEvent) => {
      if (event.error === "no-speech" || event.error === "aborted") {
        return;
      }
      shouldListenRef.current = false;
      setIsListening(false);
      setInterimText("");

      let errorMsg = "An error occurred during speech recognition.";
      if (event.error === "not-allowed") {
        errorMsg = "মাইক্রোফোনের অনুমতি দেওয়া হয়নি (Microphone Access Denied)। ব্রাউজার সেটিংসে অনুমতি দিন।";
      } else if (event.error === "audio-capture") {
        errorMsg = "মাইক্রোফোন বা রেকর্ডার পাওয়া যায়নি। আপনার ডিভাইস সংযোগ পরীক্ষা করুন।";
      } else if (event.error === "network") {
        errorMsg = "নেটওয়ার্ক সমস্যা দেখা দিয়েছে। আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।";
      } else if (event.error === "language-not-supported") {
        errorMsg = "নির্বাচিত ভাষাটি আপনার ব্রাউজার ইঞ্জিনে সমর্থিত নয়।";
      } else {
        errorMsg = `Speech recognition error: ${event.error || "unknown"}`;
      }
      setError(errorMsg);
    };
    rec.onresult = (event: ISpeechRecognitionEvent) => {
      let final = "", interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) final += event.results[i][0].transcript + " ";
        else interim += event.results[i][0].transcript;
      }
      if (final) setInputText(prev => prev + final);
      setInterimText(interim);
    };
    recognitionRef.current = rec;
    return () => { 
      shouldListenRef.current = false;
      if (recognitionRef.current) recognitionRef.current.stop(); 
    };
  }, [lang]);

  const toggleListening = () => {
    setError(null);
    if (!supported) { 
      setError("আপনার ব্রাউজারে ভয়েস টাইপিং সাপোর্ট করে না। অনুগ্রহ করে Google Chrome, Microsoft Edge, বা Brave ব্রাউজার ব্যবহার করুন।"); 
      return; 
    }
    if (shouldListenRef.current) {
      shouldListenRef.current = false;
      setIsListening(false);
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        console.error(e);
      }
    } else {
      shouldListenRef.current = true;
      setIsListening(true);
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error(e);
        shouldListenRef.current = false;
        setIsListening(false);
      }
    }
  };

  const handleCopy = () => {
    if (!inputText) return;
    navigator.clipboard.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!inputText) return;
    const blob = new Blob([inputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); 
    a.href = url; 
    a.download = `voice-${Date.now()}.txt`; 
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 fade-in text-foreground">
      {/* Page Header */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary animate-pulse" />
          <span>AI VOICE SPEECH TO TEXT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Bangla Voice Typing
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          মাইক্রোফোনে কথা বলুন — স্বয়ংক্রিয়ভাবে নিখুঁত বাংলা ও ইংরেজি টেক্সট লিখিত হবে।
        </p>
      </section>

      {/* Permanent Browser Compatibility Notice */}
      <div className="p-3.5 bg-secondary/80 border border-border rounded-2xl text-xs font-bold text-muted-foreground flex items-center gap-3 max-w-2xl mx-auto shadow-xs">
        <Info size={18} className="text-primary shrink-0" />
        <span>
          <strong>ব্রাউজার সামঞ্জস্যতা তথ্য (Notice):</strong> ভয়েস টাইপিং বৈশিষ্ট্যটি <strong>Google Chrome</strong>, <strong>Microsoft Edge</strong> এবং <strong>Brave</strong> ব্রাউজারে সবচেয়ে নিখুঁত কাজ করে। ব্রাউজার ইঞ্জিনের সীমাবদ্ধতার কারণে সব ব্রাউজার বা ডিভাইসে এটি উপলব্ধ নাও হতে পারে।
        </span>
      </div>

      {/* Browser Support Check Alert */}
      {!supported && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-3 shadow-xs">
          <AlertTriangle size={20} className="shrink-0" />
          <div>
            <span>আপনার ব্রাউজারে ভয়েস টাইপিং সার্ভিস সাপোর্ট করে না। সেরা অভিজ্ঞতার জন্য <strong>Google Chrome</strong>, <strong>Microsoft Edge</strong>, বা <strong>Brave</strong> ব্রাউজার ব্যবহার করুন।</span>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-3 shadow-xs animate-in fade-in">
          <AlertTriangle size={20} className="shrink-0" />
          <div className="flex-1">
            <span className="block font-black">ভয়েস টাইপিং সমস্যা:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Recording Controls and Editor Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Controls Bar */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              
              <div className="flex items-center space-x-4">
                {/* Pulsing Mic Button */}
                <button
                  onClick={toggleListening}
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-xs cursor-pointer focus:outline-none",
                    {
                      "bg-red-500 border-red-400 text-white animate-pulse": isListening,
                      "bg-secondary border-border text-foreground hover:border-primary": !isListening
                    }
                  )}
                  title={isListening ? "Stop listening" : "Start voice typing"}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <div className="space-y-0.5">
                  <span className="text-xs font-black text-foreground block">
                    {isListening ? "ভয়েস রেকর্ড সক্রিয়..." : "কথা বলতে মাইক্রোফোনে চাপ দিন"}
                  </span>
                  <span className={cn("text-xs block font-bold", isListening ? "text-red-500 animate-pulse" : "text-muted-foreground")}>
                    {isListening ? "মাইক্রোফোনে স্পষ্ট ভাষায় কথা বলুন..." : "রেডি আছেন? স্পিক বাটন চাপুন।"}
                  </span>
                </div>
              </div>

              {/* Language Selector */}
              <div className="flex items-center space-x-3">
                <div className="flex bg-secondary p-1 rounded-xl border border-border w-fit">
                  {[
                    { code: "bn-BD", label: "🇧🇩 বাংলা (BN)" },
                    { code: "en-US", label: "🌐 English (EN)" },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        if (!isListening) setLang(l.code);
                      }}
                      disabled={isListening}
                      className={cn(
                        "px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer",
                        lang === l.code
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground disabled:opacity-50"
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Text Editor Canvas */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
              <span className="text-xs font-black text-foreground">ভয়েস টাইপিং আউটপুট ক্যানভাস</span>
              <div className="flex items-center gap-2">
                {inputText && (
                  <>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="h-8 text-xs font-bold gap-1 border-border cursor-pointer"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="h-8 text-xs font-bold gap-1 border-border cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setInputText("")}
                      className="h-8 text-xs font-bold gap-1 border-border cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      <span>Clear</span>
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-5 min-h-[300px] bg-transparent text-foreground text-base leading-relaxed font-sans relative">
                {inputText}
                {interimText && <span className="text-primary font-bold animate-pulse"> {interimText}</span>}
                {!inputText && !interimText && (
                  <span className="text-muted-foreground text-xs font-sans">
                    মাইক্রোফোন বাটন চেপে কথা বলা শুরু করুন... আপনার বলা কথা এখানে রিয়েল-টাইমে টাইপ হবে।
                  </span>
                )}
              </div>
              <div className="p-4 flex justify-between items-center text-xs font-bold text-muted-foreground bg-secondary border-t border-border rounded-b-2xl">
                <span>শব্দ: <strong className="text-foreground">{inputText ? inputText.trim().split(/\s+/).filter(Boolean).length : 0}</strong></span>
                <span>অক্ষর: <strong className="text-foreground">{inputText.length}</strong></span>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Tips & Info */}
        <div className="space-y-6">
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardHeader className="pb-3 border-b border-border">
              <span className="text-xs font-black text-foreground flex items-center gap-1.5">
                <Info size={14} className="text-primary" />
                <span>নিখুঁত ভয়েস টাইপিং টিপস</span>
              </span>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs sm:text-sm text-muted-foreground">
              <p>১. শব্দহীন শান্ত পরিবেশে কথা বলুন যাতে মাইক্রোফোন স্পষ্ট শব্দ গ্রহণ করতে পারে।</p>
              <p>২. মাইক্রোফোনের কাছে স্বাভাবিক গতি ও স্পষ্ট উচ্চারণে কথা বলুন।</p>
              <p>৩. গুগল ক্রোম, মাইক্রোসফট এজ অথবা ব্রেইভ ব্রাউজারে ভয়েস ইঞ্জিন সবচেয়ে নিখুঁত কাজ করে।</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </main>
  );
}
