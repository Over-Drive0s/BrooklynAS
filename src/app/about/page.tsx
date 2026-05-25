import ContactCTA from "@/components/ContactCTA";
import { site } from "@/data/site";

export const metadata = { title: "About Us | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <section className="bg-brand-gray py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-black md:text-4xl">About Us</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Learn more about Brooklyn Auto Sales in Staten Island.
            </p>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-gray-600">
            <p>{site.description}</p>
            <p>{site.about}</p>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
