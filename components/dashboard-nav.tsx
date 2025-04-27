"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, FileText, Home, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 py-4">
      <Button
        variant="ghost"
        asChild
        className={cn("justify-start", pathname === "/dashboard" && "bg-muted font-medium")}
      >
        <Link href="/dashboard" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        asChild
        className={cn("justify-start", pathname === "/dashboard/usage" && "bg-muted font-medium")}
      >
        <Link href="/dashboard/usage" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span>Usage</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        asChild
        className={cn("justify-start", pathname === "/dashboard/billing" && "bg-muted font-medium")}
      >
        <Link href="/dashboard/billing" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span>Billing</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        asChild
        className={cn("justify-start", pathname === "/dashboard/team" && "bg-muted font-medium")}
      >
        <Link href="/dashboard/team" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Team</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        asChild
        className={cn("justify-start", pathname === "/dashboard/docs" && "bg-muted font-medium")}
      >
        <Link href="/dashboard/docs" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Documentation</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        asChild
        className={cn("justify-start", pathname === "/dashboard/settings" && "bg-muted font-medium")}
      >
        <Link href="/dashboard/settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </Button>
    </nav>
  )
}
