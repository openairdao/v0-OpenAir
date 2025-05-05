"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

interface SensorLocation {
  id: string
  name: string
  lat: number
  lng: number
  aqi: number
  status: "good" | "moderate" | "unhealthy" | "hazardous"
}

export function AirQualityMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock sensor locations
  const sensorLocations: SensorLocation[] = [
    { id: "sensor-1", name: "Downtown", lat: 37.7749, lng: -122.4194, aqi: 42, status: "good" },
    { id: "sensor-2", name: "Westside", lat: 37.7833, lng: -122.4167, aqi: 65, status: "moderate" },
    { id: "sensor-3", name: "Eastside", lat: 37.8044, lng: -122.2711, aqi: 110, status: "unhealthy" },
    { id: "sensor-4", name: "Southside", lat: 37.7219, lng: -122.4782, aqi: 35, status: "good" },
    { id: "sensor-5", name: "Northside", lat: 37.8045, lng: -122.4107, aqi: 48, status: "good" },
  ]

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-muted/20 rounded-md">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative h-[400px] bg-muted/20 rounded-md overflow-hidden">
        {/* This would be replaced with an actual map component in a real application */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">Interactive map would be displayed here with sensor locations</p>
        </div>

        {/* Map placeholder with sensor indicators */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <MapSensorIndicator status="good" />
          </div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MapSensorIndicator status="moderate" />
          </div>
          <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
            <MapSensorIndicator status="unhealthy" />
          </div>
          <div className="absolute top-2/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <MapSensorIndicator status="good" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MapSensorIndicator status="good" />
          </div>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {sensorLocations.map((sensor) => (
          <div key={sensor.id} className="flex items-center justify-between p-3 border rounded-md">
            <div>
              <div className="font-medium">{sensor.name}</div>
              <div className="text-sm text-muted-foreground">AQI: {sensor.aqi}</div>
            </div>
            <StatusBadge status={sensor.status} />
          </div>
        ))}
      </div>
    </div>
  )
}

function MapSensorIndicator({ status }: { status: "good" | "moderate" | "unhealthy" | "hazardous" }) {
  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "unhealthy":
        return "bg-orange-500"
      case "hazardous":
        return "bg-red-500"
    }
  }

  return <div className={`w-4 h-4 rounded-full ${getStatusColor()} ring-4 ring-white`} />
}

function StatusBadge({ status }: { status: "good" | "moderate" | "unhealthy" | "hazardous" }) {
  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "bg-green-50 text-green-700 border-green-200"
      case "moderate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "unhealthy":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "hazardous":
        return "bg-red-50 text-red-700 border-red-200"
    }
  }

  return (
    <Badge variant="outline" className={getStatusColor()}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
