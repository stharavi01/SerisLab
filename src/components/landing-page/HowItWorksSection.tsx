"use client";

import { motion } from "framer-motion";
import { landingContent } from "@/data/landing-content";
import { Workflow } from "lucide-react";
import Image from "next/image";
import {
  fadeInUp,
  fadeInScale,
  staggerContainer,
  staggerItem,
  smoothTransition,
  defaultViewport,
} from "@/lib/animations";
import { HowToSchema } from "@/components/shared/StructuredData";

export default function HowItWorksSection() {
  const { howItWorks } = landingContent;

  return (
    <>
      <HowToSchema />
      <section
        id="how-it-works"
        className="relative py-20 md:py-32 bg-neutral-50 dark:bg-neutral-900"
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            transition={smoothTransition}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-6 shadow-sm"
              variants={fadeInScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ...smoothTransition, delay: 0.1 }}
            >
              <Workflow className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {howItWorks.sectionBadge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ...smoothTransition, delay: 0.2 }}
            >
              {howItWorks.headline}
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ...smoothTransition, delay: 0.3 }}
            >
              {howItWorks.subheadline}
            </motion.p>
          </motion.div>

          {/* Steps Grid - 3 cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {howItWorks.cards.map((card, index) => {
              return (
                <motion.div
                  key={index}
                  className="group relative"
                  variants={staggerItem}
                >
                  {/* Step Label - floating above card */}
                  <div className="absolute -top-3 left-6 z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-500 dark:text-neutral-400 shadow-sm">
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="relative bg-white dark:bg-neutral-950 rounded-3xl p-6 pt-8 border border-neutral-200 dark:border-neutral-800 card-hover-lift h-full">
                    {/* Visual Area - Compact illustration */}
                    <div className="mb-6">
                      <div className="relative w-full h-40 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 overflow-hidden">
                        {/* Subtle pattern overlay */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                        </div>

                        {/* Image */}
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-900 ease-in group-hover:scale-103"
                          style={{ borderRadius: "1rem" }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-600 dark:text-neutral-400 text-[15px] leading-relaxed mb-4">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom indicator */}
                    <div className="absolute bottom-6 left-8 right-8">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full" />
                        <span className="text-xs font-medium text-primary">
                          {card.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Connection Arrow - desktop only */}
                  {index < howItWorks.cards.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-0">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-neutral-300 dark:text-neutral-700"
                      >
                        <path
                          d="M5 12h14m0 0l-6-6m6 6l-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="4 4"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
