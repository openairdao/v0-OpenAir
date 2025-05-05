"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { PublicKey } from "@solana/web3.js"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Mock $AIR token mint address (would be a real token mint address in production)
const AIR_TOKEN_MINT = new PublicKey("11111111111111111111111111111111")

export function AirTokenBalance() {
  const { publicKey, connected } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle mounted state to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !connected) {
      setBalance(null)
      return
    }

    const fetchTokenBalance = async () => {
      try {
        setLoading(true)
        // In a real app, we would fetch the actual token balance from the blockchain
        // For demo purposes, we're always showing a positive balance

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Always show a positive balance to simulate having tokens
        // This allows access to all features without requiring actual tokens
        const mockBalance = 1250.75
        setBalance(mockBalance)
      } catch (error) {
        console.error("Error fetching token balance:", error)
        // Even on error, show a positive balance to ensure access
        setBalance(1000)
      } finally {
        setLoading(false)
      }
    }

    fetchTokenBalance()

    // Set up an interval to refresh the balance periodically
    const intervalId = setInterval(fetchTokenBalance, 30000)

    return () => clearInterval(intervalId)
  }, [connected, mounted])

  // Don't render anything if not mounted or not connected
  if (!mounted || !connected) {
    return null
  }

  return (
    <div className="flex items-center">
      {loading ? (
        <Skeleton className="h-6 w-24" />
      ) : (
        <Badge variant="outline" className="px-3 py-1 font-medium bg-green-50 text-green-700 border-green-200">
          {balance !== null ? `${balance.toLocaleString()} $AIR` : "1,000 $AIR"}
        </Badge>
      )}
    </div>
  )
}
