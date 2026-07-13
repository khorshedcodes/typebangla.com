"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <Link href="/" className="footer-logo">
            <span className="logo-text-bold">TypeBangla</span>
          </Link>
          <p className="footer-desc">
            The premier online platform for perfecting typing speed and accuracy in both Bangla (UniBijoy, Jatiya, Avro Phonetic) and English.
          </p>
        </div>

        {/* Links Column 1 - Tools */}
        <div className="footer-links-col">
          <span className="footer-col-title">Tools</span>
          <Link href="/practice" className="footer-link">Practice Arena</Link>
          <Link href="/english-to-bangla-typing" className="footer-link">Phonetic Typing</Link>
          <Link href="/unicode-to-bijoy-converter" className="footer-link">Bijoy Converter</Link>
          <Link href="/bangla-voice-typing" className="footer-link">Voice Typing</Link>
          <Link href="/bangla-word-counter" className="footer-link">Word Counter</Link>
          <Link href="/bangla-slug-generator" className="footer-link">Slug Generator</Link>
        </div>

        {/* Links Column 2 - Support */}
        <div className="footer-links-col">
          <span className="footer-col-title">Support</span>
          <Link href="/guide" className="footer-link">Typing Guide</Link>
          <Link href="/blog" className="footer-link">Blog</Link>
          <Link href="/about" className="footer-link">About Us</Link>
          <Link href="/contact" className="footer-link">Contact Us</Link>
        </div>

        {/* Links Column 3 - Legal */}
        <div className="footer-links-col">
          <span className="footer-col-title">Legal</span>
          <Link href="/privacy" className="footer-link">Privacy Policy</Link>
          <Link href="/terms" className="footer-link">Terms of Service</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} TypeBangla. All rights reserved.</span>
        <span>Made in Bangladesh</span>
      </div>
    </footer>
  );
}
