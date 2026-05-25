import ContactCTA from "@/components/ContactCTA";
import { site } from "@/data/site";

export const metadata = { title: "We Buy Your Vehicle | Brooklyn Auto Sales" };

export default function SellMyCarPage() {
  return (
    <>
      <section className="bg-brand-gray py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-black md:text-4xl">We Buy Your Vehicle</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Get a fair offer for your car, truck, or SUV. Get a quick appraisal and competitive offer from our team.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <iframe title="Sell My Car" src={site.external.sellForm} className="h-[700px] w-full border-0" />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
