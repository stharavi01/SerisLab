"use client";

import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export default function Logo({ text = "SerisLab", hide = false }) {
  const lenis = useLenis();
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  const handleClick = (e: React.MouseEvent) => {
    if (!isLandingPage) return;

    e.preventDefault();
    const heroElement = document.querySelector("#hero");

    if (heroElement && lenis) {
      lenis.scrollTo("#hero", {
        offset: -80,
        duration: 1.2,
      });
    } else {
      lenis?.scrollTo(0);
    }
  };

  return (
    <Link
      href="/"
      className="flex items-baseline gap-1.5 sm:gap-2 md:gap-2.5 group transition-opacity hover:opacity-80"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center rounded-lg w-6 h-6 sm:w-7 sm:h-7 shadow-sm bg-gray-50 dark:bg-gray-100 transition-transform group-hover:scale-105">
        <Image
          src="/logo.svg"
          alt="SerisLab Icon"
          width={20}
          height={20}
          className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5"
          priority
        />
      </div>
      {!hide && (
        <span className="text-foreground font-medium text-base sm:text-lg tracking-tight [font-family:var(--font-playfair-display)]">
          {text}
        </span>
      )}
    </Link>
  );
}
