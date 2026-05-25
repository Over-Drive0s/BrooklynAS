"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { inventory } from "@/data/inventory";
import { categories, getMakeModelCatalog, type Category } from "@/data/site";
import { scrollToTop } from "@/lib/scroll";

export default function HeroSearch() {
  const router = useRouter();
  const [type, setType] = useState<Category>("all");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const catalog = useMemo(() => getMakeModelCatalog(inventory), []);
  const availableModels = make ? (catalog.modelsByMake[make] ?? []) : [];

  const handleMakeChange = (value: string) => {
    setMake(value);
    setModel("");
    scrollToTop();
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    scrollToTop();
  };

  const handleTypeChange = (value: Category) => {
    setType(value);
    scrollToTop();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type !== "all") params.set("category", type);
    if (make) params.set("make", make);
    if (model.trim()) params.set("q", model.trim());
    const qs = params.toString();
    scrollToTop();
    router.push(qs ? `/inventory?${qs}` : "/inventory");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-4 shadow-xl md:p-5"
      aria-label="Search inventory"
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-black md:mb-4">Search Inventory</p>
      <div className="grid gap-3">
        <SearchField label="Type" id="hero-search-type">
          <select
            id="hero-search-type"
            value={type}
            onChange={(e) => handleTypeChange(e.target.value as Category)}
            className={fieldClass}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </SearchField>

        <SearchField label="Make" id="hero-search-make">
          <select
            id="hero-search-make"
            value={make}
            onChange={(e) => handleMakeChange(e.target.value)}
            className={fieldClass}
          >
            <option value="">All Makes</option>
            {catalog.makes.map((brand) => (
              <option key={brand} value={brand}>
                {brand} ({catalog.countByMake[brand]})
              </option>
            ))}
          </select>
        </SearchField>

        <SearchField label="Models" id="hero-search-model">
          <select
            id="hero-search-model"
            value={model}
            onChange={(e) => handleModelChange(e.target.value)}
            className={fieldClass}
            disabled={!make}
          >
            <option value="">{make ? "All Models" : "Select a make first"}</option>
            {availableModels.map((modelName) => (
              <option key={modelName} value={modelName}>
                {modelName}
              </option>
            ))}
          </select>
        </SearchField>

        <div className="flex items-end">
          <button type="submit" className="btn-primary w-full py-3">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

function SearchField({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </label>
      {children}
    </div>
  );
}

const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-brand-black placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red disabled:bg-gray-50 disabled:text-gray-400";
