"use client";
import React from "react";
import { motion } from "framer-motion";
import { BETA_PRICING_PLANS } from "../../data/beta-pricing-data";
import BetaPricingCard from "./BetaPricingCard";
import { Tag } from "lucide-react";
import {
  fadeInUp,
  fadeInScale,
  staggerContainer,
  staggerItem,
  smoothTransition,
  defaultViewport,
} from "@/lib/animations";

const BetaPricingSection: React.FC = () => {
  const [showAllFeatures, setShowAllFeatures] = React.useState(false);

  return (
    <section
      id="pricing"
      className="relative py-20 md:py-28 bg-[hsl(var(--bg-base))] w-full overflow-hidden"
    >
      {/* Square boxes grid background: vertical and horizontal lines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(209,213,219,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(209,213,219,0.18)_1px,transparent_1px)] bg-[size:64px_64px] z-0 dark:bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)]" />
      <div className="landing-container">
        <motion.div
          className="text-center mb-12 max-w-3xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          transition={smoothTransition}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-4 shadow-sm"
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
          >
            <Tag className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Beta Pricing
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[hsl(var(--text-primary))] mb-3"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.2 }}
          >
            Free During Beta
          </motion.h2>
          <motion.p
            className="text-xl font-semibold text-[hsl(var(--accent-sage))] mb-4"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.3 }}
          >
            Pro Features Coming Q2 2026
          </motion.p>

          <motion.p
            className="text-base text-[hsl(var(--text-secondary))] leading-relaxed"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.4 }}
          >
            All features free now. Early beta users automatically get{" "}
            <span className="font-semibold text-[hsl(var(--accent-sage))]">
              50% off for life
            </span>{" "}
            when Pro launches.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {BETA_PRICING_PLANS.map((plan) => (
            <motion.div key={plan.id} variants={staggerItem}>
              <BetaPricingCard
                plan={plan}
                showAllFeatures={showAllFeatures}
                setShowAllFeatures={setShowAllFeatures}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BetaPricingSection;
