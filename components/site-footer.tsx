import Link from "next/link"
import { ScientificLogo } from "@/components/scientific-logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0f0f0f] text-white">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:py-8 md:flex-row px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <ScientificLogo className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          <p className="text-center text-xs sm:text-sm leading-loose text-gray-400 md:text-left">
            &copy; {new Date().getFullYear()} Synaptiq Labs. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <Link
            href="/terms"
            className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center"
          >
            Privacy
          </Link>
          <Link
            href="/cookies"
            className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center"
          >
            Cookies
          </Link>
          <Link
            href="/contact"
            className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
