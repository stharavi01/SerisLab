"use client";

import { motion } from "framer-motion";
import { landingContent } from "@/data/landing-content";
import {
  GitBranch,
  Layers,
  TrendingUp,
  Palette,
  BarChart3,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import {
  fadeInUp,
  fadeInScale,
  staggerContainer,
  staggerItem,
  smoothTransition,
  defaultViewport,
} from "@/lib/animations";

const iconComponents = {
  "git-branch": GitBranch,
  "trending-up": TrendingUp,
  palette: Palette,
  "bar-chart-3": BarChart3,
};

// Check if a string is an image path
const isImagePath = (str: string) =>
  str?.startsWith("/") || str?.startsWith("http");

export default function FeaturesSection() {
  const { features } = landingContent;

  return (
    <section
      id="features"
      className="relative py-20 md:py-32 bg-white dark:bg-neutral-950"
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
            <Layers className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {features.sectionBadge}
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
            {features.headline}
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
            {features.subheadline}
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div className="space-y-6">
          {/* First Row - 3 taller cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.bento.slice(0, 3).map((item, index) => {
              const imageSource = item.visual.image;
              const isImage = isImagePath(imageSource);
              const IconComponent = !isImage
                ? iconComponents[imageSource as keyof typeof iconComponents]
                : null;

              return (
                <motion.div
                  key={index}
                  className="group relative bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 overflow-hidden min-h-[400px] flex flex-col card-hover-lift"
                  variants={staggerItem}
                >
                  {/* Subtle background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-transparent dark:from-neutral-800 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                  {/* Badge - Absolute positioning over image */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${item.visual.badgeColor} text-white text-xs font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 ease-out group-hover:scale-105`}
                    >
                      <span>{item.visual.badge}</span>
                    </div>
                    {item.pro && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 ease-out group-hover:scale-105">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.755l6.914-1.004L12 2.25l3.086 6.501L22 9.755l-5.007 4.367 1.179 6.873z" />
                        </svg>
                        {item.proBadge || "Pro (coming soon)"}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Visual Area - Full Cover Image or Icon - Touches padding */}
                    <div className="flex-1 flex items-center justify-center mb-6">
                      {isImage ? (
                        <div className="relative w-full h-full min-h-[200px] rounded-2xl overflow-hidden">
                          <Image
                            src={imageSource}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-900 ease-in group-hover:scale-102"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center shadow-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3">
                            {IconComponent && (
                              <IconComponent className="w-14 h-14 text-neutral-900 dark:text-neutral-100 transition-transform duration-500 ease-out group-hover:scale-110" />
                            )}
                          </div>
                          {/* Decorative ring */}
                          <div className="absolute -inset-3 bg-neutral-100 dark:bg-neutral-800 rounded-3xl -z-10 opacity-30 transition-all duration-500 ease-out group-hover:opacity-50 group-hover:-inset-4" />
                        </div>
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3 px-6 pb-8">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-[15px] leading-relaxed transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Second Row - 2 large cards (each 50% width) */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.bento.slice(3, 5).map((item, index) => {
              const actualIndex = index + 3;

              // Handle both icon and image for dashboard type
              let visualElement;
              if (item.visual.type === "dashboard") {
                visualElement = (
                  <div className="w-full space-y-3">
                    {item.visual.stats?.map((stat, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-900 ease-out hover:shadow-sm hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-teal-500 transition-all duration-300 ease-out group-hover:scale-150" />
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors duration-300">
                            {stat.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
                            {stat.value}
                          </span>
                          {stat.status === "up" ? (
                            <ArrowUp className="w-4 h-4 text-green-600 dark:text-green-500 transition-all duration-300 ease-out group-hover:translate-y-[-2px]" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-600 dark:text-red-500 transition-all duration-300 ease-out group-hover:translate-y-[2px]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              } else {
                // illustration type
                const imageSource = item.visual.image;
                const isImage = isImagePath(imageSource);

                if (isImage) {
                  visualElement = (
                    <div className="relative w-full h-full min-h-[240px] rounded-2xl overflow-hidden">
                      <Image
                        src={imageSource}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-900 ease-in group-hover:scale-103"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    </div>
                  );
                } else {
                  const IconComponent =
                    iconComponents[imageSource as keyof typeof iconComponents];
                  visualElement = (
                    <div className="relative">
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center shadow-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3">
                        {IconComponent && (
                          <IconComponent className="w-16 h-16 text-neutral-900 dark:text-neutral-100 transition-transform duration-500 ease-out group-hover:scale-110" />
                        )}
                      </div>
                      <div className="absolute -inset-4 bg-neutral-100 dark:bg-neutral-800 rounded-3xl -z-10 opacity-30 transition-all duration-500 ease-out group-hover:opacity-50 group-hover:-inset-5" />
                    </div>
                  );
                }
              }

              return (
                <motion.div
                  key={actualIndex}
                  className="group relative bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 overflow-hidden min-h-[360px] flex flex-col card-hover-lift"
                  variants={staggerItem}
                >
                  {/* Subtle background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-transparent dark:from-neutral-800 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                  {/* Badge - Absolute positioning over content */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${item.visual.badgeColor} text-white text-xs font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 ease-out group-hover:scale-105`}
                    >
                      <span>{item.visual.badge}</span>
                    </div>
                    {item.pro && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 ease-out group-hover:scale-105">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.755l6.914-1.004L12 2.25l3.086 6.501L22 9.755l-5.007 4.367 1.179 6.873z" />
                        </svg>
                        {item.proBadge || "Pro (coming soon)"}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col lg:flex-row lg:items-center gap-8 p-6">
                    {/* Visual Area */}
                    <div className="flex-1 flex items-center justify-center">
                      {visualElement}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-[15px] leading-relaxed transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
