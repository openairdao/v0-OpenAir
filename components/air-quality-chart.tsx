"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface HistoricalDataPoint {
  timestamp: string
  aqi: number
  pm25: number
}

interface AirQualityChartProps {
  data: HistoricalDataPoint[]
}

export function AirQualityChart({ data }: AirQualityChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-muted/20 rounded-md">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  // If no data is provided, show sample data
  const chartData =
    data.length > 0
      ? data
      : [
          { timestamp: "00:00", aqi: 35, pm25: 10 },
          { timestamp: "04:00", aqi: 42, pm25: 12 },
          { timestamp: "08:00", aqi: 58, pm25: 18 },
          { timestamp: "12:00", aqi: 75, pm25: 25 },
          { timestamp: "16:00", aqi: 62, pm25: 20 },
          { timestamp: "20:00", aqi: 48, pm25: 15 },
          { timestamp: "24:00", aqi: 40, pm25: 12 },
        ]

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} domain={[0, "dataMax + 20"]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #f0f0f0",
              borderRadius: "6px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="aqi"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
            name="AQI"
          />
          <Line
            type="monotone"
            dataKey="pm25"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
            name="PM2.5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
