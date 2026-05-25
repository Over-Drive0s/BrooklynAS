import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import type { Testimonial } from "@/data/testimonials";

const REVIEWS_PATH = path.join(process.cwd(), "data", "user-reviews.json");

async function readUserReviews(): Promise<Testimonial[]> {
  try {
    const raw = await fs.readFile(REVIEWS_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function isValidReview(body: unknown): body is {
  title: string;
  author: string;
  location: string;
  rating: number;
  text: string;
} {
  if (!body || typeof body !== "object") return false;
  const review = body as Record<string, unknown>;
  return (
    typeof review.title === "string" &&
    review.title.trim().length > 0 &&
    typeof review.author === "string" &&
    review.author.trim().length > 0 &&
    typeof review.location === "string" &&
    review.location.trim().length > 0 &&
    typeof review.text === "string" &&
    review.text.trim().length >= 10 &&
    typeof review.rating === "number" &&
    review.rating >= 1 &&
    review.rating <= 5
  );
}

export async function GET() {
  const reviews = await readUserReviews();
  return NextResponse.json(reviews);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!isValidReview(body)) {
    return NextResponse.json({ error: "Please fill in all fields with a review of at least 10 characters." }, { status: 400 });
  }

  const review: Testimonial = {
    id: `user-${Date.now()}`,
    title: body.title.trim(),
    author: body.author.trim(),
    location: body.location.trim(),
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    rating: Math.round(body.rating),
    text: body.text.trim(),
  };

  try {
    const reviews = await readUserReviews();
    reviews.unshift(review);
    await fs.writeFile(REVIEWS_PATH, JSON.stringify(reviews, null, 2));
  } catch {
    // Read-only filesystem in some deployments — client keeps a local copy.
  }

  return NextResponse.json({ success: true, review });
}
