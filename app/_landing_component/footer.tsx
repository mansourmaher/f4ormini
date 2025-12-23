import Link from "next/link"
import { Car, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Car className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">AutoVerse</span>
            </Link>
            <p className="mb-4 text-pretty text-sm text-muted-foreground">
              The most trusted platform for buying and selling premium vehicles. Find your dream car today.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Marketplace</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Buy Cars
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AutoVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
