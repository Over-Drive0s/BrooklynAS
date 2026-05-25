import ContactCTA from "@/components/ContactCTA";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata = { title: "Directions | Brooklyn Auto Sales" };

const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.fullAddress)}`;
const appleMapsUrl = `https://maps.apple.com/?daddr=${encodeURIComponent(site.fullAddress)}`;
const wazeUrl = `https://www.waze.com/ul?q=${encodeURIComponent(site.fullAddress)}&navigate=yes`;

const travelTips = [
  {
    title: "From Staten Island Expressway",
    description: "Take the Clove Road exit and follow signs toward West Brighton. Marion St is a short drive from the expressway.",
  },
  {
    title: "Parking",
    description: "On-site parking is available at our lot on Marion St. Pull in anytime during business hours.",
  },
  {
    title: "Saturday & Sunday",
    description: "We're open by appointment on weekends — call ahead and we'll have your vehicle ready when you arrive.",
  },
];

export default function Page() {
  return (
    <>
      <section className="bg-brand-gray py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">Visit Us</p>
            <h1 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">Directions</h1>
          </div>

          <article className="mt-10 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card">
            <div className="border-b border-gray-100 px-6 py-5 md:px-8">
              <h2 className="text-2xl font-bold text-brand-black md:text-3xl">Map</h2>
              <p className="mt-1 text-sm text-gray-600">Brooklyn Auto Sales on Marion St, Staten Island.</p>
            </div>
            <div className="aspect-[21/9] min-h-[240px] w-full overflow-hidden sm:min-h-[320px]">
              <iframe
                title="Brooklyn Auto Sales Map"
                src={site.external.mapEmbed}
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </article>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {travelTips.map((tip) => (
              <article key={tip.title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-card">
                <h3 className="font-bold text-brand-black">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{tip.description}</p>
              </article>
            ))}
          </div>

          <article className="mt-3 rounded-xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-black">Open In Maps</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-black transition hover:border-brand-red hover:text-brand-red"
              >
                Google Maps
              </a>
              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-black transition hover:border-brand-red hover:text-brand-red"
              >
                Apple Maps
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-black transition hover:border-brand-red hover:text-brand-red"
              >
                Waze
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block text-center"
              >
                Start Navigation
              </a>
              <Link href={site.links.store} className="btn-outline inline-block text-center">
                Store Info
              </Link>
            </div>

            <p className="mt-4 border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
              Need more details? Visit our{" "}
              <Link href={site.links.store} className="font-semibold text-brand-red hover:underline">
                store info page
              </Link>
              .
            </p>
          </article>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
