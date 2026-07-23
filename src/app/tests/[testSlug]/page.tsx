import React, { use } from "react";
import { Metadata } from "next";
import TestSlugClient from "./TestSlugClient";

interface TestPageProps {
  params: Promise<{ testSlug: string }>;
}

export async function generateMetadata({ params }: TestPageProps): Promise<Metadata> {
  const { testSlug } = await params;
  const name = testSlug.toUpperCase();
  return {
    title: `${name} Speed Test | TypeBangla Tests`,
    description: `Take the official ${name} speed test on TypeBangla with live WPM meters, verified scores, and certificate generation.`,
  };
}

export default function TestPage({ params }: TestPageProps) {
  const { testSlug } = use(params);
  return <TestSlugClient testSlug={testSlug} />;
}
