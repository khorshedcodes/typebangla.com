"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, User, LogOut, Settings, BarChart3, Award, Building2, ShieldCheck, ArrowRight
} from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { AuthModal } from "./AuthModal";

import { useTypingStore } from "../store/typingStore";

const NAV_HUBS = [
  { id: "courses", label: "Courses", href: "/courses" },
  { id: "practice", label: "Practice", href: "/practice" },
  { id: "tests", label: "Tests", href: "/tests" },
  { id: "tools", label: "Tools", href: "/tools" },
  { id: "blog", label: "Blog", href: "/blog" },
];

import { isFocusModePage } from "../utils/navigation";

export default function Header() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const isFocusModeActive = useTypingStore((s) => s.isFocusModeActive);
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">("login");

  if (isFocusModeActive || isFocusModePage(pathname)) return null;

  const activeHubId = NAV_HUBS.find(
    (h) => pathname === h.href || (h.href !== "/" && pathname?.startsWith(h.href))
  )?.id;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/75 backdrop-blur-xl transition-all">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 gap-4">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" onClick={() => setDrawerOpen(false)}>
            <div className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-secondary/80 border border-border group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo/blackbg.png"
                alt="typebangla logo"
                width={28}
                height={28}
                className="w-7 h-7 hidden dark:block object-contain"
                priority
              />
              <Image
                src="/images/logo/whitebg_1.png"
                alt="typebangla logo"
                width={28}
                height={28}
                className="w-7 h-7 block dark:hidden object-contain"
                priority
              />
            </div>
            <span className="font-black text-lg tracking-tight text-foreground select-none group-hover:text-foreground/90">
              typebangla<span className="text-emerald-500 font-bold">.com</span>
            </span>
          </Link>

          {/* Desktop Nav Hub Direct Links */}
          <nav className="hidden md:flex items-center gap-1.5 flex-1 justify-center">
            {NAV_HUBS.map((hub) => {
              const isActive = activeHubId === hub.id;

              return (
                <Link
                  key={hub.id}
                  href={hub.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "text-foreground bg-secondary/90 border border-border/80 shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                >
                  {hub.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-500 rounded-full animate-in fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Auth Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full border border-border hover:bg-secondary transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                    {user.displayName ? user.displayName[0].toUpperCase() : "U"}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-border mb-1">
                      <div className="text-xs font-semibold text-foreground truncate">{user.displayName || "Learner"}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{user.email}</div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      <User size={14} className="text-muted-foreground" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/stats"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      <BarChart3 size={14} className="text-muted-foreground" />
                      <span>Progress & Stats</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Award size={14} className="text-muted-foreground" />
                      <span>Certificates</span>
                    </Link>
                    <Link
                      href="/institute"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Building2 size={14} className="text-muted-foreground" />
                        <span>Institute Portal</span>
                      </div>
                      <span className="text-[9px] font-extrabold bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded">V2</span>
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      <ShieldCheck size={14} className="text-muted-foreground" />
                      <span>Admin Panel</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors border-t border-border mt-1"
                    >
                      <LogOut size={14} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-xs font-medium text-foreground">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="text-xs font-semibold px-4 h-9">
                    Start Free
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Drawer Toggle */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-secondary border border-border cursor-pointer pointer-events-auto select-none active:scale-95 transition-all z-50 shrink-0"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
            >
              {drawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-150">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-xs" onClick={() => setDrawerOpen(false)} />

          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-[300px] bg-background border-l border-border flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <Link href="/" className="flex items-center gap-2" onClick={() => setDrawerOpen(false)}>
                <div className="w-6 h-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                  TB
                </div>
                <span className="font-extrabold text-base text-foreground">typebangla</span>
              </Link>
              <button 
                type="button" 
                onClick={() => setDrawerOpen(false)} 
                className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary touch-manipulation cursor-pointer select-none"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              <Link
                href="/"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
              >
                Home
              </Link>

              {NAV_HUBS.map((hub) => (
                <Link
                  key={hub.id}
                  href={hub.href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
                >
                  {hub.label}
                </Link>
              ))}

              <Link
                href="/institute"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-primary hover:bg-secondary rounded-md transition-colors font-semibold"
              >
                <span>Institute Portal 🏫</span>
                <span className="text-[10px] font-extrabold bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded">V2 Coming Soon</span>
              </Link>
            </div>

            <div className="border-t border-border p-4 space-y-2">
              {user ? (
                <Link href="/dashboard" onClick={() => setDrawerOpen(false)}>
                  <Button className="w-full text-xs font-semibold gap-2">
                    <User size={14} />
                    <span>My Dashboard</span>
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/signup" onClick={() => setDrawerOpen(false)}>
                    <Button className="w-full text-xs font-semibold gap-2">
                      <span>Start Free</span>
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setDrawerOpen(false)}>
                    <Button variant="outline" className="w-full text-xs font-medium mt-2">
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
