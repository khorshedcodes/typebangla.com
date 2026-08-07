"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail, Lock, ArrowRight, Building2, ShieldCheck,
  GraduationCap, Award, CheckCircle2, Sparkles, Loader2,
  Eye, EyeOff
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

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail, sendPasswordReset } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorObj = err as { message?: string; code?: string };
      setError(errorObj?.message || "Google sign in failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setError("Please enter your email address to reset password.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await sendPasswordReset(email.trim());
      setResetSent(true);
    } catch (err: unknown) {
      const errorObj = err as { message?: string; code?: string };
      setError(errorObj?.message || "Failed to send reset email. Please verify your email address.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmail(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorObj = err as { message?: string; code?: string };
      const msg =
        errorObj?.code === "auth/invalid-credential"
          ? "Invalid email or password."
          : errorObj?.message || "Login failed. Please check your credentials.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 fade-in text-foreground">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs font-semibold text-primary border-primary/30 bg-primary/5">
          <ShieldCheck size={13} />
          <span>Learner &amp; Institute Portal Sign In</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          Welcome Back to TypeBangla
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to access your course progress, speed history, verified certificates, and institute dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Main Sign In Form (7 Cols) */}
        <Card className="lg:col-span-7 border border-border bg-card shadow-sm">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground">Sign In to Your Account</h2>
              <p className="text-xs text-muted-foreground">Enter your credentials or use Google sign-in.</p>
            </div>

            {error && (
              <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs leading-relaxed">
                {error}
              </div>
            )}

            {resetSent && (
              <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs leading-relaxed flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>Password reset email sent! Check your inbox for instructions.</span>
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
              <span>Continue with Google</span>
            </Button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-border w-full" />
              <span className="bg-card px-3 text-[11px] font-bold text-muted-foreground uppercase absolute">
                Or Sign In with Email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-muted-foreground" size={16} />
                  <Input
                    type="email"
                    placeholder="student@typebangla.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 text-xs h-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-foreground">Password</label>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="text-[11px] text-primary font-semibold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
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
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground">
              Don&apos;t have an account yet?{" "}
              <Link href="/signup" className="text-primary font-bold hover:underline">
                Create Free Account
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
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] border-primary text-primary font-bold">
                  COMPUTER TRAINING INSTITUTES
                </Badge>
                <Badge className="bg-amber-500 text-slate-950 text-[10px] font-extrabold animate-pulse">
                  V2 COMING SOON
                </Badge>
              </div>
              <h3 className="text-xl font-black text-foreground">
                Institute OS V2 Early Access
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                TypeMaster Institute V2 is launching soon with Multi-Teacher Admin, anti-cheat proctored exams, and instant QR-verified PDF certificates.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                "Multi-Teacher Admin & Campus Hierarchy",
                "Automated CSV Student Roster Provisioning",
                "Anti-Cheat & Tab-Switch Proctored Exam System",
                "Verifiable Digital Speed Certificates & Reports",
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-primary/20 space-y-2">
              <Link href="/institute">
                <Button className="w-full font-extrabold text-xs h-11 gap-2 shadow-xs bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 border-none">
                  <Building2 size={16} />
                  <span>Join Institute V2 Waitlist ➔</span>
                </Button>
              </Link>
              <p className="text-[11px] text-muted-foreground text-center">
                Early access & priority onboarding for training centers & schools.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
