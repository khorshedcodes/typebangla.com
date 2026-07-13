"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <main className="app-container">
      <div className="prose">
        <h2>Privacy Policy</h2>
        <p>At TypeBangla, we prioritize user privacy. This policy outlines how we handle your data.</p>

        <h3>1. Client-Side Data</h3>
        <p>
          Your typing progress, lesson completion rates, WPM scores, and accuracy data are stored locally in your browser using <strong>LocalStorage</strong>. We do not send this data to any external server.
        </p>

        <h3>2. Cookies & Advertising</h3>
        <p>
          We may use Google AdSense in the future to keep this resource free. Google uses cookies to serve ads based on your browsing history.
        </p>
        <ul>
          <li>You can opt out of personalized ads at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
        </ul>

        <h3>3. Log Files</h3>
        <p>
          Like most websites, we may collect standard log data including IP addresses, browser type, and page visit timestamps for analytics purposes.
        </p>

        <h3>4. Consent</h3>
        <p>
          By using this website, you consent to this privacy policy and agree to its terms.
        </p>
      </div>
    </main>
  );
}
