import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata = { title: "Directions | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <PageHero title="Directions" subtitle="Find Brooklyn Auto Sales in Staten Island." />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-lg text-gray-600">{site.fullAddress}</p>
          <div className="mt-8 aspect-video overflow-hidden rounded-xl shadow-card">
            <iframe title="Brooklyn Auto Sales Map" src="https://maps.google.com/maps?q=161+Marion+St+Staten+Island+NY+10310&output=embed" className="h-full w-full border-0" loading="lazy" />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
