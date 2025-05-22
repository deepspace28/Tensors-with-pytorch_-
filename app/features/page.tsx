"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import FeaturesClientPage from "./FeaturesClientPage"
import { BetaSignupModal } from "@/components/chat/beta-signup-modal"

export default function FeaturesPage() {
  const [showBetaModal, setShowBetaModal] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader onOpenBetaModal={() => setShowBetaModal(true)} />
      <FeaturesClientPage onOpenBetaModal={() => setShowBetaModal(true)} />
      <SiteFooter />

      {/* Global Beta Modal */}
      <BetaSignupModal open={showBetaModal} onOpenChange={setShowBetaModal} />
    </div>
  )
}
