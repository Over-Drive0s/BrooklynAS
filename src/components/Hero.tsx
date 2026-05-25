"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";

const quickActions = [
  { title: "Shop Vehicles", subtitle: "Pre-Owned", href: "/inventory", icon: "car" },
  { title: "Apply Today", subtitle: "Financing", href: site.links.financing, icon: "finance" },
  { title: "We Buy Cars", subtitle: "Sell My Car", href: site.links.sellCar, icon: "sell" },
  { title: "Get a Quote", subtitle: "Trade-In", href: site.links.tradeIn, icon: "trade" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % site.banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative">
      
      <div className="relative h-[420px] overflow-hidden md:h-[520px] lg:h-[600px]">
        {site.banners.map((banner, index) => (
          <div
            key={banner}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={banner} alt={`Brooklyn Auto Sales showcase ${index + 1}`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="max-w-xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-400">
                Staten Island&apos;s Premier Dealer
              </p>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Shopping for Cars, Made Easy
              </h1>
              <p className="mt-4 text-lg text-white/85">{site.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/inventory" className="btn-primary">Shop Inventory</Link>
                <a href={site.phoneLink} className="btn-outline border-white text-white hover:bg-white hover:text-brand-black">
                  Call {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {site.banners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-brand-red" : "w-2 bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 -mt-16 mx-auto max-w-7xl px-4 pb-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {quickActions.map((action) => {
            const className = "flex items-center gap-3 rounded-xl bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover md:p-5";
            const inner = (
              <>
                <ActionIcon type={action.icon} />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{action.subtitle}</p>
                  <p className="text-sm font-bold text-brand-black md:text-base">{action.title}</p>
                </div>
              </>
            );
            return (
              <Link key={action.title} href={action.href} className={className}>{inner}</Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ActionIcon({ type }: { type: string }) {
  const wrapper = "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red";
  const icons: Record<string, string> = {
    car: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z",
    finance: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
    sell: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    trade: "M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z",
  };
  return (
    <div className={wrapper}>
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d={icons[type] || icons.car} />
      </svg>
    </div>
  );
}
