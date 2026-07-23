import React from "react";
import { Metadata } from "next";
import LayoutsClient from "../layouts/LayoutsClient";

export const metadata: Metadata = {
  title: "বাংলা কীবোর্ড লেআউট — অভ্র, ইউনিবিজয়, জাতীয়, প্রভাত | TypeBangla",
  description: "বাংলা কীবোর্ড লেআউটের তুলনামূলক গাইড। অভ্র ফোনেটিক, ইউনিবিজয়, জাতীয় (BCC), প্রভাত ও ইংরেজি কোয়ার্টি লেআউটের কী ম্যাপ ও ব্যবহার।",
  alternates: { canonical: "https://typebangla.com/keyboards" },
};

export default function KeyboardsPage() {
  return <LayoutsClient />;
}
