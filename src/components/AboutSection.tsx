import Link from "next/link";
import { site } from "@/data/site";

export default function AboutSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="section-heading">Welcome to Brooklyn Auto Sales</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">{site.description}</p>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">{site.about}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/inventory" className="btn-primary">Shop Inventory</Link>
              <a href={site.links.about} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Learn More
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-brand-gray p-8">
            <h3 className="text-xl font-bold text-brand-black">Visit Our Showroom</h3>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Address</p>
                <p className="mt-1 text-brand-black">{site.fullAddress}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Phone</p>
                <a href={site.phoneLink} className="mt-1 block text-lg font-bold text-brand-red hover:underline">
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Store Hours</p>
                <ul className="mt-2 space-y-1">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex justify-between text-sm">
                      <span className="font-medium">{h.day}</span>
                      <span className="text-gray-600">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              href={site.links.directions}
              
              className="btn-primary mt-8 w-full text-center"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
