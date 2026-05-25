import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import { site } from "@/data/site";

export const metadata = { title: "Vehicle Finder | Brooklyn Auto Sales" };

export default function VehicleFinderPage() {
  return (
    <>
      <PageHero title="Vehicle Finder" subtitle="Cannot find what you are looking for? We will locate it." />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <p className="mb-8 text-center text-lg text-gray-600">Tell us your dream car and our team will search our network to find it for you.</p>
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <iframe title="Vehicle Finder" src={site.external.locatorForm} className="h-[700px] w-full border-0" />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
