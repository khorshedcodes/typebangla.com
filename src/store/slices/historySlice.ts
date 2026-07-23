import { KeyboardLayout } from "./settingsSlice";

export interface ExamResult {
  id: string;
  date: string;
  layout: KeyboardLayout;
  wpm: number;
  accuracy: number;
  duration: number;
  errors: number;
  language: "english" | "bangla";
}

export interface HistoryState {
  history: ExamResult[];
  addExamResult: (result: Omit<ExamResult, "id" | "date">) => void;
  clearHistory: () => void;
}

export const initialHistoryState = {
  history: [],
};
