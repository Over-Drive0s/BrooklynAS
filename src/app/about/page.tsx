import Image from "next/image";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import { site } from "@/data/site";

export const metadata = { title: "About Us | Brooklyn Auto Sales" };

const highlights = [
  {
    title: "Fair Prices",
    description: "Transparent pricing on quality pre-owned vehicles that fit your budget.",
  },
  {
    title: "Superior Service",
    description: "A knowledgeable team focused on making your purchase smooth and stress-free.",
  },
  {
    title: "Repeat Customers",
    description: "We treat every buyer right — building trust that keeps drivers coming back.",
  },
];

export default function Page() {
  return (
    <>
      <section className="bg-brand-gray py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">Our Dealership</p>
            <h1 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">About Us</h1>
            <p className="mt-4 text-lg text-gray-600">{site.tagline}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5 lg:items-start">
            <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card lg:col-span-3">
              <div className="relative aspect-[21/9] bg-gray-100">
                <Image
                  src={site.banners[0]}
                  alt={`${site.name} showroom`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-brand-black">Welcome to {site.name}</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                  <p>{site.description}</p>
                  <p>{site.about}</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={site.links.inventory} className="btn-primary">
                    Shop Inventory
                  </Link>
                  <Link href={site.links.store} className="btn-outline">
                    Visit Our Store
                  </Link>
                </div>
              </div>
            </article>

            <aside className="space-y-6 lg:col-span-2">
              <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
                <h2 className="text-xl font-bold text-brand-black">Why Choose Us</h2>
                <ul className="mt-6 space-y-5">
                  {highlights.map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-sm font-bold text-brand-red">
                        ✓
                      </span>
                      <span>
                        <span className="block font-semibold text-brand-black">{item.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-gray-600">
                          {item.description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
                <h2 className="text-xl font-bold text-brand-black">Visit Us</h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">{site.fullAddress}</p>
                <a
                  href={site.phoneLink}
                  className="mt-3 inline-block text-lg font-semibold text-brand-red hover:underline"
                >
                  {site.phone}
                </a>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href={site.links.store} className="btn-primary text-center">
                    Store Info
                  </Link>
                  <Link href={site.links.testimonials} className="btn-outline text-center">
                    Testimonials
                  </Link>
                </div>
              </article>
            </aside>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
