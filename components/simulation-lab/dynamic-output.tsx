"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Chart from "chart.js/auto"
import { motion } from "framer-motion"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface DynamicOutputProps {
  isProcessing: boolean
  simulationData: any
  results: any
}

export function DynamicOutput({ isProcessing, simulationData, results }: DynamicOutputProps) {
  const chartRef = useRef<Chart | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threeContainerRef = useRef<HTMLDivElement>(null)
  const [katexLoaded, setKatexLoaded] = useState(false)
  const threeSceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls
    dispose: () => void
  } | null>(null)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
      if (threeSceneRef.current) {
        threeSceneRef.current.dispose()
      }
    }
  }, [])

  // Update visualization when results change
  useEffect(() => {
    if (isProcessing || !simulationData || !results) return

    if (simulationData.chartType === "3d") {
      render3DVisualization()
    } else {
      render2DVisualization()
    }
  }, [isProcessing, simulationData, results])

  // Render equations when KaTeX is loaded and data changes
  useEffect(() => {
    if (katexLoaded && simulationData?.equations) {
      renderEquations()
    }
  }, [katexLoaded, simulationData])

  const render2DVisualization = () => {
    if (!canvasRef.current || !results) return

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const chartType = simulationData.chartType === "scatter" ? "scatter" : "line"

    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels: results.x.map((_: any, i: number) => i.toString()),
        datasets: [
          {
            label: simulationData.title,
            data: results.x.map((x: number, i: number) => ({ x, y: results.y[i] })),
            borderColor: "rgb(150, 150, 150)",
            backgroundColor: "rgba(80, 80, 80, 0.2)",
            tension: 0.4,
            pointRadius: chartType === "scatter" ? 5 : 3,
            pointBackgroundColor: "rgb(150, 150, 150)",
            fill: chartType === "line",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: simulationData.title,
            color: "rgb(200, 200, 200)",
            font: {
              size: 16,
            },
          },
          legend: {
            labels: {
              color: "rgb(200, 200, 200)",
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "X",
              color: "rgb(200, 200, 200)",
            },
            ticks: {
              color: "rgb(200, 200, 200)",
            },
            grid: {
              color: "rgba(50, 50, 50, 0.2)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Y",
              color: "rgb(200, 200, 200)",
            },
            ticks: {
              color: "rgb(200, 200, 200)",
            },
            grid: {
              color: "rgba(50, 50, 50, 0.2)",
            },
          },
        },
      },
    })
  }

  const render3DVisualization = () => {
    if (!threeContainerRef.current || !results) return

    // Clean up previous scene
    if (threeSceneRef.current) {
      threeSceneRef.current.dispose()
    }

    // Create scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050505)

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(threeContainerRef.current.clientWidth, threeContainerRef.current.clientHeight)
    threeContainerRef.current.innerHTML = ""
    threeContainerRef.current.appendChild(renderer.domElement)

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // Add grid
    const gridHelper = new THREE.GridHelper(10, 10, 0x333333, 0x111111)
    scene.add(gridHelper)

    // Add axes
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    // Create points
    const geometry = new THREE.BufferGeometry()
    const positions: number[] = []
    const colors: number[] = []

    // Add points from results
    for (let i = 0; i < results.x.length; i++) {
      // Normalize coordinates to fit in scene
      const x = results.x[i]
      const y = results.y[i]
      const z = results.z ? results.z[i] : 0

      positions.push(x, y, z)

      // Add grayscale colors based on z value or index
      const colorValue = results.z ? results.z[i] : i / results.x.length
      const color = new THREE.Color()
      color.setRGB(0.5 + colorValue * 0.5, 0.5 + colorValue * 0.5, 0.5 + colorValue * 0.5)
      colors.push(color.r, color.g, color.b)
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    function handleResize() {
      if (!threeContainerRef.current) return
      camera.aspect = threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(threeContainerRef.current.clientWidth, threeContainerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Store references for cleanup
    threeSceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      dispose: () => {
        window.removeEventListener("resize", handleResize)
        renderer.dispose()
        geometry.dispose()
        material.dispose()
        controls.dispose()
        if (threeContainerRef.current) {
          threeContainerRef.current.innerHTML = ""
        }
      },
    }
  }

  const renderEquations = () => {
    try {
      // Safely check if KaTeX is loaded and the container exists
      if (
        typeof window !== "undefined" &&
        window.renderMathInElement &&
        typeof window.renderMathInElement === "function" &&
        document.getElementById("equations-container")
      ) {
        window.renderMathInElement(document.getElementById("equations-container"), {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
          ],
          throwOnError: false,
        })
      }
    } catch (error) {
      console.error("Error rendering equations:", error)
    }
  }

  // Load KaTeX from CDN
  useEffect(() => {
    let isMounted = true

    const loadKaTeX = async () => {
      try {
        // Add KaTeX CSS if not already added
        if (!document.querySelector('link[href*="katex"]')) {
          const linkElement = document.createElement("link")
          linkElement.rel = "stylesheet"
          linkElement.href = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
          linkElement.crossOrigin = "anonymous"
          document.head.appendChild(linkElement)
        }

        // Add KaTeX script if not already added
        if (!window.katex) {
          // Load main KaTeX script
          await new Promise<void>((resolve, reject) => {
            const scriptElement = document.createElement("script")
            scriptElement.defer = true
            scriptElement.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"
            scriptElement.crossOrigin = "anonymous"
            scriptElement.onload = () => resolve()
            scriptElement.onerror = (e) => reject(e)
            document.head.appendChild(scriptElement)
          })

          // Load auto-render extension
          await new Promise<void>((resolve, reject) => {
            const autoRenderScript = document.createElement("script")
            autoRenderScript.defer = true
            autoRenderScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"
            autoRenderScript.crossOrigin = "anonymous"
            autoRenderScript.onload = () => resolve()
            autoRenderScript.onerror = (e) => reject(e)
            document.head.appendChild(autoRenderScript)
          })
        }

        // Set KaTeX as loaded
        if (isMounted) {
          setKatexLoaded(true)
        }
      } catch (error) {
        console.error("Error loading KaTeX:", error)
      }
    }

    loadKaTeX()

    return () => {
      isMounted = false
    }
  }, [])

  if (!simulationData) {
    return (
      <Card className="border-gray-900 bg-[#0a0a0a] h-full">
        <CardContent className="p-6 flex items-center justify-center h-[400px]">
          <div className="text-center">
            <p className="text-gray-500">Enter a simulation prompt to begin</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-6 space-y-8 bg-[#0a0a0a]">
      {isProcessing ? (
        <div className="flex items-center justify-center h-[400px]">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Processing simulation...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Visualization Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-300">Visualization</h3>
            <div className="relative w-full h-[300px] bg-[#0a0a0a] border border-gray-900 rounded-md overflow-hidden">
              {simulationData.chartType === "3d" ? (
                <div ref={threeContainerRef} className="w-full h-full" />
              ) : (
                <canvas ref={canvasRef} className="w-full h-full" />
              )}
            </div>
          </div>

          {/* Equations Section */}
          {simulationData.equations && simulationData.equations.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">Mathematical Formulation</h3>
              <div id="equations-container" className="space-y-4 font-serif">
                {simulationData.equations.map((equation: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="py-3 px-4 bg-[#111111] border border-gray-900 rounded-md overflow-x-auto"
                  >
                    {katexLoaded ? (
                      `$$${equation}$$`
                    ) : (
                      <div className="text-gray-400 font-mono text-sm whitespace-pre-wrap">{equation}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Data Section */}
          {results && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">Data</h3>
              <div className="relative w-full max-h-[300px] overflow-auto rounded-md border border-gray-900">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#111111]">
                      <th className="p-2 text-left text-gray-400 border-b border-gray-900">Index</th>
                      <th className="p-2 text-left text-gray-400 border-b border-gray-900">X</th>
                      <th className="p-2 text-left text-gray-400 border-b border-gray-900">Y</th>
                      {results.z && <th className="p-2 text-left text-gray-400 border-b border-gray-900">Z</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {results.x.map((x: number, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-[#0a0a0a]" : "bg-[#0f0f0f]"}>
                        <td className="p-2 text-gray-400 border-b border-gray-900">{index}</td>
                        <td className="p-2 text-gray-400 border-b border-gray-900">{x.toFixed(4)}</td>
                        <td className="p-2 text-gray-400 border-b border-gray-900">{results.y[index].toFixed(4)}</td>
                        {results.z && (
                          <td className="p-2 text-gray-400 border-b border-gray-900">{results.z[index].toFixed(4)}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
