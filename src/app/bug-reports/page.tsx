"use client";

import React, { useState, useEffect } from "react";
import {
  Bug,
  Send,
  Sparkles,
  CheckCircle2,
  Loader2,
  Clock,
  MessageSquare,
  Wrench,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  saveContactMessage,
  getPublicBugReports,
  ContactMessage,
} from "@/lib/firestoreService";
import { getBugStatusBadgeMeta } from "@/components/FeedbackModal";

export default function BugReportsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "bug",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const [reports, setReports] = useState<ContactMessage[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "solved" | "working" | "acknowledged" | "open"
  >("all");

  const loadReports = async () => {
    setLoadingReports(true);
    try {
      const data = await getPublicBugReports(30);
      setReports(data);
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) return;

    setIsSubmitting(true);
    const result = await saveContactMessage({
      name: form.name.trim() || "Learner",
      email: form.email.trim() || "anonymous@typebangla.com",
      category: form.category,
      subject:
        form.subject.trim() ||
        (form.category === "bug" ? "Bug Report" : "Feature Suggestion"),
      message: form.message.trim(),
      status: "unread",
    });
    setIsSubmitting(false);

    setRefId(
      result.refId || "BUG-" + Math.floor(1000 + Math.random() * 9000)
    );
    setSubmitted(true);
    setForm({ name: "", email: "", category: "bug", subject: "", message: "" });
    loadReports();
  };

  const filteredReports = reports.filter((r) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "solved")
      return r.status === "solved" || r.status === "resolved";
    if (statusFilter === "working") return r.status === "working";
    if (statusFilter === "acknowledged")
      return r.status === "acknowledged" || r.status === "reviewed";
    if (statusFilter === "open")
      return !r.status || r.status === "unread";
    return true;
  });

  const solvedCount = reports.filter(
    (r) => r.status === "solved" || r.status === "resolved"
  ).length;
  const workingCount = reports.filter((r) => r.status === "working").length;
  const acknowledgedCount = reports.filter(
    (r) => r.status === "acknowledged" || r.status === "reviewed"
  ).length;

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10 fade-in text-foreground">
      {/* Header */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-rose-600 dark:text-rose-400">
          <Bug size={14} className="text-rose-500" />
          <span>PUBLIC BUG TRACKER &amp; LIVE STATUS BOARD</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Bug Reports &amp; Status
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          ব্যবহারকারীদের পাঠানো সর্বশেষ বাগ রিপোর্ট, নতুন ফিচারের পরামর্শ এবং সেগুলোর লাইভ সমাধান স্ট্যাটাস (Solved, Working, Acknowledged)।
        </p>
      </section>

      {/* Status Summary KPI Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border border-border bg-card rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-foreground">{reports.length}</div>
          <div className="text-xs font-bold text-muted-foreground">Total Reports</div>
        </Card>
        <Card className="border border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {solvedCount}
          </div>
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            ✓ Solved (সমাধানকৃত)
          </div>
        </Card>
        <Card className="border border-amber-500/30 bg-amber-500/5 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {workingCount}
          </div>
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
            ⚙ Working (কাজ চলছে)
          </div>
        </Card>
        <Card className="border border-blue-500/30 bg-blue-500/5 rounded-2xl p-4 text-center">
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
            {acknowledgedCount}
          </div>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
            👁 Acknowledged (বিবেচনাধীন)
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Submit a Bug Report */}
        <Card className="lg:col-span-5 border border-border bg-card shadow-xs rounded-2xl">
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-base font-extrabold text-foreground flex items-center gap-2">
              <Bug size={16} className="text-rose-500" />
              <span>নতুন বাগ রিপোর্ট বা পরামর্শ দিন</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              টাইপিংয়ে কোনো সমস্যা পেলে বিস্তারিত লিখুন — আমরা দ্রুত সমাধান করে স্ট্যাটাস আপডেট করব।
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            {submitted ? (
              <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-3">
                <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
                <h3 className="text-base font-bold text-foreground">
                  বাগ রিপোর্ট সফলভাবে জমা হয়েছে!
                </h3>
                <div className="inline-flex items-center gap-1.5 bg-background border border-border px-3 py-1 rounded-full text-xs font-mono text-primary font-bold">
                  <span>Tracking ID: {refId}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  আপনার রিপোর্টটি নিচের তালিকায় যুক্ত হয়েছে।
                </p>
                <Button
                  size="sm"
                  onClick={() => setSubmitted(false)}
                  className="font-bold text-xs cursor-pointer"
                >
                  আরেকটি রিপোর্ট পাঠান
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, category: "bug" })}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      form.category === "bug"
                        ? "bg-rose-500/10 border-rose-500/40 text-rose-600 dark:text-rose-400"
                        : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Bug size={14} /> Bug Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, category: "suggestion" })}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      form.category === "suggestion"
                        ? "bg-primary/10 border-primary/40 text-primary"
                        : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <MessageSquare size={14} /> Feature Idea
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">
                    আপনার নাম (ঐচ্ছিক)
                  </label>
                  <Input
                    placeholder="e.g. Tanvir Ahmed"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="text-xs h-9 border-border"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">
                    ইমেইল (ঐচ্ছিক)
                  </label>
                  <Input
                    type="email"
                    placeholder="e.g. tanvir@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="text-xs h-9 border-border"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">
                    সমস্যার সংক্ষিপ্ত শিরোনাম (Subject)
                  </label>
                  <Input
                    placeholder="যেমন: UniBijoy লেআউটে স্বরবর্ণ টাইপিং সমস্যা"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="text-xs h-9 border-border"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">
                    বিস্তারিত বিবরণ (Description) *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="কী টাইপ করার সময় কী সমস্যা দেখাচ্ছে তা বিস্তারিত লিখুন..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full p-3 rounded-md border border-border bg-background text-xs font-normal text-foreground outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-bold text-xs gap-2 h-10 shadow-xs cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>সাবমিট হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>বাগ রিপোর্ট সাবমিট করুন</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Latest Bug Reports & Status Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <Wrench size={16} className="text-emerald-500" />
              <h2 className="text-sm font-black text-foreground">
                সর্বশেষ বাগ রিপোর্ট ও স্ট্যাটাস (Latest Reports)
              </h2>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: "all", label: "All" },
                { id: "solved", label: "Solved" },
                { id: "working", label: "Working" },
                { id: "acknowledged", label: "Acknowledged" },
                { id: "open", label: "Open" },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStatusFilter(st.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    statusFilter === st.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {loadingReports ? (
            <Card className="border border-border bg-card rounded-2xl p-10 text-center">
              <Loader2 size={24} className="animate-spin mx-auto text-primary mb-2" />
              <p className="text-xs text-muted-foreground font-bold">
                সর্বশেষ বাগ রিপোর্ট লোড হচ্ছে...
              </p>
            </Card>
          ) : filteredReports.length === 0 ? (
            <Card className="border border-border bg-card rounded-2xl p-10 text-center">
              <p className="text-xs text-muted-foreground font-bold">
                এই স্ট্যাটাসে কোনো বাগ রিপোর্ট নেই।
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredReports.map((item) => {
                const badge = getBugStatusBadgeMeta(item.status);
                const isBug = item.category === "bug";
                return (
                  <Card
                    key={item.id || item.refId}
                    className="border border-border bg-card rounded-2xl p-5 space-y-3 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={
                            isBug
                              ? "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-bold"
                              : "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold"
                          }
                        >
                          {isBug ? "🐛 Bug Report" : "💡 Feature Request"}
                        </Badge>
                        {item.refId && (
                          <span className="text-[11px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border">
                            {item.refId}
                          </span>
                        )}
                        <h3 className="text-sm font-extrabold text-foreground">
                          {item.subject || "Bug Report"}
                        </h3>
                      </div>

                      <Badge
                        variant="outline"
                        className={`text-[11px] font-extrabold px-2.5 py-0.5 ${badge.className}`}
                      >
                        {badge.label} • {badge.labelBn}
                      </Badge>
                    </div>

                    <div className="p-3.5 rounded-xl bg-secondary/40 border border-border text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                      {item.message}
                    </div>

                    {item.adminNote && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                        <strong className="font-extrabold">সমাধান নোট (Dev Update): </strong>
                        {item.adminNote}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
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
          )}
        </div>
      </div>
    </main>
  );
}

