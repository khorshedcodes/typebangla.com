"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="app-container">
      <div className="prose">
        <h2>Contact Us</h2>
        <p>Have feedback, questions, or suggestions? We&apos;d love to hear from you.</p>

        {submitted && (
          <div style={{ padding: 14, background: "var(--accent-subtle)", border: "1px solid var(--accent)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", color: "var(--accent)", marginBottom: 24 }}>
            Thank you! Your message has been received.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>Name</label>
            <input
              type="text" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="text-area-glow"
              style={{ padding: "10px 14px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>Email</label>
            <input
              type="email" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
              className="text-area-glow"
              style={{ padding: "10px 14px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>Message</label>
            <textarea
              rows={4} required value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your message..."
              className="text-area-glow"
              style={{ resize: "none" }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", padding: "12px 24px" }}>
            <Send size={14} /> Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
