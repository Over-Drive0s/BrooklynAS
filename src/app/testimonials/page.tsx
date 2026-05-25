import ContactCTA from "@/components/ContactCTA";

export const metadata = { title: "Testimonials | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <section className="bg-brand-gray py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-black md:text-4xl">Testimonials</h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-gray-600">
              What our customers say about us. Brooklyn Auto Sales is proud to serve Staten Island and the greater New
              York area. Fair prices, superior service, and satisfied customers — that is our promise.
            </p>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
