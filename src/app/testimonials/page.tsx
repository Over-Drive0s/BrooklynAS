import BackLink from "@/components/BackLink";
import ContactCTA from "@/components/ContactCTA";
import TestimonialsList from "@/components/TestimonialsList";
import { carsComReviewsUrl } from "@/data/testimonials";

export const metadata = { title: "Testimonials | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <section className="bg-brand-gray py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-black md:text-4xl">Testimonials</h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-gray-600">
              What our customers say about us. Brooklyn Auto Sales is proud to serve Staten Island and the greater New
              York area. Fair prices, superior service, and satisfied customers — that is our promise.
            </p>
            <BackLink className="mt-4 inline-block text-sm font-semibold text-brand-red hover:underline" />
          </div>

          <TestimonialsList />

          <div className="mt-10 text-center">
            <a
              href={carsComReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold text-brand-red hover:underline"
            >
              Read all 48 reviews on Cars.com →
            </a>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
