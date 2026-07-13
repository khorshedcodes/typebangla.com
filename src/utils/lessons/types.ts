/**
 * TypeMaster — Shared Lesson Types
 * Single source of truth for all lesson-related interfaces and enumerations.
 */

export type LessonLevel = "beginner" | "intermediate" | "advanced" | "mastery";
export type LessonCategory = "english" | "bangla";
export type LessonType =
  | "drill"       // pure key repetition — uses dynamic generator
  | "combo"       // 2-key combo patterns — uses dynamic generator
  | "pair"        // aspirated / voiced pair (base + shift version)
  | "word"        // short real words
  | "mixed-word"  // mixed keys in real words
  | "sentence"    // full sentences
  | "paragraph";  // long mastery texts

/**
 * `inputLanguage`:
 *   "bangla"  — user types Bangla characters directly (UniBijoy, Jatiya)
 *   "latin"   — user types Latin phonetic sequences; IME converts to Bangla (Avro)
 */
export type InputLanguage = "bangla" | "latin";

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  category: LessonCategory;
  level: LessonLevel;
  type: LessonType;
  /** The keys being introduced in this lesson */
  focusKeys: string;
  /** The actual text the user physically types */
  text: string;
  /**
   * For Avro (inputLanguage: "latin") lessons only.
   * Shows the expected Bangla output as a hint beside the text.
   */
  outputPreview?: string;
  /**
   * Whether the user physically types Latin keys (Avro IME) or
   * Bangla characters directly (UniBijoy / Jatiya fixed layouts).
   * Defaults to "bangla" when omitted.
   */
  inputLanguage?: InputLanguage;
  /** Lesson order within its category + layout */
  order: number;
  /** Target WPM to "pass" this lesson */
  targetWpm: number;
  /** Target accuracy % to pass */
  targetAccuracy: number;
}
