"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, Lightbulb, FlaskConical } from "lucide-react"
import { BetaSignupModal } from "./beta-signup-modal"

interface ModeSelectorProps {
  onModeChange?: (mode: string) => void
  currentMode?: string
  isBetaUser?: boolean
}

export function ModeSelector({ onModeChange, currentMode = "chat", isBetaUser = false }: ModeSelectorProps) {
  const [betaModalOpen, setBetaModalOpen] = useState(false)
  const [featureAttempted, setFeatureAttempted] = useState<string | undefined>()

  const handleModeClick = (mode: string, label: string) => {
    if (isBetaUser) {
      if (onModeChange) {
        onModeChange(mode)
      }
    } else {
      setFeatureAttempted(label)
      setBetaModalOpen(true)
    }
  }

  return (
    <>
      <div className="flex space-x-2 mb-2">
        <Button
          variant={currentMode === "search" ? "default" : "outline"}
          size="sm"
          className="gap-1.5"
          onClick={() => handleModeClick("search", "Search")}
        >
          <Search className="h-4 w-4" />
          Search
        </Button>
        <Button
          variant={currentMode === "reason" ? "default" : "outline"}
          size="sm"
          className="gap-1.5"
          onClick={() => handleModeClick("reason", "Reason")}
        >
          <Lightbulb className="h-4 w-4" />
          Reason
        </Button>
        <Button
          variant={currentMode === "simulations" ? "default" : "outline"}
          size="sm"
          className="gap-1.5"
          onClick={() => handleModeClick("simulations", "Simulations")}
        >
          <FlaskConical className="h-4 w-4" />
          Simulations
        </Button>
      </div>

      <BetaSignupModal open={betaModalOpen} onOpenChange={setBetaModalOpen} featureAttempted={featureAttempted} />
    </>
  )
}
