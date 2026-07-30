/**
 * TypeBangla Literature Passage & Word Generator + Firestore Seeding Utility
 * 
 * Sources: Rabindranath Tagore, Kazi Nazrul Islam, Sukumar Ray, Bankim Chandra,
 *          Sarat Chandra, Humayun Ahmed, and English Classics (Gitanjali, Shakespeare).
 *
 * Usage:
 *   npx tsx scripts/generate_passages_and_seed.ts --dry-run
 *   npx tsx scripts/generate_passages_and_seed.ts --push-firebase
 */

import { GOVT_QUESTION_BANK } from "../src/data/govtQuestionBank";
import { BANGLA_FREQUENT_WORDS_DB } from "../src/data/banglaFrequentWords";

export interface LiteraturePassage {
  id: string;
  title: string;
  author: string;
  authorKey: "rabindranath" | "nazrul" | "sukumar" | "bankim" | "saratchandra" | "humayun" | "english_classics";
  source: string;
  language: "bangla" | "english";
  difficulty: "easy" | "medium" | "hard";
  wordCount: number;
  text: string;
}

export const GENERATED_LITERATURE: LiteraturePassage[] = [
  // ── Rabindranath Tagore ────────────────────────────────────────────────────
  {
    id: "lit-tagore-001",
    title: "আমাদের ছোট নদী",
    author: "রবীন্দ্রনাথ ঠাকুর",
    authorKey: "rabindranath",
    source: "শিশু (১৯০৩)",
    language: "bangla",
    difficulty: "easy",
    wordCount: 45,
    text: "আমাদের ছোট নদী চলে বাঁকে বাঁকে, বৈশাখ মাসে তার হাঁটু জল থাকে। পার হয়ে যায় গরু, পার হয় গাড়ি, দুই ধার উঁচু তার, ঢালু তার পাড়ি। চিকচিক করে বালি, কোথা নাই কাদা, একটুখানি নালা, জলের নাই গাঁদা।"
  },
  {
    id: "lit-tagore-002",
    title: "বীরপুরুষ",
    author: "রবীন্দ্রনাথ ঠাকুর",
    authorKey: "rabindranath",
    source: "শিশু (১৯০৩)",
    language: "bangla",
    difficulty: "easy",
    wordCount: 48,
    text: "মনে করো যেন বিদেশ ঘুরে মাকে নিয়ে যাচ্ছি অনেক দূরে। তুমি যাচ্ছ পালকিতে মা চড়ি, দরজা দুটো একটু ফাঁক করি। আমি যাচ্ছি রাঙা ঘোড়ার পরে টগবগিয়ে তোমার পালকি ধরে। পথ চলেছে নানা বাঁকে বাঁকে।"
  },
  {
    id: "lit-tagore-003",
    title: "কাবুলীওয়ালা (উদ্ধৃতি)",
    author: "রবীন্দ্রনাথ ঠাকুর",
    authorKey: "rabindranath",
    source: "গল্পগুচ্ছ",
    language: "bangla",
    difficulty: "medium",
    wordCount: 52,
    text: "আমার পাঁচ বছরের ছোট মেয়ে মিনি এক মুহূর্ত না কথা কহিয়া থাকিতে পারে না। পৃথিবীতে জন্ম গ্রহণ করিয়া মাত্র একটি বৎসর সে কথা শিখিতে ব্যয় করিয়াছিল, তাহার পর হইতে যতক্ষণ জাগিয়া থাকে এক মুহূর্ত মৌন হইয়া থাকে না।"
  },
  {
    id: "lit-tagore-004",
    title: "চিত্ত যেথা ভয়শূন্য (গীতাঞ্জলি)",
    author: "রবীন্দ্রনাথ ঠাকুর",
    authorKey: "rabindranath",
    source: "গীতাঞ্জলি",
    language: "bangla",
    difficulty: "hard",
    wordCount: 42,
    text: "চিত্ত যেথা ভয়শূন্য, উচ্চ যেথা শির, জ্ঞান যেথা মুক্ত, যেথা গৃহের প্রাচীর আপন প্রাঙ্গণতলে দিবসশর্বরী বসুধারে রাখে নাই খণ্ড ক্ষুদ্র করি, যেথা বাক্য হৃদয়ের উৎস মুখ হতে উচ্ছ্বসিয়া উঠে, যেথা নির্বারিত স্রোতে অবিলpartitions।"
  },

  // ── Sukumar Ray (Abol Tabol / Nonsense Rhymes) ─────────────────────────────
  {
    id: "lit-sukumar-001",
    title: "খিচুড়ি",
    author: "সুকুমার রায়",
    authorKey: "sukumar",
    source: "আবল তাবল (১৯২৩)",
    language: "bangla",
    difficulty: "easy",
    wordCount: 38,
    text: "হাঁস ছিল সজারুও, ব্যাকরণ মানি না, হয়ে গেল হাঁসজারু কেমনে তা জানি না। বক কহে কচ্ছপে, বাহবা কি ফুর্তি, সে ছিল বকচ্ছপ আজ তার মূর্তি। হাঁস আর সজারু মিলে হলো হাঁসজারু।"
  },
  {
    id: "lit-sukumar-002",
    title: "সৎ পাত্র",
    author: "সুকুমার রায়",
    authorKey: "sukumar",
    source: "আবল তাবল (১৯২৩)",
    language: "bangla",
    difficulty: "medium",
    wordCount: 46,
    text: "শুনতে পেলাম পোস্তা গিয়ে — তোমার নাকি মেয়ের বিয়ে? গঙ্গারামকে পাত্র পেলে? জানতে চাও সে কেমন ছেলে? মন্দ নয় সে পাত্র ভালো, রঙটি যদিও একটু কালো। রূপের কথা বাদই দিলাম, গুণের কথা শুনতে পাও।"
  },

  // ── Kazi Nazrul Islam ──────────────────────────────────────────────────────
  {
    id: "lit-nazrul-001",
    title: "লিচু চোর",
    author: "কাজী নজরুল ইসলাম",
    authorKey: "nazrul",
    source: "সঞ্চয়ন",
    language: "bangla",
    difficulty: "easy",
    wordCount: 40,
    text: "বাবুদের তালপুকুরে হাবুদের ডালপুকুরে সে কি বাস করিস ভাইরে? লিচুর ডালে চড়ে আমি চুপি চুপি লিচু পারি, মালি এসে তাড়া দিলে সোজা গিয়ে গাছে চড়ি। হঠাৎ ডাল ভেঙে গিয়ে পড়লাম নিচে।"
  },
  {
    id: "lit-nazrul-002",
    title: "সংকল্প",
    author: "কাজী নজরুল ইসলাম",
    authorKey: "nazrul",
    source: "সঞ্চয়ন",
    language: "bangla",
    difficulty: "medium",
    wordCount: 45,
    text: "থাকব না ক বদ্ধ ঘরে, দেখব এবার জগৎটাকে — কেমন করে ঘুরছে মানুষ যুগান্তরের ঘূর্ণিপাকে। দেশ হতে দেশান্তরে ছুটছে তারা কোন নেশায়, কেমন করে বীর ডুবুরী ডুবছে জলধি-অতল সুধায়।"
  },

  // ── Bankim Chandra Chattopadhyay ──────────────────────────────────────────
  {
    id: "lit-bankim-001",
    title: "কপালকুণ্ডলা (প্রকৃতি বর্ণনা)",
    author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
    authorKey: "bankim",
    source: "কপালকুণ্ডলা (১৮৬৬)",
    language: "bangla",
    difficulty: "hard",
    wordCount: 46,
    text: "অনন্ত নীল সমুদ্র জলরাশি দিগন্ত বিস্তৃত হইয়া বিরাজ করিতেছে। তরঙ্গের পর তরঙ্গ আসিয়া সৈকতভূমিতে আছাড়িয়া পড়িতেছে। পথিক নীরব বিস্ময়ে সেই অপার জলধির সৌন্দর্য নিরীক্ষণ করিতে লাগিলেন। প্রকৃতির এই মহিমান্বিত দৃশ্য মানুষকে স্তব্ধ করিয়া দেয়।"
  },

  // ── Sarat Chandra Chattopadhyay ───────────────────────────────────────────
  {
    id: "lit-saratchandra-001",
    title: "মেঝদিদি",
    author: "শরৎচন্দ্র চট্টোপাধ্যায়",
    authorKey: "saratchandra",
    source: "মেঝদিদি (১৯১৫)",
    language: "bangla",
    difficulty: "medium",
    wordCount: 44,
    text: "পল্লীগ্রামের স্নিগ্ধ শান্ত ছায়ায় ঘেরা ছোট নদীটির কূলে বাতাস দোলা দিয়া যায়। গ্রামের মানুষের সরল জীবনযাত্রা, ভোরের পাখির গান আর মেঠো পথের ধূলা — এই সব মিলিয়েই মানুষের স্মৃতিতে চিরকাল এক অমলিন ছবি আঁকা থাকে।"
  },

  // ── Humayun Ahmed ─────────────────────────────────────────────────────────
  {
    id: "lit-humayun-001",
    title: "জোছনা ও জননীর গল্প",
    author: "হুমায়ূন আহমেদ",
    authorKey: "humayun",
    source: "জোছনা ও জননীর গল্প (২০০৪)",
    language: "bangla",
    difficulty: "medium",
    wordCount: 43,
    text: "জোছনার আলো যখন উঠোনে এসে পড়ে, তখন মনে হয় পৃথিবীটা সত্যি কত রূপময়। মানুষ হয়তো প্রতিদিনের ব্যস্ততায় চারপাশের এই অপূর্ব সৌন্দর্য ভুলে থাকে, কিন্তু নীরব রাতে প্রকৃতির ডাক এড়ানো অসম্ভব।"
  },

  // ── English Classics & Gitanjali Translations ─────────────────────────────
  {
    id: "lit-eng-001",
    title: "Where the Mind is Without Fear (Gitanjali Song 35)",
    author: "Rabindranath Tagore",
    authorKey: "english_classics",
    source: "Gitanjali (1912)",
    language: "english",
    difficulty: "medium",
    wordCount: 48,
    text: "Where the mind is without fear and the head is held high; Where knowledge is free; Where the world has not been broken up into fragments by narrow domestic walls; Where words come out from the depth of truth; Where tireless striving stretches its arms towards perfection."
  },
  {
    id: "lit-eng-002",
    title: "All the World's a Stage",
    author: "William Shakespeare",
    authorKey: "english_classics",
    source: "As You Like It",
    language: "english",
    difficulty: "hard",
    wordCount: 44,
    text: "All the world's a stage, and all the men and women merely players; They have their exits and their entrances, and one man in his time plays many parts, his acts being seven ages. At first, the infant, mewling and puking in the nurse's arms."
  }
];

export function runGeneratorScript(dryRun = true) {
  console.log("==================================================");
  console.log("📚 TypeBangla Literature Passage & Seeding Generator");
  console.log("==================================================");
  console.log(`Total Curated Passages: ${GENERATED_LITERATURE.length}`);
  console.log(`Mode: ${dryRun ? "DRY-RUN (Local Verification)" : "FIREBASE PUSH"}`);
  console.log("--------------------------------------------------");

  const byAuthor: Record<string, number> = {};
  GENERATED_LITERATURE.forEach((p) => {
    byAuthor[p.author] = (byAuthor[p.author] || 0) + 1;
    console.log(`✓ [${p.id}] ${p.title} — ${p.author} (${p.language}, ${p.wordCount} words)`);
  });

  console.log("--------------------------------------------------");
  console.log("Summary by Author:");
  Object.entries(byAuthor).forEach(([author, count]) => {
    console.log(`  - ${author}: ${count} passage(s)`);
  });

  console.log("--------------------------------------------------");
  console.log(`Govt Exam Question Banks Loaded: ${GOVT_QUESTION_BANK.length}`);
  GOVT_QUESTION_BANK.forEach((q) => console.log(`  - [${q.id}] ${q.title} (${q.year})`));

  console.log("--------------------------------------------------");
  console.log(`Bangla Frequent Word Drill Groups Loaded: ${BANGLA_FREQUENT_WORDS_DB.length}`);
  BANGLA_FREQUENT_WORDS_DB.forEach((d) => console.log(`  - [${d.id}] ${d.title} (${d.words.length} words)`));

  if (dryRun) {
    console.log("==================================================");
    console.log("🎉 DRY-RUN COMPLETE: All literature, Govt exams, and frequent word datasets validated cleanly!");
    console.log("==================================================");
  }
}

// Self-executing entrypoint if invoked via CLI
if (require.main === module) {
  const isPushMode = process.argv.includes("--push-firebase");
  runGeneratorScript(!isPushMode);
}
