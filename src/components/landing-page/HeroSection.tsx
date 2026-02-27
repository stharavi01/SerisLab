"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowRight, X, FileText, Upload } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { landingContent } from "@/data/landing-content";
import { InstantPreview } from "./InstantPreview";
import { useResumePreview } from "@/hooks/usePortfolios";
import { Portfolio } from "@/types/portfolio.types";
import { cn } from "@/lib/utils";

type InputMode = "github" | "resume";
type TemplateName = "modern" | "minimal" | "editorial" | "creative";

export default function HeroSection() {
  const { hero } = landingContent;
  const [inputMode, setInputMode] = useState<InputMode>("github");
  const [showMobileFullscreen, setShowMobileFullscreen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [previewUsername, setPreviewUsername] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resumePortfolio, setResumePortfolio] = useState<Portfolio | null>(
    null,
  );

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateName>("modern");

  const [fullscreenTrigger, setFullscreenTrigger] = useState(0);

  const resumePreviewMutation = useResumePreview();

  const scrollToPreview = useCallback(() => {
    if (window.innerWidth < 1024) {
      setShowMobileFullscreen(true);
    } else {
      setTimeout(() => {
        previewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, []);

  const triggerFullscreen = useCallback(() => {
    setFullscreenTrigger((n) => n + 1);
    scrollToPreview();
  }, [scrollToPreview]);

  const handleGitHubSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!username.trim()) return;
    setPreviewUsername(username.trim());
    triggerFullscreen();
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (!value.trim()) setPreviewUsername("");
  };

  const handleFileSelect = useCallback(
    async (file: File) => {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) return;
      if (file.size > 10 * 1024 * 1024) return;

      setSelectedFile(file);
      triggerFullscreen();

      try {
        const portfolio = await resumePreviewMutation.mutateAsync({
          file,
          template: selectedTemplate,
        });
        setResumePortfolio(portfolio);
      } catch (_) {}
    },

    [resumePreviewMutation, triggerFullscreen, selectedTemplate],
  );

  useEffect(() => {
    if (!selectedFile || resumePreviewMutation.isPending) return;
    resumePreviewMutation
      .mutateAsync({ file: selectedFile, template: selectedTemplate })
      .then(setResumePortfolio)
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) handleFileSelect(files[0]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) handleFileSelect(files[0]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (inputMode === "github" && previewUsername) {
        triggerFullscreen();
      } else if (
        inputMode === "resume" &&
        resumePortfolio &&
        !resumePreviewMutation.isPending
      ) {
        triggerFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    inputMode,
    previewUsername,
    resumePortfolio,
    resumePreviewMutation.isPending,
    triggerFullscreen,
  ]);

  const githubHasData = !!previewUsername;
  const resumeHasData = !!resumePortfolio || resumePreviewMutation.isPending;

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen lg:min-h-[70vh] flex items-center justify-center bg-[hsl(var(--bg-base))] overflow-hidden pb-16 lg:pb-32 pt-20 lg:pt-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="max-w-[1400px] mx-auto relative z-10 px-4 lg:px-8 py-8 lg:pt-20 lg:pb-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-6 lg:mb-8 shadow-sm">
              <Github className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span className="text-sm font-normal text-neutral-600 dark:text-neutral-400">
                Early Access ·{" "}
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  50% Lifetime
                </span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[2.75rem] md:text-6xl lg:text-[4.5rem] leading-[1.15] font-normal tracking-tight mb-7 lg:mb-6 text-[hsl(var(--text-primary))]">
              Your{" "}
              <span className="inline-block min-w-[5.5ch] text-left">
                <TypeAnimation
                  sequence={["GitHub", 2000, "Resume", 2000]}
                  repeat={Infinity}
                  speed={1}
                  deletionSpeed={15}
                  preRenderFirstString
                  className="text-[hsl(var(--accent-sage))]"
                />
              </span>{" "}
              is your portfolio
            </h1>

            <p className="text-lg md:text-xl text-[hsl(var(--text-secondary))] max-w-3xl mx-auto mb-8 lg:mb-10 leading-relaxed px-4 sm:px-6 lg:px-0">
              We turn your GitHub or resume into a living portfolio that grows
              with you.{" "}
              <span className="text-[hsl(var(--accent-sage))] font-medium">
                Build once. Sync forever. Edit anytime.
              </span>{" "}
              <span className="text-[hsl(var(--text-secondary))]">
                {hero.text}
              </span>
            </p>

            {/* Mode Toggle */}
            <div className="max-w-lg mx-auto mb-5">
              <div className="inline-flex items-center p-1 rounded-xl bg-[hsl(var(--bg-subtle))] border border-[hsl(var(--card-border))]">
                <button
                  type="button"
                  onClick={() => setInputMode("github")}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                    inputMode === "github"
                      ? "text-[hsl(var(--text-primary))] bg-[hsl(var(--bg-base))] shadow-sm"
                      : "text-[hsl(var(--text-tertiary))] hover:text-[hsl(var(--text-secondary))]",
                  )}
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("resume")}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                    inputMode === "resume"
                      ? "text-[hsl(var(--text-primary))] bg-[hsl(var(--bg-base))] shadow-sm"
                      : "text-[hsl(var(--text-tertiary))] hover:text-[hsl(var(--text-secondary))]",
                  )}
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="max-w-lg mx-auto mb-6 lg:mb-5">
              <AnimatePresence mode="wait">
                {/* ── GitHub input ── */}
                {inputMode === "github" && (
                  <motion.div
                    key="github-input"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-[hsl(var(--accent-sage))]/15 via-[hsl(var(--accent-sage))]/8 to-[hsl(var(--accent-sage))]/15 rounded-2xl blur-md opacity-50" />
                      <div className="relative flex items-center bg-[hsl(var(--bg-base))] border border-[hsl(var(--card-border))] rounded-2xl shadow-lg overflow-hidden">
                        <div className="pl-5 lg:pl-6 pr-3">
                          <Github className="w-5 h-5 text-[hsl(var(--text-muted))]" />
                        </div>
                        <input
                          type="text"
                          value={username}
                          onChange={handleUsernameChange}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleGitHubSubmit();
                          }}
                          placeholder={hero.cta.inputPlaceholder}
                          className="flex-1 bg-transparent py-4 lg:py-3.5 pr-2 text-base font-normal text-[hsl(var(--text-primary))] placeholder:text-[hsl(var(--text-muted))] focus:outline-none"
                        />
                        <button
                          onClick={
                            githubHasData && username.trim() === previewUsername
                              ? triggerFullscreen
                              : handleGitHubSubmit
                          }
                          disabled={!username.trim()}
                          className="m-1.5 p-3 lg:p-2.5 bg-[hsl(var(--btn-primary-bg))] text-white rounded-full font-semibold flex items-center justify-center hover:bg-[hsl(var(--btn-primary-hover))] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                          title={hero.cta.buttonText}
                        >
                          <ArrowRight className="w-5 h-5 -rotate-45" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-[hsl(var(--text-tertiary))] mt-3.5 lg:mt-3 text-center font-normal">
                      {githubHasData
                        ? "Click → or press Enter to view preview again"
                        : "Watch AI transform your GitHub into a portfolio"}
                    </p>
                  </motion.div>
                )}

                {/* ── Resume input ── */}
                {inputMode === "resume" && (
                  <motion.div
                    key="resume-input"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={cn(
                        "relative rounded-2xl transition-all duration-200 border-2 border-dashed",
                        isDragging
                          ? "border-[hsl(var(--accent-sage))] bg-[hsl(var(--accent-sage))]/5"
                          : selectedFile && !resumePreviewMutation.isError
                            ? "border-[hsl(var(--accent-sage))]/30 bg-[hsl(var(--accent-sage))]/5"
                            : "border-[hsl(var(--card-border))] hover:border-[hsl(var(--accent-sage))]/50 cursor-pointer",
                        resumePreviewMutation.isPending &&
                          "pointer-events-none",
                      )}
                      onClick={() =>
                        !resumePreviewMutation.isPending &&
                        fileInputRef.current?.click()
                      }
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {isDragging && (
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-[hsl(var(--accent-sage))]/20 via-[hsl(var(--accent-sage))]/10 to-[hsl(var(--accent-sage))]/20 rounded-2xl blur-md" />
                      )}

                      <div className="relative px-6 py-8 cursor-pointer">
                        {selectedFile ? (
                          <div className="flex flex-col items-center gap-3">
                            <div
                              className={cn(
                                "p-3 rounded-xl transition-colors",
                                resumePreviewMutation.isPending
                                  ? "bg-[hsl(var(--bg-subtle))]"
                                  : "bg-[hsl(var(--accent-sage))]/10",
                              )}
                            >
                              <FileText
                                className={cn(
                                  "w-6 h-6 transition-colors",
                                  resumePreviewMutation.isPending
                                    ? "text-[hsl(var(--text-muted))]"
                                    : "text-[hsl(var(--accent-sage))]",
                                )}
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium text-[hsl(var(--text-primary))] truncate max-w-[280px]">
                                {selectedFile.name}
                              </p>
                              <p className="text-xs text-[hsl(var(--text-tertiary))] mt-1">
                                {resumePreviewMutation.isPending
                                  ? "Processing your resume…"
                                  : resumePreviewMutation.isError
                                    ? "Click to try again"
                                    : resumePortfolio
                                      ? "Press Enter or click → to view again"
                                      : "Click to upload a different file"}
                              </p>
                            </div>
                            {resumePortfolio &&
                              !resumePreviewMutation.isPending && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    triggerFullscreen();
                                  }}
                                  className="m-1.5 p-3 lg:p-2.5 bg-[hsl(var(--btn-primary-bg))] text-white rounded-full font-semibold flex items-center justify-center hover:bg-[hsl(var(--btn-primary-hover))] transition-all shadow-md"
                                  title="View portfolio preview"
                                >
                                  <ArrowRight className="w-5 h-5 -rotate-45" />
                                </button>
                              )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 rounded-xl bg-[hsl(var(--bg-subtle))]">
                              <Upload className="w-6 h-6 text-[hsl(var(--text-muted))]" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium text-[hsl(var(--text-primary))]">
                                {isDragging
                                  ? "Drop your resume here"
                                  : "Drop resume or click to upload"}
                              </p>
                              <p className="text-xs text-[hsl(var(--text-tertiary))] mt-1">
                                PDF or DOCX, max 10MB
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.docx"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </div>

                    <p className="text-sm text-[hsl(var(--text-tertiary))] mt-3.5 lg:mt-3 text-center font-normal">
                      {resumeHasData
                        ? resumePortfolio
                          ? "Click → or press Enter to view preview again"
                          : "AI is building your portfolio…"
                        : "AI extracts your experience and builds a portfolio"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Feature list */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 lg:gap-y-2 text-sm text-[hsl(var(--text-secondary))] px-4 font-normal">
              {hero.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-sage))]" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile fullscreen overlay ── */}
      <AnimatePresence>
        {showMobileFullscreen && (previewUsername || resumeHasData) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-[hsl(var(--bg-base))] lg:hidden overflow-y-auto overflow-x-hidden"
          >
            <button
              onClick={() => setShowMobileFullscreen(false)}
              className="fixed top-3 right-16 z-[10000] flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all shadow-sm"
            >
              <X className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>

            <div className="w-full">
              <InstantPreview
                username={previewUsername}
                resumePortfolio={resumePortfolio}
                isResumeLoading={resumePreviewMutation.isPending}
                resumeError={resumePreviewMutation.error as Error | null}
                mode={inputMode}
                isMobileFullscreen={true}
                fullscreenTrigger={fullscreenTrigger}
                template={selectedTemplate}
                onTemplateChange={(t) => setSelectedTemplate(t as TemplateName)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop preview (hidden on mobile) ── */}
      <div ref={previewRef} className="hidden lg:block">
        <InstantPreview
          username={previewUsername}
          resumePortfolio={resumePortfolio}
          isResumeLoading={resumePreviewMutation.isPending}
          resumeError={resumePreviewMutation.error as Error | null}
          mode={inputMode}
          fullscreenTrigger={fullscreenTrigger}
          template={selectedTemplate}
          onTemplateChange={(t) => setSelectedTemplate(t as TemplateName)}
        />
      </div>
    </>
  );
}
