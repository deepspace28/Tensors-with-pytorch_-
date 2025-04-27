import Link from "next/link"
import { ArrowRight, BarChart3, BookOpen, Code, FileText, History, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { ApiKeyDisplay } from "@/components/api-key-display"
import { UsageChart } from "@/components/usage-chart"
import { RecentQueries } from "@/components/recent-queries"

export const metadata = {
  title: "Dashboard",
  description: "Manage your Synaptiq account, view usage statistics, and access your API keys.",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[250px]">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <DashboardHeader heading="Dashboard" text="Manage your account and view your usage statistics." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Calls</CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Simulations</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+4.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usage</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42%</div>
                <p className="text-xs text-muted-foreground">of monthly quota used</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Plan</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Research</div>
                <p className="text-xs text-muted-foreground">Renews in 18 days</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="api-keys">API Keys</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                  <CardDescription>Your API usage over the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <UsageChart />
                </CardContent>
              </Card>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Queries</CardTitle>
                    <CardDescription>Your most recent API queries.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentQueries />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/dashboard/history">
                        View All History
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Quick Links</CardTitle>
                    <CardDescription>Frequently used resources.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href="/docs">
                        <FileText className="mr-2 h-4 w-4" />
                        Documentation
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href="/playground">
                        <Code className="mr-2 h-4 w-4" />
                        API Playground
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Account Settings
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link href="/dashboard/billing">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Billing & Usage
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="api-keys" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API keys for accessing the Synaptiq platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ApiKeyDisplay />
                </CardContent>
                <CardFooter>
                  <Button>Generate New API Key</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Query History</CardTitle>
                  <CardDescription>View your complete query history.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4">
                        <div className="grid gap-1">
                          <div className="font-medium">Quantum entanglement simulation</div>
                          <div className="text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <History className="h-3 w-3" /> 2 hours ago
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4">
                        <div className="grid gap-1">
                          <div className="font-medium">Mathematical proof verification</div>
                          <div className="text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <History className="h-3 w-3" /> 5 hours ago
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4">
                        <div className="grid gap-1">
                          <div className="font-medium">Literature review analysis</div>
                          <div className="text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <History className="h-3 w-3" /> 1 day ago
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Load More
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
