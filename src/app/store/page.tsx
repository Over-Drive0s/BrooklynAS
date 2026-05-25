import { site } from "@/data/site";

export const metadata = { title: "Store Info | Brooklyn Auto Sales" };

const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.fullAddress)}`;

export default function Page() {
  return (
    <>
      <section className="bg-brand-gray py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            <article className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
              <h2 className="text-2xl font-bold text-brand-black md:text-3xl">Contact Information</h2>

              <div className="mt-6 space-y-4">
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 rounded-lg border border-gray-100 p-4 transition hover:border-gray-200 hover:bg-brand-gray"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                    <LocationIcon />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Address</span>
                    <span className="mt-1 block text-base font-semibold text-brand-black group-hover:text-brand-red">
                      {site.address}
                    </span>
                    <span className="block text-sm text-gray-600">
                      {site.city}, {site.state} {site.zip}
                    </span>
                  </span>
                </a>

                <a
                  href={site.phoneLink}
                  className="group flex gap-4 rounded-lg border border-gray-100 p-4 transition hover:border-gray-200 hover:bg-brand-gray"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                    <PhoneIcon />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Phone</span>
                    <span className="mt-1 block text-lg font-semibold text-brand-black group-hover:text-brand-red">
                      {site.phone}
                    </span>
                    <span className="block text-sm text-gray-500">Call us today</span>
                  </span>
                </a>
              </div>

              <div className="my-8 border-t border-gray-100" />

              <h3 className="text-sm font-bold uppercase tracking-wide text-brand-black">Store Hours</h3>
              <ul className="mt-4 space-y-2 text-gray-700">
                {site.hours.map((h) => (
                  <li key={h.day}>
                    <strong>{h.day}:</strong> {h.hours}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block w-full text-center sm:w-auto"
                >
                  Get Directions
                </a>
              </div>
            </article>

            <article className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
              <h2 className="text-2xl font-bold text-brand-black md:text-3xl">Location</h2>
              <p className="mt-2 text-sm text-gray-600">Find Brooklyn Auto Sales on the map.</p>

              <div className="mt-6 min-h-[320px] flex-1 overflow-hidden rounded-lg border border-gray-100 sm:min-h-[400px] lg:min-h-[480px]">
                <iframe
                  title="Brooklyn Auto Sales Map"
                  src={site.external.mapEmbed}
                  className="block h-full min-h-[320px] w-full border-0 sm:min-h-[400px] lg:min-h-[480px]"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
}
