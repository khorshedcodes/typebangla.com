export interface JuktakkhorItem {
  id: string;
  char: string;
  name: string;
  breakdown: string;
  components: [string, string, string];
  avroKeys: string;
  bijoyKeys: string;
  jatiyaKeys: string;
  exampleWord: string;
  exampleMeaning: string;
  category: "essential" | "intermediate" | "advanced";
}

export const JUKTAKKHOR_DATA: JuktakkhorItem[] = [
  { id: "ksha", char: "ক্ষ", name: "ক্ষিয় (ক + ষ)", breakdown: "ক + ্ + ষ", components: ["ক", "্", "ষ"], avroKeys: "k + S", bijoyKeys: "k + G + N", jatiyaKeys: "k + g + n", exampleWord: "ক্ষমা", exampleMeaning: "Forgiveness", category: "essential" },
  { id: "ggya", char: "জ্ঞ", name: "জ্ঞ (জ + ঞ)", breakdown: "জ + ্ + ঞ", components: ["জ", "্", "ঞ"], avroKeys: "j + NG", bijoyKeys: "u + G + I", jatiyaKeys: "u + g + i", exampleWord: "জ্ঞান", exampleMeaning: "Knowledge", category: "essential" },
  { id: "nka", char: "ঙ্ক", name: "ঙ্ক (ঙ + ক)", breakdown: "ঙ + ্ + ক", components: ["ঙ", "্", "ক"], avroKeys: "Ng + k", bijoyKeys: "Q + G + k", jatiyaKeys: "q + g + k", exampleWord: "অঙ্ক", exampleMeaning: "Mathematics / Digit", category: "essential" },
  { id: "nga", char: "ঙ্গ", name: "ঙ্গ (ঙ + গ)", breakdown: "ঙ + ্ + গ", components: ["ঙ", "্", "গ"], avroKeys: "Ng + g", bijoyKeys: "Q + G + o", jatiyaKeys: "q + g + o", exampleWord: "সঙ্গীত", exampleMeaning: "Music", category: "essential" },
  { id: "ncha", char: "ঞ্চ", name: "ঞ্চ (ঞ + চ)", breakdown: "ঞ + ্ + চ", components: ["ঞ", "্", "চ"], avroKeys: "NG + c", bijoyKeys: "I + G + f", jatiyaKeys: "i + g + f", exampleWord: "পঞ্চম", exampleMeaning: "Fifth", category: "essential" },
  { id: "njha", char: "ঞ্জ", name: "ঞ্জ (ঞ + জ)", breakdown: "ঞ + ্ + জ", components: ["ঞ", "্", "জ"], avroKeys: "NG + j", bijoyKeys: "I + G + u", jatiyaKeys: "i + g + u", exampleWord: "গঞ্জ", exampleMeaning: "Marketplace", category: "essential" },
  { id: "kta", char: "ক্ত", name: "ক্ত (ক + ত)", breakdown: "ক + ্ + ত", components: ["ক", "্", "ত"], avroKeys: "k + t", bijoyKeys: "k + G + k", jatiyaKeys: "k + g + k", exampleWord: "রক্ত", exampleMeaning: "Blood", category: "essential" },
  { id: "chcha", char: "চ্ছ", name: "চ্ছ (চ + ছ)", breakdown: "চ + ্ + ছ", components: ["চ", "্", "ছ"], avroKeys: "c + Ch", bijoyKeys: "f + G + F", jatiyaKeys: "f + g + f", exampleWord: "ইচ্ছা", exampleMeaning: "Wish / Desire", category: "essential" },
  { id: "jja", char: "জ্জ", name: "জ্জ (জ + জ)", breakdown: "জ + ্ + জ", components: ["জ", "্", "জ"], avroKeys: "j + j", bijoyKeys: "u + G + u", jatiyaKeys: "u + g + u", exampleWord: "লজ্জা", exampleMeaning: "Shame / Modesty", category: "essential" },
  { id: "ttta", char: "ট্ট", name: "ট্ট (ট + ট)", breakdown: "ট + ্ + ট", components: ["ট", "্", "ট"], avroKeys: "T + T", bijoyKeys: "T + G + T", jatiyaKeys: "t + g + t", exampleWord: "চট্টগ্রাম", exampleMeaning: "Chittagong", category: "essential" },

  { id: "stha", char: "ষ্ঠ", name: "ষ্ঠ (ষ + ঠ)", breakdown: "ষ + ্ + ঠ", components: ["ষ", "্", "ঠ"], avroKeys: "S + T", bijoyKeys: "N + G + B", jatiyaKeys: "n + g + b", exampleWord: "শ্রেষ্ঠ", exampleMeaning: "Greatest / Best", category: "intermediate" },
  { id: "shna", char: "ষ্ণ", name: "ষ্ণ (ষ + ণ)", breakdown: "ষ + ্ + ণ", components: ["ষ", "্", "ণ"], avroKeys: "S + N", bijoyKeys: "N + G + B", jatiyaKeys: "n + g + b", exampleWord: "উষ্ণ", exampleMeaning: "Warm / Hot", category: "intermediate" },
  { id: "ttra", char: "ত্র", name: "ত্র (ত + র-ফলা)", breakdown: "ত + ্ + র", components: ["ত", "্", "র"], avroKeys: "t + r", bijoyKeys: "k + G + v", jatiyaKeys: "k + g + v", exampleWord: "ছাত্র", exampleMeaning: "Student", category: "intermediate" },
  { id: "shra", char: "শ্র", name: "শ্র (শ + র-ফলা)", breakdown: "শ + ্ + র", components: ["শ", "্", "র"], avroKeys: "S + r", bijoyKeys: "M + G + v", jatiyaKeys: "m + g + v", exampleWord: "শ্রদ্ধা", exampleMeaning: "Respect", category: "intermediate" },
  { id: "nta", char: "ন্ত", name: "ন্ত (ন + ত)", breakdown: "ন + ্ + ত", components: ["ন", "্", "ত"], avroKeys: "n + t", bijoyKeys: "b + G + k", jatiyaKeys: "b + g + k", exampleWord: "শান্তি", exampleMeaning: "Peace", category: "intermediate" },
  { id: "ntha", char: "ন্থ", name: "ন্থ (ন + থ)", breakdown: "ন + ্ + থ", components: ["ন", "্", "থ"], avroKeys: "n + th", bijoyKeys: "b + G + K", jatiyaKeys: "b + g + k", exampleWord: "গ্রন্থ", exampleMeaning: "Book / Scripture", category: "intermediate" },
  { id: "nda", char: "ন্দ", name: "ন্দ (ন + দ)", breakdown: "ন + ্ + দ", components: ["ন", "্", "দ"], avroKeys: "n + d", bijoyKeys: "b + G + l", jatiyaKeys: "b + g + l", exampleWord: "আনন্দ", exampleMeaning: "Joy / Happiness", category: "intermediate" },
  { id: "ndha", char: "ন্ধ", name: "ন্ধ (ন + ধ)", breakdown: "ন + ্ + ধ", components: ["ন", "্", "ধ"], avroKeys: "n + dh", bijoyKeys: "b + G + L", jatiyaKeys: "b + g + l", exampleWord: "বন্ধুর", exampleMeaning: "Friendly", category: "intermediate" },
  { id: "mpa", char: "ম্প", name: "ম্প (ম + প)", breakdown: "ম + ্ + প", components: ["ম", "্", "প"], avroKeys: "m + p", bijoyKeys: "p + G + r", jatiyaKeys: "p + g + r", exampleWord: "সম্পদ", exampleMeaning: "Wealth / Asset", category: "intermediate" },
  { id: "mba", char: "ম্ব", name: "ম্ব (ম + ব)", breakdown: "ম + ্ + ব", components: ["ম", "্", "ব"], avroKeys: "m + b", bijoyKeys: "p + G + h", jatiyaKeys: "p + g + h", exampleWord: "লম্বা", exampleMeaning: "Tall / Long", category: "intermediate" },
  { id: "mbha", char: "ম্ভ", name: "ম্ভ (ম + ভ)", breakdown: "ম + ্ + ভ", components: ["ম", "্", "ভ"], avroKeys: "m + bh", bijoyKeys: "p + G + H", jatiyaKeys: "p + g + h", exampleWord: "সম্ভব", exampleMeaning: "Possible", category: "intermediate" },

  { id: "hmma", char: "হ্ম", name: "হ্ম (হ + ম)", breakdown: "হ + ্ + ম", components: ["হ", "্", "ম"], avroKeys: "h + m", bijoyKeys: "i + G + p", jatiyaKeys: "i + g + p", exampleWord: "ব্রাহ্মণ", exampleMeaning: "Brahmin", category: "advanced" },
  { id: "tma", char: "ত্ম", name: "ত্ম (ত + ম)", breakdown: "ত + ্ + ম", components: ["ত", "্", "ম"], avroKeys: "t + m", bijoyKeys: "k + G + p", jatiyaKeys: "k + g + p", exampleWord: "আত্মা", exampleMeaning: "Soul", category: "advanced" },
  { id: "dda", char: "দ্দ", name: "দ্দ (দ + দ)", breakdown: "দ + ্ + দ", components: ["দ", "্", "দ"], avroKeys: "d + d", bijoyKeys: "l + G + l", jatiyaKeys: "l + g + l", exampleWord: "উদ্দেশ্য", exampleMeaning: "Purpose / Objective", category: "advanced" },
  { id: "ddha", char: "দ্ধ", name: "দ্ধ (দ + ধ)", breakdown: "দ + ্ + ধ", components: ["দ", "্", "ধ"], avroKeys: "d + dh", bijoyKeys: "l + G + L", jatiyaKeys: "l + g + l", exampleWord: "যুদ্ধ", exampleMeaning: "War / Battle", category: "advanced" },
  { id: "dva", char: "দ্ব", name: "দ্ব (দ + ব-ফলা)", breakdown: "দ + ্ + ব", components: ["দ", "্", "ব"], avroKeys: "d + w", bijoyKeys: "l + G + h", jatiyaKeys: "l + g + h", exampleWord: "দ্বারা", exampleMeaning: "By / Via", category: "advanced" },
  { id: "lka", char: "ল্ক", name: "ল্ক (ল + ক)", breakdown: "ল + ্ + ক", components: ["ল", "্", "ক"], avroKeys: "l + k", bijoyKeys: "V + G + k", jatiyaKeys: "v + g + k", exampleWord: "শুল্ক", exampleMeaning: "Tax / Duty", category: "advanced" },
  { id: "shcha", char: "শ্চ", name: "শ্চ (শ + চ)", breakdown: "শ + ্ + চ", components: ["শ", "্", "চ"], avroKeys: "S + c", bijoyKeys: "M + G + f", jatiyaKeys: "m + g + f", exampleWord: "আশ্চর্যের", exampleMeaning: "Surprising", category: "advanced" },
  { id: "stha_2", char: "স্থ", name: "স্থ (স + থ)", breakdown: "স + ্ + থ", components: ["স", "্", "থ"], avroKeys: "s + th", bijoyKeys: "n + G + K", jatiyaKeys: "n + g + k", exampleWord: "স্থান", exampleMeaning: "Place / Location", category: "advanced" },
  { id: "sno", char: "স্ন", name: "স্ন (স + ন)", breakdown: "স + ্ + ন", components: ["স", "্", "ন"], avroKeys: "s + n", bijoyKeys: "n + G + b", jatiyaKeys: "n + g + b", exampleWord: "স্নান", exampleMeaning: "Bath", category: "advanced" },
  { id: "sma", char: "স্ম", name: "স্ম (স + ম)", breakdown: "স + ্ + ম", components: ["স", "্", "ম"], avroKeys: "s + m", bijoyKeys: "n + G + p", jatiyaKeys: "n + g + p", exampleWord: "স্মৃতি", exampleMeaning: "Memory", category: "advanced" },
  { id: "hla", char: "হ্ল", name: "হ্ল (হ + ল-ফলা)", breakdown: "হ + ্ + ল", components: ["হ", "্", "ল"], avroKeys: "h + l", bijoyKeys: "i + G + V", jatiyaKeys: "i + g + v", exampleWord: "আহ্লাদ", exampleMeaning: "Delight", category: "advanced" },
];
