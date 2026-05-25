"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import VehicleCard from "./VehicleCard";
import type { Vehicle } from "@/data/site";

type FeaturedInventoryProps = {
  vehicles: Vehicle[];
  title?: string;
  showViewAll?: boolean;
};

const CARDS_PER_SCROLL = 4;
const PAUSE_MS = 4200;
const SCROLL_MS = 1600;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateScroll(container: HTMLDivElement, targetLeft: number, duration: number): Promise<void> {
  const start = container.scrollLeft;
  const distance = targetLeft - start;
  const startTime = performance.now();

  return new Promise((resolve) => {
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollLeft = start + distance * easeInOutCubic(progress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
}

export default function FeaturedInventory({
  vehicles,
  title = "Featured Inventory",
  showViewAll = true,
}: FeaturedInventoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const animatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getStep = useCallback((count = CARDS_PER_SCROLL) => {
    const container = scrollRef.current;
    if (!container) return 320 * count;

    const item = container.querySelector<HTMLElement>("[data-carousel-item]");
    if (!item) return container.clientWidth * 0.8;

    const gap = parseFloat(getComputedStyle(container).columnGap || getComputedStyle(container).gap || "20");
    return (item.offsetWidth + gap) * count;
  }, []);

  const smoothScrollBy = useCallback(
    async (delta: number) => {
      const container = scrollRef.current;
      if (!container || animatingRef.current) return;

      animatingRef.current = true;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const target = Math.max(0, Math.min(container.scrollLeft + delta, maxScroll));
      await animateScroll(container, target, SCROLL_MS);
      animatingRef.current = false;
    },
    []
  );

  const smoothScrollTo = useCallback(async (left: number) => {
    const container = scrollRef.current;
    if (!container || animatingRef.current) return;

    animatingRef.current = true;
    await animateScroll(container, left, SCROLL_MS);
    animatingRef.current = false;
  }, []);

  const scrollManual = useCallback(
    async (direction: "left" | "right") => {
      pausedRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);

      const step = getStep();
      await smoothScrollBy(direction === "left" ? -step : step);

      timerRef.current = setTimeout(() => {
        pausedRef.current = false;
      }, PAUSE_MS);
    },
    [getStep, smoothScrollBy]
  );

  const advanceCarousel = useCallback(async () => {
    const container = scrollRef.current;
    if (!container || vehicles.length === 0) return;

    if (pausedRef.current || animatingRef.current) {
      timerRef.current = setTimeout(() => {
        void advanceCarousel();
      }, PAUSE_MS);
      return;
    }

    const step = getStep();
    const maxScroll = container.scrollWidth - container.clientWidth;
    const atEnd = container.scrollLeft >= maxScroll - 8;

    if (atEnd) {
      await smoothScrollTo(0);
    } else {
      await smoothScrollBy(step);
    }

    timerRef.current = setTimeout(() => {
      void advanceCarousel();
    }, PAUSE_MS);
  }, [getStep, smoothScrollBy, smoothScrollTo, vehicles.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || vehicles.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    timerRef.current = setTimeout(() => {
      void advanceCarousel();
    }, PAUSE_MS);

    const pause = () => {
      pausedRef.current = true;
    };

    const resume = () => {
      pausedRef.current = false;
    };

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);
    container.addEventListener("focusin", pause);
    container.addEventListener("focusout", resume);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
      container.removeEventListener("focusin", pause);
      container.removeEventListener("focusout", resume);
    };
  }, [advanceCarousel, vehicles.length]);

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
            <Link
              href="/inventory"
              className="hidden text-sm font-semibold uppercase tracking-wide text-brand-red hover:underline md:block"
            >
              View All Inventory →
            </Link>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => void scrollManual("left")}
            className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-gray-50 md:flex"
            aria-label="Scroll left"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div ref={scrollRef} className="no-scrollbar flex gap-5 overflow-x-auto pb-2">
            {vehicles.map((vehicle, i) => (
              <div key={vehicle.url} data-carousel-item className="w-[280px] shrink-0 sm:w-[300px]">
                <VehicleCard vehicle={vehicle} priority={i < 3} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => void scrollManual("right")}
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
