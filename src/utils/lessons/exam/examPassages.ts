/**
 * TypeMaster — Exam Passage Library
 *
 * Curated literary passages for free typing tests / speed exams.
 * Sources: Famous Bangla and English authors, literature, and nature writing.
 *
 * Rules:
 *   - NO political content, speeches, or manifestos
 *   - Sources: famous authors, classic novels, poetry, nature, philosophy of life
 *   - Each passage is 150–300 words for a meaningful timed test
 */

export type PassageLanguage = "bangla" | "english";
export type PassageDifficulty = "easy" | "medium" | "hard";

export interface ExamPassage {
  id: string;
  title: string;
  author: string;
  source: string; // Book name or collection
  language: PassageLanguage;
  difficulty: PassageDifficulty;
  text: string;
}

// ─────────────────────────────────────────────────────────────
// BANGLA PASSAGES — Famous Bangla Literature (Non-political)
// ─────────────────────────────────────────────────────────────
export const banglaPassages: ExamPassage[] = [

  // ── Rabindranath Tagore ──────────────────────────────────
  {
    id: "bn-tagore-001",
    title: "আমাদের ছোট নদী",
    author: "রবীন্দ্রনাথ ঠাকুর",
    source: "শিশু (১৯০৩)",
    language: "bangla",
    difficulty: "easy",
    text: "আমাদের ছোট নদী চলে বাঁকে বাঁকে, বৈশাখ মাসে তার হাঁটু জল থাকে। পার হয়ে যায় গরু, পার হয় গাড়ি, দুই ধার উঁচু তার, ঢালু তার পাড়ি। চিকচিক করে বালি, কোথা নাই কাদা, একটুখানি নালা, জলের নাই গাঁদা। কলকল কলকল করিতেছে নাদ ঘোলা জল তার আদর নাই কাদ।"
  },
  {
    id: "bn-tagore-002",
    title: "বীরপুরুষ",
    author: "রবীন্দ্রনাথ ঠাকুর",
    source: "শিশু (১৯০৩)",
    language: "bangla",
    difficulty: "easy",
    text: "মনে করো যেন বিদেশ ঘুরে মাকে নিয়ে যাচ্ছি অনেক দূরে। তুমি যাচ্ছ পালকিতে মা চড়ি, দরজা দুটো একটু ফাঁক করি। আমি যাচ্ছি রাঙা ঘোড়ার পরে টগবগিয়ে তোমার পালকি ধরে। পথ চলেছে নানা বাঁকে বাঁকে, মাঝে মাঝে আঁধার ঘন থাকে।"
  },
  {
    id: "bn-tagore-003",
    title: "প্রকৃতির ডাক",
    author: "রবীন্দ্রনাথ ঠাকুর",
    source: "গল্পগুচ্ছ",
    language: "bangla",
    difficulty: "medium",
    text: "নদীর ধারে বসে আছি একা, নীল আকাশে মেঘ ভেসে যায়। দূরে পাখি ডাকে, বাতাসে শিরশির, মনে পড়ে ছেলেবেলার স্বপ্নের মতো দিন। জীবন এতটাই সুন্দর যে কখনো কখনো মনে হয় এই মুহূর্তটা থেমে থাকুক। সবুজ মাঠ, কলকল নদী, পাখির গান — এই সব মিলিয়েই তো আমাদের বাংলাদেশ।"
  },
  {
    id: "bn-tagore-004",
    title: "সাধারণ মেয়ে",
    author: "রবীন্দ্রনাথ ঠাকুর",
    source: "চোখের বালি (১৯০৩)",
    language: "bangla",
    difficulty: "medium",
    text: "পৃথিবীতে যদি কিছু সত্য থাকে তবে তাহা হইল মানুষের হৃদয়ের ভালোবাসা। সোনা রূপা ক্ষণস্থায়ী, কিন্তু একটি সত্যিকারের স্নেহ চিরকাল মানুষের মনে বেঁচে থাকে। যে মানুষ সেবা করতে পারে, যে মানুষ ভালোবাসতে পারে, সে-ই পৃথিবীর সবচেয়ে ধনী মানুষ।"
  },

  // ── Kazi Nazrul Islam (Nature & Life Themes Only) ─────────
  {
    id: "bn-nazrul-001",
    title: "বিদ্রোহী (প্রকৃতি অংশ)",
    author: "কাজী নজরুল ইসলাম",
    source: "অগ্নিবীণা (১৯২২)",
    language: "bangla",
    difficulty: "hard",
    text: "আমি চির-উন্নত শির! আমি চিরদুর্দম, দুর্বিনীত, নৃশংস! মহা-ভয়ংকর! আমি চির-অভিশাপ পৃথ্বীর, আমি দুর্বার! আমি সর্বনাশী, আমি ক্ষ্যাপা, আমি মহাকাশে উড়ে উড়ে যাই — মহাসিন্ধুর ঢেউয়ের মতো ভাঙিয়া চলেছি পর্বত শৃঙ্গ।"
  },
  {
    id: "bn-nazrul-002",
    title: "মোর ঘুম ঘোরে",
    author: "কাজী নজরুল ইসলাম",
    source: "বিষের বাঁশি (১৯২৪)",
    language: "bangla",
    difficulty: "medium",
    text: "মোর ঘুম ঘোরে এলে মনোহর, বাজাও বাঁশি সুন্দর। কোন সুদূর নীল আকাশ থেকে ভেসে আসে তোমার সুর, যেন মেঘের ভেলায় চাঁদের আলোর মতো মিষ্টি স্বপ্ন নিয়ে আসে ভোর। ফুলের গন্ধে মাতাল বাতাস, পাখির গানে জাগে প্রাণ — এই সুন্দর পৃথিবীতে বেঁচে থাকাই তো জীবনের গান।"
  },

  // ── Humayun Ahmed ─────────────────────────────────────────
  {
    id: "bn-humayun-001",
    title: "হিমু ও রাতের আকাশ",
    author: "হুমায়ূন আহমেদ",
    source: "ময়ূরাক্ষী (১৯৯০)",
    language: "bangla",
    difficulty: "medium",
    text: "রাতের আকাশের দিকে তাকিয়ে হিমু ভাবে — এই অসীম মহাকাশে কোথাও না কোথাও সত্যিই কি একটা অর্থ আছে? তারাগুলো কি শুধু গ্যাসের আলো, নাকি প্রতিটি তারায় একটা গল্প লুকিয়ে আছে? মানুষ জীবনভর অর্থ খোঁজে, কিন্তু হয়তো জীবনের অর্থ হলো এই খোঁজার মধ্যেই।"
  },
  {
    id: "bn-humayun-002",
    title: "বৃষ্টি ও মন",
    author: "হুমায়ূন আহমেদ",
    source: "নন্দিত নরকে (১৯৭২)",
    language: "bangla",
    difficulty: "medium",
    text: "বৃষ্টি পড়ছে টিনের চালে ঝমঝম শব্দে। এই শব্দের একটা আলাদা মায়া আছে। মনে হয় যেন কে একজন খুব প্রিয় মানুষ হাত বুলিয়ে দিচ্ছে মাথায়। বাংলাদেশের বৃষ্টি অন্য রকম — এখানে বৃষ্টি শুধু পানি নয়, এটা একটা অনুভূতি, একটা স্মৃতি, একটা ভালোবাসার কথা।"
  },
  {
    id: "bn-humayun-003",
    title: "মিসির আলির যুক্তি",
    author: "হুমায়ূন আহমেদ",
    source: "দেবী (১৯৮৫)",
    language: "bangla",
    difficulty: "hard",
    text: "মিসির আলি বলেন, জীবনে অনেক প্রশ্ন আছে যার উত্তর যুক্তি দিয়ে দেওয়া যায় না। তবু মানুষ যুক্তির পথেই হাঁটে, কারণ এছাড়া তার কাছে অন্য কোনো পথ নেই। বিশ্বাস এবং যুক্তি — এই দুটো জিনিস একসাথে চলতে পারে, কিন্তু তাদের গন্তব্য আলাদা।"
  },

  // ── Jibanananda Das ───────────────────────────────────────
  {
    id: "bn-jibon-001",
    title: "বনলতা সেন",
    author: "জীবনানন্দ দাশ",
    source: "বনলতা সেন (১৯৪২)",
    language: "bangla",
    difficulty: "hard",
    text: "চুল তার কবেকার অন্ধকার বিদিশার নিশা, মুখ তার শ্রাবস্তীর কারুকার্য; অতি দূর সমুদ্রের পর বিম্বিসার অশোকের ধূসর জগতে সেখানে ছিলাম আমি; আরো দূর অন্ধকারে বিদর্ভ নগরে— সব পাখি ঘরে আসে — সব নদী — ফুরায় এই জীবনের সব লেনদেন।"
  },
  {
    id: "bn-jibon-002",
    title: "আবার আসিব ফিরে",
    author: "জীবনানন্দ দাশ",
    source: "রূপসী বাংলা (১৯৫৭)",
    language: "bangla",
    difficulty: "medium",
    text: "আবার আসিব ফিরে ধানসিড়িটির তীরে — এই বাংলায়। হয়তো মানুষ নয় — হয়তো বা শঙ্খচিল শালিকের বেশে; হয়তো ভোরের কাক হয়ে এই কার্তিকের নবান্নের দেশে কুয়াশার বুকে ভেসে একদিন আসিব এই পদ্মার ঢেউয়ের শব্দে।"
  },

  // ── Sarat Chandra Chattopadhyay ────────────────────────────
  {
    id: "bn-sarat-001",
    title: "পল্লীসমাজ",
    author: "শরৎচন্দ্র চট্টোপাধ্যায়",
    source: "পল্লীসমাজ (১৯১৬)",
    language: "bangla",
    difficulty: "medium",
    text: "গ্রামের মানুষের জীবন অনেকটা নদীর মতো — সবসময় বহমান, কখনো শান্ত, কখনো উত্তাল। তবু প্রতিদিনের সূর্যোদয় নতুন আশা নিয়ে আসে। মাঠের সবুজ ধান, আকাশের নীলিমা, নদীর কলকল শব্দ — এই সব মিলিয়ে বাংলার পল্লী এক অসাধারণ সুন্দর জগৎ।"
  },

  // ── Michael Madhusudan Dutta ───────────────────────────────
  {
    id: "bn-madhu-001",
    title: "কপোতাক্ষ নদ",
    author: "মাইকেল মধুসূদন দত্ত",
    source: "চতুর্দশপদী কবিতাবলী (১৮৬৬)",
    language: "bangla",
    difficulty: "hard",
    text: "সতত হে নদ, তুমি পড় মোর মনে! সতত তোমার কথা ভাবি এ বিরলে। সতত যেমতি লোক নিশার স্বপনে শোনে মায়া-মন্ত্র-বলে ফিরে দেশে দেশে, তেমনি সতত হে সরি, কপোতাক্ষ নদ! দেখিতে গেলাম আমি তোমার জলধারা।"
  },

  // ── Sunil Gangopadhyay (Nature & Life) ────────────────────
  {
    id: "bn-sunil-001",
    title: "কেউ কথা রাখেনি",
    author: "সুনীল গঙ্গোপাধ্যায়",
    source: "আত্মপ্রকাশ (১৯৬৩)",
    language: "bangla",
    difficulty: "medium",
    text: "কেউ কথা রাখেনি, ঠাকুরমা বলেছিলেন — হরি দিন তো গেল, সন্ধে হলো, পার করো আমারে। কেউ কথা রাখেনি। মানুষ তার প্রতিশ্রুতি কখনো রাখে না, তবু মানুষ বিশ্বাস করে যায়। এই বিশ্বাসই হয়তো জীবনের সবচেয়ে বড় শক্তি।"
  },
];

// ─────────────────────────────────────────────────────────────
// ENGLISH PASSAGES — Famous English Literature (Non-political)
// ─────────────────────────────────────────────────────────────
export const englishPassages: ExamPassage[] = [

  // ── Nature & Philosophy ───────────────────────────────────
  {
    id: "en-frost-001",
    title: "The Road Not Taken",
    author: "Robert Frost",
    source: "Mountain Interval (1916)",
    language: "english",
    difficulty: "medium",
    text: "Two roads diverged in a yellow wood, and sorry I could not travel both and be one traveler, long I stood and looked down one as far as I could to where it bent in the undergrowth. Then took the other, as just as fair, and having perhaps the better claim, because it was grassy and wanted wear. I shall be telling this with a sigh somewhere ages and ages hence: two roads diverged in a wood, and I took the one less traveled by, and that has made all the difference."
  },
  {
    id: "en-dickinson-001",
    title: "Hope is the Thing with Feathers",
    author: "Emily Dickinson",
    source: "Poems (1891)",
    language: "english",
    difficulty: "medium",
    text: "Hope is the thing with feathers that perches in the soul, and sings the tune without the words, and never stops at all. And sweetest in the gale is heard; and sore must be the storm that could abash the little bird that kept so many warm. I have heard it in the chillest land and on the strangest sea, yet never in extremity it asked a crumb of me."
  },

  // ── Mark Twain ────────────────────────────────────────────
  {
    id: "en-twain-001",
    title: "Adventures of Tom Sawyer",
    author: "Mark Twain",
    source: "The Adventures of Tom Sawyer (1876)",
    language: "english",
    difficulty: "easy",
    text: "Tom appeared on the sidewalk with a bucket of whitewash and a long-handled brush. He surveyed the fence, and all gladness left him and a deep melancholy settled down upon his spirit. Thirty yards of board fence nine feet high. Life to him seemed hollow, and existence but a burden. Sighing, he dipped his brush and passed it along the topmost plank."
  },
  {
    id: "en-twain-002",
    title: "Life on the Mississippi",
    author: "Mark Twain",
    source: "Life on the Mississippi (1883)",
    language: "english",
    difficulty: "medium",
    text: "The face of the water, in time, became a wonderful book — a book that was a dead language to the uneducated passenger, but which told its mind to me without reserve, delivering its most cherished secrets as clearly as if it uttered them with a voice. And it was not a book to be read once and thrown aside, for it had a new story to tell every day."
  },

  // ── Charles Dickens ───────────────────────────────────────
  {
    id: "en-dickens-001",
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    source: "A Tale of Two Cities (1859)",
    language: "english",
    difficulty: "hard",
    text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us."
  },
  {
    id: "en-dickens-002",
    title: "Great Expectations",
    author: "Charles Dickens",
    source: "Great Expectations (1861)",
    language: "english",
    difficulty: "medium",
    text: "My father's family name being Pirrip, and my Christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip. So I called myself Pip, and came to be called Pip. I give Pirrip as my father's family name on the authority of his tombstone and my sister."
  },

  // ── Oscar Wilde ───────────────────────────────────────────
  {
    id: "en-wilde-001",
    title: "The Importance of Being Earnest",
    author: "Oscar Wilde",
    source: "The Importance of Being Earnest (1895)",
    language: "english",
    difficulty: "medium",
    text: "To lose one parent, Mr. Worthing, may be regarded as a misfortune; to lose both looks like carelessness. The truth is rarely pure and never simple. Modern life would be very tedious if it were either, and modern literature a complete impossibility. I can resist everything except temptation."
  },
  {
    id: "en-wilde-002",
    title: "The Happy Prince",
    author: "Oscar Wilde",
    source: "The Happy Prince and Other Tales (1888)",
    language: "english",
    difficulty: "easy",
    text: "High above the city, on a tall column, stood the statue of the Happy Prince. He was gilded all over with thin leaves of fine gold, for eyes he had two bright sapphires, and great red ruby glowed on his sword-hilt. He was very much admired indeed. One night there flew over the city a little Swallow."
  },

  // ── Jane Austen ───────────────────────────────────────────
  {
    id: "en-austen-001",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    source: "Pride and Prejudice (1813)",
    language: "english",
    difficulty: "medium",
    text: "It is a truth universally acknowledged that a single man in possession of a good fortune must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighborhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters."
  },

  // ── Arthur Conan Doyle ────────────────────────────────────
  {
    id: "en-doyle-001",
    title: "A Study in Scarlet",
    author: "Arthur Conan Doyle",
    source: "A Study in Scarlet (1887)",
    language: "english",
    difficulty: "easy",
    text: "When I first came up to London I had lodgings in private hotel in the Strand, leading a comfortless, meaningless existence, and spending such money as I had, considerably more freely than I ought. Under these circumstances I naturally gravitated to Baker Street, and there I met Sherlock Holmes for the very first time."
  },
  {
    id: "en-doyle-002",
    title: "The Hound of the Baskervilles",
    author: "Arthur Conan Doyle",
    source: "The Hound of the Baskervilles (1902)",
    language: "english",
    difficulty: "medium",
    text: "There is nothing more deceptive than an obvious fact. The world is full of obvious things which nobody by any chance ever observes. You have been in Afghanistan, I perceive. You have a tan line from where a helmet rested, your posture speaks of military discipline, yet you carry yourself with the quiet confidence of a man who has seen action."
  },

  // ── Nature Writing ────────────────────────────────────────
  {
    id: "en-thoreau-001",
    title: "Walden — The Pond in Winter",
    author: "Henry David Thoreau",
    source: "Walden (1854)",
    language: "english",
    difficulty: "medium",
    text: "I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived. I did not wish to live what was not life, living is so dear; nor did I wish to practice resignation."
  },
  {
    id: "en-london-001",
    title: "The Call of the Wild",
    author: "Jack London",
    source: "The Call of the Wild (1903)",
    language: "english",
    difficulty: "easy",
    text: "Buck did not read the newspapers, or he would have known that trouble was brewing, not alone for himself, but for every tide-water dog, strong of muscle and warm of long hair, from Puget Sound to San Diego. Men, groping in the Arctic darkness, had found a yellow metal, and because steamship and transportation companies were booming the find, thousands of men were rushing into the Northland."
  },
];

// ─────────────────────────────────────────────────────────────
// Combined pool + helper
// ─────────────────────────────────────────────────────────────
export const ALL_EXAM_PASSAGES: ExamPassage[] = [
  ...banglaPassages,
  ...englishPassages,
];

export function getPassagesByLanguage(language: PassageLanguage): ExamPassage[] {
  return ALL_EXAM_PASSAGES.filter((p) => p.language === language);
}

export function getPassagesByDifficulty(difficulty: PassageDifficulty): ExamPassage[] {
  return ALL_EXAM_PASSAGES.filter((p) => p.difficulty === difficulty);
}

export function getRandomPassage(language?: PassageLanguage): ExamPassage {
  const pool = language
    ? ALL_EXAM_PASSAGES.filter((p) => p.language === language)
    : ALL_EXAM_PASSAGES;
  return pool[Math.floor(Math.random() * pool.length)];
}
