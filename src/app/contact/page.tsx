"use client";

import React, { useState } from "react";
import {
  Send, Mail, MapPin, MessageSquare, CheckCircle2, Sparkles, Clock,
  ShieldCheck, CreditCard, Building, HelpCircle, PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", category: "general", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", category: "general", subject: "", message: "" });
  };

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
                স্কুল, কলেজ ও কম্পিউটার ট্রেনিং সেন্টারের জন্য বাল্ক সার্টিফিকেট ও প্রাতিষ্ঠানিক পোর্টিং সুবিধা পেতে আমাদের সাথে সরাসরি যোগাযোগ করুন।
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interactive Form */}
        <Card className="md:col-span-2 border border-border bg-card shadow-sm rounded-2xl">
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-lg font-bold text-foreground">সরাসরি বার্তা পাঠান</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">নিচের ফর্মে বিষয় সিলেক্ট করে আপনার বার্তাটি লিখুন।</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {submitted ? (
              <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-3">
                <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-foreground">আপনার বার্তা সফলভাবে পাঠানো হয়েছে!</h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                  ধন্যবাদ। আমাদের সাপোর্ট টিম দ্রুত আপনার ইমেইলে (support@typebangla.com) উত্তর প্রদান করবে।
                </p>
                <Button size="sm" onClick={() => setSubmitted(false)} className="font-bold text-xs">
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
                    <option value="general">সাধারণ প্রশ্ন / ফিডব্যাক (General Question)</option>
                    <option value="billing">সার্টিফিকেট পেমেন্ট &amp; bKash/Nagad TrxID সমস্যা</option>
                    <option value="verification">সার্টিফিকেট ভেরিফিকেশন হেল্প (/verify/[id])</option>
                    <option value="institute">ইনস্টিটিউট পার্টনারশিপ &amp; বাল্ক লাইসেন্সিং</option>
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

                <Button type="submit" className="w-full font-bold text-xs gap-2 h-11 shadow-md">
                  <Send size={14} />
                  <span>মেসেজ সাবমিট করুন</span>
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
