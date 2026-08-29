import React, { use } from "react";
import { Metadata } from "next";
import TestSlugClient from "./TestSlugClient";

interface TestPageProps {
  params: Promise<{ testSlug: string }>;
}

export function generateStaticParams() {
  return [
    { testSlug: "1min" },
    { testSlug: "3min" },
    { testSlug: "5min" },
    { testSlug: "avro" },
    { testSlug: "unibijoy" },
    { testSlug: "english" },
    { testSlug: "govt" },
  ];
}

export async function generateMetadata({ params }: TestPageProps): Promise<Metadata> {
  const { testSlug } = await params;
  const name = testSlug.toUpperCase();
  return {
    title: `${name} Speed Test | TypeBangla Tests`,
    description: `Take the official ${name} speed test on TypeBangla with live WPM meters, verified scores, and certificate generation.`,
    alternates: { canonical: `https://typebangla.com/tests/${testSlug}` },
  };
}

export default function TestPage({ params }: TestPageProps) {
  const { testSlug } = use(params);
  return <TestSlugClient testSlug={testSlug} />;
}
