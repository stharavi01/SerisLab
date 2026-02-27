"use client";

import { getGitHubSteps, getResumeSteps } from "@/data/terminal-steps";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface PreviewLoadingStateProps {
  variant?: "desktop" | "mobile";
  username?: string;
  isResume?: boolean;
}

interface CompletedStep {
  id: string;
  command: string;
  output?: string;
}

// Keep only the last N completed steps visible so the terminal doesn't grow forever
const MAX_VISIBLE_STEPS = 4;

// Commands type like a human (~60ms/char). Output appears instantly — servers respond fast.
const COMMAND_TYPING_SPEED = 60;

export function PreviewLoadingState({
  variant = "desktop",
  username,
  isResume = false,
}: PreviewLoadingStateProps) {
  const isMobile = variant === "mobile";
  const steps = isResume ? getResumeSteps() : getGitHubSteps(username);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const [typingCommand, setTypingCommand] = useState("");
  // "typing"  → typing the command char by char
  // "waiting" → command done, output visible, counting down to next step
  const [phase, setPhase] = useState<"typing" | "waiting">("typing");
  const [completedSteps, setCompletedSteps] = useState<CompletedStep[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;
  const stepLabel = currentStepIndex + 1;

  // Scroll to bottom whenever new content appears
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [completedSteps, typingCommand, phase]);

  useEffect(() => {
    if (!currentStep) return;
    let timerId: NodeJS.Timeout;

    if (phase === "typing") {
      if (typingCommand.length < currentStep.command.length) {
        // Add next character
        timerId = setTimeout(() => {
          setTypingCommand(
            currentStep.command.slice(0, typingCommand.length + 1),
          );
        }, COMMAND_TYPING_SPEED);
      } else {
        // Command fully typed → short pause before output appears (simulates round-trip)
        timerId = setTimeout(() => setPhase("waiting"), 220);
      }
    } else if (phase === "waiting") {
      // Output is already visible; wait the step's read-time then advance
      timerId = setTimeout(() => {
        setCompletedSteps((prev) => {
          const next: CompletedStep = {
            id: `${currentStep.id}-${loopCount}`,
            command: currentStep.command,
            output: currentStep.output,
          };
          const updated = [...prev, next];
          return updated.length > MAX_VISIBLE_STEPS
            ? updated.slice(-MAX_VISIBLE_STEPS)
            : updated;
        });

        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((i) => i + 1);
        } else {
          setCurrentStepIndex(0);
          setLoopCount((l) => l + 1);
        }

        setTypingCommand("");
        setPhase("typing");
      }, currentStep.pauseAfter);
    }

    return () => clearTimeout(timerId);
  }, [
    currentStep,
    phase,
    typingCommand,
    currentStepIndex,
    steps.length,
    loopCount,
  ]);

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 ${
        isMobile ? "min-h-[72vh] px-4 py-10" : "h-full p-6 lg:p-10"
      }`}
    >
      <div className={`w-full ${isMobile ? "max-w-sm" : "max-w-xl"}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="bg-neutral-900 dark:bg-neutral-950 rounded-xl shadow-2xl overflow-hidden border border-neutral-700/60"
        >
          {/* Terminal header */}
          <div className="bg-neutral-800/80 dark:bg-neutral-900 px-4 py-2.5 flex items-center gap-2 border-b border-neutral-700/50">
            <div className="flex gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 min-w-0 text-center">
              <span className="text-xs text-neutral-500 font-mono truncate">
                {isResume
                  ? "resume → portfolio"
                  : username
                    ? `github.com/${username}`
                    : "portfolio builder"}
              </span>
            </div>
            {/* Step counter: tells the user something is actually happening */}
            <span className="text-xs text-neutral-600 font-mono tabular-nums shrink-0">
              {stepLabel}/{totalSteps}
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={contentRef}
            className={`font-mono overflow-y-auto scroll-smooth ${
              isMobile
                ? "text-[11px] h-[260px] p-3"
                : "text-xs h-[360px] p-5 sm:text-sm"
            }`}
          >
            {/* Completed steps — dimmed so active step stands out */}
            {completedSteps.map((step) => (
              <div key={step.id} className="mb-4 opacity-50">
                <div className="flex items-baseline gap-2">
                  <span className="text-neutral-500 shrink-0 select-none">
                    $
                  </span>
                  <span className="text-neutral-400">{step.command}</span>
                </div>
                {step.output && (
                  <div className="mt-0.5 ml-[18px] text-emerald-500/70">
                    {step.output}
                  </div>
                )}
              </div>
            ))}

            {/* Active step */}
            {currentStep && (
              <div className="mb-3">
                {/* Command line — bright while typing */}
                <div className="flex items-baseline gap-2">
                  <span className="text-emerald-400 shrink-0 select-none">
                    $
                  </span>
                  <span className="text-neutral-200 break-all">
                    {typingCommand}
                    {phase === "typing" && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.55,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "linear",
                        }}
                        className="inline-block w-[5px] h-[0.9em] bg-emerald-400 ml-[2px] align-middle"
                      />
                    )}
                  </span>
                </div>

                {/* Output — pops in instantly once command is done */}
                {phase === "waiting" && currentStep.output && (
                  <motion.div
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.12 }}
                    className="mt-0.5 ml-[18px] text-emerald-400"
                  >
                    {currentStep.output}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
