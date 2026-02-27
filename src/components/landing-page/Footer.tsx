"use client";

import { landingContent } from "@/data/landing-content";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Logo from "../shared/Logo";

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  mail: Mail,
};

export default function Footer() {
  const { footer } = landingContent;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-[1400px] mx-auto px-[16px] lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-6">
            <div className="mb-3 lg:mb-4">
              <Logo />
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-md mb-5 lg:mb-6">
              {footer.brand.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 lg:gap-3">
              {footer.social.map((item, index) => {
                const Icon = socialIcons[item.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
                    aria-label={item.label}
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-neutral-700 dark:text-neutral-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-8 lg:gap-12">
              {/* Product Links */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-3 lg:mb-4">
                  {footer.links.product.title}
                </h3>
                <ul className="space-y-2.5 lg:space-y-3">
                  {footer.links.product.items.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.url}
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-block"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-3 lg:mb-4">
                  {footer.links.legal.title}
                </h3>
                <ul className="space-y-2.5 lg:space-y-3">
                  {footer.links.legal.items.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.url}
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-block"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="/about"
                      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-block"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/cookies"
                      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-block"
                    >
                      Cookies Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 lg:pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 lg:gap-4">
            {/* Copyright */}
            <p className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400 text-center md:text-left">
              © {currentYear} {footer.brand.name}. {footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
