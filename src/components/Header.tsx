"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/data/site";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden border-b border-white/10 bg-brand-black md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-white/70">
          <div className="flex items-center gap-4">
            <a href={site.phoneLink} className="flex items-center gap-1.5 hover:text-white">
              <PhoneIcon />
              {site.phone}
            </a>
            <span className="flex items-center gap-1.5">
              <LocationIcon />
              {site.fullAddress}
            </span>
          </div>
          <Link href={site.links.store} className="hover:text-white">
            Hours & Directions
          </Link>
        </div>
      </div>

      <nav className="bg-brand-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
          <Link href="/" className="relative flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={822}
              height={271}
              className="h-16 w-auto object-contain md:h-20 lg:h-[88px]"
              priority
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div key={item.label} className="group relative">
                <NavLink item={item} />
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-2 rounded-lg bg-white py-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <DropdownLink key={child.label} {...child} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href={site.links.financing}
              className="ml-4 rounded-full bg-brand-red px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-brand-red-dark"
            >
              Get Pre-Qualified
            </Link>
          </div>

          <button
            type="button"
            className="rounded p-2 text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-brand-black px-4 py-4 lg:hidden">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-white/10 py-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-2 text-sm font-semibold uppercase text-white"
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronIcon open={openDropdown === item.label} />
                </button>
                {openDropdown === item.label && item.children && (
                  <div className="pb-2 pl-4">
                    {item.children.map((child) => (
                      <MobileDropdownLink key={child.label} {...child} onClose={() => setMobileOpen(false)} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href={site.links.financing}
              className="btn-primary mt-4 block w-full text-center"
              onClick={() => setMobileOpen(false)}
            >
              Get Pre-Qualified
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const className = "nav-link px-4 py-2";

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

function DropdownLink({ label, href, external }: NavChild) {
  const className = "block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-red";
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
  const className = "block py-2 text-sm text-white/80 hover:text-white";
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

function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
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
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

