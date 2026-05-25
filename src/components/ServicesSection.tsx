import Link from "next/link";
import { site } from "@/data/site";

const services = [
  {
    title: "Financing",
    description: "Apply online and get pre-qualified with flexible payment options tailored to your budget.",
    href: site.links.financing,
    cta: "Apply Online",
  },
  {
    title: "We Buy Your Vehicle",
    description: "Get a fair offer for your car, truck, or SUV. Quick appraisals and hassle-free process.",
    href: site.links.sellCar,
    cta: "Get an Offer",
  },
  {
    title: "Trade-In Value",
    description: "Find out what your current vehicle is worth and apply it toward your next purchase.",
    href: site.links.tradeIn,
    cta: "Value Your Trade",
  },
  {
    title: "Vehicle Finder",
    description: "Cannot find what you are looking for? Tell us your dream car and we will locate it for you.",
    href: site.links.vehicleFinder,
    cta: "Start Search",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-brand-black py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold md:text-4xl">Here for the Road Ahead</h2>
        <p className="mt-3 max-w-2xl text-lg text-white/70">
          Whether you need a new vehicle or want to sell yours, Brooklyn Auto Sales has you covered.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-brand-red/50 hover:bg-white/10"
            >
              <h3 className="text-lg font-bold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{service.description}</p>
              <Link
                href={service.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-red-light transition group-hover:gap-2"
              >
                {service.cta}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
