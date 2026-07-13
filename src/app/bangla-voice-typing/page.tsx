import React from "react";
import { Metadata } from "next";
import VoiceClient from "./VoiceClient";

export const metadata: Metadata = {
  title: "Bangla Voice Typing | বাংলা ভয়েস টাইপিং অনলাইন (Speech to Text) | TypeBangla",
  description: "Free online Bangla voice typing and speech-to-text converter. Speak clearly into your mic to dictate text in Bangla (Bangladesh/India) or English instantly.",
  keywords: ["bangla voice typing", "বাংলা ভয়েস টাইপিং", "বাংলা ভয়েস রাইটিং", "bangla speech to text", "bangla speech to text online", "voice writing in bangla", "voice typing online", "typebangla voice"],
  alternates: {
    canonical: "https://typebangla.com/bangla-voice-typing",
  }
};

export default function Page() {
  return <VoiceClient />;
}
