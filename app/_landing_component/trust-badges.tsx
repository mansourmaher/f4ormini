export function TrustBadges() {
  const companies = ["Mercedes", "BMW", "Tesla", "Porsche", "Audi", "Lexus"];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Trusted by millions of buyers and sellers
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-70 grayscale">
          {companies.map((company, index) => (
            <div key={index} className="text-2xl font-bold text-foreground">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
