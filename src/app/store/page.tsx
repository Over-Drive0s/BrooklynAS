import ContactCTA from "@/components/ContactCTA";
import { site } from "@/data/site";

export const metadata = { title: "Store Info | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-xl font-bold text-brand-black">Contact Information</h2>
              <p className="mt-4 text-lg text-gray-600">{site.fullAddress}</p>
              <p className="mt-2 text-lg">
                <a href={site.phoneLink} className="font-semibold text-brand-red hover:underline">
                  {site.phone}
                </a>
              </p>

              <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-brand-black">Store Hours</h3>
              <ul className="mt-4 space-y-2 text-gray-700">
                {site.hours.map((h) => (
                  <li key={h.day}>
                    <strong>{h.day}:</strong> {h.hours}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=161+Marion+St+Staten+Island+NY+10310"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl shadow-card lg:sticky lg:top-36">
              <iframe
                title="Brooklyn Auto Sales Map"
                src={site.external.mapEmbed}
                className="block h-[320px] w-full border-0 sm:h-[400px] lg:h-[480px]"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
