"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useTypingStore } from "../store/typingStore";
import { isFocusModePage } from "../utils/navigation";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="currentColor" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Footer() {
  const pathname = usePathname();
  const isFocusModeActive = useTypingStore((s) => s.isFocusModeActive);

  if (isFocusModeActive || isFocusModePage(pathname)) return null;

  return (
    <footer className="w-full border-t border-border bg-card/80 backdrop-blur-md py-12 mt-auto text-foreground">

      {/* Main Grid Navigation Links */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-8">

        {/* Brand Info & Social Icons */}
        <div className="col-span-2 md:col-span-1 flex flex-col space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo/blackbg.png"
              alt="typebangla logo"
              width={32}
              height={32}
              className="w-8 h-8 hidden dark:block object-contain"
            />
            <Image
              src="/images/logo/whitebg_1.png"
              alt="typebangla logo"
              width={32}
              height={32}
              className="w-8 h-8 block dark:hidden object-contain"
            />
            <span className="font-black text-base tracking-tight text-foreground select-none">
              typebangla<span className="text-primary font-bold">.com</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed">
            স্মার্ট কিবোর্ড অনুশীলন, সময়ভিত্তিক স্পিড পরীক্ষা ও অনলাইন ভেরিফিকেশন ব্যবস্থা।
          </p>
        </div>

        {/* Column 1 - Learn */}
        <div className="flex flex-col space-y-2.5">
          <span className="text-xs font-bold text-foreground uppercase tracking-wider">শিখুন (Learn)</span>
          <Link href="/courses" className="text-xs text-muted-foreground hover:text-foreground transition-colors">সব পাঠ্যক্রম</Link>
          <Link href="/avro-phonetic-typing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">অভ্র ফোনেটিক টাইপিং</Link>
          <Link href="/bijoy-52-typing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">বিজয় ৫২ / ইউনিবিজয়</Link>
          <Link href="/jatiya-keyboard-typing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">জাতীয় কিবোর্ড (সরকারি)</Link>
          <Link href="/probhat-layout-typing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">প্রভাত লেআউট</Link>
          <Link href="/english-touch-typing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">English Touch Typing</Link>
        </div>

        {/* Column 2 - Practice & Exam */}
        <div className="flex flex-col space-y-2.5">
          <span className="text-xs font-bold text-foreground uppercase tracking-wider">অনুশীলন ও পরীক্ষা</span>
          <Link href="/practice/test" className="text-xs text-muted-foreground hover:text-foreground transition-colors">স্পিড টেস্ট</Link>
          <Link href="/practice/words" className="text-xs text-muted-foreground hover:text-foreground transition-colors">শব্দ অনুশীলন</Link>
          <Link href="/practice/sentences" className="text-xs text-muted-foreground hover:text-foreground transition-colors">বাক্য অনুশীলন</Link>
          <Link href="/game" className="text-xs font-extrabold text-emerald-500 hover:underline transition-colors flex items-center gap-1">
            <span>টাইপিং আর্কেড গেমস 🎮</span>
          </Link>
          <Link href="/practice/custom" className="text-xs text-muted-foreground hover:text-foreground transition-colors">নিজের টেক্সট</Link>
          <Link href="/juktakkhor" className="text-xs text-muted-foreground hover:text-foreground transition-colors">যুক্তাক্ষর মাস্টার</Link>
          <Link href="/exam/govt" className="text-xs font-extrabold text-primary hover:underline transition-colors flex items-center gap-1">
            <span>সরকারি চাকরির পরীক্ষা</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Column 3 - Tools */}
        <div className="flex flex-col space-y-2.5">
          <span className="text-xs font-bold text-foreground uppercase tracking-wider">টুলস (Tools)</span>
          <Link href="/tools" className="text-xs text-muted-foreground hover:text-foreground transition-colors">সব টুলস</Link>
          <Link href="/unicode-to-bijoy-converter" className="text-xs text-muted-foreground hover:text-foreground transition-colors">ইউনিকোড ↔ বিজয়</Link>
          <Link href="/english-to-bangla-typing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">বাংলিশ টাইপিং</Link>
          <Link href="/bangla-voice-typing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">ভয়েস টাইপিং</Link>
          <Link href="/bangla-word-counter" className="text-xs text-muted-foreground hover:text-foreground transition-colors">শব্দ ও অক্ষর গণনা</Link>
        </div>

        {/* Column 4 - Platform Support & Legal */}
        <div className="flex flex-col space-y-2.5">
          <span className="text-xs font-bold text-foreground uppercase tracking-wider">তথ্য ও সাপোর্ট</span>
          <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">আমাদের সম্পর্কে (About Us)</Link>
          <Link href="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">যোগাযোগ ও সাপোর্ট (Contact)</Link>
          <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors">মাই ড্যাশবোর্ড</Link>
          <Link href="/institute" className="text-xs font-extrabold text-teal-500 hover:underline transition-colors flex items-center gap-1">
            <span>ইনস্টিটিউট V2 পোর্টাল 🏫</span>
          </Link>
          <Link href="/leaderboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors">লিডারবোর্ড</Link>
          <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">প্রাইভেসি পলিসি (Privacy)</Link>
          <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">ব্যবহারের শর্তাবলী (Terms)</Link>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>© {new Date().getFullYear()} typebangla. All rights reserved.</span>
          <span className="hidden sm:block text-border">|</span>
          <div className="flex items-center gap-3 text-[11px]">
            <Link href="/about" className="hover:text-foreground transition-colors">আমাদের সম্পর্কে</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-foreground transition-colors">যোগাযোগ</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">প্রাইভেসি</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">শর্তাবলী</Link>
          </div>
        </div>
        <div className="flex items-center gap-3 font-semibold text-foreground">
          <span>বাংলাদেশ থেকে ভালোবাসায় তৈরি</span>
          <span>•</span>
          <a
            href="https://khorshed-alam.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors text-[11px] underline underline-offset-4 decoration-border"
          >
            Developed by Khorshed Alam
          </a>
        </div>
      </div>

    </footer>
  );
}
