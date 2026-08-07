"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception telemetry silently
    console.error("Unhandled Runtime Exception:", error);
  }, [error]);

  return (
    <div className="container max-w-xl mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="border border-border bg-card shadow-lg rounded-2xl text-center w-full">
        <CardHeader className="space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive">
            <AlertTriangle size={24} />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-black text-foreground">
            কোথাও একটি সমস্যা দেখা দিয়েছে
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            একটি অপ্রত্যাশিত সিস্টেম ত্রুটি ঘটেছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          {error?.message && (
            <div className="p-3 rounded-lg bg-secondary/80 border border-border text-[11px] font-mono text-muted-foreground break-all text-left">
              {error.message}
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              onClick={() => reset()}
              className="w-full sm:w-auto font-bold gap-2 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>পুনরায় চেষ্টা করুন</span>
            </Button>
            <Link
              href="/"
              className="inline-flex items-center justify-center h-9 px-4 py-2 text-xs rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground font-bold gap-2 cursor-pointer transition-colors w-full sm:w-auto"
            >
              <Home size={14} />
              <span>হোমে ফিরে যান</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
