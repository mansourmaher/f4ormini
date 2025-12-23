import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-accent" />
            <span className="text-muted-foreground">Over 50,000 verified listings</span>
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Find Your Dream Car <span className="text-accent">Today</span>
          </h1>

          <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">
            {
              "Browse thousands of quality vehicles from trusted sellers. Get the best deals on new and pre-owned cars with complete transparency and peace of mind."
            }
          </p>

          <div className="mx-auto mb-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by make, model, or keyword..." className="h-14 pl-12 text-base" />
            </div>
            <Button size="lg" className="h-14 bg-accent px-8 text-base text-accent-foreground hover:bg-accent/90">
              Search Cars
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Popular:</span>
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              Tesla Model 3
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              BMW M3
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              Mercedes-Benz
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              Porsche 911
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
