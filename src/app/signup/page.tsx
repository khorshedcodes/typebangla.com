"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail, Lock, User, ArrowRight, Building2, ShieldCheck,
  CheckCircle2, Sparkles, Loader2, Eye, EyeOff
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export default function SignupPage() {
  const router = useRouter();
  const { signInWithGoogle, signUpWithEmail } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Google sign in failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signUpWithEmail(email, password, name.trim());
      router.push("/dashboard");
    } catch (err: any) {
      const msg =
        err?.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : err?.code === "auth/weak-password"
          ? "Password should be at least 6 characters."
          : err?.message || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 fade-in text-foreground">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs font-semibold text-primary border-primary/30 bg-primary/5">
          <Sparkles size={13} />
          <span>Free Learner &amp; Institute Account</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          Create Your TypeBangla Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your typing WPM across devices, earn verified certificates, and rank on public leaderboards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Main Sign Up Form (7 Cols) */}
        <Card className="lg:col-span-7 border border-border bg-card shadow-sm">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground">Create Learner Account</h2>
              <p className="text-xs text-muted-foreground">Fill in your details or use Google one-click signup.</p>
            </div>

            {error && (
              <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs leading-relaxed">
                {error}
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full h-11 text-xs font-bold border-border"
            >
              <GoogleIcon />
              <span>Sign Up with Google</span>
            </Button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-border w-full" />
              <span className="bg-card px-3 text-[11px] font-bold text-muted-foreground uppercase absolute">
                Or Sign Up with Email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-muted-foreground" size={16} />
                  <Input
                    type="text"
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9 text-xs h-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-muted-foreground" size={16} />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 text-xs h-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Password (min 6 chars)</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-muted-foreground" size={16} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-9 text-xs h-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-11 text-xs font-bold gap-2 mt-2">
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Highlighted Institute Portal Registration Sidebar Card (5 Cols) */}
        <Card className="lg:col-span-5 border border-primary/30 bg-primary/5 shadow-sm relative overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-xs">
                🏫
              </div>
              <Badge variant="outline" className="text-[10px] border-primary text-primary font-bold">
                COMPUTER TRAINING INSTITUTES &amp; SCHOOLS
              </Badge>
              <h3 className="text-xl font-black text-foreground">
                Educator or Training Center?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Set up your Computer Training Center on TypeBangla to manage students, assign typing tests, and issue certificates.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                "Instant Computer Training Center portal setup",
                "Assign Avro, Bijoy 52, Jatiya & English typing tests",
                "Generate student performance analytics & WPM graphs",
                "Issue official verified course certificates",
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-primary/20 space-y-2">
              <Link href="/institute?tab=register">
                <Button className="w-full font-extrabold text-xs h-11 gap-2 shadow-xs">
                  <Building2 size={16} />
                  <span>Register as an Institute ➔</span>
                </Button>
              </Link>
              <p className="text-[11px] text-muted-foreground text-center">
                Free for schools, institutes, and IT training centers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
