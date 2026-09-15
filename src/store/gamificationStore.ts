/**
 * Gamification Store — Streak, XP, Badges, Level
 * All data stored in localStorage — no login required.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Badge {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  icon: string;
  unlockedAt?: string; // ISO date
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  sessionsCompleted: number;
  bestWpm: number;
}

// ─── All available badges ─────────────────────────────────────────────────────

export const ALL_BADGES: Badge[] = [
  { id: "first-lesson",   title: "First Step",       titleBn: "প্রথম পদক্ষেপ", description: "Completed your first lesson",          icon: "🏅" },
  { id: "wpm-20",         title: "20 WPM",            titleBn: "২০ WPM",        description: "Reached 20 words per minute",          icon: "⚡" },
  { id: "wpm-30",         title: "30 WPM",            titleBn: "৩০ WPM",        description: "Reached 30 WPM — Govt exam ready!",    icon: "🎯" },
  { id: "wpm-40",         title: "40 WPM",            titleBn: "৪০ WPM",        description: "Reached 40 words per minute",          icon: "🚀" },
  { id: "wpm-60",         title: "60 WPM",            titleBn: "৬০ WPM",        description: "Expert typist level reached!",         icon: "👑" },
  { id: "accuracy-100",   title: "Perfect Accuracy",  titleBn: "নিখুঁত নির্ভুলতা", description: "100% accuracy on any test",       icon: "💎" },
  { id: "streak-3",       title: "3-Day Streak",      titleBn: "৩ দিনের ধারা",  description: "Practiced 3 days in a row",            icon: "🔥" },
  { id: "streak-7",       title: "Week Warrior",       titleBn: "৭ দিনের ধারা", description: "Practiced 7 days in a row",            icon: "🔥🔥" },
  { id: "streak-30",      title: "30-Day Champion",   titleBn: "৩০ দিনের ধারা", description: "Practiced 30 days in a row",          icon: "🏆" },
  { id: "govt-qualified", title: "Govt Qualified",    titleBn: "সরকারি যোগ্য",  description: "Passed a govt exam simulation",        icon: "🎖️" },
  { id: "lessons-10",     title: "10 Lessons Done",   titleBn: "১০ পাঠ সম্পন্ন", description: "Completed 10 lessons",             icon: "📚" },
  { id: "lessons-50",     title: "50 Lessons Done",   titleBn: "৫০ পাঠ সম্পন্ন", description: "Completed 50 lessons",             icon: "📖" },
];

// ─── XP rewards ──────────────────────────────────────────────────────────────

export const XP_REWARDS = {
  lessonComplete:   10,
  beatTargetWpm:    25,
  perfectAccuracy:  15,
  timedTestDone:    20,
  govtExamPassed:   50,
} as const;

export const XP_PER_LEVEL = 100;

// ─── Store ────────────────────────────────────────────────────────────────────

interface GamificationState {
  // Streak
  currentStreak:   number;
  longestStreak:   number;
  lastPracticeDate: string; // YYYY-MM-DD

  // XP & Level
  totalXp:   number;
  level:     number;

  // Badges
  unlockedBadgeIds: string[];

  // History
  dailyHistory: DailyRecord[];

  // Actions
  recordSession: (params: { wpm: number; accuracy: number; targetWpm: number; isGovtExam?: boolean }) => void;
  awardXp:       (amount: number) => void;
  syncFromProfile: (cloudXp: number) => void;
  unlockBadge:   (id: string) => void;
  getBadges:     () => { unlocked: Badge[]; locked: Badge[] };
  getLevel:      () => number;
  getXpProgress: () => { xp: number; xpToNext: number; percent: number };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// ─── Store creation ───────────────────────────────────────────────────────────

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      currentStreak:    0,
      longestStreak:    0,
      lastPracticeDate: "",
      totalXp:          0,
      level:            1,
      unlockedBadgeIds: [],
      dailyHistory:     [],

      awardXp: (amount) => {
        set((s) => {
          const newXp = (s.totalXp || 0) + (amount || 0);
          const newLevel = Math.max(1, Math.floor(newXp / XP_PER_LEVEL) + 1);
          return { totalXp: newXp, level: newLevel };
        });
      },

      syncFromProfile: (cloudXp: number) => {
        set((s) => {
          const finalXp = Math.max(s.totalXp || 0, cloudXp || 0);
          const finalLevel = Math.max(1, Math.floor(finalXp / XP_PER_LEVEL) + 1);
          return { totalXp: finalXp, level: finalLevel };
        });
      },

      unlockBadge: (id) => {
        const { unlockedBadgeIds } = get();
        if (unlockedBadgeIds.includes(id)) return;
        set((s) => ({
          unlockedBadgeIds: [...s.unlockedBadgeIds, id],
        }));
      },

      recordSession: ({ wpm, accuracy, targetWpm, isGovtExam = false }) => {
        const today = todayStr();
        const yesterday = yesterdayStr();
        const state = get();

        // ── Update streak ──────────────────────────────────────────────────
        let newStreak = state.currentStreak;
        if (state.lastPracticeDate === today) {
          // already practiced today, streak unchanged
        } else if (state.lastPracticeDate === yesterday) {
          newStreak = state.currentStreak + 1;
        } else {
          newStreak = 1; // streak broken or first time
        }
        const newLongest = Math.max(state.longestStreak, newStreak);

        // ── Update daily history ───────────────────────────────────────────
        const existingDay = state.dailyHistory.find((d) => d.date === today);
        let newHistory: DailyRecord[];
        if (existingDay) {
          newHistory = state.dailyHistory.map((d) =>
            d.date === today
              ? { ...d, sessionsCompleted: d.sessionsCompleted + 1, bestWpm: Math.max(d.bestWpm, wpm) }
              : d
          );
        } else {
          newHistory = [
            ...state.dailyHistory.slice(-29), // keep last 30 days
            { date: today, sessionsCompleted: 1, bestWpm: wpm },
          ];
        }

        set({
          currentStreak:    newStreak,
          longestStreak:    newLongest,
          lastPracticeDate: today,
          dailyHistory:     newHistory,
        });

        // ── Award XP ───────────────────────────────────────────────────────
        let xpEarned = XP_REWARDS.lessonComplete;
        if (wpm >= targetWpm) xpEarned += XP_REWARDS.beatTargetWpm;
        if (accuracy >= 100)  xpEarned += XP_REWARDS.perfectAccuracy;
        if (isGovtExam)       xpEarned += XP_REWARDS.govtExamPassed;
        get().awardXp(xpEarned);

        // ── Unlock badges ──────────────────────────────────────────────────
        const { unlockBadge, unlockedBadgeIds } = get();
        const ids = unlockedBadgeIds;

        if (!ids.includes("first-lesson")) unlockBadge("first-lesson");
        if (wpm >= 20  && !ids.includes("wpm-20"))   unlockBadge("wpm-20");
        if (wpm >= 30  && !ids.includes("wpm-30"))   unlockBadge("wpm-30");
        if (wpm >= 40  && !ids.includes("wpm-40"))   unlockBadge("wpm-40");
        if (wpm >= 60  && !ids.includes("wpm-60"))   unlockBadge("wpm-60");
        if (accuracy >= 100 && !ids.includes("accuracy-100")) unlockBadge("accuracy-100");
        if (newStreak >= 3  && !ids.includes("streak-3"))  unlockBadge("streak-3");
        if (newStreak >= 7  && !ids.includes("streak-7"))  unlockBadge("streak-7");
        if (newStreak >= 30 && !ids.includes("streak-30")) unlockBadge("streak-30");
        if (isGovtExam && wpm >= targetWpm && accuracy >= 95 && !ids.includes("govt-qualified")) {
          unlockBadge("govt-qualified");
        }
      },

      getBadges: () => {
        const { unlockedBadgeIds } = get();
        const unlocked = ALL_BADGES.filter((b) => unlockedBadgeIds.includes(b.id));
        const locked   = ALL_BADGES.filter((b) => !unlockedBadgeIds.includes(b.id));
        return { unlocked, locked };
      },

      getLevel: () => {
        const { totalXp, level } = get();
        const computed = Math.max(1, Math.floor((totalXp || 0) / XP_PER_LEVEL) + 1);
        return Math.max(level || 1, computed);
      },

      getXpProgress: () => {
        const { totalXp } = get();
        const safeXp = Math.max(0, totalXp || 0);
        const xpInLevel  = safeXp % XP_PER_LEVEL;
        return {
          xp:      xpInLevel,
          xpToNext: XP_PER_LEVEL,
          percent:  Math.min(100, Math.max(0, Math.round((xpInLevel / XP_PER_LEVEL) * 100))),
        };
      },
    }),
    {
      name: "typebangla-gamification",
    }
  )
);
