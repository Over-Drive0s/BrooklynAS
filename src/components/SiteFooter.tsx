"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export default function SiteFooter() {
  const pathname = usePathname();
  const isAdmin = pathname === site.links.admin;

  if (isAdmin) {
    return <footer className="mt-auto bg-brand-gray py-12 md:py-16" aria-hidden="true" />;
  }

  return <Footer />;
}
