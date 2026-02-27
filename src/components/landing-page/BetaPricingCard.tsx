import React from "react";
import { useWaitlistStore } from "@/stores/waitlist.store";
import { useRouter } from "next/navigation";
import { BetaPlan } from "../../data/beta-pricing-data";
import { CheckCircle2, Lock, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface BetaPricingCardProps {
  plan: BetaPlan;
  showAllFeatures: boolean;
  setShowAllFeatures: (show: boolean) => void;
}

const badgeColors = {
  blue: "bg-[hsl(var(--accent-blue))] text-[hsl(var(--text-on-color))]",
  green: "bg-[hsl(var(--accent-sage))] text-[hsl(var(--text-on-color))]",
  purple: "bg-[hsl(var(--accent-purple))] text-[hsl(var(--text-on-color))]",
  yellow: "bg-[hsl(var(--accent-gold))] text-[hsl(var(--text-primary))]",
};

const BetaPricingCard: React.FC<BetaPricingCardProps> = ({
  plan,
  showAllFeatures,
  setShowAllFeatures,
}) => {
  const isFree = plan.id === "free";
  const setWaitlistOpen = useWaitlistStore((s) => s.setOpen);
  const router = useRouter();

  const visibleFeatures = showAllFeatures
    ? plan.features
    : plan.features.slice(0, 8);

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl border overflow-hidden transition-all duration-300 ${
        plan.highlight
          ? "border-[hsl(var(--accent-sage))] shadow-lg scale-[1.01]"
          : "border-[hsl(var(--card-border))] shadow-sm hover:shadow-md hover:border-[hsl(var(--accent-sage))]/40"
      }`}
      style={{
        background: plan.highlight
          ? "hsl(var(--card-bg))"
          : "hsl(var(--card-bg))",
      }}
    >
      {plan.badge && (
        <div className="absolute top-3 right-3">
          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${badgeColors[plan.badge.color]}`}
          >
            {plan.badge.text}
          </span>
        </div>
      )}

      <div className="flex-1 flex flex-col p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-[hsl(var(--text-primary))] pr-16">
            {plan.name}
          </h3>
          <p className="text-xs text-[hsl(var(--text-tertiary))] mt-0.5">
            {plan.tagline}
          </p>
        </div>

        <p className="text-sm text-[hsl(var(--text-secondary))] mb-4 leading-relaxed">
          {plan.description}
        </p>

        <div className="mb-4 pb-4 border-b border-[hsl(var(--card-border))]">
          <div
            className={`text-3xl font-bold mb-1 ${
              isFree
                ? "text-[hsl(var(--accent-blue))]"
                : "text-[hsl(var(--accent-sage))]"
            }`}
          >
            {plan.priceDisplay}
          </div>
          {plan.priceSubtext && (
            <p className="text-xs text-[hsl(var(--text-tertiary))]">
              {plan.priceSubtext}
            </p>
          )}
        </div>

        <div className="mb-6 flex-1">
          <motion.ul layout className="space-y-2.5">
            {visibleFeatures.map((feature) => (
              <motion.li
                key={feature.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                layout
                className="flex items-start gap-2 text-sm"
              >
                <span className="inline-flex items-center justify-center w-4 h-4 mt-0.5 flex-shrink-0">
                  {feature.comingSoon ? (
                    <Lock
                      className="w-4 h-4 text-[hsl(var(--accent-sage))]"
                      strokeWidth={2}
                    />
                  ) : (
                    <CheckCircle2
                      className="w-4 h-4 text-[hsl(var(--accent-sage))]"
                      strokeWidth={2}
                    />
                  )}
                </span>

                <span
                  className={`flex-1 ${
                    feature.highlight
                      ? "text-[hsl(var(--text-primary))] font-medium"
                      : "text-[hsl(var(--text-secondary))]"
                  }`}
                >
                  {feature.label}
                </span>

                {feature.comingSoon && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[hsl(var(--accent-sage))]/10 text-[hsl(var(--accent-sage))] border border-[hsl(var(--accent-sage))]/20">
                    SOON
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ul>

          {plan.features.length > 8 && (
            <button
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[hsl(var(--accent-sage))] hover:text-[hsl(var(--accent-sage))]/80 transition-colors pl-6"
            >
              <span>
                {showAllFeatures
                  ? "Show less"
                  : `+${plan.features.length - 8} more features`}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  showAllFeatures ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        <button
          className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
            plan.cta.variant === "primary"
              ? "bg-[hsl(var(--btn-primary-bg))] text-[hsl(var(--btn-primary-text))] hover:bg-[hsl(var(--btn-primary-hover))] shadow-sm hover:shadow"
              : "bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] border border-[hsl(var(--card-border))] hover:border-[hsl(var(--accent-sage))]"
          }`}
          onClick={() => {
            if (plan.cta.action === "waitlist") {
              setWaitlistOpen(true);
            } else if (plan.cta.href) {
              if (plan.cta.href.startsWith("http")) {
                window.open(plan.cta.href, "_blank");
              } else {
                router.push(plan.cta.href);
              }
            }
          }}
        >
          {plan.cta.label}
        </button>
      </div>
    </div>
  );
};

export default BetaPricingCard;
