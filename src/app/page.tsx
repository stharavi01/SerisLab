import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import FAQSection from "@/components/landing-page/FAQSection";
import FeaturesSection from "@/components/landing-page/FeaturesSection";
import FinalCTASection from "@/components/landing-page/FinalCTASection";
import Footer from "@/components/landing-page/Footer";
import HeroSection from "@/components/landing-page/HeroSection";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";
import Navbar from "@/components/landing-page/Navbar";
import BetaPricingSection from "@/components/landing-page/BetaPricingSection";
import ShowcaseSection from "@/components/landing-page/ShowcaseSection";
import ContactSection from "@/components/landing-page/ContactSection";
import SmoothScroll from "@/components/shared/SmoothScroll";

export const metadata: Metadata = buildMetadata({
  title: "SerisLab - The Portfolio That Evolves With You",
  description:
    "We turn your GitHub or resume into a living portfolio that grows with you. Build once. Sync forever. Edit anytime. Powered by AI — refined by you.",
  path: "/",
  image: "/og/home.png",
  keywords: [
    // High-volume search terms
    "portfolio builder",
    "free portfolio builder",
    "developer portfolio",
    "online portfolio",
    "portfolio website",
    "create portfolio",
    "portfolio maker",
    "website builder",
    "portfolio generator",

    // Developer-specific
    "coding portfolio",
    "programmer portfolio",
    "web developer portfolio",
    "software engineer portfolio",
    "software developer portfolio",
    "tech portfolio",

    // GitHub-specific
    "GitHub portfolio",
    "GitHub portfolio builder",
    "GitHub to website",
    "portfolio from GitHub",
    "GitHub profile portfolio",

    // Resume-specific
    "resume to website",
    "resume portfolio",
    "portfolio from resume",
    "turn resume into website",

    // Features & long-tail
    "AI portfolio builder",
    "automatic portfolio",
    "portfolio template",
    "how to create a portfolio",
    "best portfolio builder",
    "professional portfolio website",
  ],
});

export default async function HomePage() {
  return (
    <SmoothScroll>
      <div className="app-landing">
        <Navbar />
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ShowcaseSection />
        <BetaPricingSection />
        <FAQSection />
        <ContactSection />
        <FinalCTASection />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
