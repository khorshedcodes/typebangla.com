import React, { use } from "react";
import { Metadata } from "next";
import LessonPracticeClient from "@/app/courses/[courseId]/[lessonId]/LessonPracticeClient";

interface LessonPageProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { courseId, lessonId } = await params;
  const courseName = courseId.toUpperCase();
  const lessonName = lessonId.replace("-", " ").toUpperCase();
  return {
    title: `${lessonName} — ${courseName} Course | TypeBangla`,
    description: `Practice touch-typing ${lessonName} in ${courseName} course layout with real-time WPM telemetry and Virtual Keyboard guide.`,
  };
}

export default function LessonPracticePage({ params }: LessonPageProps) {
  const { courseId, lessonId } = use(params);
  return <LessonPracticeClient courseId={courseId} lessonId={lessonId} />;
}
