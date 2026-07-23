"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users, BarChart3, BookOpen, Award, FileText,
  Settings, ShieldAlert, CheckCircle2, Search,
  Plus, Trash2, Edit3, Lock, Flame, CreditCard,
  XCircle, Clock, Building2, User, RefreshCw, AlertCircle
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import {
  getPaymentRequests,
  updatePaymentRequestStatus,
  PaymentRequestRecord
} from "../../lib/firestoreService";

export default function AdminDashboardPage() {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "exams" | "lessons" | "payments">("overview");

  // Payment Requests State
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequestRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [filterType, setFilterType] = useState<"all" | "institute" | "individual">("all");
  const [isLoadingPayments, setIsLoadingPayments] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

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

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleApprove = async (req: PaymentRequestRecord) => {
    if (!req.id) return;
    const ok = await updatePaymentRequestStatus(req.id, "approved", req.instituteId, req.certificateCount);
    if (ok) {
      setActionMessage(`Approved request ${req.transactionId}! ${req.certificateCount} credits added.`);
      fetchPayments();
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleReject = async (req: PaymentRequestRecord) => {
    if (!req.id) return;
    const ok = await updatePaymentRequestStatus(req.id, "rejected");
    if (ok) {
      setActionMessage(`Rejected request ${req.transactionId}.`);
      fetchPayments();
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const pendingCount = paymentRequests.filter((r) => r.status === "pending").length;

  // Simple mock admin stats for UI completeness
  const stats = [
    { label: "মোট নিবন্ধিত ব্যবহারকারী", value: "1,248", icon: Users, change: "+12% this week" },
    { label: "মোট সম্পন্ন টাইপিং টেস্ট", value: "48,920", icon: BarChart3, change: "+18% today" },
    { label: "পেন্ডিং পেপমেন্ট রিকোয়েস্ট", value: `${pendingCount}`, icon: CreditCard, change: pendingCount > 0 ? "Action Needed" : "All Processed" },
    { label: "ইস্যুকৃত সনদপত্র", value: "852", icon: CheckCircle2, change: "+34 this month" },
  ];

  const mockUsers = [
    { id: "u1", name: "Tanvir Ahmed", email: "tanvir@example.com", role: "student", avgWpm: 45, highWpm: 68 },
    { id: "u2", name: "Anika Rahman", email: "anika@example.com", role: "teacher", avgWpm: 52, highWpm: 74 },
    { id: "u3", name: "Khorshed Alam", email: "admin@typebangla.com", role: "admin", avgWpm: 65, highWpm: 88 },
  ];

  const filteredRequests = paymentRequests.filter((r) => {
    const matchesStatus = filterStatus === "all" || r.status === filterStatus;
    const matchesType = filterType === "all" || r.payerType === filterType;
    return matchesStatus && matchesType;
  });

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
            <h2 className="font-extrabold text-sm tracking-tight text-white">typebangla ADMIN</h2>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">System Operator</span>
          </div>
        </div>

        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${
              activeTab === "overview" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <BarChart3 size={16} />
            <span>Overview & Health</span>
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${
              activeTab === "payments" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CreditCard size={16} />
              <span>Payment Top-Ups</span>
            </div>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px]">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${
              activeTab === "users" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Users size={16} />
            <span>User Directory</span>
          </button>

          <button
            onClick={() => setActiveTab("exams")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${
              activeTab === "exams" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Award size={16} />
            <span>Govt Exams Hub</span>
          </button>

          <button
            onClick={() => setActiveTab("lessons")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${
              activeTab === "lessons" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
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
            <h1 className="text-2xl font-black text-white">Platform Administration System</h1>
            <p className="text-xs text-slate-400 mt-1">Volume 6 Specification Compliant Control Panel</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Logged in as:</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
              {user?.email || "Admin Operator"}
            </span>
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">{s.label}</span>
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                        <Icon size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-white">{s.value}</div>
                    <span className="text-[11px] text-emerald-400 font-medium">{s.change}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-white">System Status & Environment Matrix</h3>
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
                  <span className="text-xs text-slate-400">Security Rules & WAF</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-white">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">User Directory & Performance Logs</h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search email or name..."
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
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
                      <td className="p-3 font-mono text-emerald-400 font-bold">{u.avgWpm} WPM</td>
                      <td className="p-3 font-mono text-emerald-400 font-bold">{u.highWpm} WPM</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="ghost" className="h-7 text-xs text-slate-400 hover:text-white">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {actionMessage && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between">
                <span>{actionMessage}</span>
                <CheckCircle2 size={16} />
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
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
                {/* Status Filter */}
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  {(["all", "pending", "approved", "rejected"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                        filterStatus === st ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st === "all" ? "All Requests" : st}
                    </button>
                  ))}
                </div>

                {/* Type Filter */}
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
                    {filteredRequests.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500">
                          No payment requests found matching your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                          
                          {/* Entity / Payer */}
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {req.payerType === "institute" ? (
                                <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
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

                          {/* Method & TxID */}
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

                          {/* Quantity & BDT */}
                          <td className="p-3">
                            <div className="font-bold text-emerald-400 text-sm">
                              {req.totalAmountBDT} BDT
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {req.certificateCount} Certs @ {req.pricePerCertBDT} Tk
                            </div>
                          </td>

                          {/* Status */}
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

                          {/* Actions */}
                          <td className="p-3 text-right">
                            {req.status === "pending" ? (
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApprove(req)}
                                  className="h-7 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-3"
                                >
                                  Approve (+{req.certificateCount})
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleReject(req)}
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
      </main>
    </div>
  );
}
