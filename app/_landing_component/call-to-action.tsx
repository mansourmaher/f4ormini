import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CallToAction() {
  return (
    <section className="border-y border-border bg-accent py-20 text-accent-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">Ready to Find Your Perfect Car?</h2>
        <p className="mb-8 text-pretty text-lg opacity-90">
          Join thousands of satisfied customers who found their dream vehicle on AutoVerse
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
            Browse Cars
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10 bg-transparent"
          >
            Sell Your Car
          </Button>
        </div>
      </div>
    </section>
  )
}
