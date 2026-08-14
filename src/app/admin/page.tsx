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
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useAuth } from "../../context/AuthContext";
import {
  getPaymentRequests,
  updatePaymentRequestStatus,
  PaymentRequestRecord,
  getInstituteV2WaitlistRequests,
  updateWaitlistStatus,
  InstituteV2WaitlistRecord,
  getAllUsers,
  UserProfile,
  seedDemoCertificates
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

  // Registered Users Directory State
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);

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

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const data = await getAllUsers();
      setUsersList(data);
    } catch (err) {
      console.error("Error fetching users list:", err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      fetchPayments();
      fetchWaitlist();
      fetchUsers();
    });
  }, []);

  const handleApprovePayment = async (req: PaymentRequestRecord) => {
    if (!req.id) return;
    const ok = await updatePaymentRequestStatus(req.id, "approved", req.instituteId, req.certificateCount, req.userId);
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
    { id: "u3", name: "Khorshed Alam", email: "hello@khorshed-alam.com", role: "admin", avgWpm: 65, highWpm: 88 },
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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-muted-foreground font-mono">Verifying Admin Credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <Card className="max-w-md w-full bg-card border-border rounded-3xl p-8 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 bg-destructive/10 border border-destructive/30 text-destructive rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <Badge variant="outline" className="text-[10px] font-black uppercase text-destructive border-destructive/30 bg-destructive/5 px-2.5 py-0.5">
              403 Forbidden Access
            </Badge>
            <h2 className="text-2xl font-black text-foreground">Access Denied</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The TypeBangla Admin Control Center is strictly restricted to authorized platform administrators. Your current account ({user?.email || "Guest"}) does not have administrator privileges.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/login" className="w-full sm:w-auto">
              <Button className="w-full text-xs font-bold px-6 h-10 cursor-pointer">
                Sign In as Admin
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-border text-foreground text-xs font-bold px-6 h-10 cursor-pointer">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-b md:border-b-0 md:border-r border-border p-4 flex flex-col gap-6 shrink-0">
        <div className="flex items-center gap-3 px-2">
          <Image
            src="/images/logo/blackbg.png"
            alt="TypeBangla Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-xl dark:block hidden object-contain"
          />
          <Image
            src="/images/logo/whitebg_1.png"
            alt="TypeBangla Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-xl dark:hidden block object-contain"
          />
          <div>
            <h2 className="font-black text-sm tracking-tight text-foreground flex items-center gap-1.5">
              <span>TypeBangla</span>
              <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30 px-1.5 py-0.2 font-mono">ADMIN</Badge>
            </h2>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">System Operator</span>
          </div>
        </div>

        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto">
          {[
            { id: "overview", label: "Overview & Health", icon: BarChart3 },
            { id: "waitlist", label: "Institute V2 Waitlist", icon: Building2, count: pendingWaitlistCount },
            { id: "payments", label: "Payment Top-Ups", icon: CreditCard, count: pendingPaymentsCount },
            { id: "users", label: "User Directory", icon: Users },
            { id: "exams", label: "Govt Exams Hub", icon: Award },
            { id: "lessons", label: "Content Manager", icon: BookOpen },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all w-full shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs font-extrabold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.count && item.count > 0 ? (
                  <span className={`px-2 py-0.5 rounded-full font-black text-[10px] ${
                    isActive ? "bg-primary-foreground text-primary" : "bg-primary/20 text-primary"
                  }`}>
                    {item.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <span>Platform Administration System</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">Enterprise Management Control Center for TypeBangla</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs font-bold text-muted-foreground hover:text-foreground bg-secondary border border-border px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <User size={13} /> User Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Logged in:</span>
              <Badge variant="outline" className="text-xs font-bold text-primary border-primary/30 bg-primary/10 px-2.5 py-1">
                {user?.email || "Admin Operator"}
              </Badge>
            </div>
          </div>
        </div>

        {actionMessage && (
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-primary text-xs font-bold flex items-center justify-between animate-in fade-in duration-200">
            <span>{actionMessage}</span>
            <CheckCircle2 size={16} className="text-primary" />
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <Card key={idx} className="bg-card border-border rounded-2xl p-5 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground">{s.label}</span>
                      <div className="p-2 bg-primary/10 text-primary rounded-xl">
                        <Icon size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-foreground">{s.value}</div>
                    <span className="text-[11px] text-primary font-bold">{s.change}</span>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-card border-border rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-extrabold text-sm text-foreground">System Status & Database Connection Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-secondary p-4 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground">Firebase Cloud Firestore</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-foreground">Operational (asia-south1)</span>
                  </div>
                </div>

                <div className="bg-secondary p-4 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground">Vercel Edge Network</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-foreground">Connected</span>
                  </div>
                </div>

                <div className="bg-secondary p-4 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground">Security Rules & Auth WAF</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-foreground">Active Enforcement</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* WAITLIST APPLICATIONS TAB */}
        {activeTab === "waitlist" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <Card className="bg-card border-border rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h3 className="font-black text-base text-foreground flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <span>Institute V2 Early Access Applications</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Review interest registrations submitted by computer training institutes, academies, and schools on /institute.
                  </p>
                </div>
                
                <Button
                  onClick={fetchWaitlist}
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold gap-1.5 border-border text-foreground h-9 cursor-pointer"
                >
                  <RefreshCw size={13} className={isLoadingWaitlist ? "animate-spin" : ""} />
                  <span>Refresh Applications</span>
                </Button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 bg-secondary p-1 rounded-xl border border-border text-xs">
                  {(["all", "pending", "contacted", "approved"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setWaitlistFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                        waitlistFilterStatus === st ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {st === "all" ? "All Apps" : st}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search academy or contact..."
                    value={waitlistSearch}
                    onChange={(e) => setWaitlistSearch(e.target.value)}
                    className="bg-secondary border border-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary w-64"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-secondary text-muted-foreground uppercase font-bold border-b border-border">
                    <tr>
                      <th className="p-3">Academy / Institute</th>
                      <th className="p-3">Contact Person &amp; Role</th>
                      <th className="p-3">Expected Capacity</th>
                      <th className="p-3">Requested Features</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredWaitlistRequests.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-muted-foreground">
                          {isLoadingWaitlist ? "Loading waitlist applications..." : "No waitlist submissions found matching your filter."}
                        </td>
                      </tr>
                    ) : (
                      filteredWaitlistRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-secondary/50 transition-colors">
                          <td className="p-3">
                            <div className="font-extrabold text-foreground text-sm">{req.instituteName}</div>
                            <div className="text-[10px] text-muted-foreground flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1"><Mail size={10} /> {req.email}</span>
                              {req.phone && <span className="flex items-center gap-1"><Phone size={10} /> {req.phone}</span>}
                            </div>
                          </td>

                          <td className="p-3">
                            <div className="font-bold text-foreground">{req.contactName}</div>
                            <Badge variant="outline" className="mt-0.5 text-[10px] font-bold border-border uppercase">
                              {req.role}
                            </Badge>
                          </td>

                          <td className="p-3 font-mono font-bold text-foreground">
                            {req.expectedStudents} Students
                          </td>

                          <td className="p-3 max-w-xs">
                            <div className="text-[11px] text-muted-foreground truncate" title={req.requestedFeatures}>
                              {req.requestedFeatures || "No specific feature requests."}
                            </div>
                          </td>

                          <td className="p-3">
                            {req.status === "pending" && (
                              <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10 text-[10px] font-bold">
                                ⏳ Pending
                              </Badge>
                            )}
                            {req.status === "contacted" && (
                              <Badge variant="outline" className="border-sky-500/40 text-sky-600 dark:text-sky-400 bg-sky-500/10 text-[10px] font-bold">
                                📧 Contacted
                              </Badge>
                            )}
                            {req.status === "approved" && (
                              <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-[10px] font-bold">
                                ✅ Early Access Approved
                              </Badge>
                            )}
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {req.id && req.status !== "contacted" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleStatusChangeWaitlist(req.id!, "contacted")}
                                  className="h-7 text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-500/10 px-2 cursor-pointer"
                                >
                                  Mark Contacted
                                </Button>
                              )}
                              {req.id && req.status !== "approved" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChangeWaitlist(req.id!, "approved")}
                                  className="h-7 text-[11px] font-bold h-8 px-3 cursor-pointer"
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
            </Card>
          </div>
        )}

        {/* PAYMENTS TAB */}
        {activeTab === "payments" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <Card className="bg-card border-border rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h3 className="font-black text-base text-foreground flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span>Certificate Credit Top-Up Requests</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Verify bKash / Nagad Transaction IDs (TxID) and approve credits for Institutes (20 Tk/cert) and Individual Students (50 Tk/cert).
                  </p>
                </div>
                
                <Button
                  onClick={fetchPayments}
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold gap-1.5 border-border text-foreground h-9 cursor-pointer"
                >
                  <RefreshCw size={13} className={isLoadingPayments ? "animate-spin" : ""} />
                  <span>Refresh List</span>
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 bg-secondary p-1 rounded-xl border border-border text-xs">
                  {(["all", "pending", "approved", "rejected"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                        filterStatus === st ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {st === "all" ? "All Requests" : st}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 bg-secondary p-1 rounded-xl border border-border text-xs">
                  <button
                    onClick={() => setFilterType("all")}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                      filterType === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    onClick={() => setFilterType("institute")}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                      filterType === "institute" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Institutes (20 Tk)
                  </button>
                  <button
                    onClick={() => setFilterType("individual")}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                      filterType === "individual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Individuals (50 Tk)
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-secondary text-muted-foreground uppercase font-bold border-b border-border">
                    <tr>
                      <th className="p-3">Payer / Entity</th>
                      <th className="p-3">Method &amp; TxID</th>
                      <th className="p-3">Quantity &amp; BDT</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredPaymentRequests.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          No payment requests found matching your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredPaymentRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-secondary/50 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {req.payerType === "institute" ? (
                                <Building2 className="w-4 h-4 text-primary shrink-0" />
                              ) : (
                                <User className="w-4 h-4 text-primary shrink-0" />
                              )}
                              <div>
                                <div className="font-extrabold text-foreground">
                                  {req.instituteName || req.userId || "Unknown Payer"}
                                </div>
                                <span className="text-[10px] font-semibold text-muted-foreground capitalize">
                                  {req.payerType} Account
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3 font-mono">
                            <div className="flex items-center gap-1.5">
                              <Badge variant="outline" className="text-[10px] font-mono font-black border-border">
                                {req.paymentMethod}
                              </Badge>
                              <span className="font-bold text-foreground">{req.transactionId}</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground font-sans mt-0.5">
                              From: {req.senderPhone}
                            </div>
                          </td>

                          <td className="p-3">
                            <div className="font-black text-foreground text-sm">
                              {req.totalAmountBDT} BDT
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {req.certificateCount} Certs @ {req.pricePerCertBDT} Tk
                            </div>
                          </td>

                          <td className="p-3">
                            {req.status === "pending" && (
                              <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10 text-[10px] font-bold">
                                ⏳ Pending
                              </Badge>
                            )}
                            {req.status === "approved" && (
                              <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-[10px] font-bold">
                                ✅ Approved
                              </Badge>
                            )}
                            {req.status === "rejected" && (
                              <Badge variant="outline" className="border-rose-500/40 text-rose-600 dark:text-rose-400 bg-rose-500/10 text-[10px] font-bold">
                                ❌ Rejected
                              </Badge>
                            )}
                          </td>

                          <td className="p-3 text-right">
                            {req.status === "pending" ? (
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApprovePayment(req)}
                                  className="h-8 text-[11px] font-bold px-3 cursor-pointer"
                                >
                                  Approve (+{req.certificateCount})
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRejectPayment(req)}
                                  className="h-8 text-[11px] font-bold text-destructive hover:bg-destructive/10 px-2 cursor-pointer"
                                >
                                  Reject
                                </Button>
                              </div>
                            ) : (
                              <span className="text-[11px] font-semibold text-muted-foreground">
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
            </Card>
          </div>
        )}

        {/* USERS DIRECTORY TAB */}
        {activeTab === "users" && (
          <Card className="bg-card border-border rounded-2xl p-6 space-y-4 shadow-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-foreground">User Directory & Role Access Logs</h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search email or name..."
                  className="bg-secondary border border-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary text-muted-foreground uppercase font-bold border-b border-border">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Avg WPM</th>
                    <th className="p-3">High WPM</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(usersList.length > 0
                    ? usersList.map((u) => ({
                        id: u.uid,
                        name: u.displayName || "Typing Learner",
                        email: u.email || "N/A",
                        role: u.role || "student",
                        avgWpm: u.avgWpm || 0,
                        highWpm: u.highWpm || 0,
                      }))
                    : mockUsers
                  ).map((u) => (
                    <tr key={u.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="p-3 font-bold text-foreground">
                        <div>{u.name}</div>
                        <div className="text-[10px] text-muted-foreground font-normal">{u.email}</div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-[10px] font-bold uppercase border-border">
                          {u.role}
                        </Badge>
                      </td>
                      <td className="p-3 font-mono text-foreground font-extrabold">{u.avgWpm} WPM</td>
                      <td className="p-3 font-mono text-foreground font-extrabold">{u.highWpm} WPM</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                          Edit Role
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* GOVT EXAMS HUB TAB */}
        {activeTab === "exams" && (
          <Card className="bg-card border-border rounded-2xl p-6 space-y-4 shadow-xs animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="font-black text-base text-foreground flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Government Exam Passage Manager</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Configure official typing passages for BPSC, NSI, Bank, and Secretariat speed tests.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    const ok = await seedDemoCertificates();
                    if (ok) {
                      setActionMessage("Successfully seeded demo certificates (TM-DEMO-2026, TM-VERIFIED-9912, TM-E2E-101) to Firebase!");
                      setTimeout(() => setActionMessage(null), 5000);
                    }
                  }}
                  className="border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 font-bold gap-1 text-xs h-9 cursor-pointer"
                >
                  <Award size={14} /> Seed Demo Certs
                </Button>
                <Button size="sm" className="font-bold gap-1 text-xs h-9 cursor-pointer">
                  <Plus size={14} /> Add New Exam Passage
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {samplePassages.map((p) => (
                <div key={p.id} className="bg-secondary border border-border rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10 text-[10px] font-bold">
                      {p.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">{p.duration}</span>
                  </div>
                  <h4 className="font-black text-sm text-foreground">{p.title}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-2">
                    <span>Layout: <strong className="text-foreground">{p.lang}</strong></span>
                    <span>Target: <strong className="text-emerald-600 dark:text-emerald-400">{p.wpmTarget} WPM</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* LESSONS & CONTENT MANAGER TAB */}
        {activeTab === "lessons" && (
          <Card className="bg-card border-border rounded-2xl p-6 space-y-4 shadow-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="font-black text-base text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>Curriculum & Content Manager</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Manage beginner, intermediate, and advanced typing course drills and passage banks.
                </p>
              </div>
              <Button size="sm" className="font-bold gap-1 text-xs h-9 cursor-pointer">
                <Plus size={14} /> Create Drill Passage
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-secondary p-4 rounded-xl border border-border space-y-2">
                <h4 className="font-black text-sm text-foreground">Bangla Course Modules</h4>
                <p className="text-xs text-muted-foreground">15 Interactive Masterclasses (Avro, Bijoy 52, Probhat)</p>
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-[10px] font-bold">
                  100% Active & Published
                </Badge>
              </div>
              <div className="bg-secondary p-4 rounded-xl border border-border space-y-2">
                <h4 className="font-black text-sm text-foreground">English Speed Drills</h4>
                <p className="text-xs text-muted-foreground">Word, Sentence, and Quote practice passage banks</p>
                <Badge variant="outline" className="border-sky-500/40 text-sky-600 dark:text-sky-400 bg-sky-500/10 text-[10px] font-bold">
                  3,400+ Passages Active
                </Badge>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
