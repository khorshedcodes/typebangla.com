import React from "react";
import { Metadata } from "next";
import { PracticeHubClient } from "../../../components/PracticeHubClient";

interface Props {
  params: Promise<{ layout: string }>;
}

export function generateStaticParams() {
  return [
    { layout: "avro" },
    { layout: "unibijoy" },
    { layout: "jatiya" },
    { layout: "probhat" },
    { layout: "inscript" },
    { layout: "unicode" },
    { layout: "english" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { layout } = await params;
  const name = layout.toUpperCase();
  return {
    title: `${name} Typing Practice Online — Free Speed Drills | TypeBangla`,
    description: `Practice ${name} typing online with instant feedback, live WPM calculations, accuracy meters, and custom duration tests.`,
    alternates: { canonical: `https://typebangla.com/practice/${layout}` },
  };
}

export default async function PracticeLayoutPage({ params }: Props) {
  await params;
  return <PracticeHubClient />;
}
