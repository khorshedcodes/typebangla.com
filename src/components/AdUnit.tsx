"use client";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdUnit({}: AdUnitProps) {
  // Redesign requirement: hide all ads for a distraction-free and premium experience.
  return null;
}
