import type { Metadata } from "next";
import "./globals.css";
import AdSenseScript from "../components/AdSenseScript";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "TypeBangla - Learn Bangla & English Typing Online",
  description: "Improve your typing speed and accuracy in Bangla (UniBijoy, Jatiya, Avro Phonetic) and English. Practice free interactive courses, dynamic drills, and speed exams.",
  keywords: ["Bangla typing test", "type bangla online", "bijoy typing", "avro phonetic trainer", "typing speed test", "typing training online", "english to bangla typing", "unicode to bijoy converter"],
  authors: [{ name: "TypeBangla team" }],
  metadataBase: new URL("https://typebangla.com"),
  openGraph: {
    title: "TypeBangla - Free Typing Speed Trainer",
    description: "Learn typing in English and Bangla (UniBijoy, Jatiya, Avro). Interactive drills, virtual keyboard suggestions, and live analytics.",
    url: "https://typebangla.com",
    siteName: "TypeBangla",
    locale: "bn-BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeBangla - Learn Typing Online",
    description: "Interactive online tool for learning and testing English & Bangla typing speeds.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        {/* Dynamic AdSense Loading script */}
        <AdSenseScript publisherId="ca-pub-1234567890123456" />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
