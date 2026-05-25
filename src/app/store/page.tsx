import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata = { title: "Store Info | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <PageHero title="Store Info" subtitle="Visit Brooklyn Auto Sales in Staten Island." />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-lg text-gray-600">{site.fullAddress}</p>
          <p className="mt-2 text-lg"><a href={site.phoneLink} className="font-semibold text-brand-red hover:underline">{site.phone}</a></p>
          <ul className="mt-6 space-y-2 text-gray-700">
            {site.hours.map((h) => (<li key={h.day}><strong>{h.day}:</strong> {h.hours}</li>))}
          </ul>
          <div className="mt-8"><Link href={site.links.directions} className="btn-primary">Get Directions</Link></div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
