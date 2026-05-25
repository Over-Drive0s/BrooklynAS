"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { inventory } from "@/data/inventory";
import {
  categories,
  categorizeVehicle,
  parsePrice,
  sortVehicles,
  sortOptions,
  getUniqueMakes,
  type Category,
  type SortOption,
} from "@/data/site";
import VehicleCard from "./VehicleCard";

function filterButtonClass(active: boolean) {
  return active
    ? "mb-2 block w-full rounded-lg bg-brand-red px-3 py-2 text-left text-sm font-semibold text-white"
    : "mb-2 block w-full rounded-lg bg-gray-50 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100";
}

export default function InventoryBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = (searchParams.get("category") as Category) || "all";
  const maxPrice = searchParams.get("max");
  const makeFilter = searchParams.get("make") || "";
  const sort = (searchParams.get("sort") as SortOption) || "price-desc";
  const search = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(search);
  const makes = useMemo(() => getUniqueMakes(inventory), []);

  const filtered = useMemo(() => {
    const results = inventory.filter((vehicle) => {
      const cats = categorizeVehicle(vehicle);
      if (category !== "all" && !cats.includes(category)) return false;
      if (maxPrice && parsePrice(vehicle.price) > parseInt(maxPrice, 10)) return false;
      if (makeFilter && !vehicle.title.includes(makeFilter)) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = `${vehicle.title} ${vehicle.trim} ${vehicle.price}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    return sortVehicles(results, sort);
  }, [category, maxPrice, makeFilter, sort, search]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || (key === "category" && value === "all")) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/inventory?${params.toString()}`, { scroll: false });
  };

  const setCategory = (next: Category) => {
    updateParams({ category: category === next ? "all" : next });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: searchInput || null });
  };

  const clearFilters = () => {
    setSearchInput("");
    router.push("/inventory");
  };

  const hasFilters = category !== "all" || maxPrice || makeFilter || search || sort !== "price-desc";

  const priceOptions = [
    { label: "Any Price", value: null as string | null },
    { label: "Under $100,000", value: "100000" },
    { label: "Under $75,000", value: "75000" },
    { label: "Under $50,000", value: "50000" },
  ];

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="w-full shrink-0 lg:w-72">
        <div className="sticky top-36 rounded-xl bg-white p-6 shadow-card">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-black">Filters</h2>
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="text-xs font-semibold text-brand-red hover:underline">
                Clear All
              </button>
            )}
          </div>
          <div className="space-y-5">
            <FilterSection title="Search">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Make, model, keyword..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red" />
                <button type="submit" className="rounded-lg bg-brand-red px-3 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark">Go</button>
              </form>
            </FilterSection>
            <FilterSection title="Category">
              {categories.map((cat) => (
                <button key={cat.id} type="button" onClick={() => setCategory(cat.id)} className={filterButtonClass(category === cat.id)}>
                  {cat.label}
                </button>
              ))}
            </FilterSection>
            <FilterSection title="Price Range">
              <div className="space-y-2">
                {priceOptions.map((opt) => (
                  <button key={opt.label} type="button" onClick={() => updateParams({ max: opt.value })} className={filterButtonClass(maxPrice === opt.value || (!maxPrice && !opt.value))}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </FilterSection>
            <FilterSection title="Make">
              <select value={makeFilter} onChange={(e) => updateParams({ make: e.target.value || null })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-red focus:outline-none">
                <option value="">All Makes</option>
                {makes.map((make) => (<option key={make} value={make}>{make}</option>))}
              </select>
            </FilterSection>
          </div>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">Showing <span className="font-semibold text-brand-black">{filtered.length}</span> vehicles</p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-600">Sort by</label>
            <select id="sort" value={sort} onChange={(e) => updateParams({ sort: e.target.value })} className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-red focus:outline-none">
              {sortOptions.map((opt) => (<option key={opt.id} value={opt.id}>{opt.label}</option>))}
            </select>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((vehicle) => (<VehicleCard key={vehicle.id} vehicle={vehicle} />))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-xl bg-white py-20 text-center shadow-card">
            <p className="text-lg text-gray-500">No vehicles match your filters.</p>
            <button type="button" onClick={clearFilters} className="btn-primary mt-4">View All Inventory</button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-black">{title}</h3>
      {children}
    </div>
  );
}
