"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTypingStore, KeyboardLayout, SoundProfile, playTypewriterSound } from "../../store/typingStore";
import TypingArea from "../../components/TypingArea";
import VirtualKeyboard from "../../components/VirtualKeyboard";
import LessonSelector from "../../components/LessonSelector";
import ExamCenter from "../../components/ExamCenter";
import StatsDashboard from "../../components/StatsDashboard";
import TypeBanglaCoachPanel from "../../components/TypeBanglaCoachPanel";
import { RotateCcw, Sparkles, Settings, X, Volume2, VolumeX, ArrowLeft, BookOpen, Gauge, BarChart3, Keyboard } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../utils/cn";

export default function PracticeClient() {
  const {
    targetText,
    typedText,
    activeLayout,
    setActiveLayout,
    isStarted,
    isCompleted,
    elapsedTime,
    resetTest,
    updateElapsedTime,
    errorIndices,
    isRecapTest,
    startRecapTest,
    exitRecapTest,
    focusKeys,
    lessonType,
    soundEnabled,
    setSoundEnabled,
    soundVolume,
    setSoundVolume,
    soundProfile,
    setSoundProfile
  } = useTypingStore();

  const [activeSection, setActiveSection] = useState<"lessons" | "speedtest" | "dashboard">("lessons");
  const [showSettings, setShowSettings] = useState(false);
  const [isArenaActive, setIsArenaActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStarted && !isCompleted) {
      interval = setInterval(() => updateElapsedTime(), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isStarted, isCompleted, updateElapsedTime]);

  // Listen for Enter key to start practice arena
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isArenaActive && e.code === "Enter" && !showSettings && !isCompleted) {
        e.preventDefault();
        resetTest();
        setIsArenaActive(true);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isArenaActive, showSettings, isCompleted, resetTest]);

  const finalWpm = Math.round((typedText.length / 5) / (elapsedTime / 60 || 1));
  const finalAccuracy = Math.round(((typedText.length - errorIndices.length) / (typedText.length || 1)) * 100);
  const nextChar = targetText[typedText.length] || "";

  return (
    <main className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 fade-in">
      {/* Top Control Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {isArenaActive ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                resetTest();
                setIsArenaActive(false);
              }}
              className="gap-1.5 h-9 text-zinc-500 hover:text-zinc-900 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Dashboard</span>
            </Button>
          ) : (
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1.5 h-9 text-zinc-500 hover:text-zinc-900">
                <ArrowLeft size={14} />
                <span>Exit Practice</span>
              </Button>
            </Link>
          )}
        </div>

        <div className="flex gap-2">
          {!isArenaActive && (
            <Link href="/layouts">
              <Button variant="outline" size="sm" className="gap-1.5 h-9 text-zinc-650 dark:text-zinc-350 cursor-pointer">
                <Keyboard size={14} />
                <span className="hidden sm:inline">Explore Keyboards</span>
              </Button>
            </Link>
          )}

          {/* Settings */}
          <Button variant="outline" size="sm" onClick={() => setShowSettings(true)} className="gap-1.5 h-9 cursor-pointer">
            <Settings size={14} className="text-zinc-500" />
            <span>Settings</span>
          </Button>

          {/* Restart (only show inside Arena) */}
          {isArenaActive && (
            <Button variant="outline" size="sm" onClick={resetTest} className="gap-1.5 h-9 cursor-pointer">
              <RotateCcw size={14} className="text-zinc-500" />
              <span>Restart</span>
            </Button>
          )}
        </div>
      </div>

      {!isArenaActive ? (
        /* Setup / Curriculum Dashboard Mode */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Active Lesson Dashboard Card */}
          <Card className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl bg-gradient-to-br from-white to-zinc-50/30 dark:from-zinc-900 dark:to-zinc-950/30 p-6 shadow-sm max-w-3xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 flex-1 min-w-0">
                <Badge variant="outline" className="bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-250/35 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] tracking-wide uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active Configuration</span>
                </Badge>
                <h2 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
                  {targetText.substring(0, 40)}...
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-zinc-400">Layout:</span>
                    <span className="font-bold text-zinc-850 dark:text-zinc-150 capitalize">{activeLayout}</span>
                  </div>
                  <span className="opacity-45">•</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-zinc-400">Language:</span>
                    <span className="font-bold text-zinc-850 dark:text-zinc-150 capitalize">
                      {targetText.match(/[a-zA-Z]/) ? "English" : "Bangla"}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed bg-zinc-50/60 dark:bg-zinc-850/40 p-3 border border-zinc-150/60 dark:border-zinc-800/50 rounded-xl font-mono">
                  {targetText}
                </p>
              </div>

              <div className="flex-shrink-0 flex flex-col gap-2.5">
                <Button
                  onClick={() => {
                    resetTest();
                    setIsArenaActive(true);
                  }}
                  size="lg"
                  className="bg-emerald-650 hover:bg-emerald-700 text-white font-extrabold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 h-11 px-6 rounded-xl cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>START TYPING ARENA</span>
                </Button>
                
                <div className="text-[10px] text-zinc-400 font-semibold text-center select-none">
                  Or press <kbd className="bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded text-zinc-655 font-bold">Enter</kbd> to launch
                </div>
              </div>
            </div>
          </Card>

          {/* Lower Section: Curriculum & Live Analytics Coach side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-border">
            {/* Left Columns: Curriculum Selector */}
            <div className="lg:col-span-2 flex flex-col space-y-6">
              <div className="flex bg-zinc-100/80 dark:bg-zinc-850/40 p-1.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 space-x-1.5 w-fit">
                {(["lessons", "speedtest", "dashboard"] as const).map((tab) => {
                  const isActive = activeSection === tab;
                  const Icon = tab === "lessons" ? BookOpen : tab === "speedtest" ? Gauge : BarChart3;
                  return (
                    <button
                      key={tab}
                      className={cn(
                        "flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all relative select-none cursor-pointer",
                        {
                          "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-455 shadow-sm border border-zinc-250/20 dark:border-zinc-700/30": isActive,
                          "text-zinc-500 dark:text-zinc-400 hover:bg-white/40 dark:hover:bg-zinc-900/30 hover:text-zinc-800 dark:hover:text-zinc-200": !isActive
                        }
                      )}
                      onClick={() => setActiveSection(tab)}
                    >
                      <Icon size={13} className={isActive ? "text-emerald-500" : "text-zinc-400"} />
                      <span>{tab === "speedtest" ? "Speed Test" : tab === "dashboard" ? "Progress Stats" : "Lessons"}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2">
                {activeSection === "lessons" ? (
                  <LessonSelector />
                ) : activeSection === "speedtest" ? (
                  <ExamCenter />
                ) : (
                  <StatsDashboard />
                )}
              </div>
            </div>

            {/* Right Column: Live Coach Analytics */}
            <div className="lg:col-span-1">
              <TypeBanglaCoachPanel />
            </div>
          </div>
        </div>
      ) : (
        /* Typing Arena Mode (Distraction-Free) */
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Live Stats HUD */}
          <StatsDashboard minimal />

          {/* Centered Typing Interface */}
          <div className="flex flex-col space-y-6 max-w-5xl mx-auto w-full">
            <TypingArea />
            <VirtualKeyboard nextChar={nextChar} />
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={resetTest} />
          <Card className="relative z-50 w-full max-w-sm border border-border shadow-lg text-center p-6 bg-card">
            <CardHeader className="p-0">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={20} />
              </div>
              <CardTitle className="text-xl font-bold text-zinc-900">
                {isRecapTest ? "Recap Complete!" : "Test Complete!"}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                {isRecapTest ? "Great job on the recap challenge." : "Here are your results."}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 py-6">
              <div className="grid grid-cols-3 gap-3 bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                <div>
                  <div className="text-2xl font-bold text-zinc-900">{Math.max(0, finalWpm)}</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">WPM</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900">{Math.max(0, Math.min(100, finalAccuracy))}%</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900">{elapsedTime}s</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">Time</div>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-zinc-600 border-zinc-200">
                  {errorIndices.length} errors
                </Badge>
                <span className="mx-2">·</span>
                <span>{typedText.length} keystrokes</span>
              </div>
            </CardContent>

            <div className="flex gap-2">
              {isRecapTest ? (
                <>
                  <Button variant="outline" onClick={resetTest} className="flex-1">Retry</Button>
                  <Button onClick={exitRecapTest} className="flex-1 bg-zinc-950 text-white hover:bg-zinc-800">Back</Button>
                </>
              ) : (
                focusKeys && focusKeys !== "all" &&
                (lessonType === "drill" || lessonType === "combo" || lessonType === "pair") ? (
                  <>
                    <Button variant="outline" onClick={resetTest} className="flex-1">Again</Button>
                    <Button onClick={startRecapTest} className="flex-1 bg-zinc-950 text-white hover:bg-zinc-800">Recap Test</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={resetTest} className="flex-1">Practice Again</Button>
                    <Button 
                      onClick={() => {
                        resetTest();
                        setIsArenaActive(false);
                      }} 
                      className="flex-1 bg-zinc-950 text-white hover:bg-zinc-800"
                    >
                      Back to Dashboard
                    </Button>
                  </>
                )
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
          <Card className="relative z-50 w-full max-w-sm border border-border shadow-lg p-6 bg-card">
            <CardHeader className="p-0 pb-4 border-b border-border flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                  <Settings size={16} className="text-emerald-600" />
                  <span>Practice Settings</span>
                </CardTitle>
                <CardDescription className="text-[11px] m-0">Customize your trainer sounds and metrics</CardDescription>
              </div>
              <button 
                onClick={() => setShowSettings(false)} 
                className="p-1 rounded-sm text-muted-foreground hover:bg-zinc-100 hover:text-foreground"
              >
                <X size={16} />
              </button>
            </CardHeader>

            <CardContent className="p-0 py-5 space-y-6">
              {/* Keyboard Layout Selector in settings */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-700 block">Keyboard Layout</span>
                <select
                  value={activeLayout}
                  onChange={(e) => setActiveLayout(e.target.value as KeyboardLayout)}
                  className="w-full h-9 bg-white border border-zinc-200 rounded-md px-3 text-xs font-semibold focus:outline-none cursor-pointer focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="avro">Avro Phonetic</option>
                  <option value="unibijoy">UniBijoy (Unicode)</option>
                  <option value="jatiya">Jatiya (BCC Standard)</option>
                  <option value="probhat">Probhat</option>
                  <option value="inscript">Inscript</option>
                  <option value="unicode">Unicode Map</option>
                  <option value="english">English QWERTY</option>
                </select>
              </div>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-zinc-900 block">Typing Audio</span>
                  <span className="text-[10px] text-muted-foreground block">Mechanical audio feedback</span>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)} 
                  className={`gap-1.5 h-8 ${soundEnabled ? "border-emerald-200 bg-emerald-50/50 text-emerald-700" : ""}`}
                >
                  {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  <span>{soundEnabled ? "On" : "Muted"}</span>
                </Button>
              </div>
              
              {soundEnabled && (
                <>
                  {/* Volume Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-zinc-700">
                      <span>Volume</span>
                      <span className="text-emerald-600">{Math.round(soundVolume * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={soundVolume}
                      onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer bg-zinc-100 h-1.5 rounded-full outline-none"
                    />
                  </div>
                  
                  {/* Sound Profile Selector */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-zinc-700 block">Sound Profile</span>
                    <div className="flex gap-2">
                      {(["mechanical", "retro", "digital"] as SoundProfile[]).map((profile) => (
                        <Button
                          key={profile}
                          variant={soundProfile === profile ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setSoundProfile(profile);
                            setTimeout(() => playTypewriterSound("click"), 30);
                          }}
                          className={`flex-1 h-8 text-[11px] capitalize ${
                            soundProfile === profile ? "bg-zinc-950 text-white" : ""
                          }`}
                        >
                          {profile}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>

            <div className="pt-2">
              <Button onClick={() => setShowSettings(false)} className="w-full bg-zinc-950 text-white hover:bg-zinc-800 h-9">
                Apply Changes
              </Button>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}
