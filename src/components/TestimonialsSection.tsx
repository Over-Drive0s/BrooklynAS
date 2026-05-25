"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { carsComReviewsUrl, shuffleTestimonials, testimonials, type Testimonial } from "@/data/testimonials";
import { site } from "@/data/site";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-brand-red" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const pathname = usePathname();
  const [featured, setFeatured] = useState<Testimonial[]>(() => testimonials.slice(0, 3));

  useEffect(() => {
    setFeatured(shuffleTestimonials(testimonials).slice(0, 3));
  }, []);

  const hiddenPaths = [site.links.testimonials, site.links.admin];
  if (hiddenPaths.includes(pathname)) return null;

  return (
    <section className="border-t border-gray-200 bg-white py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">Customer Reviews</p>
            <h2 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">What Our Customers Say</h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              Real reviews from Brooklyn Auto Sales customers on{" "}
              <a
                href={carsComReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-red hover:underline"
              >
                Cars.com
              </a>
            </p>
          </div>
          <Link
            href={site.links.testimonials}
            className="text-sm font-semibold uppercase tracking-wide text-brand-red hover:underline"
          >
            View All Testimonials →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((review) => (
            <article
              key={review.id}
              className="flex flex-col rounded-xl border border-gray-100 bg-brand-gray p-6 shadow-sm"
            >
              <StarRating rating={review.rating} />
              <h3 className="mt-4 text-lg font-bold text-brand-black">{review.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">{review.text}</p>
              <div className="mt-5 border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-brand-black">{review.author}</p>
                <p className="text-xs text-gray-500">
                  {review.location} · {review.date}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          Reviews sourced from{" "}
          <a href={carsComReviewsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red">
            Cars.com — Brooklyn Auto Sales
          </a>
        </p>
      </div>
    </section>
  );
}
