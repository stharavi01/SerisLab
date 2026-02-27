"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, Eye, ExternalLink } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useShare } from "@/hooks/utility/useShare";
import { ShareModal } from "@/components/shared/ShareModal";
import { ShowcaseItem } from "@/types/portfolio.types";

interface ShowcaseCardProps {
  item: ShowcaseItem;
  templateDisplayName: (name: string) => string;
}

export function ShowcaseCard({ item, templateDisplayName }: ShowcaseCardProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { share, isSharing, isSupported } = useShare();

  const portfolioUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/portfolio/${item.slug}`
      : `/portfolio/${item.slug}`;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSupported) {
      await share({
        title: item.title,
        text: `Check out this portfolio: ${item.title}`,
        url: portfolioUrl,
      });
    } else {
      setIsShareModalOpen(true);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <>
      <Link
        href={`/portfolio/${item.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 card-hover-lift bg-white dark:bg-neutral-900 transition-all duration-300"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video bg-[hsl(var(--bg-muted))] dark:bg-neutral-800 overflow-hidden">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[hsl(var(--text-muted))] text-sm">
                No preview
              </span>
            </div>
          )}

          {/* Hover overlay CTA — desktop only (no hover on mobile) */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-2 text-white font-medium text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <ExternalLink className="w-3.5 h-3.5" />
              View Portfolio
            </span>
          </div>

          {/* Share button — always visible on mobile, hover-only on desktop */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 hover:bg-white dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 disabled:opacity-50 z-10"
            aria-label="Share portfolio"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card footer */}
        <div className="p-4 md:p-5">
          {/* Avatar + info row */}
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 border border-[hsl(var(--bg-accent))] flex-shrink-0">
              {item.avatar ? (
                <AvatarImage src={item.avatar} alt={item.name || item.title} />
              ) : (
                <AvatarFallback>
                  {item.name?.[0] || item.title?.[0] || "?"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[hsl(var(--text-primary))] truncate text-sm md:text-base">
                {item.title}
              </p>
              {item.name && (
                <p className="text-xs md:text-sm text-[hsl(var(--text-tertiary))] truncate">
                  {item.name}
                </p>
              )}
            </div>
            {/* Template badge — always visible */}
            <span className="flex-shrink-0 text-xs text-[hsl(var(--text-muted))] bg-[hsl(var(--bg-muted))] border border-[hsl(var(--card-border))] px-2 py-1 rounded-lg capitalize">
              {templateDisplayName(item.templateName)}
            </span>
          </div>

          {/* Meta row: only render if there's something to show */}
          {(item.totalViews > 0 || item.publishedAt) && (
            <div className="mt-3 pt-3 border-t border-[hsl(var(--card-border))] flex items-center justify-between text-xs text-[hsl(var(--text-muted))]">
              {item.totalViews > 0 ? (
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{item.totalViews.toLocaleString()} views</span>
                </div>
              ) : (
                <div />
              )}
              {item.publishedAt && <span>{formatDate(item.publishedAt)}</span>}
            </div>
          )}
        </div>
      </Link>

      <ShareModal
        open={isShareModalOpen}
        onOpenChange={setIsShareModalOpen}
        url={portfolioUrl}
        title={item.title}
        description="Share this portfolio with others"
      />
    </>
  );
}
