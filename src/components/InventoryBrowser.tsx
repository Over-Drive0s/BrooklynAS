"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { inventory } from "@/data/inventory";
import {
  categories,
  categorizeVehicle,
  parsePrice,
  sortVehicles,
  sortOptions,
  getMakeModelCatalog,
  getVehicleMake,
  getVehicleModel,
  getVehicleSearchText,
  type Category,
  type SortOption,
} from "@/data/site";
import VehicleCard from "./VehicleCard";
import { scrollToTop } from "@/lib/scroll";

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
  const selectedModels = useMemo(
    () => (searchParams.get("models") || "").split(",").filter(Boolean),
    [searchParams]
  );
  const sort = (searchParams.get("sort") as SortOption) || "price-desc";
  const search = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(search);
  const catalog = useMemo(() => getMakeModelCatalog(inventory), []);
  const availableModels = makeFilter ? (catalog.modelsByMake[makeFilter] ?? []) : [];
  const searchQuery = searchInput.trim().toLowerCase();

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = searchInput.trim();
      const current = search.trim();
      if (next === current) return;

      const params = new URLSearchParams(searchParams.toString());
      if (next) {
        params.set("q", next);
      } else {
        params.delete("q");
      }
      const qs = params.toString();
      router.replace(qs ? `/inventory?${qs}` : "/inventory", { scroll: false });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput, search, searchParams, router]);

  const filtered = useMemo(() => {
    const results = inventory.filter((vehicle) => {
      const cats = categorizeVehicle(vehicle);
      if (category !== "all" && !cats.includes(category)) return false;
      if (maxPrice && parsePrice(vehicle.price) > parseInt(maxPrice, 10)) return false;
      if (makeFilter && getVehicleMake(vehicle) !== makeFilter) return false;
      if (selectedModels.length > 0 && !selectedModels.includes(getVehicleModel(vehicle))) return false;
      if (searchQuery && !getVehicleSearchText(vehicle).includes(searchQuery)) return false;
      return true;
    });
    return sortVehicles(results, sort);
  }, [category, maxPrice, makeFilter, selectedModels, searchQuery, sort]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || (key === "category" && value === "all")) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/inventory?${params.toString()}`);
    scrollToTop();
  };

  const setCategory = (next: Category) => {
    updateParams({ category: category === next ? "all" : next });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: searchInput.trim() || null });
  };

  const clearSearch = () => {
    setSearchInput("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    const qs = params.toString();
    router.replace(qs ? `/inventory?${qs}` : "/inventory", { scroll: false });
  };

  const handleMakeChange = (value: string) => {
    updateParams({ make: value || null, models: null });
  };

  const toggleModel = (model: string) => {
    const next = selectedModels.includes(model)
      ? selectedModels.filter((item) => item !== model)
      : [...selectedModels, model];
    updateParams({ models: next.length ? next.join(",") : null });
  };

  const clearFilters = () => {
    setSearchInput("");
    router.push("/inventory");
    scrollToTop();
  };

  const hasFilters =
    category !== "all" ||
    maxPrice ||
    makeFilter ||
    selectedModels.length > 0 ||
    searchQuery ||
    sort !== "price-desc";

  const priceOptions = [
    { label: "Any Price", value: null as string | null },
    { label: "Under $100,000", value: "100000" },
    { label: "Under $75,000", value: "75000" },
    { label: "Under $50,000", value: "50000" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-brand-black md:text-4xl">Shop Pre-Owned Vehicles</h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-600">
          Explore our complete inventory of luxury, sports, and everyday vehicles at Brooklyn Auto Sales.
        </p>
      </div>
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
              <form onSubmit={handleSearch} className="space-y-2">
                <div className="flex overflow-hidden rounded-lg border border-gray-200 focus-within:border-brand-red focus-within:ring-1 focus-within:ring-brand-red">
                  <span className="flex shrink-0 items-center border-r border-gray-200 bg-gray-50 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Search
                  </span>
                  <input
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="All inventory — year, make, model, VIN, stock #..."
                    className="min-w-0 flex-1 border-0 bg-white px-3 py-2 text-sm text-brand-black placeholder:text-gray-400 focus:outline-none"
                    aria-label="Search all inventory"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-brand-red px-3 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark"
                  >
                    Search
                  </button>
                  {searchInput ? (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
                <p className="text-xs text-gray-500">Searches all {inventory.length} vehicles as you type.</p>
              </form>
            </FilterSection>
            <FilterSection title="Make">
              <select
                value={makeFilter}
                onChange={(e) => handleMakeChange(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-red focus:outline-none"
              >
                <option value="">All Makes</option>
                {catalog.makes.map((make) => (
                  <option key={make} value={make}>
                    {make} ({catalog.countByMake[make]})
                  </option>
                ))}
              </select>
              {makeFilter ? (
                <div className="mt-4 max-h-48 space-y-2 overflow-y-auto rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Models</p>
                  {availableModels.map((model) => (
                    <label
                      key={model}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 text-sm text-gray-700 hover:bg-white"
                    >
                      <input
                        type="checkbox"
                        checked={selectedModels.includes(model)}
                        onChange={() => toggleModel(model)}
                        className="h-4 w-4 rounded border-gray-300 text-brand-red focus:ring-brand-red"
                      />
                      <span>{model}</span>
                    </label>
                  ))}
                </div>
              ) : null}
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
