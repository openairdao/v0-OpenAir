"use client"

import { InfoIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DemoModeIndicator() {
  return (
    <Alert className="mb-6 bg-blue-50 text-blue-800 border-blue-200">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Demo Mode Active</AlertTitle>
      <AlertDescription>
        You're viewing the application in demo mode. All features are accessible without requiring actual $AIR tokens.
      </AlertDescription>
    </Alert>
  )
}
