import React, { Suspense } from "react";
import { Metadata } from "next";
import GameClient from "./GameClient";

export const metadata: Metadata = {
  title: "Falling Words Typing Game | বাংলা ও ইংরেজি টাইপিং গেম | typebangla",
  description: "Play the interactive Falling Words typing game. Practice and increase your typing speed for English, UniBijoy, Jatiya, and Avro Phonetic keyboard layouts.",
  keywords: [
    "typing game",
    "falling words game",
    "bangla typing game",
    "english typing game",
    "unibijoy game",
    "jatiya typing game",
    "avro game",
    "typebangla game"
  ],
  alternates: {
    canonical: "https://typebangla.com/game",
  }
};

export default function GamePage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-xs font-semibold text-muted-foreground">Loading Typing Game...</div>}>
      <GameClient />
    </Suspense>
  );
}
