"use client";

import { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface ResponsiveCardCarouselProps<T> {
  items: T[];
  renderCard: (item: T) => ReactNode;
  desktopCols?: number;
  tabletCols?: number;
  mobileCols?: number;
  gap?: number;
  mobileLayout?: "carousel" | "stack";
  mobileCardWidth?: string;
}

export function ResponsiveCardCarousel<T>({
  items,
  renderCard,
  desktopCols = 4,
  tabletCols = 2,
  mobileCols = 1,
  gap = 6,
  mobileLayout = "carousel",
  mobileCardWidth = "85%",
}: ResponsiveCardCarouselProps<T>) {
  const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true });

  const gapClass = `gap-${gap}`;
  const tabletGridClass = `md:grid-cols-${tabletCols}`;
  const desktopGridClass = `lg:grid-cols-${desktopCols}`;
  const mobileGridClass = mobileCols > 1 ? `grid-cols-${mobileCols}` : "";

  return (
    <>
      {/* Desktop & Tablet: Grid */}
      <div
        className={`hidden md:grid ${tabletGridClass} ${desktopGridClass} ${gapClass}`}
      >
        {items.map((item, idx) => (
          <div key={idx} className="h-full">
            {renderCard(item)}
          </div>
        ))}
      </div>

      {/* Mobile: Carousel or Stack */}
      {mobileLayout === "carousel" ? (
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className={`flex ${gapClass} items-stretch`}>
            {items.map((item, idx) => (
              <div
                key={idx}
                className="min-w-0 h-full"
                style={{ flex: `0 0 ${mobileCardWidth}` }}
              >
                {renderCard(item)}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`md:hidden grid ${mobileGridClass} ${gapClass}`}>
          {items.map((item, idx) => (
            <div key={idx} className="h-full">
              {renderCard(item)}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
