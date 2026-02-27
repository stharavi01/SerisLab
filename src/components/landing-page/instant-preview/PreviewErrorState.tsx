"use client";

import { motion } from "framer-motion";
import { AlertCircle, FileX } from "lucide-react";
import Link from "next/link";

interface PreviewErrorStateProps {
  variant?: "desktop" | "mobile";
  username?: string;
  error?: Error | null;
  isResume?: boolean;
}

export function PreviewErrorState({
  variant = "desktop",
  username,
  error,
  isResume = false,
}: PreviewErrorStateProps) {
  const isMobile = variant === "mobile";

  // Extract user-friendly error message
  const errorMessage =
    (error as any)?.userMessage ||
    error?.message ||
    (isResume
      ? "We couldn't process your resume. Please try again."
      : "We couldn't load this portfolio.");

  // Check for rate limit error
  const isRateLimited =
    errorMessage.includes("limit reached") ||
    (error as any)?.response?.status === 403;

  return (
    <div className="h-full flex items-center justify-center p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`text-center ${isMobile ? "max-w-xs" : "max-w-md"}`}
      >
        {/* Error Icon */}
        <div
          className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mx-auto mb-4`}
        >
          {isResume ? (
            <FileX
              className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} text-neutral-400`}
            />
          ) : (
            <AlertCircle
              className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} text-neutral-400`}
            />
          )}
        </div>

        {/* Error Message */}
        <h3
          className={`${isMobile ? "text-base" : "text-xl"} font-bold text-neutral-900 dark:text-neutral-50 mb-2`}
        >
          {isRateLimited
            ? "Preview Limit Reached"
            : isResume
              ? "Couldn't Process Resume"
              : "No Portfolio Found"}
        </h3>
        <p
          className={`${isMobile ? "text-xs" : "text-sm"} text-neutral-600 dark:text-neutral-400 mb-${isMobile ? "4" : "6"}`}
        >
          {isRateLimited ? (
            <>
              You've reached the preview limit. Sign in for unlimited
              portfolios.
            </>
          ) : isResume ? (
            errorMessage
          ) : username ? (
            <>
              User "<span className="font-medium">{username}</span>" doesn't
              have a public portfolio yet.
            </>
          ) : (
            errorMessage
          )}
        </p>

        {/* CTA Button (Desktop only) */}
        {!isMobile && (
          <a
            href="https://serislab.com/auth/signup"
            className="inline-block px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            {isRateLimited ? "Sign In to Continue" : "Create Your Own"}
          </a>
        )}
      </motion.div>
    </div>
  );
}
