"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="container max-w-lg mx-auto px-4 sm:px-6 py-12 fade-in">
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-zinc-900">Contact Us</CardTitle>
          <CardDescription className="text-xs">Have feedback, questions, or suggestions? We&apos;d love to hear from you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {submitted && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800 font-semibold animate-in fade-in duration-200">
              Thank you! Your message has been received.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 block">Name</label>
              <Input
                type="text" 
                required 
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="h-9 border-zinc-200 text-xs"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 block">Email</label>
              <Input
                type="email" 
                required 
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="h-9 border-zinc-200 text-xs"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 block">Message</label>
              <textarea
                rows={4} 
                required 
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your message..."
                className="w-full text-xs p-3 border border-zinc-200 bg-background text-zinc-800 rounded-md placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 resize-none font-sans"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-zinc-950 text-white hover:bg-zinc-800 h-10 gap-1.5"
            >
              <Send size={13} />
              <span>Send Message</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
