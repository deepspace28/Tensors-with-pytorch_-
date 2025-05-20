"use client"

import { useEffect, useState } from "react"
import { type FeatureFlags, getDynamicEnv } from "@/lib/dynamic-env"

export function useFeatureFlags() {
  const [flags, setFlags] = useState<FeatureFlags>(getDynamicEnv().featureFlags)

  useEffect(() => {
    // Update flags when component mounts (client-side only)
    setFlags(getDynamicEnv().featureFlags)
  }, [])

  const checkFeature = (featureName: keyof FeatureFlags): boolean => {
    return flags[featureName]
  }

  return {
    flags,
    checkFeature,
    isQuantumSimulationsEnabled: flags.enableQuantumSimulations,
    isAdvancedMathEnabled: flags.enableAdvancedMath,
    isBetaFeaturesEnabled: flags.enableBetaFeatures,
    isPythonExecutorEnabled: flags.enablePythonExecutor,
    isOfflineModeEnabled: flags.enableOfflineMode,
  }
}
