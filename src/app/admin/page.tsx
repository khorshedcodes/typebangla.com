"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users, BarChart3, BookOpen, Award, FileText,
  Settings, ShieldAlert, CheckCircle2, Search,
  Plus, Trash2, Edit3, Lock, Flame, CreditCard,
  XCircle, Clock, Building2, User, RefreshCw, AlertCircle,
  Sparkles, Mail, Phone, Send, Check, ShieldCheck, Layers
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import {
  getPaymentRequests,
  updatePaymentRequestStatus,
  PaymentRequestRecord,
  getInstituteV2WaitlistRequests,
  updateWaitlistStatus,
  InstituteV2WaitlistRecord
} from "../../lib/firestoreService";

export default function AdminDashboardPage() {
  const { user, role, loading, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "waitlist" | "payments" | "users" | "exams" | "lessons">("overview");

  // Payment Requests State
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequestRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [filterType, setFilterType] = useState<"all" | "institute" | "individual">("all");
  const [isLoadingPayments, setIsLoadingPayments] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Institute V2 Waitlist State
  const [waitlistRequests, setWaitlistRequests] = useState<InstituteV2WaitlistRecord[]>([]);
  const [waitlistFilterStatus, setWaitlistFilterStatus] = useState<"all" | "pending" | "contacted" | "approved">("all");
  const [isLoadingWaitlist, setIsLoadingWaitlist] = useState<boolean>(false);
  const [waitlistSearch, setWaitlistSearch] = useState<string>("");

  const fetchPayments = async () => {
    setIsLoadingPayments(true);
    try {
      const data = await getPaymentRequests();
      setPaymentRequests(data);
    } catch (err) {
      console.error("Error fetching payment requests:", err);
    } finally {
      setIsLoadingPayments(false);
    }
  };

  const fetchWaitlist = async () => {
    setIsLoadingWaitlist(true);
    try {
      const data = await getInstituteV2WaitlistRequests();
      setWaitlistRequests(data);
    } catch (err) {
      console.error("Error fetching waitlist requests:", err);
    } finally {
      setIsLoadingWaitlist(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      fetchPayments();
      fetchWaitlist();
    });
  }, []);

  const handleApprovePayment = async (req: PaymentRequestRecord) => {
    if (!req.id) return;
    const ok = await updatePaymentRequestStatus(req.id, "approved", req.instituteId, req.certificateCount);
    if (ok) {
      setActionMessage(`Approved payment TxID: ${req.transactionId}! Added ${req.certificateCount} credits.`);
      fetchPayments();
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleRejectPayment = async (req: PaymentRequestRecord) => {
    if (!req.id) return;
    const ok = await updatePaymentRequestStatus(req.id, "rejected");
    if (ok) {
      setActionMessage(`Rejected payment TxID: ${req.transactionId}.`);
      fetchPayments();
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleStatusChangeWaitlist = async (id: string, newStatus: "pending" | "contacted" | "approved") => {
    const ok = await updateWaitlistStatus(id, newStatus);
    if (ok) {
      setActionMessage(`Updated waitlist record status to "${newStatus}".`);
      fetchWaitlist();
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const pendingPaymentsCount = paymentRequests.filter((r) => r.status === "pending").length;
  const pendingWaitlistCount = waitlistRequests.filter((w) => w.status === "pending").length;

  // Platform Metrics
  const stats = [
    { label: "মোট নিবন্ধিত ব্যবহারকারী", value: "1,248", icon: Users, change: "+12% this week" },
    { label: "ইন্সটিটিউট V2 ওয়েটলিস্ট আবেদন", value: `${waitlistRequests.length}`, icon: Building2, change: pendingWaitlistCount > 0 ? `${pendingWaitlistCount} Pending Review` : "All Evaluated" },
    { label: "পেন্ডিং পেমেন্ট রিকোয়েস্ট", value: `${pendingPaymentsCount}`, icon: CreditCard, change: pendingPaymentsCount > 0 ? "Action Needed" : "All Processed" },
    { label: "ইস্যুকৃত সনদপত্র", value: "852", icon: CheckCircle2, change: "+34 this month" },
  ];

  const mockUsers = [
    { id: "u1", name: "Tanvir Ahmed", email: "tanvir@example.com", role: "student", avgWpm: 45, highWpm: 68 },
    { id: "u2", name: "Anika Rahman", email: "anika@example.com", role: "teacher", avgWpm: 52, highWpm: 74 },
    { id: "u3", name: "Khorshed Alam", email: "admin@typebangla.com", role: "admin", avgWpm: 65, highWpm: 88 },
  ];

  const filteredPaymentRequests = paymentRequests.filter((r) => {
    const matchesStatus = filterStatus === "all" || r.status === filterStatus;
    const matchesType = filterType === "all" || r.payerType === filterType;
    return matchesStatus && matchesType;
  });

  const filteredWaitlistRequests = waitlistRequests.filter((w) => {
    const matchesStatus = waitlistFilterStatus === "all" || w.status === waitlistFilterStatus;
    const matchesSearch =
      !waitlistSearch ||
      w.instituteName.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
      w.contactName.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
      w.email.toLowerCase().includes(waitlistSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Mock Govt Exam Passages for Exam Hub tab
  const samplePassages = [
    { id: "p1", title: "BPSC Computer Operator Test 2026", category: "Govt Job", duration: "10 mins", wpmTarget: 30, lang: "Bangla (Bijoy)" },
    { id: "p2", title: "NSI Data Entry Speed Exam", category: "Govt Job", duration: "5 mins", wpmTarget: 28, lang: "Bangla (Avro)" },
    { id: "p3", title: "Bank Officer English Speed Arena", category: "Banking", duration: "5 mins", wpmTarget: 40, lang: "English" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-mono">Verifying Admin Credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-extrabold uppercase tracking-wider">
              403 Forbidden Access
            </span>
            <h2 className="text-2xl font-bold text-white">Access Denied</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              The TypeMaster Admin Control Center is strictly restricted to authorized platform administrators. Your current account ({user?.email || "Guest"}) does not have administrator privileges.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/login" className="w-full sm:w-auto">
              <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-5">
                Sign In as Admin
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-slate-800 text-slate-300 hover:text-white text-xs font-bold px-5">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-col gap-6 shrink-0">
        <div className="flex items-center gap-3 px-2">
          <Image
            src="/images/logo/icon.svg"
            alt="typebangla logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg"
          />
          <div>
            <h2 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
              <span>typebangla</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-400 border border-purple-500/30 px-1.5 py-0.2 rounded font-mono">ADMIN</span>
            </h2>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">System Operator</span>
          </div>
        </div>

        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${
              activeTab === "overview" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <BarChart3 size={16} />
            <span>Overview & Health</span>
          </button>

          <button
            onClick={() => setActiveTab("waitlist")}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${
              activeTab === "waitlist" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 size={16} />
              <span>Institute V2 Waitlist</span>
            </div>
            {pendingWaitlistCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-teal-500 text-slate-950 font-extrabold text-[10px]">
                {pendingWaitlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${
              activeTab === "payments" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CreditCard size={16} />
              <span>Payment Top-Ups</span>
            </div>
            {pendingPaymentsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px]">
                {pendingPaymentsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${
              activeTab === "users" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Users size={16} />
            <span>User Directory</span>
          </button>

          <button
            onClick={() => setActiveTab("exams")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${
              activeTab === "exams" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Award size={16} />
            <span>Govt Exams Hub</span>
          </button>

          <button
            onClick={() => setActiveTab("lessons")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${
              activeTab === "lessons" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <BookOpen size={16} />
            <span>Content Manager</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
              <span>Platform Administration System</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Enterprise Management Control Center for TypeMaster</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <User size={13} /> User Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Logged in:</span>
              <span className="text-xs font-bold text-purple-300 bg-purple-950/60 border border-purple-800/60 px-2.5 py-1 rounded-full">
                {user?.email || "Admin Operator"}
              </span>
            </div>
          </div>
        </div>

        {actionMessage && (
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center justify-between animate-in fade-in duration-200">
            <span>{actionMessage}</span>
            <CheckCircle2 size={16} className="text-purple-400" />
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">{s.label}</span>
                      <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
                        <Icon size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-white">{s.value}</div>
                    <span className="text-[11px] text-purple-400 font-medium">{s.change}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-white">System Status & Database Connection Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Firebase Cloud Firestore</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-white">Operational (asia-south1)</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Vercel Edge Network</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-white">Connected</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Security Rules & Auth WAF</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-white">Active Enforcement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WAITLIST APPLICATIONS TAB */}
        {activeTab === "waitlist" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-teal-400" />
                    <span>Institute V2 Early Access Applications</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Review interest registrations submitted by computer training institutes, academies, and schools on /institute.
                  </p>
                </div>
                
                <Button
                  onClick={fetchWaitlist}
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold gap-1.5 border-slate-800 text-slate-300 hover:text-white"
                >
                  <RefreshCw size={13} className={isLoadingWaitlist ? "animate-spin" : ""} />
                  <span>Refresh Applications</span>
                </Button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  {(["all", "pending", "contacted", "approved"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setWaitlistFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                        waitlistFilterStatus === st ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st === "all" ? "All Apps" : st}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search academy or contact..."
                    value={waitlistSearch}
                    onChange={(e) => setWaitlistSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 w-64"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Academy / Institute</th>
                      <th className="p-3">Contact Person &amp; Role</th>
                      <th className="p-3">Expected Capacity</th>
                      <th className="p-3">Requested Features</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredWaitlistRequests.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500">
                          {isLoadingWaitlist ? "Loading waitlist applications..." : "No waitlist submissions found matching your filter."}
                        </td>
                      </tr>
                    ) : (
                      filteredWaitlistRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3">
                            <div className="font-bold text-white text-sm">{req.instituteName}</div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1"><Mail size={10} /> {req.email}</span>
                              {req.phone && <span className="flex items-center gap-1"><Phone size={10} /> {req.phone}</span>}
                            </div>
                          </td>

                          <td className="p-3">
                            <div className="font-bold text-slate-200">{req.contactName}</div>
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-teal-400 capitalize">
                              {req.role}
                            </span>
                          </td>

                          <td className="p-3 font-mono font-bold text-slate-300">
                            {req.expectedStudents} Students
                          </td>

                          <td className="p-3 max-w-xs">
                            <div className="text-[11px] text-slate-300 truncate" title={req.requestedFeatures}>
                              {req.requestedFeatures || "No specific feature requests."}
                            </div>
                          </td>

                          <td className="p-3">
                            {req.status === "pending" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
                                <Clock size={11} /> Pending
                              </span>
                            )}
                            {req.status === "contacted" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-950 text-sky-400 border border-sky-800">
                                <Mail size={11} /> Contacted
                              </span>
                            )}
                            {req.status === "approved" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                                <CheckCircle2 size={11} /> Early Access Approved
                              </span>
                            )}
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {req.id && req.status !== "contacted" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleStatusChangeWaitlist(req.id!, "contacted")}
                                  className="h-7 text-[11px] font-bold text-sky-400 hover:bg-sky-950/50 px-2"
                                >
                                  Mark Contacted
                                </Button>
                              )}
                              {req.id && req.status !== "approved" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChangeWaitlist(req.id!, "approved")}
                                  className="h-7 text-[11px] font-bold bg-teal-600 hover:bg-teal-500 text-white px-2.5"
                                >
                                  Approve Access
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENTS TAB */}
        {activeTab === "payments" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple-400" />
                    <span>Certificate Credit Top-Up Requests</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Verify bKash / Nagad Transaction IDs (TxID) and approve credits for Institutes (20 Tk/cert) and Individual Students (50 Tk/cert).
                  </p>
                </div>
                
                <Button
                  onClick={fetchPayments}
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold gap-1.5 border-slate-800 text-slate-300 hover:text-white"
                >
                  <RefreshCw size={13} className={isLoadingPayments ? "animate-spin" : ""} />
                  <span>Refresh List</span>
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  {(["all", "pending", "approved", "rejected"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                        filterStatus === st ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st === "all" ? "All Requests" : st}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setFilterType("all")}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                      filterType === "all" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    onClick={() => setFilterType("institute")}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                      filterType === "institute" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Institutes (20 Tk)
                  </button>
                  <button
                    onClick={() => setFilterType("individual")}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                      filterType === "individual" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Individuals (50 Tk)
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Payer / Entity</th>
                      <th className="p-3">Method &amp; TxID</th>
                      <th className="p-3">Quantity &amp; BDT</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredPaymentRequests.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500">
                          No payment requests found matching your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredPaymentRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {req.payerType === "institute" ? (
                                <Building2 className="w-4 h-4 text-teal-400 shrink-0" />
                              ) : (
                                <User className="w-4 h-4 text-sky-400 shrink-0" />
                              )}
                              <div>
                                <div className="font-bold text-white">
                                  {req.instituteName || req.userId || "Unknown Payer"}
                                </div>
                                <span className="text-[10px] font-semibold text-slate-400 capitalize">
                                  {req.payerType} Account
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3 font-mono">
                            <div className="flex items-center gap-1.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                req.paymentMethod === "bKash" ? "bg-pink-950 text-pink-400 border border-pink-800" : "bg-orange-950 text-orange-400 border border-orange-800"
                              }`}>
                                {req.paymentMethod}
                              </span>
                              <span className="font-bold text-white">{req.transactionId}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                              From: {req.senderPhone}
                            </div>
                          </td>

                          <td className="p-3">
                            <div className="font-bold text-purple-300 text-sm">
                              {req.totalAmountBDT} BDT
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {req.certificateCount} Certs @ {req.pricePerCertBDT} Tk
                            </div>
                          </td>

                          <td className="p-3">
                            {req.status === "pending" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
                                <Clock size={11} /> Pending
                              </span>
                            )}
                            {req.status === "approved" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                                <CheckCircle2 size={11} /> Approved
                              </span>
                            )}
                            {req.status === "rejected" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800">
                                <XCircle size={11} /> Rejected
                              </span>
                            )}
                          </td>

                          <td className="p-3 text-right">
                            {req.status === "pending" ? (
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApprovePayment(req)}
                                  className="h-7 text-[11px] font-bold bg-purple-600 hover:bg-purple-500 text-white px-3"
                                >
                                  Approve (+{req.certificateCount})
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRejectPayment(req)}
                                  className="h-7 text-[11px] font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 px-2"
                                >
                                  Reject
                                </Button>
                              </div>
                            ) : (
                              <span className="text-[11px] font-semibold text-slate-500">
                                Processed
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* USERS DIRECTORY TAB */}
        {activeTab === "users" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">User Directory & Role Access Logs</h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search email or name..."
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Avg WPM</th>
                    <th className="p-3">High WPM</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {mockUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-white">
                        <div>{u.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{u.email}</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          u.role === "admin" ? "bg-purple-950 text-purple-400 border border-purple-800" :
                          u.role === "teacher" ? "bg-amber-950 text-amber-400 border border-amber-800" :
                          "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-purple-300 font-bold">{u.avgWpm} WPM</td>
                      <td className="p-3 font-mono text-purple-300 font-bold">{u.highWpm} WPM</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost" className="h-7 text-xs text-slate-400 hover:text-white">
                          Edit Role
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GOVT EXAMS HUB TAB */}
        {activeTab === "exams" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Government Exam Passage Manager</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Configure official typing passages for BPSC, NSI, Bank, and Secretariat speed tests.
                </p>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-500 text-white font-bold gap-1 text-xs">
                <Plus size={14} /> Add New Exam Passage
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {samplePassages.map((p) => (
                <div key={p.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {p.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{p.duration}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{p.title}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-2">
                    <span>Layout: <strong className="text-slate-200">{p.lang}</strong></span>
                    <span>Target: <strong className="text-emerald-400">{p.wpmTarget} WPM</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LESSONS & CONTENT MANAGER TAB */}
        {activeTab === "lessons" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sky-400" />
                  <span>Curriculum & Content Manager</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Manage beginner, intermediate, and advanced typing course drills and passage banks.
                </p>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-500 text-white font-bold gap-1 text-xs">
                <Plus size={14} /> Create Drill Passage
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-white">Bangla Course Modules</h4>
                <p className="text-xs text-slate-400">15 Interactive Masterclasses (Avro, Bijoy 52, Probhat)</p>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  100% Active & Published
                </span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-white">English Speed Drills</h4>
                <p className="text-xs text-slate-400">Word, Sentence, and Quote practice passage banks</p>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  3,400+ Passages Active
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
