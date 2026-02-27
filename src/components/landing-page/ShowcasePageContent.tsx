"use client";

import { useState } from "react";
import { useInfiniteScroll } from "@/hooks/utility/useInfiniteScroll";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { TrendingUp, Clock } from "lucide-react";
import { useShowcase } from "@/hooks/useShowcase";
import { useTemplates } from "@/hooks/useTemplates";
import { flattenPages } from "@/lib/infinite-query";
import { cn } from "@/lib/utils";
import { fadeInUp, smoothTransition } from "@/lib/animations";
import { ResponsiveCardCarousel } from "@/components/shared/ResponsiveCardCarousel";
import { ShowcaseCard } from "@/components/shared/ShowcaseCard";

type SortOption = "trending" | "newest";

const filterBtnClass = (isActive: boolean) =>
  cn(
    "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
    isActive
      ? "bg-[hsl(var(--btn-primary-bg))] text-white shadow-md"
      : "bg-[hsl(var(--bg-muted))] border border-[hsl(var(--card-border))] text-[hsl(var(--text-secondary))] hover:border-[hsl(var(--card-hover-border))] hover:text-[hsl(var(--text-primary))]",
  );

const sortBtnClass = (isActive: boolean) =>
  cn(
    "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
    isActive
      ? "bg-[hsl(var(--btn-primary-bg))] text-white shadow-md"
      : "bg-[hsl(var(--bg-muted))] border border-[hsl(var(--card-border))] text-[hsl(var(--text-secondary))] hover:border-[hsl(var(--card-hover-border))] hover:text-[hsl(var(--text-primary))]",
  );

export default function ShowcasePageContent() {
  const [activeTemplate, setActiveTemplate] = useState<string | undefined>(
    undefined,
  );
  const [activeSort, setActiveSort] = useState<SortOption>("trending");
  const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useShowcase(activeTemplate, activeSort);
  const sentinelRef = useInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  );
  const { data: templates } = useTemplates();

  const filterOptions = [
    { label: "All", value: undefined },
    ...(templates?.map((t) => ({ label: t.displayName, value: t.name })) ?? []),
  ];

  const sortOptions: {
    label: string;
    value: SortOption;
    icon: React.ElementType;
  }[] = [
    { label: "Trending", value: "trending", icon: TrendingUp },
    { label: "Newest", value: "newest", icon: Clock },
  ];

  const items = flattenPages(data);

  const templateDisplayName = (name: string) =>
    templates?.find((t) => t.name === name)?.displayName ?? name;

  const renderCard = (item: (typeof items)[number]) => (
    <ShowcaseCard item={item} templateDisplayName={templateDisplayName} />
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 md:py-10">
      {/* Page Header */}
      <motion.div
        className="mb-6 md:mb-10"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={smoothTransition}
      >
        <div className="flex items-center justify-between gap-3 mb-2 md:mb-3">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[hsl(var(--text-primary))]">
            Portfolio Showcase
          </h1>
          {/* Mobile-only icon sort buttons beside title */}
          <div className="flex items-center gap-1.5 sm:hidden flex-shrink-0">
            {sortOptions.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setActiveSort(value)}
                aria-label={`Sort by ${label}`}
                className={cn(
                  "p-2 rounded-xl transition-all duration-200",
                  activeSort === value
                    ? "bg-[hsl(var(--btn-primary-bg))] text-white shadow-md"
                    : "bg-[hsl(var(--bg-muted))] border border-[hsl(var(--card-border))] text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]",
                )}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
        <p className="text-[15px] md:text-lg text-[hsl(var(--text-secondary))] max-w-2xl">
          Browse real portfolios built by developers using our templates.
        </p>
      </motion.div>

      {/* Filters Row */}
      <motion.div
        className="mb-6 md:mb-8 space-y-3"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ ...smoothTransition, delay: 0.1 }}
      >
        {/* Desktop: template filters + sort on same row */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {filterOptions.map((t) => (
              <button
                key={t.label}
                onClick={() => setActiveTemplate(t.value)}
                className={filterBtnClass(activeTemplate === t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Sort toggles */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {sortOptions.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setActiveSort(value)}
                className={sortBtnClass(activeSort === value)}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: template filter carousel */}
        <div className="sm:hidden">
          <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
            <div className="flex gap-2">
              {filterOptions.map((t) => (
                <button
                  key={t.label}
                  onClick={() => setActiveTemplate(t.value)}
                  className={cn(
                    filterBtnClass(activeTemplate === t.value),
                    "flex-shrink-0",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid / Carousel */}
      <div className="min-h-[60vh]">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 animate-pulse"
              >
                <div className="aspect-video bg-[hsl(var(--bg-muted))] dark:bg-neutral-800" />
                <div className="p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 rounded w-3/4" />
                    <div className="h-3 bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[hsl(var(--text-tertiary))] text-lg">
              No portfolios found for this filter yet.
            </p>
          </div>
        ) : (
          <ResponsiveCardCarousel
            items={items}
            renderCard={renderCard}
            desktopCols={3}
            tabletCols={2}
            gap={6}
            mobileLayout="stack"
          />
        )}
      </div>

      {isFetchingNextPage && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 animate-pulse"
            >
              <div className="aspect-video bg-[hsl(var(--bg-muted))] dark:bg-neutral-800" />
              <div className="p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 rounded w-3/4" />
                  <div className="h-3 bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div ref={sentinelRef} />
    </div>
  );
}
