"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trophy, Award, Flame, Zap, Clock, ShieldCheck, ArrowLeft, Loader2, X, ChevronRight } from "lucide-react";
import { getTopLeaderboard } from "../../lib/firestoreService";
import { useAuth } from "../../context/AuthContext";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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
    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center font-black text-xs shadow-xs">1</span>
  );
  if (rank === 2) return (
    <span className="w-8 h-8 rounded-full bg-secondary text-foreground border border-border inline-flex items-center justify-center font-black text-xs shadow-xs">2</span>
  );
  if (rank === 3) return (
    <span className="w-8 h-8 rounded-full bg-secondary text-foreground border border-border inline-flex items-center justify-center font-black text-xs shadow-xs">3</span>
  );
  return <span className="w-8 h-8 inline-flex items-center justify-center text-muted-foreground font-bold text-sm">{rank}</span>;
}

const MOCK_LEADERBOARD = [
  { rank: 1, name: "Tanvir Hossain", wpm: 92, accuracy: 99, layout: "unibijoy", mode: "60s" },
  { rank: 2, name: "Anika Rahman", wpm: 88, accuracy: 98, layout: "jatiya", mode: "60s" },
  { rank: 3, name: "Shahadat Alam", wpm: 85, accuracy: 97, layout: "avro", mode: "30s" },
  { rank: 4, name: "Nusrat Jahan", wpm: 78, accuracy: 96, layout: "english", mode: "60s" },
  { rank: 5, name: "Mahmud Hasan", wpm: 74, accuracy: 95, layout: "probhat", mode: "60s" },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [selectedLayout, setSelectedLayout] = useState<string>("all");
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAuthGateModal, setShowAuthGateModal] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getTopLeaderboard(selectedLayout, 20);
      setLeaderboardData(data);
      setLoading(false);
    }
    loadData();
  }, [selectedLayout]);

  const realData = leaderboardData.length > 0;
  const displayData = realData ? leaderboardData : MOCK_LEADERBOARD;

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          হোমপেজে ফিরে যান
        </Link>

        {/* Banner */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs bg-grid-pattern">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-primary text-primary-foreground rounded-xl shadow-xs shrink-0">
              <Trophy size={28} />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">Global Rankings</span>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">জাতীয় স্পিড লিডারবোর্ড</h1>
              <p className="text-xs text-muted-foreground mt-0.5">বাংলাদেশের সেরা টাইপিস্টদের রিয়েল-টাইম র‍্যাঙ্কিং</p>
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
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 font-bold text-xs rounded-md shadow-xs h-10"
          >
            <Trophy size={14} />
            ৩-মিন জাতীয় প্রতিযোগিতায় অংশ নিন
          </Button>
        </div>

        {/* Layout Filters */}
        <div className="flex items-center gap-2 border-b border-border pb-4 overflow-x-auto">
          {[
            { id: "all", label: "সব লেআউট" },
            { id: "unibijoy", label: "ইউনিবিজয়" },
            { id: "jatiya", label: "জাতীয়" },
            { id: "avro", label: "অভ্র" },
            { id: "english", label: "English" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedLayout(tab.id)}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all shrink-0 border ${
                selectedLayout === tab.id
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {!realData && !loading && (
          <div className="flex items-center gap-2 text-xs text-foreground bg-secondary border border-border px-4 py-2.5 rounded-md">
            <ShieldCheck size={14} className="shrink-0" />
            <span>এটি একটি ডেমো ডেটা। প্র্যাকটিস করুন এবং আপনার নিজস্ব স্কোর যোগ করুন!</span>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-xs space-y-4">
          {loading ? (
            <LeaderboardSkeleton />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-muted-foreground uppercase font-bold border-b border-border">
                  <tr>
                    <th className="p-3.5 w-16 text-center">র‍্যাংক</th>
                    <th className="p-3.5">টাইপিস্ট</th>
                    <th className="p-3.5">গতি (WPM)</th>
                    <th className="p-3.5">সঠিকতা</th>
                    <th className="p-3.5">লেআউট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {displayData.map((item, idx) => {
                    const rank = item.rank || idx + 1;
                    return (
                      <tr key={idx} className="hover:bg-secondary transition-colors">
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
                              <span className="text-[9px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                চ্যাম্পিয়ন 🏆
                              </span>
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
                          {item.layout}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!loading && displayData.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="text-5xl">🏅</div>
            <h3 className="text-lg font-bold text-foreground">আপনি প্রথম হতে পারেন!</h3>
            <p className="text-sm text-muted-foreground">এখনও কোনো স্কোর নেই। টাইপিং টেস্ট দিন এবং লিডারবোর্ডে জায়গা করুন।</p>
            <Link
              href="/practice/test"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-md shadow-xs transition-all"
            >
              <Zap size={15} />
              এখনই টেস্ট দিন
            </Link>
          </div>
        )}
      </div>

      {/* Auth Gate Modal for National Leaderboard Competition */}
      {showAuthGateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card className="max-w-md w-full border border-border bg-card shadow-2xl p-6 space-y-6 relative">
            <button
              onClick={() => setShowAuthGateModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
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
                className="w-full text-xs font-bold h-10 gap-2"
              >
                Sign In to Compete <ChevronRight size={14} />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/signup?redirect=/leaderboard")}
                className="w-full text-xs font-bold h-10 border-border"
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
