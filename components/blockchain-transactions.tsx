"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle, ExternalLink } from "lucide-react"

interface Transaction {
  signature: string
  timestamp: string
  sensorId: string
  aqi: number
  pm25: number
  confirmed: boolean
}

interface BlockchainTransactionsProps {
  limit?: number
}

export function BlockchainTransactions({ limit = 10 }: BlockchainTransactionsProps) {
  const { connected } = useWallet()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Handle mounted state to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only fetch if we're in a browser environment
    if (!mounted) return

    const fetchTransactions = async () => {
      try {
        setLoading(true)
        // In a real app, we would fetch actual blockchain transactions

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Get current date and time
        const now = new Date()

        // Generate dynamic timestamps based on current time
        const mockTransactions: Transaction[] = [
          {
            signature: "5qpT3NWxcR4Lv2Jj8YQYGNqoFrfDKxHd7mwTJDHX5BsrUZf9qdkHZXnXP6iSz7RYZHBmx9aQNwLCvMJGkw3f2Qe",
            timestamp: new Date(now.getTime() - 5 * 60000).toISOString(), // 5 minutes ago
            sensorId: "sensor-1",
            aqi: 42,
            pm25: 12.5,
            confirmed: true,
          },
          {
            signature: "3xRTm2Nj6LpYvBqDzHwK9FcS4GxZeJQr7tVX8sP5RmYfUZf9qdkHZXnXP6iSz7RYZHBmx9aQNwLCvMJGkw3f2Qe",
            timestamp: new Date(now.getTime() - 20 * 60000).toISOString(), // 20 minutes ago
            sensorId: "sensor-2",
            aqi: 65,
            pm25: 22.3,
            confirmed: true,
          },
          {
            signature: "7aQpWxYzE4Rt2VbNmLkF8sJdG3hP9cRvX5sT6uZf9qdkHZXnXP6iSz7RYZHBmx9aQNwLCvMJGkw3f2Qe",
            timestamp: new Date(now.getTime() - 35 * 60000).toISOString(), // 35 minutes ago
            sensorId: "sensor-3",
            aqi: 110,
            pm25: 45.8,
            confirmed: true,
          },
          {
            signature: "2bTrKpLm5nVxCzJqWsYf7gDh8eP3aRvX5sT6uZf9qdkHZXnXP6iSz7RYZHBmx9aQNwLCvMJGkw3f2Qe",
            timestamp: new Date(now.getTime() - 50 * 60000).toISOString(), // 50 minutes ago
            sensorId: "sensor-4",
            aqi: 35,
            pm25: 9.2,
            confirmed: true,
          },
          {
            signature: "9cXpWzYtE4Rt2VbNmLkF8sJdG3hP9cRvX5sT6uZf9qdkHZXnXP6iSz7RYZHBmx9aQNwLCvMJGkw3f2Qe",
            timestamp: new Date(now.getTime() - 65 * 60000).toISOString(), // 65 minutes ago
            sensorId: "sensor-5",
            aqi: 48,
            pm25: 14.7,
            confirmed: true,
          },
          {
            signature: "4dRtMpLm5nVxCzJqWsYf7gDh8eP3aRvX5sT6uZf9qdkHZXnXP6iSz7RYZHBmx9aQNwLCvMJGkw3f2Qe",
            timestamp: new Date(now.getTime() - 80 * 60000).toISOString(), // 80 minutes ago
            sensorId: "sensor-1",
            aqi: 44,
            pm25: 13.1,
            confirmed: true,
          },
          {
            signature: "6eTsWzYtE4Rt2VbNmLkF8sJdG3hP9cRvX5sT6uZf9qdkHZXnXP6iSz7RYZHBmx9aQNwLCvMJGkw3f2Qe",
            timestamp: new Date(now.getTime() - 95 * 60000).toISOString(), // 95 minutes ago
            sensorId: "sensor-2",
            aqi: 68,
            pm25: 23.5,
            confirmed: true,
          },
          {
            signature: "8fVuNpLm5nVxCzJqWsYf7gDh8eP3aRvX5sT6uZf9qdkHZXnXP6iSz7RYZHBmx9aQNwLCvMJGkw3f2Qe",
            timestamp: new Date(now.getTime() - 110 * 60000).toISOString(), // 110 minutes ago
            sensorId: "sensor-3",
            aqi: 105,
            pm25: 42.3,
            confirmed: true,
          },
          {
            signature: "1gWvXzYtE4Rt2VbNmLkF8sJdG3hP9cRvX5sT6uZf9qdkHZXnXP6iSz7RYZHBmx9aQNwLCvMJGkw3f2Qe",
            timestamp: new Date(now.getTime() - 125 * 60000).toISOString(), // 125 minutes ago
            sensorId: "sensor-4",
            aqi: 38,
            pm25: 10.5,
            confirmed: true,
          },
          {
            signature: "5hYwPpLm5nVxCzJqWsYf7gDh8eP3aRvX5sT6uZf9qdkHZXnXP6iSz7RYZHBmx9aQNwLCvMJGkw3f2Qe",
            timestamp: new Date(now.getTime() - 140 * 60000).toISOString(), // 140 minutes ago
            sensorId: "sensor-5",
            aqi: 50,
            pm25: 15.2,
            confirmed: true,
          },
        ]

        setTransactions(mockTransactions.slice(0, limit))
      } catch (error) {
        console.error("Error fetching blockchain transactions:", error)
        // Even on error, show some mock data with current time
        const now = new Date()
        setTransactions([
          {
            signature: "5qpT3NWxcR4Lv2Jj8YQYGNqoFrfDKxHd7mwTJDHX5BsrUZf9qdkHZXnXP6iSz7RYZHBmx9aQNwLCvMJGkw3f2Qe",
            timestamp: new Date(now.getTime() - 5 * 60000).toISOString(), // 5 minutes ago
            sensorId: "sensor-1",
            aqi: 42,
            pm25: 12.5,
            confirmed: true,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [limit, mounted]) // Remove connected dependency to always fetch

  if (!mounted) {
    return (
      <div className="space-y-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {Array(limit)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <p className="text-muted-foreground mb-4">No blockchain transactions found</p>
        <Button variant="outline" size="sm">
          Refresh
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <div key={tx.signature} className="flex items-center justify-between p-3 border rounded-md text-sm">
          <div className="grid gap-1">
            <div className="font-medium flex items-center">
              Sensor {tx.sensorId.split("-")[1]} Data
              {tx.confirmed && <CheckCircle className="ml-1 h-3 w-3 text-green-500" />}
            </div>
            <div className="text-xs text-muted-foreground">
              AQI: {tx.aqi} | PM2.5: {tx.pm25} μg/m³
            </div>
            <div className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleString()}</div>
          </div>
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <a
              href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">View on Solana Explorer</span>
            </a>
          </Button>
        </div>
      ))}
    </div>
  )
}
