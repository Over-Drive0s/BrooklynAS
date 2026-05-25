import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import { site } from "@/data/site";

export const metadata = { title: "Value Your Trade-In | Brooklyn Auto Sales" };

export default function TradeInPage() {
  return (
    <>
      <PageHero title="Value Your Trade-In" subtitle="Find out what your current vehicle is worth." />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-lg text-gray-600">Trade in your current vehicle and apply its value toward your next purchase at Brooklyn Auto Sales.</p>
          <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-card">
            <iframe title="Trade-In Form" src={site.external.tradeForm} className="h-[700px] w-full border-0" />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
