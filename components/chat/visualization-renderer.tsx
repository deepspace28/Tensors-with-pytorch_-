"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface VisualizationRendererProps {
  content: string
  type: "table" | "chart"
}

export function VisualizationRenderer({ content, type }: VisualizationRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [chartData, setChartData] = useState<any[] | null>(null)
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">("line")
  const [tableData, setTableData] = useState<{ headers: string[]; rows: string[][] } | null>(null)

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  useEffect(() => {
    if (!containerRef.current) return

    try {
      // Try to parse the content as JSON first (for chart data)
      try {
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```([\s\S]*?)\n```/)

        if (jsonMatch && jsonMatch[1]) {
          const parsedData = JSON.parse(jsonMatch[1])

          if (Array.isArray(parsedData)) {
            setChartData(parsedData)

            // Try to determine chart type  {
            setChartData(parsedData)

            // Try to determine chart type
            if (content.toLowerCase().includes("line chart") || content.toLowerCase().includes("time series")) {
              setChartType("line")
            } else if (content.toLowerCase().includes("bar chart") || content.toLowerCase().includes("histogram")) {
              setChartType("bar")
            } else if (content.toLowerCase().includes("pie chart")) {
              setChartType("pie")
            }
          }
        }
      } catch (e) {
        console.error("Failed to parse chart data:", e)
      }

      // Try to parse table data
      if (type === "table") {
        try {
          // Parse markdown table
          const tableLines = content
            .split("\n")
            .filter((line) => line.trim().startsWith("|"))
            .map((line) => line.trim())

          if (tableLines.length >= 2) {
            const headers = tableLines[0]
              .split("|")
              .filter((cell) => cell.trim() !== "")
              .map((cell) => cell.trim())

            // Skip the separator line (usually the second line with |---|---|)
            const rows = tableLines.slice(2).map((line) =>
              line
                .split("|")
                .filter((cell) => cell.trim() !== "")
                .map((cell) => cell.trim()),
            )

            setTableData({ headers, rows })
          }
        } catch (e) {
          console.error("Failed to parse table data:", e)
        }
      }
    } catch (error) {
      console.error("Error rendering visualization:", error)
    }
  }, [content, type])

  if (type === "table" && tableData) {
    return (
      <Card className="overflow-x-auto border border-gray-800 bg-gray-900/50">
        <div className="p-2">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                {tableData.headers.map((header, i) => (
                  <th key={i} className="p-2 text-left text-sm font-medium text-gray-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-800/50">
                  {row.map((cell, j) => (
                    <td key={j} className="p-2 text-sm text-gray-400">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    )
  }

  if (chartData && chartData.length > 0) {
    return (
      <Card className="border border-gray-800 bg-gray-900/50 p-4">
        <ResponsiveContainer width="100%" height={300}>
          {chartType === "line" ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey={Object.keys(chartData[0])[0]} stroke="#888" tick={{ fill: "#888" }} />
              <YAxis stroke="#888" tick={{ fill: "#888" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#222", border: "1px solid #444" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              {Object.keys(chartData[0])
                .filter((key) => key !== Object.keys(chartData[0])[0])
                .map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={COLORS[index % COLORS.length]}
                    activeDot={{ r: 8 }}
                  />
                ))}
            </LineChart>
          ) : chartType === "bar" ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey={Object.keys(chartData[0])[0]} stroke="#888" tick={{ fill: "#888" }} />
              <YAxis stroke="#888" tick={{ fill: "#888" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#222", border: "1px solid #444" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              {Object.keys(chartData[0])
                .filter((key) => key !== Object.keys(chartData[0])[0])
                .map((key, index) => (
                  <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />
                ))}
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey={Object.keys(chartData[0])[1]}
                nameKey={Object.keys(chartData[0])[0]}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#222", border: "1px solid #444" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </Card>
    )
  }

  // Fallback for when we can't parse the data
  return (
    <Card className="border border-gray-800 bg-gray-900/50">
      <div ref={containerRef} className="p-4 text-sm text-gray-400">
        {!content || typeof content !== "string" || !content.trim() ? (
          <p>No content to display.</p>
        ) : (
          <pre className="whitespace-pre-wrap">{content}</pre>
        )}
      </div>
    </Card>
  )
}
