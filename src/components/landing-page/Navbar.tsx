"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useWaitlistStore } from "@/stores/waitlist.store";
import { useRouter } from "next/navigation";
import { landingContent } from "@/data/landing-content";
import { Menu, User, ChevronRight, X } from "lucide-react";
import { ThemeToggle } from "../shared/inputs/ThemeToggle";
import { useLenis } from "lenis/react";
import dynamic from "next/dynamic";
import Logo from "../shared/Logo";
import { Drawer } from "vaul";
import { useShowcase } from "@/hooks/useShowcase";
import { flattenPages } from "@/lib/infinite-query";

const WaitlistModal = dynamic(() => import("../shared/WaitlistModal"), {
  ssr: false,
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const waitlistOpen = useWaitlistStore((s) => s.open);
  const setWaitlistOpen = useWaitlistStore((s) => s.setOpen);
  const router = useRouter();
  const { navigation } = landingContent;
  const lenis = useLenis();
  const { data: showcaseData, isLoading: showcaseLoading } = useShowcase();
  const hasShowcase = !showcaseLoading && flattenPages(showcaseData).length > 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      lenis ? lenis.stop() : (document.body.style.overflow = "hidden");
    } else {
      lenis ? lenis.start() : (document.body.style.overflow = "unset");
    }
    return () => {
      lenis ? lenis.start() : (document.body.style.overflow = "unset");
    };
  }, [drawerOpen, lenis]);

  const scrollToSection = (href: string) => {
    setDrawerOpen(false);
    if (href.startsWith("#")) {
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(href, { offset: -80 });
        } else {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }
      }, 350);
    }
  };

  const navLinks = [
    ...navigation.links,
    ...(hasShowcase ? [{ href: "/showcase", label: "Showcase" }] : []),
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-neutral-200 dark:bg-neutral-950/90 dark:border-neutral-800 shadow-sm"
            : "bg-white dark:bg-neutral-950"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navigation.links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              {hasShowcase && (
                <Link
                  href="/showcase"
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                >
                  Showcase
                </Link>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setWaitlistOpen(true)}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all"
              >
                {navigation.cta.secondary.label}
              </button>
              <Link
                href={navigation.cta.primary.href}
                className="px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm bg-[hsl(150,45%,28%)] hover:bg-[hsl(150,45%,22%)] text-white"
              >
                {navigation.cta.primary.label}
              </Link>
            </div>

            {/* Mobile header actions */}
            <div className="flex lg:hidden items-center gap-1">
              <ThemeToggle />
              <a
                href="https://serislab.com/auth/signin"
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                aria-label="Sign in"
              >
                <User className="w-5 h-5" />
              </a>

              {/* Vaul bottom-sheet drawer */}
              <Drawer.Root
                direction="right"
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
              >
                <Drawer.Trigger asChild>
                  <button
                    className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </Drawer.Trigger>

                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]" />
                  <Drawer.Content
                    className="fixed right-0 top-0 bottom-0 z-[999] flex flex-col outline-none"
                    style={{ width: "min(300px, 85vw)" }}
                  >
                    {/* Inner panel with rounded left corners */}
                    <div className="flex flex-col h-full rounded-l-[28px] overflow-hidden bg-white dark:bg-neutral-950 shadow-2xl">
                      {/* Header with logo + close button */}
                      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
                        <Logo />
                        <button
                          onClick={() => setDrawerOpen(false)}
                          className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          aria-label="Close menu"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Nav links */}
                      <div className="flex-1 overflow-y-auto px-3 pt-4 pb-3">
                        <p className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-600">
                          Menu
                        </p>
                        <div className="space-y-0.5">
                          {navLinks.map((link) =>
                            link.href.startsWith("#") ? (
                              <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-neutral-800 dark:text-neutral-100 hover:bg-[#e8f0eb] dark:hover:bg-neutral-800/60 transition-colors group"
                              >
                                <span className="text-[15px] font-medium">
                                  {link.label}
                                </span>
                                <ChevronRight
                                  className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150"
                                  style={{ color: "hsl(150, 25%, 48%)" }}
                                />
                              </button>
                            ) : (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setDrawerOpen(false)}
                                className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-neutral-800 dark:text-neutral-100 hover:bg-[#e8f0eb] dark:hover:bg-neutral-800/60 transition-colors group"
                              >
                                <span className="text-[15px] font-medium">
                                  {link.label}
                                </span>
                                <ChevronRight
                                  className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150"
                                  style={{ color: "hsl(150, 25%, 48%)" }}
                                />
                              </Link>
                            ),
                          )}
                        </div>
                      </div>

                      {/* CTA buttons */}
                      <div className="px-5 pt-3 pb-8 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            setDrawerOpen(false);
                            window.location.href = "https://serislab.com/auth/signin";
                          }}
                          className="w-full py-3.5 rounded-2xl font-semibold text-[15px] text-white transition-all hover:opacity-90 active:scale-[0.98]"
                          style={{ background: "hsl(150, 45%, 28%)" }}
                        >
                          {navigation.cta.primary.label}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDrawerOpen(false);
                            setTimeout(() => setWaitlistOpen(true), 400);
                          }}
                          className="w-full py-3.5 rounded-2xl font-medium text-[15px] border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
                        >
                          Join Waitlist
                        </button>
                      </div>
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </div>
          </div>
        </div>
      </nav>

      {waitlistOpen && (
        <WaitlistModal
          open={waitlistOpen}
          onClose={() => setWaitlistOpen(false)}
          source="navbar"
        />
      )}
    </>
  );
}
