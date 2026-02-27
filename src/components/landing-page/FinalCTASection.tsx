"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { landingContent } from "@/data/landing-content";
import { ArrowRight, Check, Hourglass } from "lucide-react";
import {
  fadeInUp,
  fadeInScale,
  staggerContainer,
  staggerItem,
  smoothTransition,
  defaultViewport,
} from "@/lib/animations";

export default function CTASection() {
  const { cta } = landingContent;

  return (
    <section className="relative py-16 md:py-32 bg-gradient-to-b from-white via-neutral-50/50 to-white dark:from-neutral-950 dark:via-neutral-900/50 dark:to-neutral-950 overflow-hidden">
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-neutral-100/30 to-transparent dark:from-transparent dark:via-neutral-800/20 dark:to-transparent pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Content Container */}
        <motion.div
          className="relative max-w-3xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          transition={smoothTransition}
        >
          {/* Badge */}
          <motion.div
            className="flex justify-center mb-4 md:mb-6"
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <Hourglass className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {cta.badge}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold tracking-normal text-neutral-900 dark:text-neutral-50 mb-3 md:mb-4 leading-normal"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.2 }}
          >
            {cta.headline}
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-center text-sm md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.3 }}
          >
            {cta.subheadline.split(" ").map((word, index) => {
              const highlight = cta.highlights.find((h) =>
                word.includes(h.word),
              );
              if (highlight) {
                return (
                  <span key={index}>
                    {word.replace(highlight.word, "")}
                    <span className="inline-flex items-center gap-1">
                      <span className="font-medium text-neutral-900 dark:text-neutral-50">
                        {highlight.word}
                      </span>
                    </span>{" "}
                  </span>
                );
              }
              return word + " ";
            })}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center mb-6 md:mb-8"
            variants={fadeInScale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.4 }}
          >
            <a
              href="https://serislab.com/auth/signin"
              className="group relative inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative">{cta.buttonText}</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Trust indicators - Responsive Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {cta.trustPoints.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                variants={staggerItem}
              >
                <Check
                  className="w-4 h-4 text-[hsl(var(--accent-sage))] mt-0.5 flex-shrink-0"
                  strokeWidth={2.5}
                />
                <span>{point}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
