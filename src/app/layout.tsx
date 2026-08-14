import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientProviders from "../components/ClientProviders";

export const metadata: Metadata = {
  title: "typebangla - Learn Bangla & English Typing Online",
  description: "Improve your typing speed and accuracy in Bangla (UniBijoy, Jatiya, Avro Phonetic) and English. Practice free interactive courses, dynamic drills, and speed exams. Bangla lekhba kivabe & govt job typing speed test.",
  keywords: [
    "Bangla typing test",
    "type bangla online",
    "bijoy typing",
    "avro phonetic trainer",
    "typing speed test",
    "typing training online",
    "english to bangla typing",
    "unicode to bijoy converter",
    "typebangla",
    "bangla typing speed baranor upay",
    "bijoy 52 lekhba kivabe",
    "computer operator typing test bd",
    "bangla typing software free download"
  ],
  authors: [{ name: "typebangla team" }],
  metadataBase: new URL("https://typebangla.com"),
  alternates: {
    canonical: "https://typebangla.com/",
  },
  other: {
    "geo.region": "BD",
    "geo.placename": "Dhaka, Bangladesh",
    "content-language": "bn, en",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    title: "typebangla - Free Typing Speed Trainer",
    description: "Learn typing in English and Bangla (UniBijoy, Jatiya, Avro). Interactive drills, virtual keyboard suggestions, and live analytics.",
    url: "https://typebangla.com",
    siteName: "typebangla",
    images: [
      {
        url: "/images/logo/blackbg.png",
        width: 1200,
        height: 630,
        alt: "typebangla - Online Typing Speed Trainer",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "typebangla - Learn Typing Online",
    description: "Interactive online tool for learning and testing English & Bangla typing speeds.",
    images: ["/images/logo/blackbg.png"],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                if (${JSON.stringify(process.env.NODE_ENV === "production")}) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').catch(function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    });
                  });
                } else {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for (var r of registrations) {
                      r.unregister();
                    }
                  });
                }
              }
            `,
          }}
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://typebangla.com/#website",
                  "url": "https://typebangla.com",
                  "name": "typebangla",
                  "description": "Learn Bangla & English Typing Online",
                  "inLanguage": ["bn-BD", "en-US"],
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://typebangla.com/#webapp",
                  "url": "https://typebangla.com",
                  "name": "typebangla Typing Trainer",
                  "applicationCategory": "EducationalApplication",
                  "operatingSystem": "All",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-background text-foreground font-sans" suppressHydrationWarning>
        <ClientProviders>
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
