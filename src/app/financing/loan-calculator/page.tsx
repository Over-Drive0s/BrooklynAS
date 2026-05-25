import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

export const metadata = { title: "Loan Calculator | Brooklyn Auto Sales" };

export default function LoanCalculatorPage() {
  return (
    <>
      <PageHero title="Loan Calculator" subtitle="Estimate your monthly payment." />
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <iframe title="Loan Calculator" src="https://brooklynautoonline.com/loancalculator" className="h-[700px] w-full border-0" />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
