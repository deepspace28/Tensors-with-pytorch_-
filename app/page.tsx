"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroSection } from "@/components/hero-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TechnologyHighlightsEnhanced } from "@/components/technology-highlights-enhanced"
import { AboutSynaptiqEnhanced } from "@/components/about-synaptiq-enhanced"
import { BetaSignupModal } from "@/components/chat/beta-signup-modal"

// Import more relevant icons
import { FileCheck, BarChart3, BookOpen } from "lucide-react"

export default function Home() {
  const [showBetaModal, setShowBetaModal] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader onOpenBetaModal={() => setShowBetaModal(true)} />
      <main className="flex-1">
        <HeroSection onJoinBeta={() => setShowBetaModal(true)} />
        <AboutSynaptiqEnhanced />
        <TechnologyHighlightsEnhanced />

        {/* Scientific Validation Section */}
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <Badge className="px-4 py-1 text-sm" variant="secondary">
              Scientific Validation
            </Badge>
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Rigorous Scientific Validation</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our models undergo extensive validation by leading researchers in physics, mathematics, and computer
              science.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peer Review</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">All algorithms peer-reviewed by experts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.8%</div>
                <p className="text-xs text-muted-foreground">Mathematical accuracy on benchmark tests</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Publications</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24+</div>
                <p className="text-xs text-muted-foreground">Research papers published in top journals</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <NewsletterSection onJoinBeta={() => setShowBetaModal(true)} />
      </main>
      <SiteFooter />

      {/* Global Beta Modal */}
      <BetaSignupModal open={showBetaModal} onOpenChange={setShowBetaModal} />
    </div>
  )
}
