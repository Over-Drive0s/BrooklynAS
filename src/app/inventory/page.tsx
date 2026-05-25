import { Suspense } from "react";
import InventoryBrowser from "@/components/InventoryBrowser";
import ContactCTA from "@/components/ContactCTA";

export const metadata = {
  title: "Inventory | Brooklyn Auto Sales",
  description: "Browse our full selection of quality pre-owned vehicles in Staten Island, NY.",
};

export default function InventoryPage() {
  return (
    <>
      <section className="bg-brand-gray py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <Suspense fallback={<p className="text-gray-500">Loading inventory...</p>}>
            <InventoryBrowser />
          </Suspense>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
