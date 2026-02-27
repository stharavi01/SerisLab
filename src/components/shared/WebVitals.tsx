"use client";

import { useReportWebVitals } from "next/web-vitals";
import { event } from "@/lib/gtag";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to Google Analytics 4 (if user has consented)
    event({
      action: metric.name,
      category: "Web Vitals",
      label: metric.id,
      value: Math.round(metric.value),
    });

    // Log in development for debugging
    if (process.env.NODE_ENV === "development") {
      console.log("Web Vital:", {
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
      });
    }
  });

  return null;
}
