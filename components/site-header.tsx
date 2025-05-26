"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ScientificLogo } from "@/components/scientific-logo"

interface SiteHeaderProps {
  onOpenBetaModal?: () => void
}

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Chat",
    href: "/chat",
  },
  {
    title: "Simulations",
    href: "/simulations",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export function SiteHeader({ onOpenBetaModal }: SiteHeaderProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="flex h-14 sm:h-16 items-center px-4 sm:px-6 md:px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden text-white"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 bg-gray-950 border-gray-800 w-[280px] sm:w-[300px]">
            <MobileNav pathname={pathname} onOpenBetaModal={onOpenBetaModal} onClose={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center space-x-2 ml-0">
          <ScientificLogo className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <span className="font-bold text-white text-lg sm:text-xl">Synaptiq</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex md:ml-6">
            <DesktopNav pathname={pathname} />
          </nav>
          <div className="flex items-center">
            <div className="hidden sm:flex">
              <Button
                className="ml-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-sm sm:text-base px-3 sm:px-4 py-2 min-h-[40px]"
                asChild
              >
                <Link href="/beta">Join the Beta</Link>
              </Button>
            </div>
            <div className="flex sm:hidden">
              <Button
                className="ml-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs px-2 py-1 min-h-[36px]"
                size="sm"
                asChild
              >
                <Link href="/beta">Beta</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-800/50 data-[state=open]:bg-gray-800/50",
                pathname === "/" && "bg-gray-800/50",
                "text-gray-200",
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-gray-200 hover:bg-gray-800 hover:text-white focus:bg-gray-800">
            Features
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-gray-950 border-gray-800">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-gray-800/50 to-gray-900 p-6 no-underline outline-none focus:shadow-md"
                    href="/chat"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                    >
                      <path
                        d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8V16M8 12H16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7L17 17M7 17L17 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="mb-2 mt-4 text-lg font-medium text-white">Scientific LLM</div>
                    <p className="text-sm leading-tight text-gray-400">
                      Advanced language model trained specifically for scientific research and discovery.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <Link href="/features/quantum-simulations" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white text-gray-200">
                    <div className="text-sm font-medium leading-none">Quantum Simulations</div>
                    <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                      Run complex quantum simulations with unprecedented accuracy.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/features/scientific-validation" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white text-gray-200">
                    <div className="text-sm font-medium leading-none">Scientific Validation</div>
                    <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                      Rigorous validation by leading researchers in physics and mathematics.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/features/api-access" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white text-gray-200">
                    <div className="text-sm font-medium leading-none">API Access</div>
                    <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                      Integrate Synaptiq into your research workflow with our comprehensive API.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-800/50 data-[state=open]:bg-gray-800/50",
                pathname === "/about" && "bg-gray-800/50",
                "text-gray-200",
              )}
            >
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-800/50 data-[state=open]:bg-gray-800/50",
                pathname === "/contact" && "bg-gray-800/50",
                "text-gray-200",
              )}
            >
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNav({
  pathname,
  onOpenBetaModal,
  onClose,
}: {
  pathname: string
  onOpenBetaModal?: () => void
  onClose: () => void
}) {
  return (
    <div className="grid gap-2 py-6">
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white" onClick={onClose}>
          <ScientificLogo className="h-6 w-6 text-primary" />
          <span>Synaptiq</span>
        </Link>
      </div>
      <nav className="grid gap-2 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex w-full items-center rounded-md px-3 py-3 hover:bg-gray-800 hover:text-white transition-colors min-h-[44px]",
              pathname === item.href ? "font-medium text-primary bg-gray-800/50" : "text-gray-200",
            )}
            onClick={onClose}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="mt-6 pt-4 border-t border-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 min-h-[44px]"
          asChild
          onClick={onClose}
        >
          <Link href="/beta">Join the Beta</Link>
        </Button>
      </div>
    </div>
  )
}
