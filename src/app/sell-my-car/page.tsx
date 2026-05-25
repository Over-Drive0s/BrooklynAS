import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import { site } from "@/data/site";

export const metadata = { title: "We Buy Your Vehicle | Brooklyn Auto Sales" };

export default function SellMyCarPage() {
  return (
    <>
      <PageHero title="We Buy Your Vehicle" subtitle="Get a fair offer for your car, truck, or SUV." />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <p className="mb-8 text-center text-lg text-gray-600">Get a quick appraisal and competitive offer from our team.</p>
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <iframe title="Sell My Car" src={site.external.sellForm} className="h-[700px] w-full border-0" />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
