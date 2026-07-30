/**
 * TypeBangla — Comprehensive Multi-Author Literature, Exam Paper & Drill Repository
 * Curated classics across Rabindranath Tagore, Kazi Nazrul Islam, Jibanananda Das, Jasimuddin,
 * Sukumar Ray, Bankim Chandra, Sarat Chandra, Humayun Ahmed, Shakespeare, and Govt Exams.
 */

export interface ComprehensivePassage {
  id: string;
  title: string;
  author: string;
  authorTag: "tagore" | "nazrul" | "jibanananda" | "jasimuddin" | "sukumar" | "bankim" | "saratchandra" | "humayun" | "english_classics";
  source: string;
  language: "bangla" | "english";
  difficulty: "easy" | "medium" | "hard";
  wordCount: number;
  text: string;
}

export interface ComprehensiveGovtPaper {
  id: string;
  title: string;
  ministry: string;
  year: string;
  targetWpmBn: number;
  targetWpmEn: number;
  minAccuracy: number;
  textBn: string;
  textEn: string;
}

export const COMPREHENSIVE_LITERATURE: ComprehensivePassage[] = [
  // ── Rabindranath Tagore (রবীন্দ্রনাথ ঠাকুর) ──────────────────────────────
  {
    id: "comp-tagore-001",
    title: "আমাদের ছোট নদী",
    author: "রবীন্দ্রনাথ ঠাকুর",
    authorTag: "tagore",
    source: "শিশু (১৯০৩)",
    language: "bangla",
    difficulty: "easy",
    wordCount: 45,
    text: "আমাদের ছোট নদী চলে বাঁকে বাঁকে, বৈশাখ মাসে তার হাঁটু জল থাকে। পার হয়ে যায় গরু, পার হয় গাড়ি, দুই ধার উঁচু তার, ঢালু তার পাড়ি। চিকচিক করে বালি, কোথা নাই কাদা, একটুখানি নালা, জলের নাই গাঁদা।"
  },
  {
    id: "comp-tagore-002",
    title: "বীরপুরুষ",
    author: "রবীন্দ্রনাথ ঠাকুর",
    authorTag: "tagore",
    source: "শিশু (১৯০৩)",
    language: "bangla",
    difficulty: "easy",
    wordCount: 48,
    text: "মনে করো যেন বিদেশ ঘুরে মাকে নিয়ে যাচ্ছি অনেক দূরে। তুমি যাচ্ছ পালকিতে মা চড়ি, দরজা দুটো একটু ফাঁক করি। আমি যাচ্ছি রাঙা ঘোড়ার পরে টগবগিয়ে তোমার পালকি ধরে। পথ চলেছে নানা বাঁকে বাঁকে।"
  },
  {
    id: "comp-tagore-003",
    title: "কাবুলীওয়ালা (উদ্ধৃতি)",
    author: "রবীন্দ্রনাথ ঠাকুর",
    authorTag: "tagore",
    source: "গল্পগুচ্ছ",
    language: "bangla",
    difficulty: "medium",
    wordCount: 52,
    text: "আমার পাঁচ বছরের ছোট মেয়ে মিনি এক মুহূর্ত না কথা কহিয়া থাকিতে পারে না। পৃথিবীতে জন্ম গ্রহণ করিয়া মাত্র একটি বৎসর সে কথা শিখিতে ব্যয় করেছিল, তাহার পর হইতে যতক্ষণ জাগিয়া থাকে এক মুহূর্ত মৌন হইয়া থাকে না।"
  },
  {
    id: "comp-tagore-004",
    title: "চিত্ত যেথা ভয়শূন্য (গীতাঞ্জলি)",
    author: "রবীন্দ্রনাথ ঠাকুর",
    authorTag: "tagore",
    source: "গীতাঞ্জলি (১৯১০)",
    language: "bangla",
    difficulty: "hard",
    wordCount: 42,
    text: "চিত্ত যেথা ভয়শূন্য, উচ্চ যেথা শির, জ্ঞান যেথা মুক্ত, যেথা গৃহের প্রাচীর আপন প্রাঙ্গণতলে দিবসশর্বরী বসুধারে রাখে নাই খণ্ড ক্ষুদ্র করি, যেথা বাক্য হৃদয়ের উৎস মুখ হতে উচ্ছ্বসিয়া উঠে।"
  },
  {
    id: "comp-tagore-005",
    title: "সোনার তরী",
    author: "রবীন্দ্রনাথ ঠাকুর",
    authorTag: "tagore",
    source: "সোনার তরী (১৮৯৪)",
    language: "bangla",
    difficulty: "medium",
    wordCount: 44,
    text: "গগন মেঘে গরজে, বর্ষা ঘনসা। কূলে একা বসে আছি, নাহি ভরসা। রাশি রাশি ভারা ভারা ধান কাটা হলো সারা, ভরা নদী ক্ষুরধারা খরপরশা। কাটিতে কাটিতে ধান এলো বরিষা।"
  },

  // ── Kazi Nazrul Islam (কাজী নজরুল ইসলাম) ─────────────────────────────
  {
    id: "comp-nazrul-001",
    title: "লিচু চোর",
    author: "কাজী নজরুল ইসলাম",
    authorTag: "nazrul",
    source: "সঞ্চয়ন",
    language: "bangla",
    difficulty: "easy",
    wordCount: 40,
    text: "বাবুদের তালপুকুরে হাবুদের ডালপুকুরে সে কি বাস করিস ভাইরে? লিচুর ডালে চড়ে আমি চুপি চুপি লিচু পারি, মালি এসে তাড়া দিলে সোজা গিয়ে গাছে চড়ি। হঠাৎ ডাল ভেঙে গিয়ে পড়লাম নিচে।"
  },
  {
    id: "comp-nazrul-002",
    title: "সংকল্প",
    author: "কাজী নজরুল ইসলাম",
    authorTag: "nazrul",
    source: "সঞ্চয়ন",
    language: "bangla",
    difficulty: "medium",
    wordCount: 45,
    text: "থাকব না ক বদ্ধ ঘরে, দেখব এবার জগৎটাকে — কেমন করে ঘুরছে মানুষ যুগান্তরের ঘূর্ণিপাকে। দেশ হতে দেশান্তরে ছুটছে তারা কোন নেশায়, কেমন করে বীর ডুবুরী ডুবছে জলধি-অতল সুধায়।"
  },
  {
    id: "comp-nazrul-003",
    title: "বিদ্রোহী (প্রকৃতি কাব্যাংশ)",
    author: "কাজী নজরুল ইসলাম",
    authorTag: "nazrul",
    source: "অগ্নিবীণা (১৯২২)",
    language: "bangla",
    difficulty: "hard",
    wordCount: 46,
    text: "বল বীর — বল উন্নত মম শির! শির নেহারি’ আমারি নতশির ওই শিখর হিমাদ্রির! আমি চির-উন্নত শির! আমি চিরদুর্দম, দুর্বিনীত, নৃশংস, মহা-ভয়ংকর! আমি চির-অভিশাপ পৃথ্বীর।"
  },

  // ── Jibanananda Das (জীবনানন্দ দাশ) ──────────────────────────────────
  {
    id: "comp-jibana-001",
    title: "বনলতা সেন",
    author: "জীবনানন্দ দাশ",
    authorTag: "jibanananda",
    source: "বনলতা সেন (১৯৪২)",
    language: "bangla",
    difficulty: "medium",
    wordCount: 48,
    text: "হাজার বছর ধরে আমি পথ হাঁটিতেছি পৃথিবীর পথে, সিংহল সমুদ্র থেকে নিশীথের অন্ধকারে মালয় সাগরে অনেক ঘুরেছি আমি; বিম্বিসার অশোকের ধূসর জগতে সেখানে ছিলাম আমি; আরো দূর অন্ধকারে বিদর্ভ নগরে।"
  },

  // ── Jasimuddin (জসীম উদ্দীন) ──────────────────────────────────────────
  {
    id: "comp-jasim-001",
    title: "কবর (কবিতাংশ)",
    author: "জসীম উদ্দীন",
    authorTag: "jasimuddin",
    source: "রাখালী (১৯২৭)",
    language: "bangla",
    difficulty: "medium",
    wordCount: 45,
    text: "এইখানে তোর দাদীর কবর ডালিম গাছের তলে, তিরিশ বছর ভিজায়ে রেখেছি দুই নয়নের জলে। এতটুকু তারে ঘরে এনেছিনু সোনার মতন মুখ, পুতুলের বিয়ে ভেঙে গেলে কেঁদে ভাসাইত বুক।"
  },

  // ── Sukumar Ray (সুকুমার রায়) ────────────────────────────────────────
  {
    id: "comp-sukumar-001",
    title: "খিচুড়ি",
    author: "সুকুমার রায়",
    authorTag: "sukumar",
    source: "আবল তাবল (১৯২৩)",
    language: "bangla",
    difficulty: "easy",
    wordCount: 38,
    text: "হাঁস ছিল সজারুও, ব্যাকরণ মানি না, হয়ে গেল হাঁসজারু কেমনে তা জানি না। বক কহে কচ্ছপে, বাহবা কি ফুর্তি, সে ছিল বকচ্ছপ আজ তার মূর্তি। হাঁস আর সজারু মিলে হলো হাঁসজারু।"
  },
  {
    id: "comp-sukumar-002",
    title: "সৎ পাত্র",
    author: "সুকুমার রায়",
    authorTag: "sukumar",
    source: "আবল তাবল (১৯২৩)",
    language: "bangla",
    difficulty: "medium",
    wordCount: 46,
    text: "শুনতে পেলাম পোস্তা গিয়ে — তোমার নাকি মেয়ের বিয়ে? গঙ্গারামকে পাত্র পেলে? জানতে চাও সে কেমন ছেলে? মন্দ নয় সে পাত্র ভালো, রঙটি যদিও একটু কালো। রূপের কথা বাদই দিলাম, গুণের কথা শুনতে পাও।"
  },

  // ── Bankim Chandra Chattopadhyay (বঙ্কিমচন্দ্র চট্টোপাধ্যায়) ────────
  {
    id: "comp-bankim-001",
    title: "কপালকুণ্ডলা (প্রকৃতি বর্ণনা)",
    author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
    authorTag: "bankim",
    source: "কপালকুণ্ডলা (১৮৬৬)",
    language: "bangla",
    difficulty: "hard",
    wordCount: 46,
    text: "অনন্ত নীল সমুদ্র জলরাশি দিগন্ত বিস্তৃত হইয়া বিরাজ করিতেছে। তরঙ্গের পর তরঙ্গ আসিয়া সৈকতভূমিতে আছাড়িয়া পড়িতেছে। পথিক নীরব বিস্ময়ে সেই অপার জলধির সৌন্দর্য নিরীক্ষণ করিতে লাগিলেন। প্রকৃতির এই মহিমান্বিত দৃশ্য স্তব্ধ করিয়া দেয়।"
  },

  // ── Sarat Chandra Chattopadhyay (শরৎচন্দ্র চট্টোপাধ্যায়) ─────────
  {
    id: "comp-saratchandra-001",
    title: "মেঝদিদি",
    author: "শরৎচন্দ্র চট্টোপাধ্যায়",
    authorTag: "saratchandra",
    source: "মেঝদিদি (১৯১৫)",
    language: "bangla",
    difficulty: "medium",
    wordCount: 44,
    text: "পল্লীগ্রামের স্নিগ্ধ শান্ত ছায়ায় ঘেরা ছোট নদীটির কূলে বাতাস দোলা দিয়া যায়। গ্রামের মানুষের সরল জীবনযাত্রা, ভোরের পাখির গান আর মেঠো পথের ধূলা — এই সব মিলিয়েই মানুষের স্মৃতিতে চিরকাল এক অমলিন ছবি আঁকা থাকে।"
  },

  // ── Humayun Ahmed (হুমায়ূন আহমেদ) ──────────────────────────────────
  {
    id: "comp-humayun-001",
    title: "জোছনা ও জননীর গল্প",
    author: "হুমায়ূন আহমেদ",
    authorTag: "humayun",
    source: "জোছনা ও জননীর গল্প (২০০৪)",
    language: "bangla",
    difficulty: "medium",
    wordCount: 43,
    text: "জোছনার আলো যখন উঠোনে এসে পড়ে, তখন মনে হয় পৃথিবীটা সত্যি কত রূপময়। মানুষ হয়তো প্রতিদিনের ব্যস্ততায় চারপাশের এই অপূর্ব সৌন্দর্য ভুলে থাকে, কিন্তু নীরব রাতে প্রকৃতির ডাক এড়ানো অসম্ভব।"
  },

  // ── English Literature & Gitanjali ──────────────────────────────────
  {
    id: "comp-eng-001",
    title: "Where the Mind is Without Fear (Gitanjali Song 35)",
    author: "Rabindranath Tagore",
    authorTag: "english_classics",
    source: "Gitanjali (1912)",
    language: "english",
    difficulty: "medium",
    wordCount: 48,
    text: "Where the mind is without fear and the head is held high; Where knowledge is free; Where the world has not been broken up into fragments by narrow domestic walls; Where words come out from the depth of truth; Where tireless striving stretches its arms towards perfection."
  },
  {
    id: "comp-eng-002",
    title: "All the World's a Stage",
    author: "William Shakespeare",
    authorTag: "english_classics",
    source: "As You Like It",
    language: "english",
    difficulty: "hard",
    wordCount: 44,
    text: "All the world's a stage, and all the men and women merely players; They have their exits and their entrances, and one man in his time plays many parts, his acts being seven ages. At first, the infant, mewling and puking in the nurse's arms."
  },
  {
    id: "comp-eng-003",
    title: "Pride and Prejudice (Opening)",
    author: "Jane Austen",
    authorTag: "english_classics",
    source: "Pride and Prejudice (1813)",
    language: "english",
    difficulty: "medium",
    wordCount: 42,
    text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood."
  }
];

export const COMPREHENSIVE_GOVT_PAPERS: ComprehensiveGovtPaper[] = [
  {
    id: "paper-sec-2024",
    title: "বাংলাদেশ সচিবালয় কম্পিউটার অপারেটর পরীক্ষা ২০২৪",
    ministry: "সচিবালয় ও ক্যাবিনেট বিভাগ",
    year: "২০২৪",
    targetWpmBn: 30,
    targetWpmEn: 35,
    minAccuracy: 95,
    textBn: "বাংলাদেশ সচিবালয় প্রশাসনিক কাঠামোর কেন্দ্রবিন্দু। সরকারি সিদ্ধান্ত গ্রহণ, নীতি নির্ধারণ ও ডিজিটাল নথি ব্যবস্থাপনা নিশ্চিত করতে কর্মকর্তা ও কর্মচারীদের কীবোর্ড দক্ষতা অত্যন্ত গুরুত্বপূর্ণ। দক্ষ কম্পিউটার অপারেটর প্রশাসনিক কার্যক্রমে গতি এনে দেয়।",
    textEn: "The Secretariat is the administrative hub of the national government. Accurate data entry and electronic filing systems depend on skilled typists to ensure smooth public service delivery across ministries."
  },
  {
    id: "paper-bb-2024",
    title: "বাংলাদেশ ব্যাংক অফিসার (ক্যাশ/ডাটা এন্ট্রি) পরীক্ষা ২০২৪",
    ministry: "বাংলাদেশ ব্যাংক ও রাষ্ট্রায়ত্ত ব্যাংক",
    year: "২০২৪",
    targetWpmBn: 30,
    targetWpmEn: 35,
    minAccuracy: 95,
    textBn: "ব্যাংকিং খাতে নির্ভুল তথ্য সংরক্ষণ ও দ্রুত খতিয়ান হিসাব অত্যন্ত জরুরি। গ্রাহক সেবা তরান্বিত করতে কম্পিউটার অফিসারদের দ্রুত গতিতে নির্ভুল বাংলা ও ইংরেজি টাইপ করার দক্ষতা থাকতে হয়।",
    textEn: "Modern banking operations require precision in record-keeping, ledger entries, and financial report processing. Speed and accuracy remain the core evaluation criteria for bank typists."
  },
  {
    id: "paper-nsi-2023",
    title: "এনএসআই ফিল্ড অফিসার ও জুনিয়র ফিল্ড অফিসার টেস্ট ২০২৩",
    ministry: "জাতীয় নিরাপত্তা গোয়েন্দা (NSI)",
    year: "২০২৩",
    targetWpmBn: 28,
    targetWpmEn: 30,
    minAccuracy: 95,
    textBn: "জাতীয় নিরাপত্তা ও তথ্য প্রসেসিং কার্যে দ্রুততার বিকল্প নেই। গোপনীয় রিপোর্ট তৈরি ও সময়োপযোগী তথ্য উপস্থাপনের জন্য কম্পিউটার সহায়ক পদের পরীক্ষায় উচ্চ নির্ভুলতার সাথে টাইপিং সম্পন্ন করতে হয়।",
    textEn: "Information processing and report compilation require high attention to detail. Candidates must demonstrate steady speed and minimum error rates under strict time constraints."
  },
  {
    id: "paper-nbr-2023",
    title: "জাতীয় রাজস্ব বোর্ড (NBR) ডাটা এন্ট্রি অপারেটর টেস্ট ২০২৩",
    ministry: "জাতীয় রাজস্ব বোর্ড ও কাস্টমস",
    year: "২০২৩",
    targetWpmBn: 28,
    targetWpmEn: 30,
    minAccuracy: 95,
    textBn: "কাস্টমস ও কর বিভাগের আয়কর রিটার্ন নথিভুক্তকরণ ও চালান এন্ট্রিতে ডাটা অপারেটরদের প্রতিদিন হাজার হাজার তথ্য ইনপুট দিতে হয়। জাতীয় রাজস্ব বৃদ্ধিতে ডিজিটাল অটোমেশন গুরুত্বপূর্ণ ভূমিকা রাখছে।",
    textEn: "Customs and tax declaration entries demand consistent speed. Data entry personnel enter high volumes of tax returns into centralized database systems with minimal error allowances."
  },
  {
    id: "paper-jud-2024",
    title: "বাংলাদেশ সুপ্রিম কোর্ট ও জজ কোর্ট টাইপিস্ট পরীক্ষা ২০২৪",
    ministry: "সুপ্রিম কোর্ট ও জেলা জজ আদালত",
    year: "২০২৪",
    targetWpmBn: 30,
    targetWpmEn: 30,
    minAccuracy: 95,
    textBn: "আদালতের রায়, শুনানি ও বিবরণী লিপিবদ্ধ করতে বিচারালয়ে টাইপিস্টদের দায়িত্ব অপরিসীম। আইনগত পরিভাষা সঠিক ও নির্ভুলভাবে টাইপ করা ন্যায়বিচার প্রক্রিয়ার অন্যতম অংশ।",
    textEn: "Court reporters and legal typists record judgments, hearings, and legal documents. Precision in typing legal terminology directly impacts judicial documentation."
  },
  {
    id: "paper-edu-2024",
    title: "মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর (DSHE) সহকারী টেস্ট ২০২৪",
    ministry: "শিক্ষা অধিদপ্তর ও উচ্চ মাধ্যমিক বোর্ড",
    year: "২০২৪",
    targetWpmBn: 25,
    targetWpmEn: 25,
    minAccuracy: 90,
    textBn: "শিক্ষা প্রতিষ্ঠানে শিক্ষক-শিক্ষার্থী তথ্য সংরক্ষণ, পরীক্ষার ফলাফল এবং বৃত্তি সংক্রান্ত কাগজপত্র তৈরির জন্য সহকারী টাইপিস্ট নিয়োগ পরীক্ষায় নির্ধারিত সময়সীমার মধ্যে কাজ শেষ করতে হয়।",
    textEn: "Educational administration relies on office assistants to process student records, examination schedules, and official notices with speed and accuracy."
  }
];
