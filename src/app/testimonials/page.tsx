import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata = { title: "Testimonials | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <PageHero title="Testimonials" subtitle="What our customers say about us." />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-lg leading-relaxed text-gray-600">Brooklyn Auto Sales is proud to serve Staten Island and the greater New York area. Fair prices, superior service, and satisfied customers — that is our promise.</p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
