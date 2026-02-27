import React from "react";
import { PricingPlan } from "../../data/pricing-data";

interface PricingCardProps {
  plan: PricingPlan;
  billing: "monthly" | "annual";
}

const badgeColors = {
  blue: "bg-blue-500 text-white",
  green: "bg-green-500 text-white",
  purple: "bg-purple-500 text-white",
};

const PricingCard: React.FC<PricingCardProps> = ({ plan, billing }) => {
  const isPro = plan.id === "pro";
  const isFree = plan.id === "free";

  // Determine price based on billing type
  let price = 0;
  let priceLabel = "Free Forever";
  let originalPrice: number | null = null;
  let earlyAdopterPrice: number | null = null;

  if (!isFree) {
    if (billing === "monthly") {
      originalPrice = plan.monthlyPrice ?? null;
      earlyAdopterPrice = plan.earlyAdopter?.monthlyPrice ?? null;
      price = earlyAdopterPrice || originalPrice || 0;
      priceLabel = `/month`;
    } else if (billing === "annual") {
      originalPrice = plan.annualPrice ?? null;
      earlyAdopterPrice = plan.earlyAdopter?.annualPrice ?? null;
      price = earlyAdopterPrice || originalPrice || 0;
      priceLabel = `/year`;
    }
  }

  // Calculate savings for annual vs monthly
  const annualSavings =
    billing === "annual" && isPro && plan.monthlyPrice
      ? Math.round(
          ((plan.monthlyPrice * 12 - (plan.annualPrice || 0)) /
            (plan.monthlyPrice * 12)) *
            100,
        )
      : 0;

  // Monthly equivalent for annual
  const monthlyEquivalent =
    billing === "annual" && isPro && plan.annualPrice
      ? (plan.annualPrice / 12).toFixed(2)
      : null;

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl border bg-white dark:bg-neutral-900 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
        plan.highlight
          ? "border-2 border-green-500 dark:border-green-400 scale-[1.02] ring-2 ring-green-500/20"
          : "border-neutral-200 dark:border-neutral-800"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-bold shadow-sm ${badgeColors[plan.badge.color]}`}
          >
            {plan.badge.text}
          </span>
        </div>
      )}

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-6 md:p-8">
        {/* Plan Name & Description */}
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50 pr-20">
          {plan.name}
        </h3>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6">
          {plan.description}
        </p>

        {/* Pricing */}
        <div className="mb-6">
          {isFree ? (
            <div className="text-4xl md:text-5xl font-extrabold text-green-600 dark:text-green-400">
              {priceLabel}
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-2 mb-2">
                {earlyAdopterPrice &&
                  originalPrice &&
                  earlyAdopterPrice !== originalPrice && (
                    <span className="text-lg md:text-xl text-neutral-400 dark:text-neutral-500 line-through font-medium">
                      ${originalPrice}
                    </span>
                  )}
                <span className="text-4xl md:text-5xl font-extrabold text-green-600 dark:text-green-400">
                  ${price}
                </span>
                <span className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-medium">
                  {priceLabel}
                </span>
              </div>

              {/* Early Adopter Badge */}
              {earlyAdopterPrice &&
                originalPrice &&
                earlyAdopterPrice !== originalPrice && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                    <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                      🎉 Early Adopter: 40% OFF Forever
                    </span>
                  </div>
                )}

              {/* Additional pricing info */}
              <div className="mt-3 space-y-1">
                {billing === "annual" && monthlyEquivalent && (
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Just{" "}
                    <span className="font-semibold">
                      ${monthlyEquivalent}/month
                    </span>{" "}
                    billed annually
                  </div>
                )}
                {billing === "annual" && annualSavings > 0 && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800">
                    <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400">
                      💰 SAVE {annualSavings}% vs Monthly
                    </span>
                  </div>
                )}

                {billing === "monthly" && isPro && (
                  <div className="text-xs text-neutral-500 dark:text-neutral-500 italic">
                    Flexible monthly billing - cancel anytime
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Features List */}
        <ul className="mb-8 space-y-3 flex-1">
          {plan.features.map((feature) => {
            const isIncluded =
              feature.included === true || feature.included === "coming-soon";
            const isComingSoon =
              feature.included === "coming-soon" || feature.comingSoon;
            const isExcluded = feature.included === false;

            return (
              <li
                key={feature.key}
                className="flex items-start gap-2.5 text-sm"
              >
                {/* Icon */}
                <span className="inline-flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
                  {isIncluded && !isComingSoon && (
                    <svg
                      className="w-5 h-5 text-green-500 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {isComingSoon && (
                    <svg
                      className="w-5 h-5 text-yellow-500 dark:text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  {isExcluded && (
                    <svg
                      className="w-5 h-5 text-neutral-300 dark:text-neutral-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </span>

                {/* Feature Text */}
                <span
                  className={`flex-1 ${
                    isExcluded
                      ? "text-neutral-400 dark:text-neutral-600 line-through"
                      : "text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  {feature.label}
                  {isComingSoon && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800">
                      COMING SOON
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <button
          className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 shadow-sm text-base ${
            plan.cta.disabled
              ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
              : plan.highlight
                ? "bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 hover:shadow-lg active:scale-[0.98]"
                : "bg-neutral-900 dark:bg-neutral-700 text-white hover:bg-neutral-800 dark:hover:bg-neutral-600 hover:shadow-lg active:scale-[0.98]"
          }`}
          disabled={plan.cta.disabled}
        >
          {plan.cta.label}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
