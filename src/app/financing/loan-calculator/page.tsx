import ContactCTA from "@/components/ContactCTA";

export const metadata = { title: "Loan Calculator | Brooklyn Auto Sales" };

export default function LoanCalculatorPage() {
  return (
    <>
      <section className="bg-brand-gray py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-black md:text-4xl">Loan Calculator</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">Estimate your monthly payment.</p>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <iframe
              title="Loan Calculator"
              src="https://brooklynautoonline.com/loancalculator"
              className="h-[700px] w-full border-0"
            />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
