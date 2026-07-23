"use client";

import React from "react";
import StatsDashboard from "../../components/StatsDashboard";
import TypeBanglaCoachPanel from "../../components/TypeBanglaCoachPanel";
import { BarChart3, Activity, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";

export default function StatsClient() {
  return (
    <div className="space-y-8 fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
            <BarChart3 size={14} className="text-emerald-400" />
            <span>Personal Telemetry & Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Typing Performance & Diagnostics
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Track your WPM speed history, accuracy trends, key error bottlenecks, and fatigue telemetry signatures.
          </p>
        </div>

        <Link href="/practice" className="shrink-0">
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 text-xs">
            <span>Continue Practice</span>
            <ArrowRight size={14} />
          </Button>
        </Link>
      </div>

      {/* Main Telemetry Dashboards */}
      <div className="space-y-6">
        <StatsDashboard />
        <TypeBanglaCoachPanel />
      </div>
    </div>
  );
}
