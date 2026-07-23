export type KeyboardLayout = "english" | "unibijoy" | "jatiya" | "avro" | "probhat" | "inscript" | "unicode";
export type SoundProfile = "mechanical" | "retro" | "digital";

export interface SettingsState {
  activeLayout: KeyboardLayout;
  soundEnabled: boolean;
  soundVolume: number;
  soundProfile: SoundProfile;
  selectedDuration: number;
  selectedLevel: 1 | 2 | 3;
  selectedDomain: "literary" | "contemporary" | "synthesized";
  theme: "light" | "dark";

  setActiveLayout: (layout: KeyboardLayout) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
  setSoundProfile: (profile: SoundProfile) => void;
  setSelectedDuration: (duration: number) => void;
  setSelectedLevel: (level: 1 | 2 | 3) => void;
  setSelectedDomain: (domain: "literary" | "contemporary" | "synthesized") => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
}

export const initialSettingsState = {
  activeLayout: "avro" as KeyboardLayout,
  soundEnabled: true,
  soundVolume: 0.5,
  soundProfile: "mechanical" as SoundProfile,
  selectedDuration: 60,
  selectedLevel: 1 as const,
  selectedDomain: "contemporary" as const,
  theme: "light" as const,
};
