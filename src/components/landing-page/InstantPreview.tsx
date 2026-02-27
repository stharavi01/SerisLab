"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { usePortfolioPreview } from "@/hooks/usePortfolios";
import { Portfolio } from "@/types/portfolio.types";
import { ShareModal } from "@/components/shared/ShareModal";
import { useShare } from "@/hooks/utility/useShare";
import { cn } from "@/lib/utils";
import {
  MacBookMockup,
  PortfolioContent,
  PreviewErrorState,
  PreviewLoadingState,
} from "./instant-preview";

type PreviewMode = "github" | "resume";

const TEMPLATES = [
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
  { id: "editorial", label: "Editorial" },
  { id: "creative", label: "Creative" },
] as const;

interface InstantPreviewProps {
  username?: string;
  resumePortfolio?: Portfolio | null;
  isResumeLoading?: boolean;
  resumeError?: Error | null;
  mode?: PreviewMode;
  isMobileFullscreen?: boolean;
  fullscreenTrigger?: number;
  template?: string;
  onTemplateChange?: (template: string) => void;
}

export function InstantPreview({
  username = "",
  resumePortfolio,
  isResumeLoading = false,
  resumeError,
  mode = "github",
  isMobileFullscreen = false,
  fullscreenTrigger = 0,
  template,
  onTemplateChange,
}: InstantPreviewProps) {
  const [autoFullscreen, setAutoFullscreen] = useState(false);
  const [pendingFullscreen, setPendingFullscreen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const lastHandledTriggerRef = useRef(0);

  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const { share, isSharing, isSupported } = useShare();

  const handlePublish = () => { window.location.href = "https://serislab.com/auth/signin"; };

  const {
    data: githubPortfolio,
    isLoading: isGithubLoading,
    error: githubError,
  } = usePortfolioPreview(mode === "github" ? username : "", template);

  const portfolio = mode === "resume" ? resumePortfolio : githubPortfolio;
  const isLoading = mode === "resume" ? isResumeLoading : isGithubLoading;
  const error = mode === "resume" ? resumeError : githubError;
  const displayName =
    mode === "resume"
      ? resumePortfolio?.customData?.hero?.name || "Your Portfolio"
      : username;
  const hasInput =
    mode === "resume" ? !!resumePortfolio || isResumeLoading : !!username;

  // Fire fullscreen when trigger increments; defer if data not ready yet
  useEffect(() => {
    if (fullscreenTrigger <= 0) return;
    if (fullscreenTrigger === lastHandledTriggerRef.current) return;
    lastHandledTriggerRef.current = fullscreenTrigger;
    if (portfolio && !isLoading) {
      setAutoFullscreen(true);
    } else {
      setPendingFullscreen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullscreenTrigger]);

  // Open fullscreen once pending data arrives
  useEffect(() => {
    if (pendingFullscreen && portfolio && !isLoading) {
      setPendingFullscreen(false);
      setAutoFullscreen(true);
    }
  }, [pendingFullscreen, portfolio, isLoading]);

  // Reset autoFullscreen after MacBookMockup consumes it
  useEffect(() => {
    if (autoFullscreen) {
      const id = setTimeout(() => setAutoFullscreen(false), 100);
      return () => clearTimeout(id);
    }
  }, [autoFullscreen]);

  const handleShare = async () => {
    if (!portfolio) return;
    const shareUrl = `${window.location.origin}/portfolio/preview`;

    if (isSupported) {
      await share({
        title: portfolio.title || "Portfolio Preview",
        text: "Check out this portfolio preview",
        url: shareUrl,
      });
    } else {
      setIsShareModalOpen(true);
    }
  };

  const renderContent = () => {
    if (!hasInput && !isLoading) {
      const editorImage =
        resolvedTheme === "dark"
          ? "/images/dark-editor.png"
          : "/images/light-editor.png";

      return (
        <PortfolioContent
          portfolio={null}
          isInitialState={true}
          screenshotPath={editorImage}
        />
      );
    }
    if (isLoading) {
      return (
        <PreviewLoadingState
          variant={isMobileFullscreen ? "mobile" : "desktop"}
          username={displayName}
          isResume={mode === "resume"}
        />
      );
    }
    if (error && !portfolio) {
      return (
        <PreviewErrorState
          variant={isMobileFullscreen ? "mobile" : "desktop"}
          username={displayName}
          error={error}
          isResume={mode === "resume"}
        />
      );
    }
    if (portfolio) {
      return <PortfolioContent portfolio={portfolio} />;
    }
    return null;
  };

  if (isMobileFullscreen) {
    return (
      <div className="relative min-h-screen">
        <div className="w-full">{renderContent()}</div>

        {/* Template switcher */}
        <AnimatePresence>
          {portfolio && !isLoading && onTemplateChange && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000]"
            >
              <div className="inline-flex items-center p-1 rounded-xl bg-[hsl(var(--bg-base))]/95 backdrop-blur-sm border border-[hsl(var(--card-border))] shadow-xl">
                {TEMPLATES.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onTemplateChange(id)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                      template === id
                        ? "text-[hsl(var(--accent-sage))] bg-[hsl(var(--accent-sage))]/10 shadow-sm"
                        : "text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section className="relative -mt-20 pb-20 bg-white dark:bg-neutral-950 py-32">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Plain div — no transform, so the fixed fullscreen overlay in
            MacBookMockup positions correctly against the viewport */}
        <div className="relative max-w-6xl mx-auto">
          <MacBookMockup
            username={displayName || "demo"}
            autoFullscreen={autoFullscreen}
            canFullscreen={!!portfolio}
            onPublish={portfolio ? handlePublish : undefined}
            onFullscreenChange={(isFs) => {
              if (!isFs) {
                setAutoFullscreen(false);
                setPendingFullscreen(false);
              }
            }}
            toolbar={
              portfolio && !isLoading && onTemplateChange ? (
                <div className="inline-flex items-center p-1 rounded-xl bg-[hsl(var(--bg-base))]/95 backdrop-blur-sm border border-[hsl(var(--card-border))] shadow-xl">
                  {TEMPLATES.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onTemplateChange(id)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                        template === id
                          ? "text-[hsl(var(--accent-sage))] bg-[hsl(var(--accent-sage))]/10 shadow-sm"
                          : "text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ) : undefined
            }
          >
            {renderContent()}
          </MacBookMockup>
        </div>

        {portfolio && (
          <ShareModal
            open={isShareModalOpen}
            onOpenChange={setIsShareModalOpen}
            url={`${typeof window !== "undefined" ? window.location.origin : ""}/portfolio/preview`}
            title={portfolio.title || "Portfolio Preview"}
            description="Share this portfolio preview"
          />
        )}
      </div>
    </section>
  );
}
