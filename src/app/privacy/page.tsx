import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata = { title: "Privacy Policy | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="How we protect your information." />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-lg text-gray-600">Brooklyn Auto Sales respects your privacy. Review our complete privacy policy for details on how we handle your information.</p>
          <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-card">
            <iframe title="Privacy Policy" src="https://brooklynautoonline.com/privacy" className="h-[700px] w-full border-0" />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
