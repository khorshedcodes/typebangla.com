import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FileQuestion, Home, Keyboard, Play, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Page Not Found (404) | TypeBangla",
  description: "The page you are looking for does not exist or has been moved. Explore TypeBangla typing practice, speed tests, and tools.",
};

export default function NotFoundPage() {
  return (
    <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center justify-center min-h-[70vh] fade-in text-foreground">
      <Card className="border border-border bg-card shadow-2xl rounded-3xl p-8 sm:p-12 text-center max-w-2xl w-full space-y-8 relative overflow-hidden">
        
        {/* Decorative Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Badge & Icon */}
        <div className="space-y-4 relative z-10">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
            <FileQuestion size={36} />
          </div>
          
          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1 text-xs font-mono font-bold text-primary border-primary/30 bg-primary/5">
              ERROR 404
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              পৃষ্ঠাটি পাওয়া যায়নি
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              আপনি যে লিঙ্কটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ইউআরএল লিংকটি ভুল টাইপ করা হয়েছে।
            </p>
          </div>
        </div>

        {/* Recommended Links */}
        <div className="space-y-3 pt-4 border-t border-border relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            জনপ্রিয় পেজসমূহ চেষ্টা করুন:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <Link
              href="/practice/test"
              className="p-3 rounded-xl border border-border bg-secondary/50 hover:bg-secondary hover:border-primary/50 transition-all font-bold flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Play size={14} className="text-primary" />
                <span>স্পিড টেস্ট</span>
              </div>
              <ArrowRight size={12} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/courses"
              className="p-3 rounded-xl border border-border bg-secondary/50 hover:bg-secondary hover:border-primary/50 transition-all font-bold flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Keyboard size={14} className="text-emerald-500" />
                <span>টাইপিং কোর্স</span>
              </div>
              <ArrowRight size={12} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/exam/govt"
              className="p-3 rounded-xl border border-border bg-secondary/50 hover:bg-secondary hover:border-primary/50 transition-all font-bold flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-sky-500" />
                <span>সরকারি পরীক্ষা</span>
              </div>
              <ArrowRight size={12} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Back to Home Action */}
        <div className="pt-2 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3 rounded-xl gap-2 shadow-lg cursor-pointer text-xs transition-colors"
          >
            <Home size={16} />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>

      </Card>
    </main>
  );
}
