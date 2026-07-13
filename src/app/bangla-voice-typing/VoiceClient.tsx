/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Copy, Check, RotateCcw, Download } from "lucide-react";

interface ISpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
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
    rec.onstart = () => setIsListening(true);
    rec.onend = () => { setIsListening(false); setInterimText(""); };
    rec.onerror = () => { setIsListening(false); setInterimText(""); };
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
    <main className="app-container">
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
          Voice Typing
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Speak in Bangla or English and get text output using Web Speech API.
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <button
          onClick={toggleListening}
          className={isListening ? "btn-primary" : "btn-secondary"}
          style={{ padding: "12px 24px", gap: 8, fontSize: "0.9rem" }}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          <span>{isListening ? "Stop Listening" : "Start Listening"}</span>
        </button>

        {/* Language selector */}
        <div className="section-tabs">
          {[
            { code: "bn-BD", label: "বাংলা" },
            { code: "en-US", label: "English" },
          ].map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`section-tab ${lang === l.code ? "active" : ""}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {isListening && (
          <span style={{ fontSize: "0.8rem", color: "var(--incorrect)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--incorrect)", display: "inline-block" }} />
            Listening...
          </span>
        )}
      </div>

      {/* Output */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            Transcription
          </label>
          {inputText && (
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={handleCopy} className="btn-icon">
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button onClick={handleDownload} className="btn-icon">
                <Download size={12} /> <span>Download</span>
              </button>
              <button onClick={() => { setInputText(""); setInterimText(""); }} className="btn-icon">
                <RotateCcw size={12} /> <span>Clear</span>
              </button>
            </div>
          )}
        </div>
        <div
          className="text-area-glow-output"
          style={{ fontFamily: "var(--font-bangla)", fontSize: "1.1rem", lineHeight: 1.7, minHeight: 200 }}
        >
          {inputText}
          {interimText && <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>{interimText}</span>}
          {!inputText && !interimText && (
            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {supported ? "Click 'Start Listening' and speak..." : "Your browser does not support speech recognition. Please use Chrome or Edge."}
            </span>
          )}
        </div>
      </div>

      {!supported && (
        <div className="glass-card" style={{ padding: 16, fontSize: "0.85rem", color: "var(--incorrect)", border: "1px solid hsla(0,72%,56%,0.3)" }}>
          Web Speech API is not available in this browser. Please use Google Chrome or Microsoft Edge for voice typing.
        </div>
      )}
    </main>
  );
}
