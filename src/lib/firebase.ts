"use client";

import { initializeApp, getApps, getApp } from "firebase/app";

// Validate required Firebase config at runtime (dev-only warning)
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const missing: string[] = [];
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) missing.push("NEXT_PUBLIC_FIREBASE_API_KEY");
  if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) missing.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) missing.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");

  if (missing.length > 0) {
    console.warn(
      `[typebangla] Missing Firebase env vars: ${missing.join(", ")}. ` +
      "Restart your dev server ('npm run dev') if you recently updated .env.local."
    );
  }
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function getFirebaseApp() {
  if (typeof window === "undefined") return null;
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export async function getFirebaseAuth() {
  if (typeof window === "undefined") return null;
  const app = getFirebaseApp();
  if (!app) return null;
  const { getAuth } = await import("firebase/auth");
  return getAuth(app);
}

export async function getFirebaseDb() {
  if (typeof window === "undefined") return null;
  const app = getFirebaseApp();
  if (!app) return null;
  const { getFirestore } = await import("firebase/firestore");
  return getFirestore(app);
}

// Legacy exports deprecated — use dynamic getters getFirebaseDb() & getFirebaseAuth() instead
export const db = null;
export const auth = null;
export const googleProvider = null;
