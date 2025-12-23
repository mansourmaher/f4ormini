export function Stats() {
  const stats = [
    { value: "50K+", label: "Cars Listed", sublabel: "Verified sellers nationwide" },
    { value: "98%", label: "Satisfaction Rate", sublabel: "From our customers" },
    { value: "$2.5B+", label: "Cars Sold", sublabel: "Total transaction value" },
    { value: "24/7", label: "Support", sublabel: "Always here to help" },
  ]

  return (
    <section className="border-b border-border bg-card py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold text-accent md:text-5xl">{stat.value}</div>
              <div className="mb-1 text-base font-semibold text-foreground">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
