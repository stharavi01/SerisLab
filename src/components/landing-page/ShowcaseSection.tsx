"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { useShowcase } from "@/hooks/useShowcase";
import { useTemplates } from "@/hooks/useTemplates";
import { flattenPages } from "@/lib/infinite-query";
import { fadeInUp, smoothTransition, defaultViewport } from "@/lib/animations";
import { ResponsiveCardCarousel } from "@/components/shared/ResponsiveCardCarousel";
import { ShowcaseCard } from "@/components/shared/ShowcaseCard";

export default function ShowcaseSection() {
  const { data, isLoading } = useShowcase();
  const { data: templates } = useTemplates();
  const items = flattenPages(data).slice(0, 6);

  const templateDisplayName = (name: string) =>
    templates?.find((t) => t.name === name)?.displayName ?? name;

  const renderCard = (item: (typeof items)[number]) => (
    <ShowcaseCard item={item} templateDisplayName={templateDisplayName} />
  );

  if (!isLoading && items.length === 0) return null;

  return (
    <section className="relative py-20 md:py-32 bg-[hsl(var(--bg-subtle))] dark:bg-neutral-900">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center md:text-left mb-12 md:mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          transition={smoothTransition}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-6 shadow-sm">
            <LayoutGrid className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Community Portfolios
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[hsl(var(--text-primary))] mb-4">
            See What Others Built
          </h2>
          <p className="text-base md:text-xl text-[hsl(var(--text-secondary))] max-w-2xl">
            Real portfolios made with our templates by developers like you.
          </p>
        </motion.div>

        {/* Card Grid */}
        {isLoading ? (
          <>
            {/* Mobile skeleton: horizontal scroll strip */}
            <div className="md:hidden overflow-hidden">
              <div className="flex gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 animate-pulse flex-shrink-0"
                    style={{ flex: "0 0 85%" }}
                  >
                    <div className="aspect-video bg-[hsl(var(--bg-muted))] dark:bg-neutral-800" />
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 rounded w-3/4" />
                        <div className="h-3 bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Tablet / Desktop skeleton: grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 animate-pulse"
                >
                  <div className="aspect-video bg-[hsl(var(--bg-muted))] dark:bg-neutral-800" />
                  <div className="p-4 md:p-5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 rounded w-3/4" />
                      <div className="h-3 bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <ResponsiveCardCarousel
            items={items}
            renderCard={renderCard}
            desktopCols={3}
            tabletCols={2}
            gap={6}
            mobileLayout="carousel"
            mobileCardWidth="85%"
          />
        )}

        {/* Browse all — bottom right */}
        <motion.div
          className="flex justify-end mt-6 md:mt-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...smoothTransition, delay: 0.2 }}
        >
          <Link
            href="/showcase"
            className="group inline-flex items-center gap-1 text-[hsl(var(--btn-primary-bg))] hover:text-[hsl(var(--accent-sage))] font-medium text-base md:text-lg transition-colors duration-150"
            aria-label="Browse all portfolios"
          >
            <span>Browse all</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
