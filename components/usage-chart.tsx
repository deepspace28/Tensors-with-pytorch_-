"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Apr 1", apiCalls: 400, simulations: 24 },
  { name: "Apr 2", apiCalls: 300, simulations: 18 },
  { name: "Apr 3", apiCalls: 520, simulations: 35 },
  { name: "Apr 4", apiCalls: 450, simulations: 30 },
  { name: "Apr 5", apiCalls: 380, simulations: 21 },
  { name: "Apr 6", apiCalls: 250, simulations: 15 },
  { name: "Apr 7", apiCalls: 300, simulations: 20 },
  { name: "Apr 8", apiCalls: 470, simulations: 32 },
  { name: "Apr 9", apiCalls: 580, simulations: 40 },
  { name: "Apr 10", apiCalls: 520, simulations: 35 },
  { name: "Apr 11", apiCalls: 400, simulations: 28 },
  { name: "Apr 12", apiCalls: 350, simulations: 23 },
  { name: "Apr 13", apiCalls: 420, simulations: 30 },
  { name: "Apr 14", apiCalls: 480, simulations: 35 },
]

export function UsageChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        className="[&_.recharts-cartesian-grid-horizontal]:stroke-muted-foreground/20 [&_.recharts-cartesian-grid-vertical]:stroke-muted-foreground/20"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="apiCalls" fill="hsl(var(--primary))" name="API Calls" radius={[4, 4, 0, 0]} />
        <Bar dataKey="simulations" fill="hsl(var(--secondary))" name="Simulations" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
