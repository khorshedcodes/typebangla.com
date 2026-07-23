import React from "react";
import { Metadata } from "next";
import BlogClient from "@/app/blog/BlogClient";

export const metadata: Metadata = {
  title: "typebangla Blog | বাংলা টাইপিং গাইড ও টিপস | typebangla",
  description: "Read helpful articles, tutorials, and guides about Bangla typing layout comparisons, typing speed drills, and SEO URL optimization.",
  keywords: ["typing blog", "bangla typing tips", "speed typing guides", "avro vs bijoy", "url slug seo", "typebangla blog"],
  alternates: {
    canonical: "https://typebangla.com/blog",
  }
};

export default function Page() {
  return <BlogClient />;
}
