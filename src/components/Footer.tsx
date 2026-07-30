"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTypingStore } from "../store/typingStore";
import { isFocusModePage } from "../utils/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isFocusModeActive = useTypingStore((s) => s.isFocusModeActive);

  if (isFocusModeActive || isFocusModePage(pathname)) return null;

  return (
    <footer className="w-full border-t border-border bg-card/80 backdrop-blur-md py-8 mt-auto text-foreground">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo/blackbg.png"
              alt="typebangla logo"
              width={24}
              height={24}
              className="w-6 h-6 hidden dark:block object-contain"
            />
            <Image
              src="/images/logo/whitebg_1.png"
              alt="typebangla logo"
              width={24}
              height={24}
              className="w-6 h-6 block dark:hidden object-contain"
            />
            <span className="font-black text-sm tracking-tight text-foreground select-none">
              typebangla<span className="text-primary font-bold">.com</span>
            </span>
          </Link>
          <span className="text-border">|</span>
          <span>© {new Date().getFullYear()} typebangla. All rights reserved.</span>
        </div>

        {/* Essential Quick Links */}
        <div className="flex items-center gap-4 font-semibold">
          <Link href="/courses" className="hover:text-foreground transition-colors">Courses</Link>
          <Link href="/practice/test" className="hover:text-foreground transition-colors">Speed Test</Link>
          <Link href="/institute" className="text-teal-500 hover:underline transition-colors font-bold">Institute V2 🏫</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
        </div>

        {/* Country Badge */}
        <div className="flex items-center gap-1 font-semibold text-foreground">
          <span>Made in Bangladesh 🇧🇩</span>
        </div>

      </div>
    </footer>
  );
}
