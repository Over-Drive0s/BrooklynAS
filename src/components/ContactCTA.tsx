import Link from "next/link";
import { site } from "@/data/site";

export default function ContactCTA() {
  return (
    <section className="bg-brand-gray py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl bg-brand-black p-8 text-center text-white md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to Get Started?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Visit us in Staten Island or call our team today. We are here to help you find your next vehicle.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={site.phoneLink} className="btn-primary">Call {site.phone}</a>
            <Link href={site.links.directions} className="btn-outline border-white text-white hover:bg-white hover:text-brand-black">
              Get Directions
            </Link>
            <Link href={site.links.inventory} className="btn-outline border-white text-white hover:bg-white hover:text-brand-black">
              Browse Inventory
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
