"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Code, FileText, Lightbulb, Rocket } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-full py-6 pl-3 pr-6 lg:py-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-medium">Getting Started</h4>
          <Button
            variant="ghost"
            asChild
            className={cn("justify-start", pathname === "/docs" && "bg-muted font-medium")}
          >
            <Link href="/docs" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Introduction</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className={cn("justify-start", pathname === "/docs/quickstart" && "bg-muted font-medium")}
          >
            <Link href="/docs/quickstart" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              <span>Quickstart</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className={cn("justify-start", pathname === "/docs/installation" && "bg-muted font-medium")}
          >
            <Link href="/docs/installation" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Installation</span>
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-medium">Guides</h4>
          <Button
            variant="ghost"
            asChild
            className={cn("justify-start", pathname === "/docs/guides/scientific-llm" && "bg-muted font-medium")}
          >
            <Link href="/docs/guides/scientific-llm" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span>Scientific LLM</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className={cn("justify-start", pathname === "/docs/guides/quantum-simulations" && "bg-muted font-medium")}
          >
            <Link href="/docs/guides/quantum-simulations" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span>Quantum Simulations</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className={cn("justify-start", pathname === "/docs/guides/mathematical-modeling" && "bg-muted font-medium")}
          >
            <Link href="/docs/guides/mathematical-modeling" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span>Mathematical Modeling</span>
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-medium">API Reference</h4>
          <Button
            variant="ghost"
            asChild
            className={cn("justify-start", pathname === "/docs/api" && "bg-muted font-medium")}
          >
            <Link href="/docs/api" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Overview</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className={cn("justify-start", pathname === "/docs/api/query" && "bg-muted font-medium")}
          >
            <Link href="/docs/api/query" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Scientific Query</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className={cn("justify-start", pathname === "/docs/api/simulate" && "bg-muted font-medium")}
          >
            <Link href="/docs/api/simulate" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Quantum Simulation</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className={cn("justify-start", pathname === "/docs/api/validate" && "bg-muted font-medium")}
          >
            <Link href="/docs/api/validate" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Scientific Validation</span>
            </Link>
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}
