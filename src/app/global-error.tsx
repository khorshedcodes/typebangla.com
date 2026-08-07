"use client";

import React from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="bn">
      <body className="bg-[#090d16] text-[#f3f4f6] font-sans min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-[#111827] border border-[#1f2937] shadow-2xl">
          <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
            <AlertOctagon size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight">System Critical Error</h1>
            <p className="text-xs text-gray-400 leading-relaxed">
              A global framework error occurred. Click below to refresh the application.
            </p>
          </div>
          <Button
            onClick={() => reset()}
            className="w-full font-bold gap-2 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer py-3 rounded-xl"
          >
            <RefreshCw size={16} />
            <span>Reload Application</span>
          </Button>
        </div>
      </body>
    </html>
  );
}
