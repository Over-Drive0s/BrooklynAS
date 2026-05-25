import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata = { title: "About Us | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <PageHero title="About Us" subtitle="Learn more about Brooklyn Auto Sales in Staten Island." />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-lg leading-relaxed text-gray-600">{site.description}</p>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{site.about}</p>
                    <div />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
