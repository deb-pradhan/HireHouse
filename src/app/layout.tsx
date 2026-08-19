import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { SITE } from "@/lib/site";

/** Manrope, self-hosted at build time by next/font (zero layout shift).
 *  200 (ExtraLight) is the workhorse; 700 for the heavier display texture. */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hirehouse.xyz"),
  title: {
    default: "HireHouse — Hiring, decided on merit.",
    template: "%s · HireHouse",
  },
  description:
    "HireHouse reads every application on merit, runs a structured interview, and hands companies a shortlist. Free for companies. A fair, fast way for candidates to be seen.",
  openGraph: {
    title: "HireHouse — Hiring, decided on merit.",
    description: "The top of the funnel, handled. Free for companies, fair for candidates.",
    type: "website",
    siteName: SITE.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body data-accent="candidate">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <ConsentBanner />
      </body>
    </html>
  );
}
