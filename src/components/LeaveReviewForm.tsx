"use client";

import { FormEvent, useState } from "react";
import type { Testimonial } from "@/data/testimonials";

const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-brand-black placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red";

const LOCAL_REVIEWS_KEY = "brooklyn-as-user-reviews";

function StarPicker({ rating, onChange }: { rating: number; onChange: (rating: number) => void }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1" role="group" aria-label="Rating">
      {Array.from({ length: 5 }, (_, i) => {
        const value = i + 1;
        const active = value <= (hovered || rating);

        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(0)}
            className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            aria-label={`${value} star${value === 1 ? "" : "s"}`}
          >
            <svg
              className={`h-7 w-7 ${active ? "text-brand-red" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

function saveReviewLocally(review: Testimonial) {
  try {
    const stored = localStorage.getItem(LOCAL_REVIEWS_KEY);
    const reviews: Testimonial[] = stored ? JSON.parse(stored) : [];
    reviews.unshift(review);
    localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(reviews));
  } catch {
    // Ignore storage errors.
  }
}

export default function LeaveReviewForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (text.trim().length < 10) {
      setError("Please write at least 10 characters in your review.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, location, rating, text }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      saveReviewLocally(data.review);
      window.dispatchEvent(new CustomEvent("review-submitted", { detail: data.review }));

      setTitle("");
      setAuthor("");
      setLocation("");
      setRating(5);
      setText("");
      setSuccess(true);
    } catch {
      setError("Unable to submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-10 rounded-xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
      <h2 className="text-2xl font-bold text-brand-black">Leave a Review</h2>
      <p className="mt-2 text-sm text-gray-600 md:text-base">
        Share your experience with Brooklyn Auto Sales. Your review will appear on this page for other visitors to see.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="review-title" className="mb-1.5 block text-sm font-semibold text-brand-black">
            Review Title
          </label>
          <input
            id="review-title"
            name="title"
            type="text"
            required
            placeholder="e.g. Great buying experience"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="review-author" className="mb-1.5 block text-sm font-semibold text-brand-black">
              Your Name
            </label>
            <input
              id="review-author"
              name="author"
              type="text"
              required
              placeholder="Full name"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="review-location" className="mb-1.5 block text-sm font-semibold text-brand-black">
              Location
            </label>
            <input
              id="review-location"
              name="location"
              type="text"
              required
              placeholder="City, State"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-semibold text-brand-black">Rating</span>
          <StarPicker rating={rating} onChange={setRating} />
        </div>

        <div>
          <label htmlFor="review-text" className="mb-1.5 block text-sm font-semibold text-brand-black">
            Your Review
          </label>
          <textarea
            id="review-text"
            name="text"
            required
            rows={5}
            placeholder="Tell us about your experience..."
            value={text}
            onChange={(event) => setText(event.target.value)}
            className={`${fieldClass} resize-y`}
          />
        </div>

        {error ? <p className="text-sm font-medium text-brand-red">{error}</p> : null}
        {success ? (
          <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
            Thank you! Your review has been submitted and is now live on this page.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-brand-red px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition-all hover:bg-brand-red-dark disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
