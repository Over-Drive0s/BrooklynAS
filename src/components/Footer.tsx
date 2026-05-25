import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

const footerLinks = {
  shop: [
    { label: "All Inventory", href: "/inventory" },
    { label: "Luxury Vehicles", href: "/inventory?category=luxury" },
    { label: "Sports Cars", href: "/inventory?category=sports" },
    { label: "SUVs", href: "/inventory?category=suv" },
  ],
  sell: [
    { label: "We Buy Your Vehicle", href: site.links.sellCar },
    { label: "Value Your Trade-In", href: site.links.tradeIn },
  ],
  finance: [
    { label: "Apply Online", href: site.links.financing },
    { label: "Loan Calculator", href: site.links.loanCalculator },
  ],
  about: [
    { label: "About Us", href: site.links.about },
    { label: "Contact Us", href: site.links.store },
    { label: "Testimonials", href: site.links.testimonials },
    { label: "Privacy Policy", href: site.links.privacy },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={822}
              height={271}
              className="h-14 w-auto object-contain md:h-16"
            />
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-white/90">Visit Us</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 block"
              >
                <address className="not-italic leading-relaxed text-sm text-white/60 transition-colors group-hover:text-white/80">
                  <span className="block">{site.address}</span>
                  <span className="block">
                    {site.city}, {site.state} {site.zip}
                  </span>
                </address>
              </a>
              <a
                href={site.phoneLink}
                className="mt-3 block text-sm font-semibold text-brand-red-light hover:underline"
              >
                {site.phone}
              </a>
            </div>
          </div>

          <FooterColumn title="Shop" links={footerLinks.shop} />
          <FooterColumn title="Sell" links={footerLinks.sell} />
          <FooterColumn title="Financing" links={footerLinks.finance} />
          <FooterColumn title="About Us" links={footerLinks.about} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/50">
            powered by:{" "}
            <a
              href="https://overdriveio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white"
            >
              overdriveio
            </a>
          </p>
          <div className="flex gap-6 text-xs text-white/50">
            <Link href={site.links.privacy} className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href={site.links.admin} className="hover:text-white">
              Admin +
            </Link>
            <Link href={site.links.directions} className="hover:text-white">
              Directions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-wider text-white/90">{title}</h4>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-white/60 hover:text-brand-red-light">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
