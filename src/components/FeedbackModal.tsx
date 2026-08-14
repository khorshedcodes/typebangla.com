"use client";

import React, { useState } from "react";
import { X, Send, MessageSquare, Bug, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [type, setType] = useState<"bug" | "suggestion">("bug");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Trigger mailto link or log feedback submit
    const subject = encodeURIComponent(`[TypeBangla v1 Beta ${type === "bug" ? "Bug Report" : "Suggestion"}]`);
    const body = encodeURIComponent(`Feedback Type: ${type.toUpperCase()}\nUser Email: ${email || "Anonymous"}\n\nMessage:\n${message}`);
    window.open(`mailto:hello@khorshed-alam.com?subject=${subject}&body=${body}`, "_blank");

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage("");
      setEmail("");
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs fade-in">
      <div className="bg-card border border-border rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground rounded-full transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
            <Sparkles size={13} />
            <span>TYPEBANGLA v1.0 BETA FEEDBACK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground">Report Bug or Suggest Feature</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your feedback directly shapes TypeBangla! Let us know if you encountered an issue or have a feature idea.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3 fade-in">
            <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-foreground">Thank You for Your Feedback!</h3>
            <p className="text-xs text-muted-foreground">Your report has been prepared for the development team.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Feedback Type Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("bug")}
                className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
                className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Your Email (Optional)</label>
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
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Details / Description *</label>
              <textarea
                required
                rows={4}
                placeholder={
                  type === "bug"
                    ? "Describe what happened, expected behavior, or steps to reproduce..."
                    : "What new feature or improvement would make TypeBangla even better?"
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3.5 text-xs bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary leading-relaxed resize-none"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full font-bold text-xs h-11 gap-2 rounded-xl cursor-pointer shadow-xs">
                <Send size={14} /> Send Feedback to Engineer
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
