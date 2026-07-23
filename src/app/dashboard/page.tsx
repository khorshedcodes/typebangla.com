import React from "react";
import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "আমার ড্যাশবোর্ড — অগ্রগতি, ব্যাজ ও ইতিহাস | TypeBangla",
  description: "আপনার টাইপিং অগ্রগতি ট্র্যাক করুন। WPM ইতিহাস, দৈনিক ধারা, XP লেভেল, ব্যাজ এবং সার্টিফিকেট এক জায়গায় দেখুন।",
  alternates: { canonical: "https://typebangla.com/dashboard" },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
