import ContactCTA from "@/components/ContactCTA";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata = { title: "Financing | Brooklyn Auto Sales" };

export default function FinancingPage() {
  return (
    <>
      <section className="bg-brand-gray py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-black md:text-4xl">Financing</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Flexible financing options to help you drive home today. Apply online and our finance team will work with
              you to find a payment that fits your budget.
            </p>
          </div>
          <div className="mb-6">
            <Link href={site.links.loanCalculator} className="btn-outline">
              Loan Calculator
            </Link>
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
