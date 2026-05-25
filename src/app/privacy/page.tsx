import ContactCTA from "@/components/ContactCTA";

export const metadata = { title: "Privacy Policy | Brooklyn Auto Sales" };

export default function Page() {
  return (
    <>
      <section className="bg-brand-gray py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-black md:text-4xl">Privacy Policy</h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              How we protect your information. Brooklyn Auto Sales respects your privacy. Review our complete privacy
              policy for details on how we handle your information.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <iframe
              title="Privacy Policy"
              src="https://brooklynautoonline.com/privacy"
              className="h-[700px] w-full border-0"
            />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
