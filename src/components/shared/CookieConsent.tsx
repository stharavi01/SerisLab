"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "cookie_consent";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (acceptAnalytics: boolean) => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        analytics: acceptAnalytics,
        timestamp: new Date().toISOString(),
      }),
    );
    setShowBanner(false);

    if (acceptAnalytics) {
      console.log("Analytics consent granted");
    }
  };

  const handleAcceptAll = () => saveConsent(true);
  const handleRejectNonEssential = () => saveConsent(false);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <Cookie className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                  We use cookies
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  We use <strong>essential cookies</strong> for authentication
                  and portfolio analytics (so owners can see their stats).{" "}
                  <strong>Optional cookies</strong> help us improve with Google
                  Analytics.{" "}
                  <Link
                    href="/cookies"
                    className="underline text-primary hover:text-primary/80"
                  >
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRejectNonEssential}
            >
              Reject Optional
            </Button>
            <Button size="sm" onClick={handleAcceptAll}>
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to check if user has consented to analytics
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed.analytics === true;
  } catch {
    return false;
  }
}
