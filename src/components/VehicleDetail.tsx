"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import type { Vehicle } from "@/data/site";
import VehicleCard from "./VehicleCard";

type VehicleDetailProps = {
  vehicle: Vehicle;
  related: Vehicle[];
};

export default function VehicleDetail({ vehicle, related }: VehicleDetailProps) {
  const [activeImage, setActiveImage] = useState(vehicle.image);

  return (
    <div className="bg-brand-gray min-h-screen">
            <div className="bg-brand-black py-6 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <Link href="/inventory" className="text-sm text-white/70 hover:text-white">&larr; Back to Inventory</Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-xl bg-white shadow-card">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image src={activeImage} alt={vehicle.alt} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 60vw" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-card lg:sticky lg:top-36">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">Pre-Owned</p>
              <h1 className="mt-1 text-2xl font-bold text-brand-black md:text-3xl">{vehicle.title}</h1>
              <p className="mt-2 text-gray-600">{vehicle.trim}</p>
              <p className="mt-4 text-3xl font-bold text-brand-red">{vehicle.price}</p>

              <dl className="mt-6 space-y-3 border-t border-gray-100 pt-6 text-sm">
                {vehicle.mileage && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Mileage</dt>
                    <dd className="font-medium text-brand-black">{vehicle.mileage}</dd>
                  </div>
                )}
                {vehicle.drive && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Drivetrain</dt>
                    <dd className="font-medium text-brand-black">{vehicle.drive}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-8 space-y-3">
                <a href={site.phoneLink} className="btn-primary block w-full text-center">Call {site.phone}</a>
                <Link href={site.links.financing} className="btn-outline block w-full text-center">Apply for Financing</Link>
                <Link href={site.links.directions} className="block w-full rounded-full border border-gray-200 py-3 text-center text-sm font-semibold uppercase tracking-wide text-brand-black hover:bg-gray-50">
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
