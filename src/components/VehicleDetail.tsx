"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import type { Vehicle } from "@/data/site";
import VehicleCard from "./VehicleCard";

type VehicleDetailProps = {
  vehicle: Vehicle;
  related: Vehicle[];
};

type SpecRow = {
  label: string;
  value: string;
};

function getGalleryImages(vehicle: Vehicle): string[] {
  if (vehicle.images?.length) return vehicle.images;
  return vehicle.image ? [vehicle.image] : [];
}

export default function VehicleDetail({ vehicle, related }: VehicleDetailProps) {
  const gallery = useMemo(() => getGalleryImages(vehicle), [vehicle]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex] ?? vehicle.image;
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    thumbnailRefs.current = thumbnailRefs.current.slice(0, gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    const activeThumbnail = thumbnailRefs.current[activeIndex];
    activeThumbnail?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  const goToPrevious = () => {
    setActiveIndex((index) => (index - 1 + gallery.length) % gallery.length);
  };

  const goToNext = () => {
    setActiveIndex((index) => (index + 1) % gallery.length);
  };

  const specs: SpecRow[] = [
    { label: "Stock #", value: vehicle.stock ?? "" },
    { label: "VIN", value: vehicle.vin ?? "" },
    { label: "Exterior", value: vehicle.exteriorColor ?? "" },
    { label: "Interior", value: vehicle.interiorColor ?? "" },
    { label: "Engine", value: vehicle.engine ?? "" },
    { label: "Transmission", value: vehicle.transmission ?? "" },
    { label: "Drivetrain", value: vehicle.drive ?? "" },
    { label: "Body Style", value: vehicle.bodyStyle ?? "" },
    { label: "Fuel", value: vehicle.fuel ?? "" },
  ].filter((row) => row.value);

  return (
    <div className="bg-brand-gray min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Link href="/inventory" className="text-sm font-medium text-gray-600 hover:text-brand-black">
          &larr; Back to Inventory
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-xl bg-white shadow-card">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={activeImage}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} - photo ${activeIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goToPrevious}
                      className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                      aria-label="Previous photo"
                    >
                      <ChevronIcon direction="left" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                      aria-label="Next photo"
                    >
                      <ChevronIcon direction="right" />
                    </button>
                    <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
                      {activeIndex + 1} / {gallery.length}
                    </div>
                  </>
                )}
              </div>

              {gallery.length > 1 && (
                <div className="border-t border-gray-100 p-4">
                  <div className="flex gap-2 overflow-x-auto scroll-smooth pb-1">
                    {gallery.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        ref={(element) => {
                          thumbnailRefs.current[index] = element;
                        }}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition ${
                          index === activeIndex
                            ? "border-brand-red ring-2 ring-brand-red/20"
                            : "border-transparent opacity-80 hover:opacity-100"
                        }`}
                        aria-label={`View photo ${index + 1}`}
                        aria-pressed={index === activeIndex}
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    {activeIndex + 1} of {gallery.length} photos
                  </p>
                </div>
              )}
            </div>

            {vehicle.description && (
              <section className="mt-8 rounded-xl bg-white p-6 shadow-card">
                <h2 className="text-lg font-bold text-brand-black">About This Vehicle</h2>
                <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                  {vehicle.description}
                </div>
              </section>
            )}

            {specs.length > 0 && (
              <section className="mt-8 rounded-xl bg-white p-6 shadow-card">
                <h2 className="text-lg font-bold text-brand-black">Specifications</h2>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {specs.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4 border-b border-gray-100 pb-3 text-sm">
                      <dt className="text-gray-500">{row.label}</dt>
                      <dd className="text-right font-medium text-brand-black">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-card lg:sticky lg:top-36">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">Pre-Owned</p>

              <div className="mt-3 space-y-1">
                <p className="text-4xl font-bold tracking-tight text-brand-black">{vehicle.year}</p>
                <h1 className="text-2xl font-bold text-brand-black md:text-3xl">
                  {vehicle.make} {vehicle.model}
                </h1>
                {vehicle.trim && <p className="text-base text-gray-600">{vehicle.trim}</p>}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-brand-gray px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Miles</p>
                  <p className="mt-1 text-lg font-bold text-brand-black">
                    {vehicle.mileage || "Contact for miles"}
                  </p>
                </div>
                <div className="rounded-lg bg-brand-red/10 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">Price</p>
                  <p className="mt-1 text-lg font-bold text-brand-red">{vehicle.price}</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <a href={site.phoneLink} className="btn-primary block w-full text-center">
                  Call {site.phone}
                </a>
                <Link href={site.links.financing} className="btn-outline block w-full text-center">
                  Apply for Financing
                </Link>
                <Link
                  href={site.links.store}
                  className="block w-full rounded-full border border-gray-200 py-3 text-center text-sm font-semibold uppercase tracking-wide text-brand-black hover:bg-gray-50"
                >
                  Schedule a Visit
                </Link>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="section-heading">Similar Vehicles</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      {direction === "left" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      )}
    </svg>
  );
}
