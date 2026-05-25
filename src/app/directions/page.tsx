import ContactCTA from "@/components/ContactCTA";
import { site } from "@/data/site";

export const metadata = { title: "Directions | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <section className="bg-brand-gray py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-black md:text-4xl">Directions</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">Find Brooklyn Auto Sales in Staten Island.</p>
          </div>
          <p className="text-lg text-gray-600">{site.fullAddress}</p>
          <div className="mt-8 aspect-video overflow-hidden rounded-xl shadow-card">
            <iframe
              title="Brooklyn Auto Sales Map"
              src="https://maps.google.com/maps?q=161+Marion+St+Staten+Island+NY+10310&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
