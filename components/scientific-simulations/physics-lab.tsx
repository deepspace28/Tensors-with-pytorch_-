"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export function PhysicsLab() {
  const [gravity, setGravity] = useState(9.8)
  const [angle, setAngle] = useState(45)
  const [velocity, setVelocity] = useState(10)
  const [isSimulating, setIsSimulating] = useState(false)
  const [time, setTime] = useState(0)
  const [animationId, setAnimationId] = useState<number | null>(null)

  // Calculate projectile motion parameters
  const radians = (angle * Math.PI) / 180
  const vx = velocity * Math.cos(radians)
  const vy = velocity * Math.sin(radians)

  // Calculate maximum height and range
  const maxHeight = (vy * vy) / (2 * gravity)
  const timeOfFlight = (2 * vy) / gravity
  const range = vx * timeOfFlight

  // Current position
  const x = isSimulating ? vx * time : 0
  const y = isSimulating ? vy * time - 0.5 * gravity * time * time : 0

  // Scale for visualization
  const scaleX = 100 / range
  const scaleY = 100 / maxHeight

  // Animation
  useEffect(() => {
    if (isSimulating) {
      const startTime = Date.now()
      const lastTime = 0

      const animate = () => {
        const currentTime = (Date.now() - startTime) / 1000
        setTime(currentTime)

        // Stop when projectile hits ground
        if (currentTime > timeOfFlight) {
          setIsSimulating(false)
          setTime(timeOfFlight)
          return
        }

        const id = requestAnimationFrame(animate)
        setAnimationId(id)
      }

      const id = requestAnimationFrame(animate)
      setAnimationId(id)

      return () => {
        if (animationId) cancelAnimationFrame(animationId)
      }
    }
  }, [isSimulating, timeOfFlight])

  const handleStartSimulation = () => {
    setTime(0)
    setIsSimulating(true)
  }

  const handleReset = () => {
    setIsSimulating(false)
    setTime(0)
    if (animationId) cancelAnimationFrame(animationId)
  }

  return (
    <Card className="w-full bg-[#282a36] border-[#44475a] text-[#f8f8f2]">
      <CardHeader>
        <CardTitle className="text-[#8be9fd]">Physics Projectile Lab</CardTitle>
        <CardDescription className="text-[#6272a4]">
          Simulate projectile motion with adjustable parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#bd93f9]">Launch Angle (°)</span>
                <span className="text-sm text-[#f1fa8c]">{angle}</span>
              </div>
              <Slider
                value={[angle]}
                min={0}
                max={90}
                step={1}
                onValueChange={(value) => setAngle(value[0])}
                disabled={isSimulating}
                className="[&>[role=slider]]:bg-[#ff79c6]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#bd93f9]">Initial Velocity (m/s)</span>
                <span className="text-sm text-[#f1fa8c]">{velocity}</span>
              </div>
              <Slider
                value={[velocity]}
                min={1}
                max={20}
                step={0.5}
                onValueChange={(value) => setVelocity(value[0])}
                disabled={isSimulating}
                className="[&>[role=slider]]:bg-[#ff79c6]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#bd93f9]">Gravity (m/s²)</span>
                <span className="text-sm text-[#f1fa8c]">{gravity}</span>
              </div>
              <Slider
                value={[gravity]}
                min={1}
                max={20}
                step={0.1}
                onValueChange={(value) => setGravity(value[0])}
                disabled={isSimulating}
                className="[&>[role=slider]]:bg-[#ff79c6]"
              />
            </div>
          </div>

          <div className="h-60 bg-[#1e1f29] rounded-md relative overflow-hidden">
            {/* Simulation visualization */}
            <div className="absolute bottom-0 left-0 w-full h-full">
              {/* Ground */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#44475a]"></div>

              {/* Trajectory path */}
              {!isSimulating && (
                <svg
                  className="absolute bottom-0 left-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d={`M 0,0 Q ${(range * scaleX) / 2},${maxHeight * scaleY} ${range * scaleX},0`}
                    fill="none"
                    stroke="#6272a4"
                    strokeWidth="0.5"
                    strokeDasharray="1,1"
                  />
                </svg>
              )}

              {/* Projectile */}
              {(isSimulating || time > 0) && (
                <div
                  className="absolute w-3 h-3 rounded-full bg-[#50fa7b]"
                  style={{
                    bottom: `${Math.max(0, y * scaleY)}%`,
                    left: `${x * scaleX}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                ></div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-[#1e1f29] p-2 rounded">
              <span className="text-[#bd93f9]">Max Height:</span>{" "}
              <span className="text-[#f1fa8c]">{maxHeight.toFixed(2)} m</span>
            </div>
            <div className="bg-[#1e1f29] p-2 rounded">
              <span className="text-[#bd93f9]">Range:</span>{" "}
              <span className="text-[#f1fa8c]">{range.toFixed(2)} m</span>
            </div>
            <div className="bg-[#1e1f29] p-2 rounded">
              <span className="text-[#bd93f9]">Flight Time:</span>{" "}
              <span className="text-[#f1fa8c]">{timeOfFlight.toFixed(2)} s</span>
            </div>
            <div className="bg-[#1e1f29] p-2 rounded">
              <span className="text-[#bd93f9]">Current Time:</span>{" "}
              <span className="text-[#f1fa8c]">{time.toFixed(2)} s</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleStartSimulation}
              disabled={isSimulating}
              className="bg-[#50fa7b] text-[#282a36] hover:bg-[#50fa7b]/80"
            >
              Launch Projectile
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-[#ff79c6] text-[#ff79c6] hover:bg-[#ff79c6]/10"
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
