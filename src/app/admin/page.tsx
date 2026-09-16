"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users, BarChart3, BookOpen, Award, FileText,
  Settings, ShieldAlert, CheckCircle2, Search,
  Plus, Trash2, Edit3, Lock, Flame, CreditCard,
  XCircle, Clock, Building2, User, RefreshCw, AlertCircle,
  Sparkles, Mail, Phone, Send, Check, ShieldCheck, Layers,
  ExternalLink, Activity, MessageSquare, Megaphone, Bell, Eye, Save, Radio
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
  updateUserRole,
  getSystemAnalytics,
  getCertificatesList,
  seedDemoCertificates,
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
  ContactMessage,
  getGlobalAnnouncement,
  saveGlobalAnnouncement,
  AnnouncementConfig,
  DEFAULT_ANNOUNCEMENT,
} from "../../lib/firestoreService";
import { ALL_EXAM_PASSAGES } from "../../utils/lessons/exam/examPassages";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "waitlist" | "payments" | "users" | "certificates" | "exams" | "feedback" | "announcement">("overview");

  // Admin Environment Email Check
  const envAdminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@typebangla.com").toLowerCase().trim();
  const isAuthorizedAdmin = Boolean(
    user && user.email && user.email.toLowerCase().trim() === envAdminEmail
  );

  // System Analytics State
  const [analytics, setAnalytics] = useState<{
    totalUsers: number;
    totalCertificates: number;
    totalSessions: number;
    totalWaitlist: number;
    totalPayments: number;
    totalFeedback: number;
  }>({
    totalUsers: 0,
    totalCertificates: 0,
    totalSessions: 0,
    totalWaitlist: 0,
    totalPayments: 0,
    totalFeedback: 0,
  });
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

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
  const [userSearch, setUserSearch] = useState<string>("");
  const [editingUserUid, setEditingUserUid] = useState<string | null>(null);

  // Certificates State
  const [certificatesList, setCertificatesList] = useState<any[]>([]);
  const [isLoadingCertificates, setIsLoadingCertificates] = useState<boolean>(false);
  const [certSearch, setCertSearch] = useState<string>("");

  // Exam Passages Search
  const [examSearch, setExamSearch] = useState<string>("");

  // Feedback & Improvement Suggestions State
  const [feedbackMessages, setFeedbackMessages] = useState<ContactMessage[]>([]);
  const [feedbackCategoryFilter, setFeedbackCategoryFilter] = useState<"all" | "suggestion" | "bug" | "general">("all");
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState<"all" | "unread" | "reviewed" | "resolved">("all");
  const [feedbackSearch, setFeedbackSearch] = useState<string>("");
  const [isLoadingFeedback, setIsLoadingFeedback] = useState<boolean>(false);

  const fetchAnalytics = async () => {
    setIsLoadingAnalytics(true);
    try {
      const data = await getSystemAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

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

  const fetchCertificates = async () => {
    setIsLoadingCertificates(true);
    try {
      const data = await getCertificatesList();
      setCertificatesList(data);
    } catch (err) {
      console.error("Error fetching certificates list:", err);
    } finally {
      setIsLoadingCertificates(false);
    }
  };

  const fetchFeedback = async () => {
    setIsLoadingFeedback(true);
    try {
      const data = await getContactMessages();
      setFeedbackMessages(data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  const handleUpdateFeedbackStatus = async (id: string, status: "unread" | "reviewed" | "resolved") => {
    await updateContactMessageStatus(id, status);
    setFeedbackMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    await deleteContactMessage(id);
    setFeedbackMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const [announcementConfig, setAnnouncementConfig] = useState<AnnouncementConfig>(DEFAULT_ANNOUNCEMENT);
  const [isLoadingAnnouncement, setIsLoadingAnnouncement] = useState<boolean>(false);
  const [isSavingAnnouncement, setIsSavingAnnouncement] = useState<boolean>(false);

  const fetchAnnouncement = async () => {
    setIsLoadingAnnouncement(true);
    try {
      const config = await getGlobalAnnouncement();
      setAnnouncementConfig(config);
    } catch (err) {
      console.error("Error loading announcement config:", err);
    } finally {
      setIsLoadingAnnouncement(false);
    }
  };

  const handleSaveAnnouncement = async (rebroadcast: boolean = false) => {
    setIsSavingAnnouncement(true);
    try {
      const configToSave: AnnouncementConfig = {
        ...announcementConfig,
        id: rebroadcast ? `announcement_${Date.now()}` : (announcementConfig.id || `announcement_${Date.now()}`),
      };
      const ok = await saveGlobalAnnouncement(configToSave, user?.email || undefined);
      if (ok) {
        setAnnouncementConfig(configToSave);
        setActionMessage(
          rebroadcast
            ? "New Announcement re-broadcasted successfully! All users will see this again."
            : "Global announcement settings saved successfully!"
        );
        setTimeout(() => setActionMessage(null), 4000);
      } else {
        setActionMessage("Failed to save announcement settings.");
        setTimeout(() => setActionMessage(null), 4000);
      }
    } catch (err) {
      console.error("Error saving announcement:", err);
      setActionMessage("Error occurred while saving announcement.");
      setTimeout(() => setActionMessage(null), 4000);
    } finally {
      setIsSavingAnnouncement(false);
    }
  };

  const refreshAllData = () => {
    fetchAnalytics();
    fetchPayments();
    fetchWaitlist();
    fetchUsers();
    fetchCertificates();
    fetchFeedback();
    fetchAnnouncement();
  };

  useEffect(() => {
    if (isAuthorizedAdmin) {
      queueMicrotask(() => {
        refreshAllData();
      });
    }
  }, [isAuthorizedAdmin]);

  const handleApprovePayment = async (req: PaymentRequestRecord) => {
    if (!req.id) return;
    const ok = await updatePaymentRequestStatus(req.id, "approved", req.instituteId, req.certificateCount, req.userId);
    if (ok) {
      setActionMessage(`Approved payment TxID: ${req.transactionId}! Added ${req.certificateCount} credits.`);
      fetchPayments();
      fetchAnalytics();
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleRejectPayment = async (req: PaymentRequestRecord) => {
    if (!req.id) return;
    const ok = await updatePaymentRequestStatus(req.id, "rejected");
    if (ok) {
      setActionMessage(`Rejected payment TxID: ${req.transactionId}.`);
      fetchPayments();
      fetchAnalytics();
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleStatusChangeWaitlist = async (id: string, newStatus: "pending" | "contacted" | "approved") => {
    const ok = await updateWaitlistStatus(id, newStatus);
    if (ok) {
      setActionMessage(`Updated waitlist record status to "${newStatus}".`);
      fetchWaitlist();
      fetchAnalytics();
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleRoleChange = async (uid: string, newRole: string) => {
    const ok = await updateUserRole(uid, newRole);
    if (ok) {
      setActionMessage(`Updated user role to "${newRole}".`);
      setEditingUserUid(null);
      fetchUsers();
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const pendingPaymentsCount = paymentRequests.filter((r) => r.status === "pending").length;
  const pendingWaitlistCount = waitlistRequests.filter((w) => w.status === "pending").length;
  const pendingFeedbackCount = feedbackMessages.filter((m) => !m.status || m.status === "unread").length;
  const suggestionFeedbackCount = feedbackMessages.filter((m) => m.category === "suggestion" || m.category === "improvement").length;
  const bugFeedbackCount = feedbackMessages.filter((m) => m.category === "bug").length;

  const filteredFeedback = feedbackMessages.filter((m) => {
    const matchesCategory =
      feedbackCategoryFilter === "all" ||
      (feedbackCategoryFilter === "suggestion" && (m.category === "suggestion" || m.category === "improvement")) ||
      (feedbackCategoryFilter === "bug" && m.category === "bug") ||
      (feedbackCategoryFilter === "general" && m.category !== "suggestion" && m.category !== "bug" && m.category !== "improvement");

    const matchesStatus =
      feedbackStatusFilter === "all" ||
      (feedbackStatusFilter === "unread" && (!m.status || m.status === "unread")) ||
      m.status === feedbackStatusFilter;

    const term = feedbackSearch.toLowerCase().trim();
    const matchesSearch =
      !term ||
      m.message?.toLowerCase().includes(term) ||
      m.subject?.toLowerCase().includes(term) ||
      m.name?.toLowerCase().includes(term) ||
      m.email?.toLowerCase().includes(term);

    return matchesCategory && matchesStatus && matchesSearch;
  });

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

  const filteredUsers = usersList.filter((u) => {
    if (!userSearch) return true;
    const s = userSearch.toLowerCase();
    return (
      (u.displayName && u.displayName.toLowerCase().includes(s)) ||
      (u.email && u.email.toLowerCase().includes(s)) ||
      (u.role && u.role.toLowerCase().includes(s))
    );
  });

  const filteredCertificates = certificatesList.filter((c) => {
    if (!certSearch) return true;
    const s = certSearch.toLowerCase();
    return (
      (c.certificateId && c.certificateId.toLowerCase().includes(s)) ||
      (c.candidateName && c.candidateName.toLowerCase().includes(s)) ||
      (c.studentName && c.studentName.toLowerCase().includes(s)) ||
      (c.layout && c.layout.toLowerCase().includes(s))
    );
  });

  const filteredPassages = ALL_EXAM_PASSAGES.filter((p) => {
    if (!examSearch) return true;
    const s = examSearch.toLowerCase();
    return (
      p.title.toLowerCase().includes(s) ||
      p.author.toLowerCase().includes(s) ||
      p.language.toLowerCase().includes(s)
    );
  });

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

  // Strict 403 Gate for anyone other than envAdminEmail
  if (!isAuthorizedAdmin) {
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
            <h2 className="text-2xl font-black text-foreground">Admin Access Only</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The TypeBangla Admin Control Center is strictly restricted to the platform administrator (<strong>{envAdminEmail}</strong>). 
              Your current account ({user?.email || "Guest"}) is not authorized.
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
            { id: "overview", label: "Overview & Analytics", icon: BarChart3 },
            { id: "announcement", label: "Global Announcement", icon: Megaphone },
            { id: "feedback", label: "পরামর্শ ও মতামত (Feedback)", icon: MessageSquare, count: pendingFeedbackCount },
            { id: "waitlist", label: "Institute V2 Waitlist", icon: Building2, count: pendingWaitlistCount },
            { id: "payments", label: "Payment Top-Ups", icon: CreditCard, count: pendingPaymentsCount },
            { id: "users", label: "User Directory", icon: Users, count: usersList.length },
            { id: "certificates", label: "Issued Certificates", icon: CheckCircle2, count: certificatesList.length },
            { id: "exams", label: "Govt Exams & Passages", icon: Award },
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
            <p className="text-xs text-muted-foreground mt-0.5">Live Firebase Cloud Database Control Center</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={refreshAllData}
              variant="outline"
              size="sm"
              className="text-xs font-bold gap-1.5 border-border text-foreground h-9 cursor-pointer"
            >
              <RefreshCw size={13} className={isLoadingAnalytics || isLoadingPayments || isLoadingUsers ? "animate-spin" : ""} />
              <span>Sync All Data</span>
            </Button>
            <Link
              href="/dashboard"
              className="text-xs font-bold text-muted-foreground hover:text-foreground bg-secondary border border-border px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <User size={13} /> Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-bold text-primary border-primary/30 bg-primary/10 px-2.5 py-1">
                {user?.email}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <Card className="bg-card border-border rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">মোট নিবন্ধিত ব্যবহারকারী</span>
                  <div className="p-2 bg-primary/10 text-primary rounded-xl">
                    <Users size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-foreground">
                  {isLoadingAnalytics ? "..." : analytics.totalUsers || usersList.length}
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Cloud Firestore Synced</span>
              </Card>

              <Card
                onClick={() => setActiveTab("feedback")}
                className="bg-card border-border rounded-2xl p-5 space-y-3 shadow-xs cursor-pointer hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">পরামর্শ ও ফিডব্যাক</span>
                  <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
                    <MessageSquare size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-foreground">
                  {isLoadingAnalytics ? "..." : analytics.totalFeedback || feedbackMessages.length}
                </div>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
                  {pendingFeedbackCount > 0 ? `${pendingFeedbackCount} Unread / Pending` : "All Reviewed"}
                </span>
              </Card>

              <Card className="bg-card border-border rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">ইন্সটিটিউট V2 আবেদন</span>
                  <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                    <Building2 size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-foreground">
                  {isLoadingAnalytics ? "..." : waitlistRequests.length}
                </div>
                <span className="text-[11px] text-primary font-bold">
                  {pendingWaitlistCount > 0 ? `${pendingWaitlistCount} Pending Review` : "All Evaluated"}
                </span>
              </Card>

              <Card className="bg-card border-border rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">পেন্ডিং পেমেন্ট রিকোয়েস্ট</span>
                  <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                    <CreditCard size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-foreground">
                  {isLoadingAnalytics ? "..." : pendingPaymentsCount}
                </div>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                  {pendingPaymentsCount > 0 ? `${pendingPaymentsCount} Actions Needed` : "All Processed"}
                </span>
              </Card>

              <Card className="bg-card border-border rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">ইস্যুকৃত সনদপত্র</span>
                  <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
                    <CheckCircle2 size={18} />
                  </div>
                </div>
                <div className="text-2xl font-black text-foreground">
                  {isLoadingAnalytics ? "..." : analytics.totalCertificates || certificatesList.length}
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Verified in Database</span>
              </Card>
            </div>

            {/* Live Infrastructure Matrix */}
            <Card className="bg-card border-border rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-extrabold text-sm text-foreground">System Status & Database Connection Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-secondary p-4 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground">Firebase Cloud Firestore</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-foreground">Operational (studio-4489913213-ea5ac)</span>
                  </div>
                </div>

                <div className="bg-secondary p-4 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground">Admin Environment Guard</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-foreground">{envAdminEmail}</span>
                  </div>
                </div>

                <div className="bg-secondary p-4 rounded-xl border border-border">
                  <span className="text-xs text-muted-foreground">Security Rules & Auth WAF</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-foreground">Active Protection</span>
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
                    Review interest registrations submitted by computer training institutes, academies, and schools.
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
                          {isLoadingWaitlist ? "Loading waitlist applications from Firebase..." : "No waitlist submissions found matching your filter."}
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
                                ✅ Approved
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
                    Verify bKash / Nagad Transaction IDs (TxID) and approve credits for Institutes and Individual Students.
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
                          {isLoadingPayments ? "Loading payment requests from Firebase..." : "No payment requests found matching your filter."}
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="font-extrabold text-sm text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Real User Directory ({usersList.length} registered in Firebase)</span>
                </h3>
                <p className="text-xs text-muted-foreground">Live accounts synced from Firebase Authentication and Firestore `users` collection.</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={fetchUsers}
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold gap-1.5 border-border text-foreground h-9 cursor-pointer"
                >
                  <RefreshCw size={13} className={isLoadingUsers ? "animate-spin" : ""} />
                  <span>Refresh Users</span>
                </Button>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search email, name, role..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="bg-secondary border border-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary text-muted-foreground uppercase font-bold border-b border-border">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Current Role</th>
                    <th className="p-3">Avg WPM</th>
                    <th className="p-3">High WPM</th>
                    <th className="p-3">XP / Level</th>
                    <th className="p-3 text-right">Role Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        {isLoadingUsers ? "Loading users from Cloud Firestore..." : "No registered users found matching your search."}
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.uid} className="hover:bg-secondary/50 transition-colors">
                        <td className="p-3 font-bold text-foreground">
                          <div>{u.displayName || "Typing Learner"}</div>
                          <div className="text-[10px] text-muted-foreground font-mono font-normal">{u.email || "No email"}</div>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            className={`text-[10px] font-bold uppercase ${
                              u.role === "admin"
                                ? "border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/10"
                                : u.role === "teacher"
                                ? "border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/10"
                                : "border-border text-foreground"
                            }`}
                          >
                            {u.role || "student"}
                          </Badge>
                        </td>
                        <td className="p-3 font-mono text-foreground font-extrabold">{u.avgWpm || 0} WPM</td>
                        <td className="p-3 font-mono text-foreground font-extrabold">{u.highWpm || 0} WPM</td>
                        <td className="p-3 font-mono text-foreground">
                          <span className="font-bold">{u.xp || 0} XP</span> <span className="text-muted-foreground text-[10px]">(Lvl {Math.max(u.level || 1, Math.floor((u.xp || 0) / 100) + 1)})</span>
                        </td>
                        <td className="p-3 text-right">
                          {editingUserUid === u.uid ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <select
                                defaultValue={u.role || "student"}
                                onChange={(e) => handleRoleChange(u.uid, e.target.value)}
                                className="bg-background border border-border text-xs rounded-lg px-2 py-1 font-bold text-foreground"
                              >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                              </select>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingUserUid(null)}
                                className="h-7 text-xs text-muted-foreground"
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingUserUid(u.uid)}
                              className="h-7 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                              Edit Role
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* CERTIFICATES TAB */}
        {activeTab === "certificates" && (
          <Card className="bg-card border-border rounded-2xl p-6 space-y-4 shadow-xs animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="font-black text-base text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Real Issued Certificates ({certificatesList.length} in Database)</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Permanent verifiable typing certificates stored in Firebase Firestore `certificates` collection.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    const ok = await seedDemoCertificates();
                    if (ok) {
                      setActionMessage("Successfully seeded demo certificates to Firebase!");
                      fetchCertificates();
                      fetchAnalytics();
                      setTimeout(() => setActionMessage(null), 5000);
                    }
                  }}
                  className="border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 font-bold gap-1 text-xs h-9 cursor-pointer"
                >
                  <Award size={14} /> Seed Test Certs
                </Button>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search candidate, ID, layout..."
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    className="bg-secondary border border-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary text-muted-foreground uppercase font-bold border-b border-border">
                  <tr>
                    <th className="p-3">Certificate ID</th>
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Speed &amp; Accuracy</th>
                    <th className="p-3">Layout / Mode</th>
                    <th className="p-3 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCertificates.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-muted-foreground">
                        {isLoadingCertificates ? "Loading certificates from Firebase..." : "No issued certificates found in the database."}
                      </td>
                    </tr>
                  ) : (
                    filteredCertificates.map((c) => (
                      <tr key={c.id || c.certificateId} className="hover:bg-secondary/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-foreground">
                          {c.certificateId || c.id}
                        </td>
                        <td className="p-3 font-bold text-foreground">
                          <div>{c.candidateName || c.studentName || "Candidate"}</div>
                          {c.instituteName && <div className="text-[10px] text-primary font-normal">{c.instituteName}</div>}
                        </td>
                        <td className="p-3 font-mono">
                          <span className="font-extrabold text-foreground text-sm">{c.wpm} WPM</span>
                          <span className="text-muted-foreground ml-1.5">({c.accuracy}% acc)</span>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-[10px] font-bold uppercase border-border">
                            {c.layout || "bangla"} • {c.mode || "standard"}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Link href={`/verify/${c.certificateId || c.id}`} target="_blank">
                            <Button size="sm" variant="ghost" className="h-7 text-xs font-bold gap-1 text-primary hover:bg-primary/10 cursor-pointer">
                              <span>Public Verify</span>
                              <ExternalLink size={12} />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* GOVT EXAMS & PASSAGES TAB */}
        {activeTab === "exams" && (
          <Card className="bg-card border-border rounded-2xl p-6 space-y-4 shadow-xs animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="font-black text-base text-foreground flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Official Exam Passages Bank ({ALL_EXAM_PASSAGES.length} Total Passages)</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Active typing passages for BPSC, NSI, Bank, and Ministry recruitment speed tests.
                </p>
              </div>

              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search passage title or language..."
                  value={examSearch}
                  onChange={(e) => setExamSearch(e.target.value)}
                  className="bg-secondary border border-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPassages.map((p) => (
                <div key={p.id} className="bg-secondary border border-border rounded-xl p-4 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-bold uppercase ${
                          p.language === "bangla"
                            ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                            : "border-sky-500/40 text-sky-600 dark:text-sky-400 bg-sky-500/10"
                        }`}
                      >
                        {p.language} • {p.difficulty}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-sans truncate max-w-[130px]">{p.author}</span>
                    </div>
                    <h4 className="font-black text-sm text-foreground">{p.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed font-bangla">
                      {p.text}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border pt-2 font-mono">
                    <span>Length: <strong>{p.text.length} chars</strong></span>
                    <span>Words: <strong>~{Math.round(p.text.length / 5)}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* USER FEEDBACK & SUGGESTIONS TAB */}
        {activeTab === "feedback" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Header & Controls Card */}
            <Card className="bg-card border-border rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h3 className="font-black text-base text-foreground flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-indigo-500" />
                    <span>ব্যবহারকারীদের পরামর্শ ও মতামত ({feedbackMessages.length} টি বার্তা)</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    ব্যবহারকারীদের পাঠানো উন্নতির প্রস্তাব (Suggestions), নতুন ফিচার আইডিয়া এবং প্ল্যাটফর্ম বাগ রিপোর্ট।
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    onClick={fetchFeedback}
                    variant="outline"
                    size="sm"
                    className="text-xs font-bold gap-1.5 border-border text-foreground h-9 cursor-pointer"
                  >
                    <RefreshCw size={13} className={isLoadingFeedback ? "animate-spin" : ""} />
                    <span>Refresh Feedback</span>
                  </Button>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search feedback message or email..."
                      value={feedbackSearch}
                      onChange={(e) => setFeedbackSearch(e.target.value)}
                      className="bg-secondary border border-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary w-56 sm:w-64"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Category Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="bg-secondary/60 border border-border p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">মোট প্রাপ্ত বার্তা</span>
                  <span className="text-base font-black text-foreground">{feedbackMessages.length}</span>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">💡 ফিচার/উন্নতির পরামর্শ</span>
                  <span className="text-base font-black text-indigo-600 dark:text-indigo-400">{suggestionFeedbackCount}</span>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">🐛 বাগ রিপোর্ট</span>
                  <span className="text-base font-black text-rose-600 dark:text-rose-400">{bugFeedbackCount}</span>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">অপেক্ষমান (Unread)</span>
                  <span className="text-base font-black text-amber-600 dark:text-amber-400">{pendingFeedbackCount}</span>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-border">
                {/* Category Filter Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-muted-foreground mr-1">ক্যাটাগরি:</span>
                  {[
                    { id: "all", label: "সকল বার্তা" },
                    { id: "suggestion", label: "💡 পরামর্শ (Suggestions)" },
                    { id: "bug", label: "🐛 বাগ রিপোর্ট (Bugs)" },
                    { id: "general", label: "✉️ সাধারণ বার্তা (General)" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFeedbackCategoryFilter(cat.id as any)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        feedbackCategoryFilter === cat.id
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Status Filter Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-muted-foreground mr-1">স্ট্যাটাস:</span>
                  {[
                    { id: "all", label: "সকল" },
                    { id: "unread", label: "অপেক্ষমান" },
                    { id: "reviewed", label: "পর্যালোচিত" },
                    { id: "resolved", label: "সমাধান হয়েছে" },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setFeedbackStatusFilter(st.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        feedbackStatusFilter === st.id
                          ? "bg-foreground text-background font-extrabold"
                          : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Feedback Messages List */}
            {filteredFeedback.length === 0 ? (
              <Card className="bg-card border-border rounded-2xl p-12 text-center space-y-3">
                <MessageSquare className="w-12 h-12 text-muted-foreground/40 mx-auto" />
                <h4 className="text-base font-bold text-foreground">কোনো পরামর্শ বা বার্তা পাওয়া যায়নি</h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  বর্তমানে নির্বাচিত ফিল্টারে কোনো পরামর্শ বা ফিডব্যাক নেই। নতুন কোনো ব্যবহারকারী ফিডব্যাক সাবমিট করলে এখানে রিয়েলটাইমে দৃশ্যমান হবে।
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredFeedback.map((m) => {
                  const isSuggestion = m.category === "suggestion" || m.category === "improvement";
                  const isBug = m.category === "bug";
                  const status = m.status || "unread";

                  return (
                    <Card key={m.id || m.refId} className="bg-card border-border rounded-2xl p-5 space-y-4 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          {isSuggestion ? (
                            <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 text-xs font-bold gap-1">
                              <span>💡 ফিচার / উন্নতির পরামর্শ</span>
                            </Badge>
                          ) : isBug ? (
                            <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 text-xs font-bold gap-1">
                              <span>🐛 বাগ রিপোর্ট</span>
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs font-bold gap-1 border-border">
                              <span>✉️ সাধারণ যোগাযোগ ({m.category})</span>
                            </Badge>
                          )}

                          <Badge
                            variant="outline"
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 ${
                              status === "resolved"
                                ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                                : status === "reviewed"
                                ? "border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/10"
                                : "border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10"
                            }`}
                          >
                            {status === "resolved" ? "✓ Resolved" : status === "reviewed" ? "Reviewed" : "● Unread"}
                          </Badge>

                          {m.refId && (
                            <span className="text-[11px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-md border border-border">
                              {m.refId}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                          <Clock size={12} />
                          <span>
                            {m.createdAt
                              ? new Date(m.createdAt).toLocaleString("bn-BD", { dateStyle: "medium", timeStyle: "short" })
                              : "Recent"}
                          </span>
                        </div>
                      </div>

                      {/* Sender Details */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-foreground">{m.name || "Anonymous Learner"}</span>
                          <span className="text-muted-foreground">•</span>
                          <a
                            href={`mailto:${m.email}?subject=Re: TypeBangla Feedback - ${encodeURIComponent(m.subject || "Your suggestion")}`}
                            className="text-primary hover:underline font-mono inline-flex items-center gap-1 font-bold"
                          >
                            <Mail size={12} />
                            <span>{m.email || "No email provided"}</span>
                          </a>
                        </div>
                        {m.subject && (
                          <span className="font-bold text-foreground bg-secondary px-2.5 py-1 rounded-lg border border-border text-xs">
                            বিষয়: {m.subject}
                          </span>
                        )}
                      </div>

                      {/* Full Message Text */}
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border text-xs leading-relaxed text-foreground whitespace-pre-wrap font-sans">
                        {m.message}
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/80 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-muted-foreground">স্ট্যাটাস পরিবর্তন:</span>
                          {status !== "reviewed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => m.id && handleUpdateFeedbackStatus(m.id, "reviewed")}
                              className="h-8 text-xs font-bold gap-1 border-border hover:border-blue-500 cursor-pointer"
                            >
                              <Check size={12} /> Mark as Reviewed
                            </Button>
                          )}
                          {status !== "resolved" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => m.id && handleUpdateFeedbackStatus(m.id, "resolved")}
                              className="h-8 text-xs font-bold gap-1 border-border hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 cursor-pointer"
                            >
                              <CheckCircle2 size={12} /> Mark as Resolved
                            </Button>
                          )}
                          {status !== "unread" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => m.id && handleUpdateFeedbackStatus(m.id, "unread")}
                              className="h-8 text-xs text-muted-foreground cursor-pointer"
                            >
                              Mark Unread
                            </Button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${m.email}?subject=Re: TypeBangla Feedback - ${encodeURIComponent(m.subject || "Thank you for your feedback")}`}
                          >
                            <Button size="sm" className="h-8 text-xs font-bold gap-1.5 cursor-pointer">
                              <Mail size={13} />
                              <span>Reply via Email</span>
                            </Button>
                          </a>
                          {m.id && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteFeedback(m.id!)}
                              className="h-8 text-xs text-destructive hover:bg-destructive/10 cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: GLOBAL ANNOUNCEMENT ── */}
        {activeTab === "announcement" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-emerald-500" />
                  <span>Global Site Announcement Modal</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Control the one-time popup notification displayed to all visitors. Re-broadcast to show it again to users who previously dismissed it.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchAnnouncement}
                  disabled={isLoadingAnnouncement}
                  className="h-8 text-xs font-bold gap-1.5 cursor-pointer"
                >
                  <RefreshCw size={13} className={isLoadingAnnouncement ? "animate-spin" : ""} />
                  <span>Reload</span>
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSaveAnnouncement(false)}
                  disabled={isSavingAnnouncement}
                  className="h-8 text-xs font-bold gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                >
                  <Save size={13} />
                  <span>{isSavingAnnouncement ? "Saving..." : "Save Settings"}</span>
                </Button>
              </div>
            </div>

            {/* Announcement Status Banner */}
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-colors ${
              announcementConfig.enabled
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                : "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${announcementConfig.enabled ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    Current Status: {announcementConfig.enabled ? "Active & Broadcasting" : "Disabled / Hidden"}
                  </div>
                  <div className="text-[11px] opacity-80">
                    {announcementConfig.enabled
                      ? "Visitors will see this popup on first visit until they click dismiss."
                      : "The announcement popup is turned off for all users."}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcementConfig.enabled}
                    onChange={(e) => setAnnouncementConfig((prev) => ({ ...prev, enabled: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
                </label>
                <span className="text-xs font-black">
                  {announcementConfig.enabled ? "ON" : "OFF"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Controls */}
              <div className="lg:col-span-7 space-y-4">
                <Card className="p-5 border bg-card/60 space-y-4">
                  <h3 className="text-sm font-extrabold text-foreground flex items-center gap-2">
                    <Edit3 size={15} className="text-primary" />
                    <span>Announcement Content</span>
                  </h3>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-1">
                      Badge / Tag Label
                    </label>
                    <input
                      type="text"
                      value={announcementConfig.tag || ""}
                      onChange={(e) => setAnnouncementConfig((prev) => ({ ...prev, tag: e.target.value }))}
                      placeholder="e.g. Notice, New Feature, Maintenance, Offer"
                      className="w-full px-3 py-2 rounded-xl text-xs bg-background border border-border focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-1">
                      Modal Title *
                    </label>
                    <input
                      type="text"
                      value={announcementConfig.title}
                      onChange={(e) => setAnnouncementConfig((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. নতুন বাংলা টাইপিং কোর্স শুরু হয়েছে!"
                      className="w-full px-3 py-2 rounded-xl text-xs bg-background border border-border focus:ring-1 focus:ring-primary focus:outline-none font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-1">
                      Message Body *
                    </label>
                    <textarea
                      rows={4}
                      value={announcementConfig.message}
                      onChange={(e) => setAnnouncementConfig((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Detailed notice or instructions for users..."
                      className="w-full px-3 py-2 rounded-xl text-xs bg-background border border-border focus:ring-1 focus:ring-primary focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground block mb-1">
                        Action Button Text (Optional)
                      </label>
                      <input
                        type="text"
                        value={announcementConfig.actionText || ""}
                        onChange={(e) => setAnnouncementConfig((prev) => ({ ...prev, actionText: e.target.value }))}
                        placeholder="e.g. Explore Now, বিস্তারিত দেখুন"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-background border border-border focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground block mb-1">
                        Action Button Link (Optional)
                      </label>
                      <input
                        type="text"
                        value={announcementConfig.actionUrl || ""}
                        onChange={(e) => setAnnouncementConfig((prev) => ({ ...prev, actionUrl: e.target.value }))}
                        placeholder="e.g. /courses or https://..."
                        className="w-full px-3 py-2 rounded-xl text-xs bg-background border border-border focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <Button
                      size="sm"
                      onClick={() => handleSaveAnnouncement(false)}
                      disabled={isSavingAnnouncement}
                      className="text-xs font-bold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                    >
                      <Save size={13} />
                      <span>{isSavingAnnouncement ? "Saving..." : "Save Changes"}</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (confirm("This will broadcast this announcement as a BRAND NEW announcement so that all users (even those who previously dismissed it) will see it again. Continue?")) {
                          handleSaveAnnouncement(true);
                        }
                      }}
                      disabled={isSavingAnnouncement}
                      className="text-xs font-bold gap-1.5 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                    >
                      <Radio size={13} className="text-emerald-500" />
                      <span>Re-broadcast to Everyone</span>
                    </Button>
                  </div>
                </Card>

                {/* Announcement ID & Metadata */}
                <div className="p-3 rounded-xl bg-secondary/50 border border-border text-[11px] text-muted-foreground flex items-center justify-between">
                  <span>Current Version ID: <code className="font-mono text-foreground font-bold">{announcementConfig.id}</code></span>
                  {announcementConfig.updatedBy && (
                    <span>Last updated by: {announcementConfig.updatedBy}</span>
                  )}
                </div>
              </div>

              {/* Live Preview Panel */}
              <div className="lg:col-span-5">
                <div className="sticky top-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Eye size={14} className="text-emerald-500" />
                      <span>Live User Modal Preview</span>
                    </h3>
                    <Badge variant="outline" className="text-[10px]">
                      {announcementConfig.enabled ? "Active" : "Preview Only"}
                    </Badge>
                  </div>

                  {/* Simulated Modal Card */}
                  <div className="rounded-2xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />

                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <Megaphone className="w-3 h-3" />
                          {announcementConfig.tag || "Notice"}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          Announcement
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {announcementConfig.title || "Announcement Title Preview"}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {announcementConfig.message || "This is how your announcement body text will appear to visitors."}
                      </p>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end gap-2">
                        <span className="px-3 py-1.5 text-[11px] font-medium text-slate-400">
                          Don&apos;t show again
                        </span>
                        {announcementConfig.actionUrl && (
                          <span className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white bg-emerald-600 inline-flex items-center gap-1">
                            {announcementConfig.actionText || "View Details"}
                            <ExternalLink size={11} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground text-center">
                    Note: Users can click outside the modal, press the close button, or select &quot;Don&apos;t show again&quot; to dismiss.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
