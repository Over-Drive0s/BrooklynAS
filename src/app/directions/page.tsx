import ContactCTA from "@/components/ContactCTA";
import { site } from "@/data/site";

export const metadata = { title: "Directions | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <section className="bg-brand-gray py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-8 text-3xl font-bold text-brand-black md:text-4xl">Directions</h1>
          <p className="text-lg text-gray-600">{site.fullAddress}</p>
          <div className="mt-8 aspect-video overflow-hidden rounded-xl shadow-card">
            <iframe
              title="Brooklyn Auto Sales Map"
              src={site.external.mapEmbed}
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
