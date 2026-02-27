import type { Metadata } from "next";
import {
  Playfair_Display,
  DM_Sans,
  Lora,
  Titillium_Web,
} from "next/font/google";
import { Suspense } from "react";
import "@/styles/globals.css";
import "@/styles/app/landing.css";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { ThemeProviders } from "@/providers/ThemeProvider";
import {
  OrganizationSchema,
  MainWebSiteSchema,
  SiteNavigationSchema,
  SoftwareApplicationSchema,
} from "@/components/shared/StructuredData";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";
import { WebVitals } from "@/components/shared/WebVitals";

// Landing page
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-titillium",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://serislab.com",
  ),
  title: {
    default: "SerisLab - The Portfolio That Evolves With You",
    template: "%s | SerisLab",
  },
  description:
    "We turn your GitHub or resume into a living portfolio that grows with you. Build once. Sync forever. Edit anytime. Powered by AI — refined by you.",
  keywords: [
    // High-volume search terms
    "portfolio builder",
    "free portfolio builder",
    "developer portfolio",
    "online portfolio",
    "portfolio website",
    "create portfolio",
    "portfolio maker",

    // Developer-specific
    "coding portfolio",
    "programmer portfolio",
    "web developer portfolio",
    "software engineer portfolio",
    "tech portfolio",

    // GitHub-specific
    "GitHub portfolio",
    "GitHub portfolio builder",
    "GitHub to website",
    "portfolio from GitHub",

    // Resume-specific
    "resume to website",
    "resume portfolio",
    "portfolio from resume",

    // Feature-based
    "AI portfolio builder",
    "portfolio generator",
    "professional portfolio",
    "portfolio template",
  ],
  authors: [{ name: "SerisLab" }],
  creator: "SerisLab",
  publisher: "SerisLab",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SerisLab",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@serislab",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${playfairDisplay.variable}
        ${dmSans.variable}
        ${lora.variable}
        ${titilliumWeb.variable}
      `}
      suppressHydrationWarning
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="SerisLab" />
        <OrganizationSchema />
        <MainWebSiteSchema />
        <SiteNavigationSchema />
        <SoftwareApplicationSchema />
      </head>
      <body className={`antialiased ${dmSans.className}`}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <WebVitals />
        <ReactQueryProvider>
          <ErrorBoundary>
            <ThemeProviders>
              <CookieConsent />
              {children}
              <Toaster
                position="top-right"
                richColors
                duration={4000}
                expand={false}
                closeButton
                toastOptions={{
                  style: {
                    fontSize: "14px",
                    padding: "12px 16px",
                  },
                  className: "sonner-toast",
                  closeButton: true,
                }}
              />
            </ThemeProviders>
          </ErrorBoundary>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
