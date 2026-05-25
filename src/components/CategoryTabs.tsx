"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, categorizeVehicle, type Category } from "@/data/site";
import { inventory } from "@/data/inventory";
import VehicleCard from "./VehicleCard";

export default function CategoryTabs() {
  const [active, setActive] = useState<Category>("all");

  const filtered = inventory.filter((v) => categorizeVehicle(v).includes(active)).slice(0, 8);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="section-heading">A Vehicle for Every Journey</h2>
        <p className="section-subheading">
          Whether you are looking for luxury, performance, or everyday practicality, find the perfect fit.
        </p>

        
        <div className="mt-8 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                active === cat.id
                  ? "bg-brand-red text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.url} vehicle={vehicle} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-gray-500">No vehicles found in this category.</p>
        )}

        <div className="mt-10 text-center">
          <Link href={`/inventory${active !== "all" ? `?category=${active}` : ""}`} className="btn-outline">
            Browse All {categories.find((c) => c.id === active)?.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
