"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/practice", label: "Practice" },
  { href: "/english-to-bangla-typing", label: "Phonetic" },
  { href: "/unicode-to-bijoy-converter", label: "Converter" },
  { href: "/bangla-voice-typing", label: "Voice" },
  { href: "/bangla-word-counter", label: "Counter" },
  { href: "/bangla-slug-generator", label: "Slug" },
  { href: "/blog", label: "Blog" },
  { href: "/guide", label: "Guide" },
];

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <Link href="/" className="logo-container-link" onClick={() => setDrawerOpen(false)}>
            <div className="logo-icon-box">T</div>
            <span className="logo-name">TypeBangla</span>
          </Link>

          <nav className="desktop-nav">
            {NAV_LINKS.filter(l => l.href !== "/practice").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/practice" className="header-cta-btn">
              Practice
              <ArrowRight size={13} />
            </Link>
          </nav>

          <button
            className="mobile-menu-toggle"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle Menu"
          >
            {drawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
        <div className="drawer-content">
          <div className="drawer-header">
            <span className="drawer-title">Navigation</span>
            <button className="drawer-close-btn" onClick={() => setDrawerOpen(false)} aria-label="Close">
              <X size={20} />
            </button>
          </div>
          <div className="drawer-body">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`drawer-link-item ${pathname === link.href ? "active" : ""}`}
                onClick={() => setDrawerOpen(false)}
              >
                <span className="drawer-link-left">{link.label}</span>
                <ChevronRight size={14} className="drawer-arrow" />
              </Link>
            ))}
          </div>
          <div className="drawer-footer">
            <p>© {new Date().getFullYear()} TypeBangla</p>
          </div>
        </div>
      </div>
    </>
  );
}
