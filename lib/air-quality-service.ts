export interface AirQualityData {
  currentAQI: number
  pm25: number
  temperature: number
  humidity: number
  lastUpdated: string
  historicalData: {
    timestamp: string
    aqi: number
    pm25: number
  }[]
}

export async function fetchAirQualityData(): Promise<AirQualityData> {
  // In a real app, this would fetch data from an API
  // For demo purposes, we're returning mock data

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Get current date and time
  const now = new Date()

  // Mock data with current timestamp
  return {
    currentAQI: 58,
    pm25: 18.5,
    temperature: 24.3,
    humidity: 65,
    lastUpdated: now.toLocaleString(),
    historicalData: [
      { timestamp: "00:00", aqi: 35, pm25: 10 },
      { timestamp: "04:00", aqi: 42, pm25: 12 },
      { timestamp: "08:00", aqi: 58, pm25: 18 },
      { timestamp: "12:00", aqi: 75, pm25: 25 },
      { timestamp: "16:00", aqi: 62, pm25: 20 },
      { timestamp: "20:00", aqi: 48, pm25: 15 },
      { timestamp: "24:00", aqi: 40, pm25: 12 },
    ],
  }
}
