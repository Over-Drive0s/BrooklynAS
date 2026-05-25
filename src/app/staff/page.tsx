import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata = { title: "Meet Our Staff | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <PageHero title="Meet Our Staff" subtitle="Our friendly team is here to help." />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-lg leading-relaxed text-gray-600">Our knowledgeable sales staff is dedicated to helping you find the perfect vehicle at a price that fits your budget. Visit us today and experience the Brooklyn Auto Sales difference.</p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
