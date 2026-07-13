"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GuidePage() {
  return (
    <main className="app-container">
      <div className="prose">
        <h2>Bangla Typing Guide</h2>
        <p>Learn how to type in Bangla using the three major keyboard layouts supported by TypeBangla.</p>

        <h3>1. Avro Phonetic</h3>
        <p>
          The easiest way to type Bangla using English letters. Type how you pronounce — the system converts it to Bangla script automatically. Also known as &quot;Banglish typing.&quot;
        </p>
        <p><strong>Examples:</strong></p>
        <ul>
          <li><code>ami</code> → আমি</li>
          <li><code>bangla</code> → বাংলা</li>
          <li><code>prothom</code> → প্রথম</li>
          <li>Use <code>+</code> or <code>.</code> for conjuncts: <code>k+t</code> → ক্ত</li>
        </ul>

        <h3>2. UniBijoy</h3>
        <p>
          A traditional fixed keyboard layout based on Bijoy, adapted for Unicode. Widely used by professional typists for its speed and precision.
        </p>
        <p><strong>Key rules:</strong></p>
        <ul>
          <li><strong>Vowel signs (কার):</strong> Type the consonant first, then the vowel sign. e.g., <code>ক (j)</code> + <code>ি (d)</code> = কি</li>
          <li><strong>Hasanta (link key):</strong> Use <code>g</code> to join consonants. e.g., <code>ক (j)</code> + <code>্ (g)</code> + <code>ষ (Shift+n)</code> = ক্ষ</li>
        </ul>

        <h3>3. Jatiya Layout</h3>
        <p>
          The official government-standard keyboard layout approved by Bangladesh Computer Council (BCC). Used in government offices and publications.
        </p>
        <p><strong>Key rules:</strong></p>
        <ul>
          <li><strong>Hasanta key:</strong> <code>d</code> is the link key. e.g., <code>ত (k)</code> + <code>্ (d)</code> + <code>ত (k)</code> = ত্ত</li>
          <li>Character positions differ from Bijoy — designed specifically for Unicode accuracy.</li>
        </ul>

        <hr />

        <p><strong>Typing tip:</strong> Keep your fingers on the home row (A, S, D, F and J, K, L, ;). Practice looking at the screen, not the keyboard.</p>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/practice" className="btn-primary" style={{ padding: "14px 28px" }}>
            Start Practicing <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
