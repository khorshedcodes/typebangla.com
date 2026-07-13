import React from "react";
import { Metadata } from "next";
import BijoyClient from "./BijoyClient";

export const metadata: Metadata = {
  title: "Unicode to Bijoy Converter | ইউনিকোড থেকে বিজয় কনভার্টার | TypeBangla",
  description: "Convert Unicode Bangla text to legacy Bijoy ANSI (SutonnyMJ) code page and vice-versa. Best tool for Adobe Photoshop and Illustrator publishers in Bangladesh.",
  keywords: ["unicode to bijoy converter", "ইউনিকোড থেকে বিজয় কনভার্টার", "বিজয় কনভার্টার", "bijoy to unicode converter", "sutonnymj converter online", "convert unicode to bijoy", "unicode to bijoy online", "sutonnymj font converter", "bangla text converter", "typebangla"],
  alternates: {
    canonical: "https://typebangla.com/unicode-to-bijoy-converter",
  }
};

export default function Page() {
  return <BijoyClient />;
}
