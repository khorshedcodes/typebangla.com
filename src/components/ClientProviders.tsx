"use client";

import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { InstituteProvider } from "../context/InstituteContext";
import GlobalAnnouncementModal from "./GlobalAnnouncementModal";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <InstituteProvider>
        {children}
        <GlobalAnnouncementModal />
      </InstituteProvider>
    </AuthProvider>
  );
}

