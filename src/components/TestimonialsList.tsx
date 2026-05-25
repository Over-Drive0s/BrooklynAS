"use client";

import { useEffect, useState } from "react";
import { shuffleTestimonials, testimonials, type Testimonial } from "@/data/testimonials";

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

export default function TestimonialsList() {
  const [reviews, setReviews] = useState<Testimonial[]>(testimonials);

  useEffect(() => {
    setReviews(shuffleTestimonials(testimonials));
  }, []);

  return (
    <div className="mt-10 space-y-6">
      {reviews.map((review) => (
        <article key={review.id} className="rounded-xl bg-white p-6 shadow-card md:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-brand-black">{review.title}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {review.author} · {review.location} · {review.date}
              </p>
            </div>
            <StarRating rating={review.rating} />
          </div>
          <p className="mt-4 leading-relaxed text-gray-700">&ldquo;{review.text}&rdquo;</p>
        </article>
      ))}
    </div>
  );
}
