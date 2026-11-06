"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Send,
  MessageSquare,
  Bug,
  Sparkles,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Clock,
  Wrench,
  Eye,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  submitFeedback,
  getPublicBugReports,
  ContactMessage,
  ContactMessageStatus,
} from "../lib/firestoreService";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function getBugStatusBadgeMeta(status?: ContactMessageStatus) {
  switch (status) {
    case "solved":
    case "resolved":
      return {
        label: "Solved",
        labelBn: "সমাধানকৃত",
        className:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      };
    case "working":
      return {
        label: "Working",
        labelBn: "কাজ চলছে",
        className:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
      };
    case "acknowledged":
    case "reviewed":
      return {
        label: "Acknowledged",
        labelBn: "বিবেচনাধীন",
        className:
          "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
      };
    default:
      return {
        label: "Open",
        labelBn: "অপেক্ষমান",
        className:
          "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
      };
  }
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [activeView, setActiveView] = useState<"form" | "board">("form");
  const [type, setType] = useState<"bug" | "suggestion">("bug");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [reports, setReports] = useState<ContactMessage[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "solved" | "working" | "acknowledged">("all");

  useEffect(() => {
    if (!isOpen) return;
    let mounted = true;
    setLoadingReports(true);
    getPublicBugReports(20)
      .then((data) => {
        if (mounted) setReports(data);
      })
      .finally(() => {
        if (mounted) setLoadingReports(false);
      });
    return () => {
      mounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredReports = reports.filter((r) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "solved") return r.status === "solved" || r.status === "resolved";
    if (statusFilter === "working") return r.status === "working";
    if (statusFilter === "acknowledged")
      return r.status === "acknowledged" || r.status === "reviewed";
    return true;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setError("");
    try {
      const res = await submitFeedback({
        type,
        email: email.trim(),
        message: message.trim(),
      });
      if (res && res.success === false) {
        setError("Failed to send feedback. Please check your connection and try again.");
      } else {
        setSubmitted(true);
        const updated = await getPublicBugReports(20);
        setReports(updated);
        setTimeout(() => {
          setSubmitted(false);
          setMessage("");
          setEmail("");
          setError("");
          setActiveView("board");
        }, 1800);
      }
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs fade-in overflow-y-auto">
      <div className="bg-card border border-border rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 space-y-5 relative my-auto max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground rounded-full transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="space-y-1.5 text-center sm:text-left shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
            <Sparkles size={13} />
            <span>TYPEBANGLA BUG TRACKER &amp; FEEDBACK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            Report Bug &amp; Live Issue Status
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            নতুন বাগ রিপোর্ট পাঠান অথবা সাম্প্রতিক বাগ রিপোর্টগুলোর বর্তমান স্ট্যাটাস (Solved, Working, Acknowledged) দেখুন।
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-secondary rounded-2xl border border-border shrink-0">
          <button
            type="button"
            onClick={() => setActiveView("form")}
            className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeView === "form"
                ? "bg-card text-foreground shadow-xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bug size={14} className="text-rose-500" />
            <span>নতুন বাগ রিপোর্ট পাঠান</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("board")}
            className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeView === "board"
                ? "bg-card text-foreground shadow-xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Wrench size={14} className="text-emerald-500" />
            <span>সর্বশেষ বাগ স্ট্যাটাস ({reports.length})</span>
          </button>
        </div>

        <div className="overflow-y-auto pr-1 space-y-5 flex-1">
          {activeView === "form" ? (
            <>
              {submitted ? (
                <div className="py-8 text-center space-y-3 fade-in">
                  <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                  <h3 className="text-base font-bold text-foreground">
                    Thank You for Your Feedback!
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    আপনার রিপোর্টটি যুক্ত হয়েছে এবং নিচে স্ট্যাটাস ট্র্যাকারে দেখা যাবে।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Feedback Type Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setType("bug")}
                      className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        type === "bug"
                          ? "bg-rose-500/10 border-rose-500/40 text-rose-600 dark:text-rose-400 shadow-xs"
                          : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Bug size={16} /> Bug Report
                    </button>
                    <button
                      type="button"
                      onClick={() => setType("suggestion")}
                      className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        type === "suggestion"
                          ? "bg-primary/10 border-primary/40 text-primary shadow-xs"
                          : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <MessageSquare size={16} /> Feature Idea
                    </button>
                  </div>

                  {/* Email (Optional) */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Your Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 px-3.5 text-xs bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Message Body */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Details / Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={
                        type === "bug"
                          ? "যেমন: পাশাপাশি অ এবং া থাকলে টাইপ করতে কী সমস্যা হচ্ছে বিস্তারিত লিখুন..."
                          : "What new feature or improvement would make TypeBangla even better?"
                      }
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3.5 text-xs bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary leading-relaxed resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-3 text-xs bg-destructive/10 border border-destructive/30 text-destructive rounded-xl flex items-center gap-2">
                      <AlertCircle size={15} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-bold text-xs h-11 gap-2 rounded-xl cursor-pointer shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={14} /> Send Feedback to Engineer
                      </>
                    )}
                  </Button>
                </form>
              )}

              {/* Compact Recent Bug Reports Preview */}
              <div className="pt-3 border-t border-border space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                    সাম্প্রতিক বাগ রিপোর্ট ও সমাধান স্ট্যাটাস
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveView("board")}
                    className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                  >
                    সবগুলো দেখুন ({reports.length}) →
                  </button>
                </div>

                <div className="space-y-2">
                  {reports.slice(0, 3).map((item) => {
                    const badge = getBugStatusBadgeMeta(item.status);
                    return (
                      <div
                        key={item.id || item.refId}
                        className="p-3 rounded-xl bg-secondary/50 border border-border flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="font-bold text-foreground truncate">
                            {item.subject || "Bug Report"}
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                            {item.message}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`shrink-0 text-[10px] font-extrabold px-2 py-0.5 ${badge.className}`}
                        >
                          {badge.label} • {badge.labelBn}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {/* Status Filters */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: "all", label: "All Reports" },
                    { id: "solved", label: "✓ Solved" },
                    { id: "working", label: "⚙ Working" },
                    { id: "acknowledged", label: "👁 Acknowledged" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setStatusFilter(f.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        statusFilter === f.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <Link
                  href="/bug-reports"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                >
                  <span>Full Bug Tracker Page</span>
                  <ExternalLink size={12} />
                </Link>
              </div>

              {loadingReports ? (
                <div className="py-10 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span>বাগ রিপোর্ট লোড হচ্ছে...</span>
                </div>
              ) : filteredReports.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  এই ফিল্টারে কোনো রিপোর্ট পাওয়া যায়নি।
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredReports.map((item) => {
                    const badge = getBugStatusBadgeMeta(item.status);
                    const isBug = item.category === "bug";
                    return (
                      <div
                        key={item.id || item.refId}
                        className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className={
                                isBug
                                  ? "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-bold"
                                  : "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold"
                              }
                            >
                              {isBug ? "🐛 Bug" : "💡 Suggestion"}
                            </Badge>
                            {item.refId && (
                              <span className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border border-border">
                                {item.refId}
                              </span>
                            )}
                            <span className="font-bold text-foreground">
                              {item.subject || "User Report"}
                            </span>
                          </div>

                          <Badge
                            variant="outline"
                            className={`text-[10px] font-extrabold px-2.5 py-0.5 ${badge.className}`}
                          >
                            {badge.label} ({badge.labelBn})
                          </Badge>
                        </div>

                        <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                          {item.message}
                        </p>

                        {item.adminNote && (
                          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                            <strong className="font-bold">Engineer Note: </strong>
                            {item.adminNote}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                          <span>Reported by: {item.name || "Learner"}</span>
                          {item.createdAt && (
                            <span className="inline-flex items-center gap-1 font-mono">
                              <Clock size={10} />
                              {new Date(item.createdAt).toLocaleDateString("bn-BD", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
