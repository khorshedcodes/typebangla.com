"use client";

import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA_AB3U1QSh_ikTwUr0Sh9Te8hk4NrCaXQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-4489913213-ea5ac.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-4489913213-ea5ac",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "studio-4489913213-ea5ac.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "438531754293",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:438531754293:web:e064f7b5c5df95c3fc647c"
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

export const db = null as any;
export const auth = null as any;
export const googleProvider = null as any;
