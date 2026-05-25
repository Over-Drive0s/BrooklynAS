import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata = { title: "Financing | Brooklyn Auto Sales" };

export default function FinancingPage() {
  return (
    <>
      <PageHero title="Financing" subtitle="Flexible financing options to help you drive home today." />
      <section className="py-12 md:py-16">
                <div className="mx-auto max-w-4xl px-4">
          <p className="mb-8 text-center text-lg text-gray-600">Apply online and our finance team will work with you to find a payment that fits your budget.</p>
          <div className="mb-6 flex justify-center gap-4">
            <Link href={site.links.loanCalculator} className="btn-outline">Loan Calculator</Link>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <iframe title="Credit Application" src={site.external.creditApp} className="h-[800px] w-full border-0" />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
