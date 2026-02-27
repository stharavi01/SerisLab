"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, Maximize2, X } from "lucide-react";
import {
  scaleInPerspective,
  slowSmoothTransition,
  mockupViewport,
} from "@/lib/animations";

interface MacBookMockupProps {
  children: ReactNode;
  username?: string;
  className?: string;
  autoFullscreen?: boolean;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  canFullscreen?: boolean;
  toolbar?: ReactNode;
  onPublish?: () => void;
}

export function MacBookMockup({
  children,
  username,
  className = "",
  autoFullscreen = false,
  onFullscreenChange,
  canFullscreen = false,
  toolbar,
  onPublish,
}: MacBookMockupProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prevAutoFullscreenRef = useRef(false);
  const enterFullscreen = useCallback(() => {
    setIsFullscreen(true);
    onFullscreenChange?.(true);
  }, [onFullscreenChange]);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
    onFullscreenChange?.(false);
  }, [onFullscreenChange]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.setAttribute("data-lenis-prevent", "true");
    } else {
      document.body.removeAttribute("data-lenis-prevent");
    }
    return () => {
      document.body.removeAttribute("data-lenis-prevent");
    };
  }, [isFullscreen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Escape" && isFullscreen) exitFullscreen();
      if (e.key === "Enter" && !isFullscreen && canFullscreen)
        enterFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFullscreen, canFullscreen, enterFullscreen, exitFullscreen]);

  useEffect(() => {
    if (autoFullscreen && !prevAutoFullscreenRef.current) {
      prevAutoFullscreenRef.current = true;
      enterFullscreen();
    } else if (!autoFullscreen) {
      prevAutoFullscreenRef.current = false;
    }
  }, [autoFullscreen, enterFullscreen]);

  return (
    <>
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            key="fs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="fixed inset-0 z-[9999] bg-white dark:bg-neutral-950 overflow-y-auto overflow-x-hidden"
            data-lenis-prevent
          >
            {/* Unified top bar — Exit · URL · Publish */}
            <div className="sticky top-0 z-[10000] h-11 flex items-center justify-between gap-3 px-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800">
              {/* Left: exit */}
              <button
                onClick={exitFullscreen}
                className="flex items-center gap-1.5 h-7 px-2.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-all text-xs font-medium shrink-0"
                aria-label="Exit fullscreen"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit Preview</span>
              </button>

              {/* Center: URL pill — hidden on mobile to avoid crowding */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 h-7 bg-neutral-100 dark:bg-neutral-800 rounded-md min-w-0 max-w-[260px] w-full">
                <svg
                  className="w-3 h-3 text-neutral-400 dark:text-neutral-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono truncate">
                  serislab.com/{username || "demo"}
                </span>
              </div>

              {/* Right: description + publish CTA */}
              {onPublish ? (
                <div className="flex items-center gap-2.5 shrink-0">
                  {/* Description: two-line label, desktop only */}
                  <span className="hidden md:block text-[11px] text-neutral-400 dark:text-neutral-500 whitespace-nowrap leading-tight text-right">
                    Get a shareable
                    <br />
                    live link
                  </span>
                  <button
                    onClick={onPublish}
                    className="flex items-center gap-1.5 h-7 px-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all group bg-white dark:bg-neutral-900"
                  >
                    {/* On mobile: longer label carries the context */}
                    <span className="sm:hidden">Publish your portfolio</span>
                    <span className="hidden sm:inline">Publish</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ) : (
                <div className="hidden sm:block w-[72px] shrink-0" />
              )}
            </div>

            <div className="w-full">{children}</div>

            {toolbar && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000]">
                {toolbar}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`relative ${className} ${isFullscreen ? "invisible" : ""}`}
        variants={scaleInPerspective}
        initial="hidden"
        whileInView="visible"
        viewport={mockupViewport}
        transition={slowSmoothTransition}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-b-xl z-10 flex items-center justify-center"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={mockupViewport}
          transition={{ ...slowSmoothTransition, delay: 0.3 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        </motion.div>

        <div className="relative bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 rounded-2xl p-3 shadow-2xl">
          <div className="relative bg-neutral-100 dark:bg-neutral-900 rounded-t-xl px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div className="flex items-center gap-2">
                {canFullscreen && onPublish && (
                  <button
                    onClick={onPublish}
                    className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:shadow-sm transition-all group"
                  >
                    Publish
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
                {canFullscreen && (
                  <button
                    onClick={enterFullscreen}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-lg transition-colors group"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200" />
                    <span className="text-xs text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 hidden sm:inline">
                      Fullscreen
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-64 px-3 py-1.5 bg-white dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="flex mt-2 items-center  justify-center gap-2">
                  <svg
                    className="w-3 h-3 text-neutral-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                    serislab.com/{username || "demo"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative bg-white dark:bg-neutral-950 overflow-hidden"
            style={{ aspectRatio: "17/10" }}
          >
            <div
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              data-lenis-prevent
              onWheelCapture={(e) => e.stopPropagation()}
            >
              {!isFullscreen && children}
            </div>
          </div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={mockupViewport}
          transition={{ ...slowSmoothTransition, delay: 0.4 }}
        >
          <div className="h-1 bg-gradient-to-b from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800" />
          <div className="h-6 bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-500 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 -mx-16 rounded-b-3xl shadow-2xl" />
        </motion.div>
      </motion.div>
    </>
  );
}
