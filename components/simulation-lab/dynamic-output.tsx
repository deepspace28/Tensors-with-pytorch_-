"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const [activeTab, setActiveTab] = useState("visualization")
  const chartRef = useRef<Chart | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threeContainerRef = useRef<HTMLDivElement>(null)
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

    if (activeTab === "visualization") {
      if (simulationData.chartType === "3d") {
        render3DVisualization()
      } else {
        render2DVisualization()
      }
    } else if (activeTab === "equations") {
      renderEquations()
    }
  }, [activeTab, isProcessing, simulationData, results])

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
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
            pointRadius: chartType === "scatter" ? 5 : 3,
            pointBackgroundColor: "rgb(75, 192, 192)",
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
              color: "rgba(100, 100, 100, 0.2)",
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
              color: "rgba(100, 100, 100, 0.2)",
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
    scene.background = new THREE.Color(0x111111)

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
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222)
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

      // Add colors based on z value or index
      const colorValue = results.z ? results.z[i] : i / results.x.length
      const color = new THREE.Color()
      color.setHSL(0.6 - colorValue * 0.5, 1.0, 0.5)
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
    // KaTeX will be loaded via CDN and handled in the component
    if (typeof window !== "undefined" && window.renderMathInElement && document.getElementById("equations-container")) {
      window.renderMathInElement(document.getElementById("equations-container"), {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      })
    }
  }

  // Load KaTeX from CDN
  useEffect(() => {
    // Add KaTeX CSS if not already added
    if (typeof window !== "undefined" && !document.querySelector('link[href*="katex"]')) {
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
      linkElement.integrity = "sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn"
      linkElement.crossOrigin = "anonymous"
      document.head.appendChild(linkElement)
    }

    // Add KaTeX script if not already added
    if (typeof window !== "undefined" && !window.katex) {
      const scriptElement = document.createElement("script")
      scriptElement.defer = true
      scriptElement.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"
      scriptElement.integrity = "sha384-cpW21h6RZv/phavutF+AuVYrr+dA8xD9zs6FwLpaCct6O9ctzYFfFr4dgmgccOTx"
      scriptElement.crossOrigin = "anonymous"
      document.head.appendChild(scriptElement)

      // Add auto-render extension
      const autoRenderScript = document.createElement("script")
      autoRenderScript.defer = true
      autoRenderScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"
      autoRenderScript.integrity = "sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05"
      autoRenderScript.crossOrigin = "anonymous"
      autoRenderScript.onload = () => {
        renderEquations()
      }
      document.head.appendChild(autoRenderScript)
    } else if (typeof window !== "undefined" && window.renderMathInElement) {
      renderEquations()
    }
  }, [simulationData])

  if (!simulationData) {
    return (
      <Card className="border-gray-800 bg-gray-900 h-full">
        <CardContent className="p-6 flex items-center justify-center h-[400px]">
          <div className="text-center">
            <p className="text-gray-400">Enter a simulation prompt to begin</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-800 bg-gray-900 h-full">
      <CardHeader className="pb-2 border-b border-gray-800">
        <CardTitle className="text-lg font-medium text-white">{simulationData.title}</CardTitle>
        <CardDescription className="text-gray-400">{simulationData.explanation}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="visualization" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-gray-800 rounded-none border-b border-gray-700">
            <TabsTrigger value="visualization" className="data-[state=active]:bg-gray-700">
              Visualization
            </TabsTrigger>
            <TabsTrigger value="equations" className="data-[state=active]:bg-gray-700">
              Equations
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-gray-700">
              Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visualization" className="p-0 m-0">
            <div className="relative w-full h-[400px]">
              {isProcessing ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-cyan-500 mb-2" />
                    <p className="text-sm text-gray-400">Processing simulation...</p>
                  </div>
                </div>
              ) : simulationData.chartType === "3d" ? (
                <div ref={threeContainerRef} className="w-full h-full" />
              ) : (
                <canvas ref={canvasRef} className="w-full h-full" />
              )}
            </div>
          </TabsContent>

          <TabsContent value="equations" className="p-4 m-0">
            <div id="equations-container" className="space-y-4 font-serif">
              {simulationData.equations.map((equation: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="py-3 px-4 bg-gray-800/50 rounded-md overflow-x-auto"
                >
                  {`$$${equation}$$`}
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="data" className="p-0 m-0">
            <div className="relative w-full h-[400px] overflow-auto">
              {isProcessing ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-cyan-500 mb-2" />
                    <p className="text-sm text-gray-400">Processing data...</p>
                  </div>
                </div>
              ) : results ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="p-2 text-left text-gray-300 border-b border-gray-700">Index</th>
                      <th className="p-2 text-left text-gray-300 border-b border-gray-700">X</th>
                      <th className="p-2 text-left text-gray-300 border-b border-gray-700">Y</th>
                      {results.z && <th className="p-2 text-left text-gray-300 border-b border-gray-700">Z</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {results.x.map((x: number, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-850"}>
                        <td className="p-2 text-gray-300 border-b border-gray-800">{index}</td>
                        <td className="p-2 text-gray-300 border-b border-gray-800">{x.toFixed(4)}</td>
                        <td className="p-2 text-gray-300 border-b border-gray-800">{results.y[index].toFixed(4)}</td>
                        {results.z && (
                          <td className="p-2 text-gray-300 border-b border-gray-800">{results.z[index].toFixed(4)}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-gray-400">No data available</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
