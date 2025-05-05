import { Suspense } from "react"
import Image from "next/image"
import AirQualityDashboard from "@/components/air-quality-dashboard"
import WalletConnectionProvider from "@/components/wallet-connection-provider"
import { WalletMultiButton } from "@/components/wallet-multi-button"
import { AirTokenBalance } from "@/components/air-token-balance"
import { Loader } from "@/components/loader"

export default function HomePage() {
  return (
    <WalletConnectionProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/images/openair-logo.png" alt="OpenAir DAO Logo" width={40} height={40} />
              <span className="text-xl font-bold text-[#001f5c]">OpenAir</span>
            </div>
            <div className="flex items-center gap-4">
              <AirTokenBalance />
              <WalletMultiButton />
            </div>
          </div>
        </header>
        <main className="flex-1 container py-6">
          <Suspense fallback={<Loader />}>
            <AirQualityDashboard />
          </Suspense>
        </main>
        <footer className="border-t py-4">
          <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 OpenAir DAO. All rights reserved.</p>
            <p className="text-sm text-muted-foreground">Powered by Solana Blockchain</p>
          </div>
        </footer>
      </div>
    </WalletConnectionProvider>
  )
}
