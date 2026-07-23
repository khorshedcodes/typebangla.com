"use client";

import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { InstituteProvider } from "../context/InstituteContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <InstituteProvider>{children}</InstituteProvider>
    </AuthProvider>
  );
}

