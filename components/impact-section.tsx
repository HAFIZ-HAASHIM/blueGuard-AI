"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Zap, Waves, Recycle, Shield } from "lucide-react"
import { useEffect, useState } from "react"

interface StatItem {
  label: string
  value: string
  unit: string
  icon: React.ReactNode
  color: string
  description: string
}

const impactStats: StatItem[] = [
  {
    label: "Waste Cleaned",
    value: "2.4",
    unit: "Tons",
    icon: <Recycle className="w-8 h-8" />,
    color: "primary",
    description: "Total waste to be removed from coastal areas",
  },
  {
    label: "AI Accuracy",
    value: "94.2",
    unit: "%",
    icon: <Target className="w-8 h-8" />,
    color: "secondary",
    description: "Waste detection model precision will be improved",
  },
  {
    label: "Areas Monitored",
    value: "15",
    unit: "Zones",
    icon: <Waves className="w-8 h-8" />,
    color: "accent",
    description: "Coastal regions to be under surveillance",
  },
  {
    label: "Response Time",
    value: "12",
    unit: "Min",
    icon: <Zap className="w-8 h-8" />,
    color: "primary",
    description: "Average cleanup deployment time will be reduced",
  },
  {
    label: "Marine Life Protected",
    value: "850+",
    unit: "Species",
    icon: <Shield className="w-8 h-8" />,
    color: "secondary",
    description: "Estimated species to benefit from cleanup",
  },
  {
    label: "Carbon Offset",
    value: "1.8",
    unit: "Tons CO₂",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "accent",
    description: "Environmental impact reduction will be achieved",
  },
]

function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    const numericValue = Number.parseFloat(value.replace(/[^0-9.]/g, ""))
    const isDecimal = value.includes(".")
    const hasPlus = value.includes("+")

    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const currentValue = numericValue * progress
      let formatted = isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue).toString()

      if (hasPlus && progress === 1) formatted += "+"

      setDisplayValue(formatted)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return <span>{displayValue}</span>
}

export function ImpactSection() {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          icon: "text-primary",
          border: "border-primary/30",
          glow: "hover:shadow-primary/20",
        }
      case "secondary":
        return {
          icon: "text-secondary",
          border: "border-secondary/30",
          glow: "hover:shadow-secondary/20",
        }
      case "accent":
        return {
          icon: "text-accent",
          border: "border-accent/30",
          glow: "hover:shadow-accent/20",
        }
      default:
        return {
          icon: "text-primary",
          border: "border-primary/30",
          glow: "hover:shadow-primary/20",
        }
    }
  }

  return (
    <section className="py-20 px-4 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 professional-text">Projected Environmental Impact</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered coastal protection system is projected to deliver significant
            results, demonstrating future impact on marine conservation and sustainability goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {impactStats.map((stat, index) => {
            const colorClasses = getColorClasses(stat.color)

            return (
              <Card
                key={index}
                className={`professional-card group transition-all duration-500 hover:scale-105 ${colorClasses.border} hover:shadow-2xl ${colorClasses.glow}`}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900/50 mb-4 ${colorClasses.icon} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.icon}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-white">
                        <AnimatedCounter value={stat.value} />
                      </span>
                      <span className={`text-lg font-semibold ${colorClasses.icon}`}>{stat.unit}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{stat.label}</h3>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Sustainability Goals */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="professional-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                Sustainability Goals
              </h3>
              <div className="space-y-4">
                {[
                  { goal: "Zero Plastic Waste by 2030", progress: 78, color: "primary" },
                  { goal: "Marine Biodiversity Protection", progress: 85, color: "secondary" },
                  { goal: "Carbon Neutral Operations", progress: 92, color: "accent" },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{item.goal}</span>
                      <Badge variant="outline" className={`text-${item.color} border-${item.color}/30`}>
                        {item.progress}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-${item.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="professional-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-secondary" />
                Future Projections
              </h3>
              <div className="space-y-6">
                <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary mb-1">10x</div>
                  <p className="text-sm text-gray-300">Scaling potential by 2025</p>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="text-2xl font-bold text-secondary mb-1">50+</div>
                  <p className="text-sm text-gray-300">Coastal cities deployment</p>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-2xl font-bold text-accent mb-1">100%</div>
                  <p className="text-sm text-gray-300">Autonomous operation target</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
