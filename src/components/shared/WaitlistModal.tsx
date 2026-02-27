"use client";

import { useState } from "react";
import { useWaitlistStore } from "@/stores/waitlist.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Mail,
  Loader2,
  Check,
  Users,
  Globe,
  Link2,
  EyeOff,
  BarChart2,
} from "lucide-react";
import { joinWaitlist } from "@/services/common.service";
import { WaitlistSchema, WaitlistSchemaType } from "@/schemas/common.schemas";
import Image from "next/image";

const SOURCE_HEADLINES: Record<string, string> = {
  "publish-limit": "Unlock Unlimited Public Portfolios",
  "custom-domain": "Unlock Custom Domains",
  "custom-subdomain": "Get Your Custom Subdomain",
  "remove-branding": "Remove the Serislab Badge",
  "github-sync": "Enable GitHub Auto-sync",
  "advanced-analytics": "Unlock Advanced Analytics",
  "pdf-export": "Export Your Portfolio as PDF",
  "auto-sync": "Enable GitHub Auto-sync",
};

const SOURCE_COPY: Record<string, { subtitle: string }> = {
  "publish-limit": {
    subtitle:
      "Free plan includes 1 public portfolio. Upgrade to Pro to publish this one — and as many as you want.",
  },
  "custom-subdomain": {
    subtitle:
      "Get yourname.serislab.com to stand out with a personal, memorable URL.",
  },
  "remove-branding": {
    subtitle:
      "Make your portfolio fully yours — no Serislab badge, no footnotes.",
  },
  "github-sync": {
    subtitle:
      "Free plan syncs manually. Pro keeps your portfolio up to date automatically on every push.",
  },
  "advanced-analytics": {
    subtitle:
      "See the full breakdown — countries, devices, referrers, engagement depth, and more.",
  },
  "pdf-export": {
    subtitle:
      "Download a clean, print-ready resume PDF from your portfolio in one click.",
  },
  "auto-sync": {
    subtitle:
      "Free plan syncs manually. Pro automatically updates your portfolio whenever you push to GitHub.",
  },
};

const PRO_FEATURES = [
  { icon: Globe, label: "Unlimited public portfolios" },
  { icon: Link2, label: "Custom subdomain" },
  { icon: EyeOff, label: "Remove Serislab badge" },
  { icon: BarChart2, label: "Advanced analytics" },
];

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
  source?: string;
}

export default function WaitlistModal({
  open,
  onClose,
  source,
}: WaitlistModalProps) {
  const { setOpen: setWaitlistOpen, source: storeSource } = useWaitlistStore();
  const effectiveSource = source ?? storeSource ?? "landing-page";
  const isProSource = effectiveSource in SOURCE_COPY;
  const headline =
    SOURCE_HEADLINES[effectiveSource] ?? "Lock In Your Beta Discount";
  const description = isProSource
    ? SOURCE_COPY[effectiveSource].subtitle
    : "When Pro launches Q2 2026, your price is locked at 50% off forever. Once 200 spots are claimed, this offer closes.";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistSchemaType>({
    resolver: zodResolver(WaitlistSchema),
    mode: "onSubmit",
  });

  if (!open) return null;

  const onSubmit = async (values: WaitlistSchemaType) => {
    setLoading(true);
    try {
      await joinWaitlist(values.email, effectiveSource);
      setSuccess(true);
      reset();
    } catch (err: any) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err?.message || "";
      if (status === 409 || msg.toLowerCase().includes("already")) {
        setSuccess(true);
        reset();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setWaitlistOpen(false);
    setSuccess(false);
    reset();
    onClose();
  };

  return (
    <div className="app-landing">
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
        onClick={handleClose}
      >
        <div
          className="bg-[hsl(var(--card-bg))] border border-[hsl(var(--card-border))] rounded-3xl max-w-lg w-full relative animate-in zoom-in-95 duration-200 overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--accent-sage))]/5 via-transparent to-[hsl(var(--accent-purple))]/5 opacity-50 pointer-events-none" />

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-70 z-10 bg-[hsl(var(--bg-muted))] text-[hsl(var(--text-tertiary))]"
            aria-label="Close"
          >
            <X size={18} strokeWidth={2.5} />
          </button>

          <div className="p-10 flex flex-col items-center justify-center min-h-[420px] relative">
            {success ? (
              <div className="flex flex-col items-center justify-center w-full animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-[hsl(var(--accent-sage))]/10 shadow-lg shadow-[hsl(var(--accent-sage))]/20">
                  <Check
                    size={40}
                    strokeWidth={3}
                    className="text-[hsl(var(--accent-sage))]"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-3 text-center text-[hsl(var(--text-primary))]">
                  You're in! Your beta discount is locked.
                </h2>
                <div className="inline-block mb-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-[hsl(var(--accent-sage))]/10 text-[hsl(var(--accent-sage))] border border-[hsl(var(--accent-sage))]/20">
                  50% Off — Locked Forever
                </div>
                <p className="text-sm text-center mb-8 max-w-xs leading-relaxed text-[hsl(var(--text-secondary))]">
                  When Pro launches, you'll pay 50% less than everyone else —
                  forever. We'll email you the exact price and your personal
                  activation link.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3.5 rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2 text-sm hover:scale-105 active:scale-95 bg-[hsl(var(--btn-primary-bg))] hover:bg-[hsl(var(--btn-primary-hover))] text-[hsl(var(--btn-primary-text))]"
                >
                  Got it!
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center mb-6 rounded-lg w-10 h-10 sm:w-12 sm:h-12 shadow-sm bg-gray-50 dark:bg-gray-100">
                  <Image
                    src="/logo.svg"
                    alt="SerisLab Icon"
                    width={28}
                    height={28}
                    className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px]"
                  />
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-3 text-[hsl(var(--text-primary))]">
                    {headline}
                  </h2>
                  <div className="inline-block mb-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-[hsl(var(--accent-sage))]/10 text-[hsl(var(--accent-sage))] border border-[hsl(var(--accent-sage))]/20">
                    Beta Access — 50% Off Forever
                  </div>
                  <p className="text-sm max-w-sm mx-auto leading-relaxed text-[hsl(var(--text-secondary))]">
                    {description}
                  </p>
                </div>

                {isProSource && (
                  <div className="grid grid-cols-2 gap-2 mb-6 w-full">
                    {PRO_FEATURES.map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[hsl(var(--bg-muted))] border border-[hsl(var(--card-border))]"
                      >
                        <Icon
                          size={13}
                          className="text-[hsl(var(--accent-sage))] shrink-0"
                        />
                        <span className="text-xs text-[hsl(var(--text-secondary))] leading-tight">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[hsl(var(--text-tertiary))]">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-0 bg-white text-[hsl(var(--text-primary))] dark:text-black placeholder:text-[hsl(var(--text-tertiary))] dark:placeholder:text-gray-500 ${
                        errors.email
                          ? "border-[hsl(var(--error))] focus:ring-[hsl(var(--error))]/30"
                          : "border-[hsl(var(--card-border))] focus:border-[hsl(var(--accent-purple))] focus:ring-[hsl(var(--accent-purple))]/30"
                      }`}
                      disabled={loading}
                      autoComplete="email"
                      autoFocus
                    />
                    {errors.email && (
                      <p className="mt-2 text-xs font-medium text-[hsl(var(--error))]">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm group bg-[hsl(var(--btn-primary-bg))] hover:bg-[hsl(var(--btn-primary-hover))] text-[hsl(var(--btn-primary-text))]"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                          strokeWidth={1.2}
                        />
                        <span>Joining...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover:translate-x-1 transition-transform"
                        >
                          <path d="M10 14l11 -11"></path>
                          <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
                        </svg>
                        <span>Join the waitlist</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Spot counter */}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[hsl(var(--text-tertiary))]">
                  <Users size={13} />
                  <span>147 of 200 beta spots remaining</span>
                </div>

                <div className="mt-6 pt-5 border-t border-[hsl(var(--card-border))] flex items-center justify-center gap-4 text-xs w-full">
                  <a
                    href="/terms"
                    className="transition-all hover:opacity-70 hover:underline text-[hsl(var(--text-tertiary))]"
                  >
                    Terms
                  </a>
                  <span className="text-[hsl(var(--neutral-300))]">•</span>
                  <a
                    href="/privacy"
                    className="transition-all hover:opacity-70 hover:underline text-[hsl(var(--text-tertiary))]"
                  >
                    Privacy Policy
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
