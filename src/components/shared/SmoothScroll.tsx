"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";

  // In development, use lighter settings to avoid instant preview issues
  const lenisOptions = isDev
    ? {
        duration: 0.8,
        smoothWheel: true,
        syncTouch: false, // Disable touch sync in dev for better performance
        infinite: false,
      }
    : {
        duration: 1.2,
        smoothWheel: true,
      };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
