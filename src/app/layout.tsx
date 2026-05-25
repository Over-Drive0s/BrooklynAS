import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import ScrollToTop from "@/components/ScrollToTop";
import TestimonialsSection from "@/components/TestimonialsSection";
import { site } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${site.name} | Used Cars Staten Island NY`,
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.website,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} flex min-h-dvh flex-col font-sans`}>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <TestimonialsSection />
        <SiteFooter />
      </body>
    </html>
  );
}
