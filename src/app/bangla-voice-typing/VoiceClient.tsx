/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Copy, Check, RotateCcw, Download, Sparkles, Volume2, Info } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
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

  useEffect(() => {
    const SpeechRecognition = typeof window !== "undefined" && (
      (window as Window & { SpeechRecognition?: new () => ISpeechRecognition }).SpeechRecognition || 
      (window as Window & { webkitSpeechRecognition?: new () => ISpeechRecognition }).webkitSpeechRecognition
    );
    if (!SpeechRecognition) { setSupported(false); return; }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = lang;
    rec.onstart = () => {
      setIsListening(true);
      setError(null);
    };
    rec.onend = () => { setIsListening(false); setInterimText(""); };
    rec.onerror = (event: ISpeechRecognitionErrorEvent) => {
      setIsListening(false);
      setInterimText("");
      console.error("Speech recognition error:", event.error);

      let errorMsg = "An error occurred during speech recognition.";
      if (event.error === "not-allowed") {
        errorMsg = "Microphone access was denied. Please check your browser's microphone permissions for this site.";
      } else if (event.error === "no-speech") {
        errorMsg = "No speech was detected. Please try again and speak closer to the microphone.";
      } else if (event.error === "audio-capture") {
        errorMsg = "Microphone not detected. Please ensure your recording hardware is connected and active.";
      } else if (event.error === "network") {
        errorMsg = "A network error occurred. Please check your internet connection.";
      } else if (event.error === "language-not-supported") {
        errorMsg = "The selected language is not supported by your browser's speech recognition engine.";
      } else if (event.error === "aborted") {
        errorMsg = "Speech recognition was stopped.";
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
    return () => { if (recognitionRef.current) recognitionRef.current.stop(); };
  }, [lang]);

  const toggleListening = () => {
    setError(null);
    if (!supported) { alert("Speech recognition requires Chrome or Edge."); return; }
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
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
    const a = document.createElement("a"); a.href = url; a.download = `voice-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 fade-in">
      {/* Page Header */}
      <div className="space-y-0.5">
        <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
          <Sparkles className="text-emerald-600" size={18} />
          <span>Bangla &amp; English Voice Typing</span>
        </h1>
        <p className="text-xs text-muted-foreground">
          Convert spoken words into typed text instantly using Google&apos;s Web Speech engine.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Recording Controls and Editor Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Controls Bar */}
          <Card className="border border-border bg-card shadow-sm">
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              
              <div className="flex items-center space-x-4">
                {/* Pulsing Mic Indicator */}
                <button
                  onClick={toggleListening}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    {
                      "bg-red-500 border-red-400 text-white animate-pulse": isListening,
                      "bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700": !isListening
                    }
                  )}
                  title={isListening ? "Stop listening" : "Start voice typing"}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-zinc-900 block">
                    {isListening ? "Listening Active" : "Click to Speak"}
                  </span>
                  <span className={cn("text-[10px] block", isListening ? "text-red-500 font-medium" : "text-muted-foreground")}>
                    {isListening ? "Speak clearly into your microphone..." : "Ready when you are."}
                  </span>
                </div>
              </div>

              {/* Language Selector & simulator */}
              <div className="flex items-center space-x-4">
                <div className="flex bg-zinc-100 p-0.5 rounded-md border border-zinc-200 w-fit">
                  {[
                    { code: "bn-BD", label: "বাংলা (BN)" },
                    { code: "en-US", label: "English (EN)" },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        if (!isListening) setLang(l.code);
                      }}
                      disabled={isListening}
                      className={cn(
                        "px-3 py-1 text-[10px] font-semibold rounded-sm transition-all",
                        lang === l.code
                          ? "bg-white text-zinc-950 shadow-sm"
                          : "text-zinc-500 hover:text-zinc-900 disabled:opacity-50"
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>

                {/* Bouncing Audio Wave simulator */}
                {isListening && (
                  <div className="flex items-end space-x-0.5 h-4 select-none pb-0.5">
                    <div className="w-0.5 bg-red-500 rounded-full h-2 animate-[pulseLive_0.8s_infinite]" />
                    <div className="w-0.5 bg-red-500 rounded-full h-4 animate-[pulseLive_0.5s_infinite_delay-100]" />
                    <div className="w-0.5 bg-red-500 rounded-full h-3 animate-[pulseLive_0.7s_infinite_delay-200]" />
                    <div className="w-0.5 bg-red-500 rounded-full h-1 animate-[pulseLive_0.9s_infinite_delay-300]" />
                  </div>
                )}
              </div>

            </CardContent>
          </Card>

          {error && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-800 flex items-start gap-2.5 shadow-sm animate-fade-in">
              <span className="font-semibold select-none mt-0.5">⚠️</span>
              <div className="flex-1">
                <span className="font-semibold block mb-0.5">Voice Typing Issue</span>
                <span>{error}</span>
              </div>
              <button 
                onClick={() => setError(null)}
                className="text-amber-500 hover:text-amber-700 font-bold ml-auto text-[10px]"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Editor Panel */}
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
              <span className="text-xs font-bold text-zinc-900">Transcribed Output Text</span>
              {inputText && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleCopy} 
                    className={cn("gap-1.5 h-8 border-zinc-200 text-xs", {
                      "border-emerald-200 text-emerald-700 bg-emerald-50/50": copied
                    })}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleDownload} 
                    className="gap-1.5 h-8 border-zinc-200 text-xs text-zinc-650"
                  >
                    <Download size={12} />
                    <span>Download</span>
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-5 font-bangla text-base min-h-[220px] bg-white leading-relaxed text-zinc-900 border-b border-border break-words">
                {inputText}
                {interimText && <span className="text-zinc-400 italic"> {interimText}</span>}
                {!inputText && !interimText && (
                  <span className="text-zinc-400 text-xs font-sans">
                    {supported ? "Click the microphone button and start speaking..." : "Your browser does not support speech recognition. Please use Google Chrome or Microsoft Edge."}
                  </span>
                )}
              </div>
              <div className="p-4 flex justify-between items-center text-[10px] font-medium text-muted-foreground bg-zinc-50 rounded-b-lg">
                <span>Words: {inputText ? inputText.trim().split(/\s+/).length : 0} | Characters: {inputText.length}</span>
                {inputText && (
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => { setInputText(""); setInterimText(""); }} 
                    className="h-7 text-[10px] gap-1 border-zinc-200"
                  >
                    <RotateCcw size={11} className="text-zinc-400" />
                    <span>Reset Canvas</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Tips & Info */}
        <div className="space-y-6">
          
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                <Volume2 size={15} className="text-emerald-600" />
                <span>Voice Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[11px] text-zinc-600 leading-relaxed space-y-3">
              <div>
                <span className="font-bold text-zinc-700 block mb-0.5">Active Engine:</span>
                <span className="font-medium text-zinc-800">Web Speech API (Chrome/Edge Native)</span>
              </div>
              <div className="pt-3 border-t border-zinc-100">
                <span className="font-bold text-zinc-700 block mb-0.5">Current Locale Target:</span>
                <span className="font-medium text-zinc-800">
                  {lang === "bn-BD" ? "Bengali (Bangladesh)" : "English (United States)"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center space-x-2 space-y-0">
              <Info size={15} className="text-amber-500" />
              <CardTitle className="text-xs font-bold text-zinc-900">Pro UX Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-[11px] text-zinc-600 leading-relaxed space-y-2">
              <p>🗣️ Speak at a moderate speed and keep the microphone close for best results.</p>
              <p>🔕 Make sure there is minimal background noise in your room.</p>
              <p>🌐 Works best in latest Google Chrome, Microsoft Edge, and Opera browsers on desktop.</p>
            </CardContent>
          </Card>

        </div>

      </div>

      {!supported && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-xs text-red-700">
          ⚠️ Web Speech Recognition is not available in this browser. Please load this page in Google Chrome or Microsoft Edge.
        </div>
      )}
    </main>
  );
}
