"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Send, Mail, Sparkles, Clock, CreditCard, Building, CheckCircle2, Globe, Loader2, Bug, Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { saveContactMessage, getPublicBugReports, ContactMessage } from "@/lib/firestoreService";
import { getBugStatusBadgeMeta } from "@/components/FeedbackModal";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", category: "general", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [bugReports, setBugReports] = useState<ContactMessage[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | "solved" | "working" | "acknowledged">("all");

  const loadBugReports = () => {
    getPublicBugReports(20).then(setBugReports).catch(() => {});
  };

  useEffect(() => {
    loadBugReports();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;

    setIsSubmitting(true);
    const result = await saveContactMessage(form);
    setIsSubmitting(false);

    setRefId(result.refId || "MSG-" + Math.floor(100000 + Math.random() * 900000));
    setSubmitted(true);
    setForm({ name: "", email: "", category: "general", subject: "", message: "" });
    loadBugReports();
  };

  const filteredReports = bugReports.filter((r) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "solved") return r.status === "solved" || r.status === "resolved";
    if (statusFilter === "working") return r.status === "working";
    if (statusFilter === "acknowledged") return r.status === "acknowledged" || r.status === "reviewed";
    return true;
  });

  return (
    <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12 fade-in text-foreground">
      {/* Page Header */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
          <Sparkles size={14} className="text-emerald-500 animate-pulse" />
          <span>GET IN TOUCH WITH TYPEBANGLA TEAM</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Contact &amp; Support
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          আপনার কোনো প্রশ্ন, মতামত, পেমেন্ট / সার্টিফিকেট সাহায্য বা ইনস্টিটিউট রেজিস্ট্রেশনের জন্য আমাদের টিমের সাথে যোগাযোগ করুন।
        </p>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Contact Channels */}
        <div className="space-y-4">
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardContent className="p-5 space-y-4 text-xs">
              
              {/* Official Support */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="font-bold text-foreground block text-sm">Official Email</span>
                  <a href="mailto:support@typebangla.com" className="text-muted-foreground hover:text-primary transition-colors font-mono">
                    support@typebangla.com
                  </a>
                </div>
              </div>

              {/* Billing Email */}
              <div className="flex items-start gap-3 pt-3 border-t border-border">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                  <CreditCard size={18} />
                </div>
                <div>
                  <span className="font-bold text-foreground block text-sm">Billing &amp; Top-Up Help</span>
                  <a href="mailto:billing@typebangla.com" className="text-muted-foreground hover:text-emerald-500 transition-colors font-mono">
                    billing@typebangla.com
                  </a>
                </div>
              </div>

              {/* Developer Direct Contact */}
              <div className="flex items-start gap-3 pt-3 border-t border-border">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0 font-black text-xs">
                  KA
                </div>
                <div className="space-y-1">
                  <div>
                    <span className="font-extrabold text-foreground block text-xs">Developer Direct Contact</span>
                    <span className="text-[11px] font-semibold text-muted-foreground block">Khorshed Alam (Founder &amp; Dev)</span>
                  </div>
                  <a href="mailto:hello@khorshed-alam.com" className="text-primary hover:underline transition-colors font-mono block font-bold">
                    hello@khorshed-alam.com
                  </a>
                  <a href="https://khorshed-alam.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground font-semibold">
                    <Globe size={12} />
                    <span>khorshed-alam.com</span>
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-start gap-3 pt-3 border-t border-border">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="font-bold text-foreground block text-sm">Response Time</span>
                  <span className="text-muted-foreground leading-relaxed block">
                    ১ থেকে ২৪ ঘণ্টার মধ্যে দ্রুত রেসপন্স
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardContent className="p-5 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 font-bold text-foreground">
                <Building size={16} className="text-teal-500" />
                <span>ইনস্টিটিউট পার্টনারশিপ:</span>
              </div>
              <p className="leading-relaxed">
                স্কুল, কলেজ ও কম্পিউটার ট্রেনিং সেন্টারের জন্য বাল্ক সার্টিফিকেট ও প্রাতিষ্ঠানিক সুবিধা পেতে আমাদের সাথে সরাসরি যোগাযোগ করুন।
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interactive Form */}
        <Card className="md:col-span-2 border border-border bg-card shadow-sm rounded-2xl">
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-lg font-bold text-foreground">সরাসরি বার্তা পাঠান</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">নিচের ফর্মে বিষয় সিলেক্ট করে আপনার বার্তাটি লিখুন।</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {submitted ? (
              <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-3">
                <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-foreground">আপনার বার্তা সফলভাবে পাঠানো হয়েছে!</h3>
                
                <div className="inline-flex items-center gap-1.5 bg-background border border-border px-3 py-1 rounded-full text-xs font-mono text-primary font-bold">
                  <span>Message Ref ID: {refId}</span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                  ধন্যবাদ। আমাদের সাপোর্ট টিম দ্রুত আপনার ইমেইলে (support@typebangla.com) উত্তর প্রদান করবে।
                </p>
                <Button size="sm" onClick={() => setSubmitted(false)} className="font-bold text-xs cursor-pointer">
                  আরেকটি বার্তা পাঠান
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">আপনার নাম *</label>
                    <Input
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="text-xs h-10 border-border"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">ইমেইল এড্রেস *</label>
                    <Input
                      required
                      type="email"
                      placeholder="e.g. tanvir@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="text-xs h-10 border-border"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">বিষয় ক্যাটাগরি *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-border bg-background text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="suggestion">💡 নতুন ফিচার বা উন্নতির পরামর্শ (Feature / Improvement Suggestion)</option>
                    <option value="bug">🐛 প্ল্যাটফর্ম বাগ রিপোর্ট (Bug Report)</option>
                    <option value="general">সাধারণ প্রশ্ন / মতামত (General Question / Feedback)</option>
                    <option value="billing">সার্টিফিকেট পেমেন্ট &amp; bKash/Nagad TrxID সমস্যা</option>
                    <option value="verification">সার্টিফিকেট ভেরিফিকেশন হেল্প (/verify/[id])</option>
                    <option value="institute">ইনস্টিটিউট পার্টনারশিপ &amp; বাল্ক লাইসেন্সিং</option>
                    <option value="developer">ডেভেলপার কোয়ারি (Direct to Khorshed Alam)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">বিষয়ের শিরোনাম (Subject) *</label>
                  <Input
                    required
                    placeholder="e.g. bKash TrxID verification help for Certificate"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="text-xs h-10 border-border"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">বিস্তারিত বার্তা (Message) *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="আপনার বার্তা বা বিকাশ/নগদ ট্রানজেকশন আইডি এখানে লিখুন..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3 rounded-md border border-border bg-background text-xs font-normal text-foreground outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full font-bold text-xs gap-2 h-11 shadow-md cursor-pointer">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>মেসেজ প্রসেস হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>মেসেজ সাবমিট করুন</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Latest Bug Reports & Live Status Board */}
      <section id="bug-reports" className="space-y-5 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <Bug size={14} />
              <span>LIVE BUG TRACKER &amp; ISSUE STATUS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              সর্বশেষ বাগ রিপোর্ট ও সমাধানের বর্তমান স্ট্যাটাস
            </h2>
            <p className="text-xs text-muted-foreground">
              ব্যবহারকারীদের রিপোর্ট করা বাগ এবং নতুন ফিচারের লাইভ স্ট্যাটাস (Solved, Working, Acknowledged)।
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: "all", label: "All Reports" },
              { id: "solved", label: "✓ Solved" },
              { id: "working", label: "⚙ Working" },
              { id: "acknowledged", label: "👁 Acknowledged" },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStatusFilter(st.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st.id
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((item) => {
            const badge = getBugStatusBadgeMeta(item.status);
            const isBug = item.category === "bug";
            return (
              <Card
                key={item.id || item.refId}
                className="border border-border bg-card rounded-2xl p-5 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge
                        variant="outline"
                        className={
                          isBug
                            ? "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-bold"
                            : "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold"
                        }
                      >
                        {isBug ? "🐛 Bug Report" : "💡 Suggestion"}
                      </Badge>
                      {item.refId && (
                        <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border">
                          {item.refId}
                        </span>
                      )}
                    </div>

                    <Badge
                      variant="outline"
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 ${badge.className}`}
                    >
                      {badge.label} • {badge.labelBn}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-extrabold text-foreground">
                    {item.subject || "Bug Report"}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {item.message}
                  </p>

                  {item.adminNote && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-300 leading-relaxed">
                      <strong className="font-bold">সমাধান নোট: </strong>
                      {item.adminNote}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/60">
                  <span>প্রেরক: {item.name || "Learner"}</span>
                  {item.createdAt && (
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Clock size={11} />
                      {new Date(item.createdAt).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
