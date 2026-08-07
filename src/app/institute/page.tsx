"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2, Users, GraduationCap, BookOpen,
  Award, CheckCircle2, ArrowRight, BarChart2,
  ShieldCheck, Sparkles, Send, MessageSquare,
  Clock, FileSpreadsheet, Lock, ExternalLink,
  Laptop, Check, AlertCircle
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { submitInstituteV2Waitlist } from "../../lib/firestoreService";

const V2_FEATURES = [
  {
    icon: Users,
    title: "Multi-Teacher Admin Roles",
    titleBn: "মাল্টি-টিচার অ্যাডমিন রোলস",
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
    title: "Anti-Cheat Exam System",
    titleBn: "অ্যান্টি-চিট এক্সাম সিস্টেম",
    desc: "Proctored typing exam sessions with tab-switch logging, copy-paste prevention, and real-time live monitoring.",
    tag: "Security"
  },
  {
    icon: Award,
    title: "Automated PDF Certificates",
    titleBn: "অটোমেটেড পিডিএফ সার্টিফিকেট",
    desc: "Instant verifiable QR-coded PDF speed certificates issued automatically upon assignment or exam completion.",
    tag: "Verification"
  },
  {
    icon: BarChart2,
    title: "Deep Performance Analytics",
    titleBn: "অ্যাডভান্সড পারফরম্যান্স অ্যানালিটিক্স",
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
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
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
        setSubmittedSuccess(true);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950">
      {/* Background Glow Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-20">

        {/* Hero Section */}
        <section className="text-center space-y-8 max-w-4xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium animate-pulse">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Institute OS V2 is Coming Soon</span>
            <Badge className="bg-teal-500 text-slate-950 hover:bg-teal-400 font-bold ml-1">v2.0 Early Access</Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The Next Generation Platform for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Typing Academies & Institutions
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            আমরা টাইপমাস্টার ইন্সটিটিউট প্ল্যাটফর্মকে সম্পূর্ণ নতুনভাবে সাজাচ্ছি! 
            মাল্টি-টিচার অ্যাডমিন প্যানেল, অ্যান্টি-চিট এক্সাম ইঞ্জিন, বাল্ক সিএসভি রস্টার এবং অটোজেনারেটেড ভেরিফায়েড সার্টিফিকেট নিয়ে আসছে 
            <strong className="text-teal-400 font-semibold"> TypeMaster Institute V2</strong>।
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <a
              href="#waitlist-form"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-lg hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/25 flex items-center gap-2"
              id="cta-join-waitlist"
            >
              Join V2 Early Access Waitlist <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features-showcase"
              className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2"
              id="cta-explore-features"
            >
              Explore Planned Features <Sparkles className="w-4 h-4 text-teal-400" />
            </a>
          </div>
        </section>

        {/* Highlights Stats Counter */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: "Planned Capacity", val: "50,000+ Students", desc: "Scalable Infrastructure" },
            { label: "Security Standard", val: "Anti-Cheat 2.0", desc: "Proctored Exam Modes" },
            { label: "Certificate Engine", val: "QR Verified", desc: "Instant PDF Generation" },
            { label: "Layout Support", val: "Avro, Bijoy, Eng", desc: "Full Govt Exam Specs" },
          ].map((item, idx) => (
            <Card key={idx} className="bg-slate-900/60 border-slate-800/80 backdrop-blur-sm p-6 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">{item.val}</div>
              <div className="text-sm font-semibold text-slate-200 mt-1">{item.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
            </Card>
          ))}
        </section>

        {/* Feature Grid Showcase */}
        <section id="features-showcase" className="space-y-10">
          <div className="text-center space-y-3">
            <Badge className="bg-slate-800 text-teal-400 border-slate-700">Sneak Peek</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Powering Next-Gen Typing Education</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Key features currently being crafted in our active development branch for Institute V2 launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {V2_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Card key={idx} className="bg-slate-900/70 border-slate-800 hover:border-teal-500/40 transition-all duration-300 group hover:-translate-y-1">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs">
                        {feat.tag}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                        {feat.title}
                      </h3>
                      <div className="text-xs font-medium text-teal-500/80 mb-2">{feat.titleBn}</div>
                      <p className="text-sm text-slate-400 leading-relaxed">
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
        <section id="waitlist-form" className="max-w-4xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Building2 className="w-64 h-64 text-teal-400" />
          </div>

          <div className="relative space-y-8">
            <div className="text-center space-y-2">
              <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20">Early Access & Input</Badge>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">Join the Institute V2 Priority Access</h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Be the first academy or school to test Institute V2 upon release. Tell us what features your institution needs most!
              </p>
            </div>

            {submittedSuccess ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">You&apos;re on the Priority List!</h3>
                <p className="text-slate-300 max-w-lg mx-auto">
                  Thank you for submitting your institute&apos;s request. Our product team will review your feature feedback and notify you via email when Early Access opens.
                </p>
                <Button
                  onClick={() => setSubmittedSuccess(false)}
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/60 mt-4"
                >
                  Submit Another Response
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Institute / Academy Name *
                    </label>
                    <Input
                      id="input-institute-name"
                      placeholder="e.g. Dhaka IT & Typing Academy"
                      value={formData.instituteName}
                      onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                      className="bg-slate-900 border-slate-800 text-slate-100 focus:border-teal-500 h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Your Full Name *
                    </label>
                    <Input
                      id="input-contact-name"
                      placeholder="e.g. Tanvir Hossain"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="bg-slate-900 border-slate-800 text-slate-100 focus:border-teal-500 h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Work Email *
                    </label>
                    <Input
                      id="input-email"
                      type="email"
                      placeholder="e.g. admin@academy.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-900 border-slate-800 text-slate-100 focus:border-teal-500 h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Phone / WhatsApp Number
                    </label>
                    <Input
                      id="input-phone"
                      placeholder="e.g. +880 1700-000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-slate-900 border-slate-800 text-slate-100 focus:border-teal-500 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Your Role
                    </label>
                    <select
                      id="select-role"
                      value={formData.role}
                      onChange={(e: any) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-100 focus:border-teal-500 rounded-md px-3 h-12 text-sm focus:outline-none"
                    >
                      <option value="owner">Institute Owner / Director</option>
                      <option value="principal">Principal / Headmaster</option>
                      <option value="teacher">Typing Instructor / Teacher</option>
                      <option value="student">Student / Candidate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Expected Student Count
                    </label>
                    <select
                      id="select-students"
                      value={formData.expectedStudents}
                      onChange={(e) => setFormData({ ...formData, expectedStudents: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-100 focus:border-teal-500 rounded-md px-3 h-12 text-sm focus:outline-none"
                    >
                      <option value="< 50">Under 50 Students</option>
                      <option value="50-200">50 – 200 Students</option>
                      <option value="200-1000">200 – 1,000 Students</option>
                      <option value="1000+">1,000+ Students</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    What features do you need most for your Institute? (Feature Requests & Suggestions)
                  </label>
                  <textarea
                    id="textarea-features"
                    rows={4}
                    placeholder="Tell us about your custom exam needs, grading criteria, certificate designs, or any specific workflow..."
                    value={formData.requestedFeatures}
                    onChange={(e) => setFormData({ ...formData, requestedFeatures: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-100 focus:border-teal-500 rounded-md p-3 text-sm focus:outline-none resize-y"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-lg hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/20"
                  id="btn-submit-waitlist"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                      Submitting Request...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" /> Submit & Lock Early Access
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400">Everything you need to know about TypeMaster Institute V2</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "When will Institute V2 launch?",
                a: "Institute V2 is actively under development on our V2 release branch. Early Access rollout for registered waitlist institutes will begin in Q3."
              },
              {
                q: "What happens to existing V1 Institute data?",
                a: "All existing V1 classes, students, and certificates will automatically be migrated smoothly without any data loss."
              },
              {
                q: "Can I request custom features for my academy?",
                a: "Yes! Use the interest form above to tell us what features your academy needs, and our product team will evaluate incorporating it before final launch."
              },
              {
                q: "Will V2 support custom government exam passages?",
                a: "Absolutely. Institute V2 includes a dedicated Passage & Exam Builder tailored for BPSC, Bank, Secretariat, and Custom recruitment standards."
              }
            ].map((faq, idx) => (
              <Card key={idx} className="bg-slate-900/60 border-slate-800 p-6 space-y-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-teal-400 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
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
