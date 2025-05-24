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
        <section className="container px-4 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-32 mx-auto max-w-7xl">
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 sm:gap-6 text-center">
            <Badge className="px-3 py-1 text-xs sm:px-4 sm:text-sm lg:px-6 lg:py-2 lg:text-base" variant="secondary">
              Scientific Validation
            </Badge>
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-4xl">
              Rigorous Scientific Validation
            </h2>
            <p className="max-w-3xl leading-relaxed text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl lg:leading-8">
              Our models undergo extensive validation by leading researchers in physics, mathematics, and computer
              science.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mt-8 sm:mt-12 lg:mt-16 xl:mt-20">
            <Card className="w-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 lg:pb-3">
                <CardTitle className="text-sm sm:text-base lg:text-lg font-medium">Peer Review</CardTitle>
                <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">100%</div>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
                  All algorithms peer-reviewed by experts
                </p>
              </CardContent>
            </Card>
            <Card className="w-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 lg:pb-3">
                <CardTitle className="text-sm sm:text-base lg:text-lg font-medium">Accuracy</CardTitle>
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">99.8%</div>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
                  Mathematical accuracy on benchmark tests
                </p>
              </CardContent>
            </Card>
            <Card className="w-full sm:col-span-2 lg:col-span-1 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 lg:pb-3">
                <CardTitle className="text-sm sm:text-base lg:text-lg font-medium">Publications</CardTitle>
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">24+</div>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
                  Research papers published in top journals
                </p>
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
