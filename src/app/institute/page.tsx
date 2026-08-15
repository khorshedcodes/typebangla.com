"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2, Users, GraduationCap, BookOpen,
  Award, CheckCircle2, ArrowRight, BarChart2,
  ShieldCheck, Sparkles, Send, MessageSquare,
  Clock, FileSpreadsheet, Lock, ExternalLink,
  Laptop, Check, AlertCircle, Phone, Mail
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { submitInstituteV2Waitlist } from "../../lib/firestoreService";
import { trackWaitlistSubmission } from "../../utils/analytics";

const V2_FEATURES = [
  {
    icon: Users,
    title: "Multi-Teacher Admin Roles",
    titleBn: "মাল্টি-টিচার অ্যাডমিন প্যানেল",
    desc: "Assign separate teacher permissions, manage multi-branch campuses, and control class-level access control.",
    tag: "Enterprise"
  },
  {
    icon: FileSpreadsheet,
    title: "Bulk CSV Roster Import",
    titleBn: "বাল্ক সিএসভি রস্টার ইমপোর্ট",
    desc: "Import thousands of students in one click with automated account provisioning and login credentials generation.",
    tag: "Automation"
  },
  {
    icon: ShieldCheck,
    title: "Anti-Cheat Exam Engine",
    titleBn: "অ্যান্টি-চিট এক্সাম সিস্টেম",
    desc: "Proctored typing exam sessions with tab-switch logging, copy-paste prevention, and real-time live monitoring.",
    tag: "Security"
  },
  {
    icon: Award,
    title: "Automated PDF Certificates",
    titleBn: "অটোমেটেড কিউআর সার্টিফিকেট",
    desc: "Instant verifiable QR-coded PDF speed certificates issued automatically upon assignment or exam completion.",
    tag: "Verification"
  },
  {
    icon: BarChart2,
    title: "Deep Performance Analytics",
    titleBn: "পারফরম্যান্স অ্যানালিটিক্স হিটম্যাপ",
    desc: "Heatmaps, error analysis by key, speed growth charts, and exportable gradebooks for institutional reporting.",
    tag: "Analytics"
  },
  {
    icon: BookOpen,
    title: "Custom Passage & Exam Builder",
    titleBn: "কাস্টম প্যাসেজ ও এক্সাম বিল্ডার",
    desc: "Upload custom Govt recruitment typing passages (BPSC, Bank, NSI) with tailored WPM thresholds and duration limits.",
    tag: "Customization"
  }
];

export default function InstitutePage() {
  const [formData, setFormData] = useState({
    instituteName: "",
    contactName: "",
    email: "",
    phone: "",
    role: "owner" as "owner" | "principal" | "teacher" | "student" | "other",
    expectedStudents: "50-200",
    requestedFeatures: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.instituteName.trim() || !formData.contactName.trim() || !formData.email.trim()) {
      setErrorMessage("Please fill in all required fields (Institute Name, Contact Name, and Email).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitInstituteV2Waitlist(formData);
      if (res) {
        setSubmittedRefId("INST-V2-" + Math.random().toString(36).substring(2, 8).toUpperCase());
        trackWaitlistSubmission(formData.instituteName, formData.role, formData.expectedStudents);
      } else {
        setErrorMessage("Failed to submit waitlist application. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-primary/20 selection:text-foreground">
      {/* Background Glow & Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24 space-y-16">

        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>TypeBangla Institute OS V2.0</span>
            <Badge className="bg-primary text-primary-foreground font-black ml-1 text-[10px]">Early Access</Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
            The Next Generation OS for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Typing Academies & Institutions
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            আমরা টাইপমাস্টার ইন্সটিটিউট পোর্টালকে সম্পূর্ণ নতুনভাবে সাজাচ্ছি! 
            মাল্টি-টিচার অ্যাডমিন প্যানেল, অ্যান্টি-চিট প্রক্টরড এক্সাম ইঞ্জিন, বাল্ক সিএসভি রস্টার এবং অটোজেনারেটেড কিউআর ভেরিফায়েড সার্টিফিকেট নিয়ে আসছে 
            <strong className="text-foreground font-bold"> TypeBangla Institute V2</strong>।
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            <a
              href="#waitlist-form"
              className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-extrabold text-sm hover:bg-primary/90 transition-all shadow-md flex items-center gap-2 cursor-pointer"
              id="cta-join-waitlist"
            >
              <span>ইন্সটিটিউট ভলিউম অ্যাকাউন্ট আবেদন</span> <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#features-showcase"
              className="px-6 py-3.5 rounded-xl bg-secondary border border-border text-foreground font-bold text-sm hover:bg-secondary/80 transition-all flex items-center gap-2 cursor-pointer"
              id="cta-explore-features"
            >
              <span>ফিচারসমূহ দেখুন</span> <Sparkles className="w-4 h-4 text-primary" />
            </a>
          </div>
        </section>

        {/* Highlights Stats Counter */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: "Planned Capacity", val: "50,000+ Students", desc: "Scalable Infrastructure" },
            { label: "Security Standard", val: "Anti-Cheat 2.0", desc: "Proctored Exam Modes" },
            { label: "Certificate Engine", val: "QR Verified PDF", desc: "Instant Generation" },
            { label: "Layout Specs", val: "7 Standard Layouts", desc: "Full Govt Exam Specs" },
          ].map((item, idx) => (
            <Card key={idx} className="bg-card border-border p-5 text-center shadow-xs rounded-2xl">
              <div className="text-xl sm:text-2xl font-black text-primary">{item.val}</div>
              <div className="text-xs font-extrabold text-foreground mt-1">{item.label}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
            </Card>
          ))}
        </section>

        {/* Feature Grid Showcase */}
        <section id="features-showcase" className="space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="outline" className="text-xs font-bold text-primary border-primary/30 bg-primary/10">
              SNEAK PEEK & ROADMAP
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground">Powering Next-Gen Institutional Education</h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Key enterprise features currently being crafted in our active development branch for Institute V2 release.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {V2_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Card key={idx} className="bg-card border-border hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1 rounded-2xl shadow-xs">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="border-border text-muted-foreground text-[10px] font-mono">
                        {feat.tag}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                        {feat.title}
                      </h3>
                      <div className="text-xs font-bold text-primary">{feat.titleBn}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                        {feat.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Interactive Waitlist & Feature Request Form */}
        <section id="waitlist-form" className="max-w-4xl mx-auto bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden bg-grid-pattern">
          <div className="relative space-y-8">
            <div className="text-center space-y-2">
              <Badge variant="outline" className="text-xs font-bold text-primary border-primary/30 bg-primary/10">
                PRIORITY ACCESS & FEEDBACK
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">ইন্সটিটিউট ভলিউম অ্যাকাউন্ট ও আর্লি অ্যাক্সেস</h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                আপনার কম্পিউটার প্রশিক্ষণ কেন্দ্র, একাডেমি বা স্কুলের শিক্ষার্থীদের জন্য ইনস্টিটিউট অ্যাকাউন্ট প্যানেলে আর্লি অ্যাক্সেস নিশ্চিত করুন।
              </p>
            </div>

            {submittedRefId ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="border-emerald-500/50 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
                    REF ID: {submittedRefId}
                  </Badge>
                  <h3 className="text-2xl font-black text-foreground">আবেদন সফলভাবে গৃহীত হয়েছে!</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    ধন্যবাদ! আপনার ইন্সটিটিউটের তথ্য এবং ফিডব্যাক আমাদের ফায়ারস্টোর ডাটাবেসে সংরক্ষিত হয়েছে। আর্লি অ্যাক্সেস চালু হওয়া মাত্র আমাদের টিম সরাসরি আপনার ইমেইলে নোটিফিকেশন পাঠাবে।
                  </p>
                </div>
                <Button
                  onClick={() => setSubmittedRefId(null)}
                  variant="outline"
                  className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-bold text-xs h-10 px-6 cursor-pointer"
                >
                  নতুন প্রতিক্রিয়া প্রদান করুন
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      ইন্সটিটিউট / একাডেমির নাম *
                    </label>
                    <Input
                      id="input-institute-name"
                      placeholder="যেমন: ঢাকা আইটি ও টাইপিং একাডেমি"
                      value={formData.instituteName}
                      onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                      className="bg-secondary border-border text-foreground h-11 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      যোগাযোগকারীর নাম *
                    </label>
                    <Input
                      id="input-contact-name"
                      placeholder="যেমন: তানভীর হোসেন"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="bg-secondary border-border text-foreground h-11 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      অফিসিয়াল ইমেইল অ্যাড্রেস *
                    </label>
                    <Input
                      id="input-email"
                      type="email"
                      placeholder="যেমন: admin@academy.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-secondary border-border text-foreground h-11 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      ফোন / হোয়াটসঅ্যাপ নম্বর
                    </label>
                    <Input
                      id="input-phone"
                      placeholder="যেমন: +880 1700-000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-secondary border-border text-foreground h-11 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      আপনার দায়িত্ব/পদবী
                    </label>
                    <select
                      id="select-role"
                      value={formData.role}
                      onChange={(e: any) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-secondary border border-border text-foreground rounded-md px-3 h-11 text-xs focus:outline-none"
                    >
                      <option value="owner">ইন্সটিটিউট ডিরেক্টর / অনার</option>
                      <option value="principal">প্রিন্সিপাল / প্রধান শিক্ষক</option>
                      <option value="teacher">টাইপিং ট্রেইনার / ইনস্ট্রাক্টর</option>
                      <option value="student">শিক্ষার্থী / পরীক্ষার্থী</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      আনুমানিক শিক্ষার্থী সংখ্যা
                    </label>
                    <select
                      id="select-students"
                      value={formData.expectedStudents}
                      onChange={(e) => setFormData({ ...formData, expectedStudents: e.target.value })}
                      className="w-full bg-secondary border border-border text-foreground rounded-md px-3 h-11 text-xs focus:outline-none"
                    >
                      <option value="< 50">৫০ জনের নিচে</option>
                      <option value="50-200">৫০ – ২০০ জন শিক্ষার্থী</option>
                      <option value="200-1000">২০০ – ১,০০০ জন শিক্ষার্থী</option>
                      <option value="1000+">১,০০০+ জন শিক্ষার্থী</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    আপনার ইন্সটিটিউটের জন্য কোনো বিশেষ ফিচার প্রয়োজন? (পরামর্শ ও মতামত)
                  </label>
                  <textarea
                    id="textarea-features"
                    rows={3}
                    placeholder="যেমন: সরকারি চাকরির নির্দিষ্ট প্যাসেজ আপলোড, কাস্টম লোগো প্রিন্টেড সার্টিফিকেট, বা রেজাল্ট গ্রেডিং ক্রাইটেরিয়া..."
                    value={formData.requestedFeatures}
                    onChange={(e) => setFormData({ ...formData, requestedFeatures: e.target.value })}
                    className="w-full bg-secondary border border-border text-foreground rounded-md p-3 text-xs focus:outline-none resize-y"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 font-bold text-sm shadow-md cursor-pointer"
                  id="btn-submit-waitlist"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      আবেদন জমা হচ্ছে...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> আবেদন জমা দিন ও স্থান সুনিশ্চিত করুন
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">সাধারণ জিজ্ঞাসা (FAQ)</h2>
            <p className="text-xs text-muted-foreground">TypeBangla Institute OS V2 সম্পর্কে প্রয়োজনীয় তথ্য</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "ইন্সটিটিউট V2 কখন চালু হবে?",
                a: "Institute V2 আমাদের ডেভলপমেন্ট ট্র্যাকে সচল রয়েছে। অপেক্ষমান তালিকার ইন্সটিটিউটগুলোর জন্য অগ্রাধিকার ভিত্তিতে রিলিজ দেওয়া হচ্ছে।"
              },
              {
                q: "পূর্বের ইন্সটিটিউটের ডাটা সংরক্ষিত থাকবে?",
                a: "হ্যাঁ, সমস্ত বিদ্যমান ক্লাসরুম, শিক্ষার্থী তালিকা এবং অর্জিত সার্টিফিকেট ফাইল স্বয়ংক্রিয়ভাবে মাইগ্রেট হয়ে যাবে।"
              },
              {
                q: "কাস্টম ফিচার বা লোগো যুক্ত করা সম্ভব?",
                a: "অবশ্যই। আবেদন ফর্মে আপনার পছন্দমতো কাস্টম লোগো এবং সার্টিফায়েড ফরম্যাট উল্লেখ করলে আমাদের টিম তা যুক্ত করবে।"
              },
              {
                q: "সরকারি চাকরির প্যাসেজ কাস্টমাইজ করা যাবে?",
                a: "হ্যাঁ, বিপিএসসি, ব্যাংক ও বিভিন্ন সরকারি নিয়োগ পরীক্ষার প্যাসেজ আপলোড করে সময়সীমা নির্ধারণের পূর্ণ সুবিধা থাকবে।"
              }
            ].map((faq, idx) => (
              <Card key={idx} className="bg-card border-border p-5 space-y-2 shadow-xs rounded-2xl">
                <h3 className="text-sm font-extrabold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
