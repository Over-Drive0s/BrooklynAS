import BackLink from "@/components/BackLink";
import ContactCTA from "@/components/ContactCTA";
import LeaveReviewForm from "@/components/LeaveReviewForm";
import TestimonialsList from "@/components/TestimonialsList";
import { carsComReviewsUrl, testimonials } from "@/data/testimonials";

export const metadata = { title: "Testimonials | Brooklyn Auto Sales" };

const stats = [
  { label: "Total Reviews", value: "48+" },
  { label: "Featured Stories", value: String(testimonials.length) },
  { label: "Average Rating", value: "5.0" },
];

export default function Page() {
  return (
    <>
      <section className="bg-brand-gray py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <BackLink className="text-sm font-semibold text-brand-red hover:underline" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-brand-red">Customer Reviews</p>
            <h1 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">Testimonials</h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              What our customers say about us. Brooklyn Auto Sales is proud to serve Staten Island and the greater New
              York area — fair prices, superior service, and satisfied customers.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-100 bg-white px-5 py-6 text-center shadow-card"
              >
                <p className="text-3xl font-bold text-brand-red">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <TestimonialsList />

          <LeaveReviewForm />

          <div className="mt-10 rounded-xl border border-gray-100 bg-white p-6 text-center shadow-card md:p-8">
            <h2 className="text-xl font-bold text-brand-black">Read More on Cars.com</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
              Browse the full collection of customer reviews for Brooklyn Auto Sales on Cars.com.
            </p>
            <a
              href={carsComReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-block"
            >
              Read All 48 Reviews
            </a>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
