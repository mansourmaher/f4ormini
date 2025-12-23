import { Shield, DollarSign, FileSearch, HeadphonesIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "Verified Sellers",
      description: "Every seller is thoroughly vetted and verified to ensure authenticity and trustworthiness.",
    },
    {
      icon: FileSearch,
      title: "Complete History",
      description: "Full vehicle history reports included with every listing. Know exactly what you're buying.",
    },
    {
      icon: DollarSign,
      title: "Best Prices",
      description: "Competitive pricing with transparent fees. No hidden costs or surprises at checkout.",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Our expert team is always available to help you find the perfect car and answer questions.",
    },
  ]

  return (
    <section className="border-y border-border bg-card py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">Why Choose AutoVerse</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            The most trusted platform for buying and selling cars
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background p-6 transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-pretty text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
