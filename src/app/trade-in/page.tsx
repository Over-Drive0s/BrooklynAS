import ContactCTA from "@/components/ContactCTA";
import { site } from "@/data/site";

export const metadata = { title: "Value Your Trade-In | Brooklyn Auto Sales" };

export default function TradeInPage() {
  return (
    <>
      <section className="bg-brand-gray py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-black md:text-4xl">Value Your Trade-In</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Find out what your current vehicle is worth. Trade in your current vehicle and apply its value toward
              your next purchase at Brooklyn Auto Sales.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <iframe title="Trade-In Form" src={site.external.tradeForm} className="h-[700px] w-full border-0" />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
