"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import PreQualifiedButton from "@/components/PreQualifiedButton";

type NavChild = { label: string; href: string; external?: boolean };

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  {
    label: "Shop",
    href: "/inventory",
    children: [
      { label: "All Inventory", href: "/inventory" },
      { label: "Luxury Vehicles", href: "/inventory?category=luxury" },
      { label: "Sports Cars", href: "/inventory?category=sports" },
      { label: "SUVs", href: "/inventory?category=suv" },
      { label: "Under $100K", href: "/inventory?max=100000" },
    ],
  },
  {
    label: "Sell My Car",
    href: site.links.sellCar,
    children: [
      { label: "We Buy Your Vehicle", href: site.links.sellCar },
      { label: "Value Your Trade-In", href: site.links.tradeIn },
    ],
  },
  {
    label: "Financing",
    href: site.links.financing,
    children: [
      { label: "Apply Online", href: site.links.financing },
      { label: "Loan Calculator", href: site.links.loanCalculator },
    ],
  },
  {
    label: "Our Store",
    href: site.links.store,
    children: [
      { label: "Contact Us", href: site.links.store },
      { label: "About Us", href: site.links.about },
      { label: "Directions", href: site.links.directions },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isAdmin = pathname === site.links.admin;

  return (
    <header className="relative sticky top-0 z-50">
      {!isAdmin && (
        <div className="hidden border-b border-white/10 bg-brand-black md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 text-xs">
            <div className="flex items-center gap-5 text-white/70">
              <a href={site.phoneLink} className="inline-flex items-center gap-2 transition hover:text-white">
                <PhoneIcon />
                <span className="font-medium">{site.phone}</span>
              </a>
              <span className="hidden h-3 w-px bg-white/15 lg:block" aria-hidden />
              <span className="hidden items-center gap-2 lg:inline-flex">
                <LocationIcon />
                {site.fullAddress}
              </span>
            </div>
            <Link href={site.links.store} className="font-medium text-white/70 transition hover:text-white">
              Hours & Directions
            </Link>
          </div>
        </div>
      )}

      <nav
        className={`border-b border-white/10 bg-brand-black transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-black/40" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:py-3.5">
          <Link href="/" className="relative shrink-0">
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={822}
              height={271}
              className="h-14 w-auto object-contain sm:h-16 lg:h-[72px]"
              priority
            />
          </Link>

          <div className="hidden items-center gap-1 xl:gap-2 lg:flex">
            {navItems.map((item) => (
              <DesktopNavItem key={item.label} item={item} pathname={pathname} />
            ))}
          </div>

          {!isAdmin && (
            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={site.phoneLink}
                className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 xl:inline-flex"
              >
                <PhoneIcon className="text-brand-red" />
                {site.phone}
              </a>
              <PreQualifiedButton href={site.links.financing} className="btn-header-cta">
                Get Pre-Qualified
              </PreQualifiedButton>
            </div>
          )}

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white transition hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full z-50 max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-gray-100 bg-white shadow-xl lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4">
              {!isAdmin && (
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <a
                    href={site.phoneLink}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-brand-black"
                    onClick={() => setMobileOpen(false)}
                  >
                    <PhoneIcon className="text-brand-red" />
                    Call Us
                  </a>
                  <Link
                    href={site.links.store}
                    className="flex items-center justify-center rounded-xl border border-gray-200 py-3 text-sm font-semibold text-brand-black"
                    onClick={() => setMobileOpen(false)}
                  >
                    Directions
                  </Link>
                </div>
              )}

              {navItems.map((item) => (
                <div key={item.label} className="border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={item.href}
                      className="flex-1 py-3.5 text-sm font-semibold text-brand-black"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-50"
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        aria-expanded={openDropdown === item.label}
                        aria-label={`Expand ${item.label} menu`}
                      >
                        <ChevronIcon open={openDropdown === item.label} />
                      </button>
                    )}
                  </div>
                  {openDropdown === item.label && item.children && (
                    <div className="space-y-1 pb-3 pl-3">
                      {item.children.map((child) => (
                        <MobileDropdownLink
                          key={child.label}
                          {...child}
                          onClose={() => setMobileOpen(false)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {!isAdmin && (
                <PreQualifiedButton
                  href={site.links.financing}
                  className="btn-header-cta mt-5 block w-full text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Pre-Qualified
                </PreQualifiedButton>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}

function DesktopNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive =
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`) ||
    item.children?.some((child) => child.href.split("?")[0] === pathname);

  const linkClass = `nav-link ${isActive ? "nav-link-active" : ""}`;

  return (
    <div className="group relative">
      <div className="flex items-center">
        {item.external ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {item.label}
          </a>
        ) : (
          <Link href={item.href} className={linkClass}>
            {item.label}
          </Link>
        )}
        {item.children && (
          <ChevronIcon
            open={false}
            className="ml-0.5 h-3.5 w-3.5 text-white/50 transition group-hover:rotate-180 group-hover:text-white"
          />
        )}
      </div>

      {item.children && (
        <div className="invisible absolute left-0 top-[calc(100%+0.5rem)] z-50 min-w-[240px] translate-y-1 rounded-xl border border-gray-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          {item.children.map((child) => (
            <DropdownLink key={child.label} {...child} />
          ))}
        </div>
      )}
    </div>
  );
}

function DropdownLink({ label, href, external }: NavChild) {
  const className =
    "block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-brand-red";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function MobileDropdownLink({ label, href, external, onClose }: NavChild & { onClose: () => void }) {
  const className = "block rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-brand-red";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClose}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClose}>
      {label}
    </Link>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-3.5 w-3.5 ${className}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
