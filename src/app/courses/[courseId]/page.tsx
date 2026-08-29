import React, { use } from "react";
import { Metadata } from "next";
import CourseDetailClient from "./CourseDetailClient";

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export function generateStaticParams() {
  return [
    { courseId: "english" },
    { courseId: "avro" },
    { courseId: "unibijoy" },
    { courseId: "jatiya" },
    { courseId: "probhat" },
    { courseId: "inscript" },
    { courseId: "unicode" },
  ];
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params;
  const name = courseId.toUpperCase();
  return {
    title: `${name} Full Keyboard Course | TypeBangla`,
    description: `Master touch typing for ${name} layout on TypeBangla with lessons, WPM targets, and verified layout locking.`,
    alternates: { canonical: `https://typebangla.com/courses/${courseId}` },
  };
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  const { courseId } = use(params);
  return <CourseDetailClient courseId={courseId} />;
}
