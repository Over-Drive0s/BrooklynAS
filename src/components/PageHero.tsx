type PageHeroProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <div className="bg-brand-black py-12 text-white md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-white/70">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
