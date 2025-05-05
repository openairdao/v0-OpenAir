"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton as SolanaWalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function WalletMultiButton() {
  const { connected, wallet, connecting, disconnect } = useWallet()
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [demoMode, setDemoMode] = useState(false)
  const router = useRouter()

  // Ensure component is mounted to avoid hydration errors
  useEffect(() => {
    setMounted(true)
    // Check if we're in demo mode
    const isDemo = localStorage.getItem("openair-demo-mode") === "true"
    setDemoMode(isDemo)
  }, [])

  // Handle wallet connection errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error && event.error.name === "WalletNotReadyError") {
        setError("Wallet not available. Please install a Solana wallet extension.")
        console.error("Wallet error:", event.error)
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  // Function to handle demo mode
  const handleDemoMode = () => {
    // Set a flag in localStorage to indicate we're in demo mode
    localStorage.setItem("openair-demo-mode", "true")
    // Refresh the page to apply demo mode
    window.location.reload()
  }

  // Function to exit demo mode
  const handleExitDemoMode = () => {
    localStorage.removeItem("openair-demo-mode")
    // Refresh the page to apply changes
    window.location.reload()
  }

  // If we're in a preview environment or the wallet isn't available, show a mock button
  if (!mounted || error) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" className="rounded-md" onClick={handleDemoMode}>
          View Demo
        </Button>
        <Button variant="outline" className="rounded-md">
          Connect Wallet
        </Button>
        {error && (
          <div className="absolute top-full mt-2 right-0 p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded shadow-sm whitespace-nowrap z-50">
            {error}
          </div>
        )}
      </div>
    )
  }

  // In development/preview mode or if demo mode is active, provide a mock wallet experience
  if (process.env.NODE_ENV === "development" || typeof window === "undefined" || !wallet || demoMode) {
    return (
      <div className="flex items-center gap-2">
        {demoMode ? (
          <Button variant="outline" className="rounded-md" onClick={handleExitDemoMode}>
            Exit Demo
          </Button>
        ) : (
          <Button variant="outline" className="rounded-md" onClick={handleDemoMode}>
            View Demo
          </Button>
        )}
        <Button variant="outline" className="rounded-md">
          Connect Wallet
        </Button>
      </div>
    )
  }

  return (
    <div className={connected ? "wallet-adapter-connected" : ""}>
      <SolanaWalletMultiButton className="wallet-adapter-button-trigger" />
    </div>
  )
}
