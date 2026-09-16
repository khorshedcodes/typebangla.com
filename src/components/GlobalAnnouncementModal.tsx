"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, Sparkles, Megaphone, ArrowRight } from "lucide-react";
import { getGlobalAnnouncement, AnnouncementConfig } from "../lib/firestoreService";

const STORAGE_KEY = "typemaster_dismissed_announcement";

export default function GlobalAnnouncementModal() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState<AnnouncementConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Never show on admin pages
    if (pathname && pathname.startsWith("/admin")) {
      setIsOpen(false);
      return;
    }

    let isMounted = true;

    async function checkAnnouncement() {
      try {
        const config = await getGlobalAnnouncement();
        if (!isMounted) return;

        // Check if enabled
        if (!config || !config.enabled) {
          setIsOpen(false);
          return;
        }

        // Check local storage dismissal
        const dismissedId = localStorage.getItem(STORAGE_KEY);
        if (dismissedId === config.id) {
          setIsOpen(false);
          return;
        }

        // Set announcement and trigger smooth entry after 500ms
        setAnnouncement(config);
        const timer = setTimeout(() => {
          if (isMounted) {
            setIsOpen(true);
          }
        }, 500);

        return () => clearTimeout(timer);
      } catch (err) {
        console.error("Failed to load global announcement:", err);
      }
    }

    checkAnnouncement();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const handleDismiss = () => {
    if (announcement?.id) {
      try {
        localStorage.setItem(STORAGE_KEY, announcement.id);
      } catch {}
    }
    setIsOpen(false);
  };

  if (!isOpen || !announcement || !announcement.enabled) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
    >
      {/* Dark Glass Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800/80 shadow-2xl shadow-emerald-500/10 overflow-hidden transform transition-all scale-100 z-10">
        {/* Decorative Top Gradient Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Tag / Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Megaphone className="w-3.5 h-3.5" />
              {announcement.tag || "Notice"}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Announcement
            </span>
          </div>

          {/* Title */}
          <h2
            id="announcement-title"
            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight mb-3"
          >
            {announcement.title}
          </h2>

          {/* Message Body */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-6">
            {announcement.message}
          </p>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <button
              onClick={handleDismiss}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-center"
            >
              Don&apos;t show again
            </button>

            {announcement.actionUrl && (
              <Link
                href={announcement.actionUrl}
                onClick={handleDismiss}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {announcement.actionText || "View Details"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
