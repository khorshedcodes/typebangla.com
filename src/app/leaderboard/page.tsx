"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trophy, ShieldCheck, ArrowLeft, X, ChevronRight, Zap, Filter, Calendar } from "lucide-react";
import { getTopLeaderboard } from "../../lib/firestoreService";
import { useAuth } from "../../context/AuthContext";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

interface LeaderboardEntry {
  rank?: number;
  name?: string;
  userId?: string;
  wpm?: number;
  netWpm?: number;
  accuracy: number;
  layout: string;
  mode?: string;
  timePeriod?: string;
}

function UserAvatar({ name }: { name: string }) {
  const safeName = (name || "").trim();
  const initials = safeName
    ? safeName
        .split(/\s+/)
        .slice(0, 2)
        .map((n) => n[0] || "")
        .join("")
        .toUpperCase()
    : "?";

  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-black text-xs shrink-0 shadow-xs border border-primary/20">
      {initials || "?"}
    </span>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3.5 animate-pulse">
          <div className="skeleton w-7 h-7 rounded-full" />
          <div className="skeleton w-8 h-8 rounded-full" />
          <div className="skeleton h-4 flex-1 rounded-md" />
          <div className="skeleton h-4 w-20 rounded-md" />
          <div className="skeleton h-4 w-16 rounded-md" />
          <div className="skeleton h-4 w-20 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return (
    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center font-black text-xs shadow-md">1</span>
  );
  if (rank === 2) return (
    <span className="w-8 h-8 rounded-full bg-secondary text-foreground border border-border inline-flex items-center justify-center font-black text-xs shadow-xs">2</span>
  );
  if (rank === 3) return (
    <span className="w-8 h-8 rounded-full bg-secondary text-foreground border border-border inline-flex items-center justify-center font-black text-xs shadow-xs">3</span>
  );
  return <span className="w-8 h-8 inline-flex items-center justify-center text-muted-foreground font-bold text-sm">{rank}</span>;
}

const EXTENDED_MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Tanvir Hossain", wpm: 92, accuracy: 99, layout: "unibijoy", mode: "60s" },
  { rank: 2, name: "Anika Rahman", wpm: 88, accuracy: 98, layout: "jatiya", mode: "60s" },
  { rank: 3, name: "Shahadat Alam", wpm: 85, accuracy: 97, layout: "avro", mode: "30s" },
  { rank: 4, name: "Nusrat Jahan", wpm: 81, accuracy: 96, layout: "english", mode: "60s" },
  { rank: 5, name: "Mahmud Hasan", wpm: 78, accuracy: 95, layout: "probhat", mode: "60s" },
  { rank: 6, name: "Farhana Islam", wpm: 75, accuracy: 96, layout: "inscript", mode: "60s" },
  { rank: 7, name: "Kazi Ripon", wpm: 73, accuracy: 94, layout: "unicode", mode: "60s" },
  { rank: 8, name: "Rakibul Islam", wpm: 71, accuracy: 93, layout: "unibijoy", mode: "60s" },
  { rank: 9, name: "Tasmia Akter", wpm: 68, accuracy: 95, layout: "avro", mode: "60s" },
  { rank: 10, name: "Abdur Rahim", wpm: 66, accuracy: 92, layout: "jatiya", mode: "60s" },
  { rank: 11, name: "Mehedi Hasan", wpm: 64, accuracy: 91, layout: "english", mode: "60s" },
  { rank: 12, name: "Sumiya Parvin", wpm: 62, accuracy: 93, layout: "probhat", mode: "60s" },
  { rank: 13, name: "Jahidul Islam", wpm: 60, accuracy: 90, layout: "inscript", mode: "60s" },
  { rank: 14, name: "Sabrina Sultana", wpm: 58, accuracy: 94, layout: "unicode", mode: "60s" },
  { rank: 15, name: "Naimur Rahman", wpm: 55, accuracy: 89, layout: "unibijoy", mode: "60s" },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [selectedLayout, setSelectedLayout] = useState<string>("all");
  const [selectedTime, setSelectedTime] = useState<"daily" | "weekly" | "monthly" | "yearly" | "all">("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAuthGateModal, setShowAuthGateModal] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getTopLeaderboard(selectedLayout, selectedTime, 100);
      setLeaderboardData(data as LeaderboardEntry[]);
      setLoading(false);
      setCurrentPage(1);
    }
    loadData();
  }, [selectedLayout, selectedTime]);

  const realData = leaderboardData.length > 0;
  const rawData = realData ? leaderboardData : EXTENDED_MOCK_LEADERBOARD;

  // Filter rawData by selectedLayout and time period if using fallback
  const filteredData = rawData.filter((item) => {
    if (selectedLayout !== "all" && item.layout !== selectedLayout) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 fade-in">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          হোমপেজে ফিরে যান
        </Link>

        {/* Banner Card */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs bg-grid-pattern">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-primary text-primary-foreground rounded-2xl shadow-md shrink-0">
              <Trophy size={32} />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">Global Rankings</span>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-mono font-black">
                  🗓️ LIVE {selectedTime.toUpperCase()} RANKINGS
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">জাতীয় স্পিড লিডারবোর্ড</h1>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                সকল কিবোর্ড লেআউটের জন্য টাইপিং গতির জাতীয় মেধা তালিকা। প্রতি মাসে র‍্যাঙ্কিং রিফ্রেশ হয় এবং শীর্ষ টাইপিস্টরা ভেরিফাইড মেধা সনদপত্র লাভ করেন।
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => {
              if (!user) {
                setShowAuthGateModal(true);
                return;
              }
              router.push("/exam/ranked");
            }}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 font-bold text-xs rounded-xl shadow-md h-11 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
          >
            <Trophy size={15} />
            <span>৩-মিন জাতীয় প্রতিযোগিতায় অংশ নিন</span>
          </Button>
        </div>

        {/* Dual Filter Controls Bar: 7 Layouts + 5 Time Periods */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl p-4 space-y-4">
          
          {/* Keyboard Layout Filter Buttons */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-foreground uppercase tracking-wider">
              <Filter size={14} className="text-primary" />
              <span>কিবোর্ড লেআউট সিলেক্ট করুন:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: "all", label: "সব লেআউট (All)" },
                { id: "avro", label: "Avro Phonetic" },
                { id: "unibijoy", label: "UniBijoy (52)" },
                { id: "jatiya", label: "Jatiya (BCC)" },
                { id: "probhat", label: "Probhat" },
                { id: "inscript", label: "Inscript" },
                { id: "unicode", label: "Unicode" },
                { id: "english", label: "English QWERTY" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setSelectedLayout(tab.id); setCurrentPage(1); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                    selectedLayout === tab.id
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Period Filter Buttons */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-xs font-black text-foreground uppercase tracking-wider">
              <Calendar size={14} className="text-emerald-500" />
              <span>সময়সীমা ফিল্টার (Time Horizon):</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: "all", label: "সর্বকালের (All-Time)" },
                { id: "daily", label: "আজকের (Daily)" },
                { id: "weekly", label: "এই সপ্তাহের (Weekly)" },
                { id: "monthly", label: "এই মাসের (Monthly)" },
                { id: "yearly", label: "এই বছরের (Yearly)" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTime(t.id as any); setCurrentPage(1); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                    selectedTime === t.id
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 shadow-xs"
                      : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {!realData && !loading && (
          <div className="flex items-center gap-2 text-xs text-foreground bg-secondary border border-border px-4 py-2.5 rounded-xl">
            <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
            <span>ডেমো লিডারবোর্ড সিমুলেশন। সরকারি পরীক্ষা বা জাতীয় প্রতিযোগিতায় অংশগ্রহণ করে আপনার স্কোর ক্লাউড লিডারবোর্ডে যুক্ত করুন!</span>
          </div>
        )}

        {/* Leaderboard Table with Pagination */}
        <Card className="border border-border bg-card rounded-2xl p-6 shadow-xs space-y-4">
          {loading ? (
            <LeaderboardSkeleton />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-muted-foreground uppercase font-bold border-b border-border">
                    <tr>
                      <th className="p-3.5 w-16 text-center">র‍্যাংক</th>
                      <th className="p-3.5">টাইপিস্ট</th>
                      <th className="p-3.5">গতি (Net WPM)</th>
                      <th className="p-3.5">নির্ভুলতা</th>
                      <th className="p-3.5">লেআউট</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paginatedData.map((item, idx) => {
                      const rank = (currentPage - 1) * pageSize + idx + 1;
                      return (
                        <tr key={idx} className="hover:bg-secondary/60 transition-colors">
                          <td className="p-3.5 text-center">
                            <RankBadge rank={rank} />
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <UserAvatar name={item.name || item.userId || "Anonymous"} />
                              <span className="font-extrabold text-foreground">
                                {item.name || item.userId || "Anonymous Learner"}
                              </span>
                              {rank === 1 && (
                                <Badge className="text-[9px] font-black bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                  চ্যাম্পিয়ন 🏆
                                </Badge>
                              )}
                            </div>
                          </td>

                          <td className="p-3.5 font-mono text-base font-black text-foreground">
                            {item.netWpm || item.wpm} WPM
                          </td>

                          <td className="p-3.5 font-bold text-foreground">
                            {item.accuracy}%
                          </td>

                          <td className="p-3.5 uppercase font-bold text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-[10px] font-mono uppercase font-bold border-border">
                              {item.layout}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border text-xs font-bold">
                  <span className="text-muted-foreground">
                    পৃষ্ঠা <strong className="text-foreground">{currentPage}</strong> / {totalPages} (মোট <strong className="text-foreground">{filteredData.length}</strong> জন টাইপিস্ট)
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="text-xs h-8 px-3 border-border cursor-pointer"
                    >
                      পূর্ববর্তী
                    </Button>

                    {Array.from({ length: totalPages }).map((_, pIdx) => {
                      const pageNum = pIdx + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-lg text-xs font-black transition-all border cursor-pointer ${
                            currentPage === pageNum
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="text-xs h-8 px-3 border-border cursor-pointer"
                    >
                      পরবর্তী
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>

        {!loading && filteredData.length === 0 && (
          <div className="text-center py-16 space-y-4 bg-card border border-border rounded-2xl">
            <div className="text-5xl">🏅</div>
            <h3 className="text-lg font-black text-foreground">এই ক্যাটাগরিতে প্রথম স্থান অর্জন করুন!</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">এখনও এই সিলেক্ট করা লেআউট ও সময়ের জন্য কোনো স্কোর মেলেনি। টাইপিং টেস্ট দিয়ে তালিকায় নাম যোগ করুন।</p>
            <Link href="/practice/test" className="inline-block pt-2">
              <Button className="font-bold text-xs gap-2 px-6 h-10 shadow-md cursor-pointer">
                <Zap size={15} />
                <span>এখনই স্পিড টেস্ট দিন</span>
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Auth Gate Modal for National Leaderboard Competition */}
      {showAuthGateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card className="max-w-md w-full border border-border bg-card shadow-2xl p-6 space-y-6 relative rounded-2xl">
            <button
              onClick={() => setShowAuthGateModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto">
                <Trophy size={24} />
              </div>
              <Badge variant="outline" className="text-[10px] font-bold text-primary border-primary/30 bg-primary/5 px-2.5 py-0.5">
                Sign In Required
              </Badge>
              <h3 className="text-xl font-black text-foreground">Sign In to Compete for National Rank</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Submitting your score to the National Leaderboard and competing for top rankings requires a free TypeBangla Learner account.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Button
                onClick={() => router.push("/login?redirect=/leaderboard")}
                className="w-full text-xs font-bold h-10 gap-2 cursor-pointer"
              >
                Sign In to Compete <ChevronRight size={14} />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/signup?redirect=/leaderboard")}
                className="w-full text-xs font-bold h-10 border-border cursor-pointer"
              >
                Create Free Account
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
