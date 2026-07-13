import React from "react";
import { Metadata } from "next";
import PhoneticClient from "./PhoneticClient";

export const metadata: Metadata = {
  title: "English to Bangla Typing | ইংরেজি থেকে বাংলা টাইপিং অনলাইন | TypeBangla",
  description: "Free online English to Bangla typing converter. Type in phonetic Banglish (e.g. amar) and get Unicode Bangla (আমার) in real-time. Copy or download text.",
  keywords: ["english to bangla typing", "ইংরেজি থেকে বাংলা টাইপিং", "ইংরেজি থেকে বাংলা টাইপ", "bangla typing online", "banglish to bangla converter", "online bangla writing", "write bangla online", "typebangla"],
  alternates: {
    canonical: "https://typebangla.com/english-to-bangla-typing",
  }
};

export default function Page() {
  return <PhoneticClient />;
}
