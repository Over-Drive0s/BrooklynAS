"use client";

import { useRef } from "react";
import Link from "next/link";
import VehicleCard from "./VehicleCard";
import type { Vehicle } from "@/data/site";

type FeaturedInventoryProps = {
  vehicles: Vehicle[];
  title?: string;
  showViewAll?: boolean;
};

export default function FeaturedInventory({
  vehicles,
  title = "Featured Inventory",
  showViewAll = true,
}: FeaturedInventoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-brand-gray py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="section-heading">{title}</h2>
            <p className="section-subheading">
              Browse our hand-picked selection of premium pre-owned vehicles.
            </p>
          </div>
          {showViewAll && (
            <Link href="/inventory" className="hidden text-sm font-semibold uppercase tracking-wide text-brand-red hover:underline md:block">
              View All Inventory →
            </Link>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-gray-50 md:flex"
            aria-label="Scroll left"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-5 overflow-x-auto pb-2"
          >
            {vehicles.map((vehicle, i) => (
              <div key={vehicle.url} className="w-[280px] flex-shrink-0 sm:w-[300px]">
                <VehicleCard vehicle={vehicle} priority={i < 3} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-gray-50 md:flex"
            aria-label="Scroll right"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {showViewAll && (
          <div className="mt-8 text-center md:hidden">
            <Link href="/inventory" className="btn-primary">
              View All Inventory
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
