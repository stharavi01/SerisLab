import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import ShowcasePageContent from "@/components/landing-page/ShowcasePageContent";
import SmoothScroll from "@/components/shared/SmoothScroll";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio Showcase — SerisLab",
  description:
    "Browse real developer portfolios built with SerisLab. See how others turned their GitHub or resume into a stunning portfolio site.",
  path: "/showcase",
  keywords: [
    "developer portfolio examples",
    "portfolio showcase",
    "portfolio inspiration",
    "developer portfolio gallery",
    "portfolio templates examples",
  ],
});

export default function ShowcasePage() {
  return (
    <SmoothScroll>
      <div className="app-landing min-h-screen flex flex-col bg-[hsl(var(--bg-base))]">
        <Navbar />
        <main className="flex-1 pt-16">
          <ShowcasePageContent />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
