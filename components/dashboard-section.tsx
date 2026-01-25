"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp, Recycle, AlertTriangle } from "lucide-react"

// Mock data for demonstration
const mockDetections = [
  { id: 1, lat: 37.7749, lng: -122.4194, type: "Plastic", count: 15, severity: "high" },
  { id: 2, lat: 37.7849, lng: -122.4094, type: "Metal", count: 8, severity: "medium" },
  { id: 3, lat: 37.7649, lng: -122.4294, type: "Organic", count: 12, severity: "low" },
  { id: 4, lat: 37.7549, lng: -122.4394, type: "Plastic", count: 22, severity: "high" },
  { id: 5, lat: 37.7949, lng: -122.3994, type: "Metal", count: 5, severity: "low" },
]

const wasteCategories = [
  { name: "Plastic", count: 37, color: "#f44336", percentage: 62 },
  { name: "Metal", count: 13, color: "#ff9800", percentage: 22 },
  { name: "Organic", count: 12, color: "#4caf50", percentage: 16 },
]

export function DashboardSection() {
  const mapRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const [selectedDetection, setSelectedDetection] = useState<any>(null)

  useEffect(() => {
    // Initialize Leaflet map
    if (typeof window !== "undefined" && mapRef.current) {
      // Simulate Leaflet map initialization - updated for dark theme
      const mapContainer = mapRef.current
      mapContainer.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg relative overflow-hidden">
          <div class="absolute inset-0 opacity-30">
            <svg viewBox="0 0 400 300" class="w-full h-full">
              <path d="M0,150 Q100,100 200,150 T400,150 L400,300 L0,300 Z" fill="url(#coastGradient)" />
              <defs>
                <linearGradient id="coastGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#00bcd4;stop-opacity:0.4" />
                  <stop offset="100%" style="stop-color:#0077be;stop-opacity:0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          ${mockDetections
            .map(
              (detection) => `
            <div 
              class="absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 animate-pulse"
              style="
                left: ${20 + detection.id * 60}px; 
                top: ${80 + detection.id * 30}px;
                background-color: ${detection.severity === "high" ? "#f44336" : detection.severity === "medium" ? "#ff9800" : "#4caf50"};
                box-shadow: 0 0 10px ${detection.severity === "high" ? "#f44336" : detection.severity === "medium" ? "#ff9800" : "#4caf50"};
              "
              data-detection-id="${detection.id}"
            ></div>
          `,
            )
            .join("")}
          <div class="absolute bottom-4 left-4 text-xs text-slate-300 bg-slate-800/80 px-2 py-1 rounded">
            San Francisco Bay Area
          </div>
        </div>
      `

      // Add click handlers for map pins
      const pins = mapContainer.querySelectorAll("[data-detection-id]")
      pins.forEach((pin) => {
        pin.addEventListener("click", (e) => {
          const detectionId = Number.parseInt((e.target as HTMLElement).getAttribute("data-detection-id") || "0")
          const detection = mockDetections.find((d) => d.id === detectionId)
          setSelectedDetection(detection)
        })
      })
    }
  }, [])

  useEffect(() => {
    // Initialize Chart.js pie chart
    if (typeof window !== "undefined" && chartRef.current) {
      const canvas = chartRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set canvas size
      canvas.width = 200
      canvas.height = 200

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 80

      let currentAngle = -Math.PI / 2

      wasteCategories.forEach((category, index) => {
        const sliceAngle = (category.percentage / 100) * 2 * Math.PI

        // Draw slice
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
        ctx.closePath()
        ctx.fillStyle = category.color
        ctx.fill()

        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2
        const labelX = centerX + Math.cos(labelAngle) * (radius + 20)
        const labelY = centerY + Math.sin(labelAngle) * (radius + 20)

        ctx.fillStyle = "#0077be"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(`${category.name}`, labelX, labelY)
        ctx.fillText(`${category.percentage}%`, labelX, labelY + 15)

        currentAngle += sliceAngle
      })
    }
  }, [])

  return (
    <section className="py-20 px-4 relative">
      {/* Floating 3D model placeholders for Sketchfab integration */}
      <div className="absolute top-10 right-10 float-animation" style={{ animationDelay: "0.5s" }}>
        <div className="w-24 h-24 bg-accent/10 rounded-xl flex items-center justify-center glassmorphism border border-accent/20">
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/30 rounded-lg mx-auto mb-1"></div>
            <p className="text-xs text-muted-foreground">Sketchfab</p>
            <p className="text-xs text-accent">Ocean Debris</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-10 float-animation" style={{ animationDelay: "2s" }}>
        <div className="w-28 h-28 bg-primary/10 rounded-xl flex items-center justify-center glassmorphism border border-primary/20">
          <div className="text-center">
            <div className="w-14 h-14 bg-primary/30 rounded-full mx-auto mb-1"></div>
            <p className="text-xs text-muted-foreground">Sketchfab</p>
            <p className="text-xs text-primary">Marine Life</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Waste Detection Dashboard</h2>
          <p className="text-lg text-muted-foreground">Real-time monitoring and analytics of coastal waste detection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Interactive Map */}
          <Card className="p-6 glassmorphism border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Detection Locations
              </h3>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {mockDetections.length} Active Sites
              </Badge>
            </div>

            <div ref={mapRef} className="w-full h-64 rounded-lg border border-border/30 mb-4" />

            {selectedDetection && (
              <div className="p-4 bg-card/50 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Detection Details</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Type:</span> {selectedDetection.type}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Count:</span> {selectedDetection.count} items
                  </p>
                  <p>
                    <span className="text-muted-foreground">Severity:</span>
                    <Badge
                      variant={selectedDetection.severity === "high" ? "destructive" : "secondary"}
                      className="ml-2"
                    >
                      {selectedDetection.severity}
                    </Badge>
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Analytics Chart */}
          <Card className="p-6 glassmorphism border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Waste Categories
              </h3>
            </div>

            <div className="flex items-center justify-center mb-4">
              <canvas ref={chartRef} className="max-w-full" />
            </div>

            <div className="space-y-2">
              {wasteCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-card/30 rounded">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: category.color }} />
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-foreground">{category.count}</div>
                    <div className="text-xs text-muted-foreground">{category.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 glassmorphism border-border/50 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">62</div>
            <div className="text-sm text-muted-foreground">Total Detections</div>
          </Card>

          <Card className="p-6 glassmorphism border-border/50 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">37</div>
            <div className="text-sm text-muted-foreground">Plastic Waste</div>
          </Card>

          <Card className="p-6 glassmorphism border-border/50 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">13</div>
            <div className="text-sm text-muted-foreground">Metal Waste</div>
          </Card>

          <Card className="p-6 glassmorphism border-border/50 text-center">
            <div className="flex items-center justify-center mb-2">
              <Recycle className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">12</div>
            <div className="text-sm text-muted-foreground">Organic Waste</div>
          </Card>
        </div>
      </div>
    </section>
  )
}
