"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, AlertTriangle, Clock, CloudRain, Wind, Thermometer } from "lucide-react"
import { AirQualityChart } from "@/components/air-quality-chart"
import { AirQualityMap } from "@/components/air-quality-map"
import { BlockchainTransactions } from "@/components/blockchain-transactions"
import { type AirQualityData, fetchAirQualityData } from "@/lib/air-quality-service"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export default function AirQualityDashboard() {
  const { connected } = useWallet()
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mounted, setMounted] = useState(false)
  const [demoMode, setDemoMode] = useState(false)

  // Handle mounted state to avoid hydration errors
  useEffect(() => {
    setMounted(true)
    // Check if we're in demo mode
    const isDemo = localStorage.getItem("openair-demo-mode") === "true"
    setDemoMode(isDemo)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchAirQualityData()
        setAirQualityData(data)
      } catch (error) {
        console.error("Failed to fetch air quality data:", error)
      } finally {
        setLoading(false)
      }
    }

    // Only load data if we're in a browser environment
    if (mounted) {
      loadData()
      // Refresh data every 5 minutes
      const intervalId = setInterval(loadData, 5 * 60 * 1000)
      return () => clearInterval(intervalId)
    }
  }, [mounted])

  // Show welcome screen only if not in demo mode and not connected
  const showWelcomeScreen = !mounted || (!connected && !demoMode)

  const handleEnterDemoMode = () => {
    localStorage.setItem("openair-demo-mode", "true")
    setDemoMode(true)
  }

  if (showWelcomeScreen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Image src="/images/openair-logo.png" alt="OpenAir DAO Logo" width={120} height={120} className="mb-4" />
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to OpenAir DAO</h2>
          <p className="text-muted-foreground mb-6">
            {mounted
              ? "Please connect your Solana wallet to access the air quality monitoring dashboard."
              : "Loading application..."}
          </p>
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>No Wallet Required</AlertTitle>
            <AlertDescription>You can view the dashboard in demo mode without connecting a wallet.</AlertDescription>
          </Alert>

          {mounted && (
            <Button className="mt-6 bg-[#001f5c] hover:bg-[#00296b]" onClick={handleEnterDemoMode}>
              Enter Demo Mode
            </Button>
          )}
        </div>
      </div>
    )
  }

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      {demoMode && (
        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Demo Mode Active</AlertTitle>
          <AlertDescription>
            You're viewing the application in demo mode. All features are accessible without requiring a wallet
            connection.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#001f5c]">Air Quality Monitoring</h1>
        <p className="text-muted-foreground">
          Real-time air quality data secured and verified on the Solana blockchain
        </p>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain Records</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <AirQualityMetricCard
              title="Air Quality Index"
              value={airQualityData?.currentAQI.toString() || "--"}
              status={getAQIStatus(airQualityData?.currentAQI || 0)}
              icon={<Wind className="h-4 w-4" />}
            />
            <AirQualityMetricCard
              title="PM2.5"
              value={`${airQualityData?.pm25.toString() || "--"} μg/m³`}
              status={getPM25Status(airQualityData?.pm25 || 0)}
              icon={<AlertTriangle className="h-4 w-4" />}
            />
            <AirQualityMetricCard
              title="Temperature"
              value={`${airQualityData?.temperature.toString() || "--"}°C`}
              status="normal"
              icon={<Thermometer className="h-4 w-4" />}
            />
            <AirQualityMetricCard
              title="Humidity"
              value={`${airQualityData?.humidity.toString() || "--"}%`}
              status="normal"
              icon={<CloudRain className="h-4 w-4" />}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Air Quality Trend</CardTitle>
                <CardDescription>24-hour AQI trend secured on blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <AirQualityChart data={airQualityData?.historicalData || []} />
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  Last updated: {airQualityData?.lastUpdated || "Unknown"}
                </div>
              </CardFooter>
            </Card>

            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Latest Blockchain Records</CardTitle>
                <CardDescription>Recent air quality data recorded on Solana</CardDescription>
              </CardHeader>
              <CardContent>
                <BlockchainTransactions limit={5} />
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("blockchain")}>
                  View All Records
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Air Quality Map</CardTitle>
              <CardDescription>Geographic distribution of air quality sensors</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <AirQualityMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Transaction History</CardTitle>
              <CardDescription>All air quality data recorded on the Solana blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <BlockchainTransactions limit={20} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface AirQualityMetricCardProps {
  title: string
  value: string
  status: "good" | "moderate" | "unhealthy" | "hazardous" | "normal"
  icon: React.ReactNode
}

function AirQualityMetricCard({ title, value, status, icon }: AirQualityMetricCardProps) {
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
      default:
        return "bg-blue-50 text-blue-700 border-blue-200"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "good":
        return "Good"
      case "moderate":
        return "Moderate"
      case "unhealthy":
        return "Unhealthy"
      case "hazardous":
        return "Hazardous"
      default:
        return "Normal"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <Badge variant="outline" className={`mt-2 ${getStatusColor()}`}>
          {getStatusText()}
        </Badge>
      </CardContent>
    </Card>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-72" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-5 w-20" />
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>

          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function getAQIStatus(aqi: number): "good" | "moderate" | "unhealthy" | "hazardous" {
  if (aqi <= 50) return "good"
  if (aqi <= 100) return "moderate"
  if (aqi <= 150) return "unhealthy"
  return "hazardous"
}

function getPM25Status(pm25: number): "good" | "moderate" | "unhealthy" | "hazardous" {
  if (pm25 <= 12) return "good"
  if (pm25 <= 35.4) return "moderate"
  if (pm25 <= 55.4) return "unhealthy"
  return "hazardous"
}
