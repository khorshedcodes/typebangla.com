"use client";

import React, { useState } from "react";
import { Send, Mail, MapPin, MessageSquare, CheckCircle2, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10 fade-in text-foreground">
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
          আপনার কোনো প্রশ্ন, মতামত বা ইনস্টিটিউট রেজিস্ট্রেশন সংক্রান্ত সহযোগিতার জন্য সরাসরি আমাদের সাথে যোগাযোগ করুন।
        </p>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Contact Badges */}
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
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="font-bold text-foreground block text-sm">Location</span>
                  <span className="text-muted-foreground leading-relaxed block">
                    Dhaka, Bangladesh 🇧🇩
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-border">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="font-bold text-foreground block text-sm">Response Time</span>
                  <span className="text-muted-foreground leading-relaxed block">
                    ২৪ ঘণ্টার মধ্যে দ্রুত উত্তর প্রদান
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardContent className="p-5 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 font-bold text-foreground">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>ইনস্টিটিউট ও বাল্ক সাপোর্ট:</span>
              </div>
              <p className="leading-relaxed">
                স্কুল, কলেজ ও ট্রেনিং সেন্টার লাইসেন্সের জন্য আমাদের এডমিন টিম সহায়তার জন্য প্রস্তুত।
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Contact Form */}
        <Card className="md:col-span-2 border border-border bg-card shadow-sm rounded-2xl">
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-lg font-bold text-foreground">মেসেজ পাঠান</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">নিচের ফর্মে আপনার বার্তা টাইপ করে সাবমিট করুন।</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {submitted && (
              <div className="p-4 mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 size={16} />
                <span>ধন্যবাদ! আপনার বার্তা আমাদের টিমের কাছে সফলভাবে পৌঁছেছে।</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground block">আপনার নাম</label>
                  <Input
                    type="text" 
                    required 
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="আপনার নাম লিখুন"
                    className="h-10 text-xs bg-background border-border"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground block">ইমেইল এড্রেস</label>
                  <Input
                    type="email" 
                    required 
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="student@typebangla.com"
                    className="h-10 text-xs bg-background border-border font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">বিষয় (Subject)</label>
                <Input
                  type="text" 
                  required 
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="যেমন: টাইপিং কোর্স বা ইনস্টেক্সট সংক্রান্ত সহায়তা"
                  className="h-10 text-xs bg-background border-border"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">আপনার বার্তা (Message)</label>
                <textarea
                  rows={4} 
                  required 
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="এখানে আপনার বিস্তারিত বার্তা লিখুন..."
                  className="w-full text-xs p-3.5 border border-border bg-background text-foreground rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none font-sans leading-relaxed"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black h-11 gap-2 cursor-pointer shadow-md"
              >
                <Send size={15} />
                <span>মেসেজ সাবমিট করুন</span>
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
