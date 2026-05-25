"use client";

import { useCallback, useEffect, useState } from "react";
import { shuffleTestimonials, testimonials, type Testimonial } from "@/data/testimonials";

const LOCAL_REVIEWS_KEY = "brooklyn-as-user-reviews";

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

function readLocalReviews(): Testimonial[] {
  try {
    const stored = localStorage.getItem(LOCAL_REVIEWS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mergeReviews(userReviews: Testimonial[]): Testimonial[] {
  const seen = new Set<string>();
  const merged: Testimonial[] = [];

  for (const review of [...userReviews, ...testimonials]) {
    if (seen.has(review.id)) continue;
    seen.add(review.id);
    merged.push(review);
  }

  return shuffleTestimonials(merged);
}

export default function TestimonialsList() {
  const [reviews, setReviews] = useState<Testimonial[]>(testimonials);

  const loadReviews = useCallback(async () => {
    let userReviews: Testimonial[] = readLocalReviews();

    try {
      const response = await fetch("/api/reviews");
      if (response.ok) {
        const apiReviews: Testimonial[] = await response.json();
        userReviews = [...apiReviews, ...userReviews];
      }
    } catch {
      // Use local reviews only when the API is unavailable.
    }

    setReviews(mergeReviews(userReviews));
  }, []);

  useEffect(() => {
    loadReviews();

    const handleReviewSubmitted = () => {
      loadReviews();
    };

    window.addEventListener("review-submitted", handleReviewSubmitted);
    return () => window.removeEventListener("review-submitted", handleReviewSubmitted);
  }, [loadReviews]);

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {reviews.map((review) => (
        <article
          key={review.id}
          className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-card md:p-7"
        >
          <div className="flex justify-end">
            <StarRating rating={review.rating} />
          </div>

          <h2 className="mt-2 text-lg font-bold text-brand-black">{review.title}</h2>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-700 md:text-base">{review.text}</p>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <p className="font-semibold text-brand-black">{review.author}</p>
            <p className="mt-1 text-xs text-gray-500">
              {review.location} · {review.date}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
