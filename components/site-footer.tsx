import Link from "next/link"
import { ScientificLogo } from "@/components/scientific-logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-6 md:py-0">
      <div className="container flex flex-col items-start justify-between gap-4 md:h-24 md:flex-row md:items-center">
        <div className="flex flex-col items-start gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <ScientificLogo variant="simple" className="h-5 w-5 text-primary" />
            <span className="font-bold">Synaptiq</span>
          </Link>
          <p className="text-sm text-muted-foreground md:text-center">
            &copy; {new Date().getFullYear()} Synaptiq. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 px-8 md:gap-2 md:px-0">
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </Link>
          <Link href="/cookies" className="text-sm text-muted-foreground hover:underline">
            Cookies
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
