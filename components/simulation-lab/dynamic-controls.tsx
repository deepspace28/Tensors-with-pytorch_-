"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface ParameterConfig {
  label: string
  unit: string
  default: number | string
  min?: number
  max?: number
  step?: number
  type?: string
}

interface DynamicControlsProps {
  parameters: Record<string, ParameterConfig>
  onChange: (parameters: Record<string, number | string>) => void
  isProcessing: boolean
}

export function DynamicControls({ parameters, onChange, isProcessing }: DynamicControlsProps) {
  const [values, setValues] = useState<Record<string, number | string>>({})

  // Initialize values with defaults
  useEffect(() => {
    const initialValues: Record<string, number | string> = {}

    Object.entries(parameters).forEach(([name, config]) => {
      initialValues[name] = config.default
    })

    setValues(initialValues)
    onChange(initialValues)
  }, [parameters, onChange])

  const handleValueChange = (name: string, value: number | string) => {
    setValues((prev) => {
      const newValues = { ...prev, [name]: value }
      onChange(newValues)
      return newValues
    })
  }

  return (
    <Card className="border-gray-800 bg-gray-900">
      <CardHeader className="pb-2 border-b border-gray-800">
        <CardTitle className="text-sm font-medium text-white">Simulation Parameters</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {Object.entries(parameters).map(([name, config], index) => {
          const isNumeric = typeof config.default === "number"
          const value = values[name] !== undefined ? values[name] : config.default

          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <Label htmlFor={name} className="text-sm text-gray-300">
                  {config.label}
                </Label>
                <span className="text-xs text-cyan-400 font-mono bg-cyan-950/30 px-2 py-1 rounded">
                  {value} {config.unit}
                </span>
              </div>

              {isNumeric ? (
                <Slider
                  id={name}
                  min={config.min || 0}
                  max={config.max || 100}
                  step={config.step || 1}
                  value={[Number(value)]}
                  onValueChange={(values) => handleValueChange(name, values[0])}
                  disabled={isProcessing}
                  className="py-2"
                />
              ) : (
                <Input
                  id={name}
                  value={String(value)}
                  onChange={(e) => handleValueChange(name, e.target.value)}
                  disabled={isProcessing}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              )}
            </motion.div>
          )
        })}
      </CardContent>
    </Card>
  )
}
