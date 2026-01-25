"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Zap } from "lucide-react"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationId: number
    let time = 0
    const particles: Array<{ x: number; y: number; size: number; speed: number; opacity: number }> = []

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Deep ocean gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(0, 10, 15, 1)")
      gradient.addColorStop(0.3, "rgba(0, 26, 46, 0.9)")
      gradient.addColorStop(0.7, "rgba(0, 42, 61, 0.7)")
      gradient.addColorStop(1, "rgba(0, 61, 92, 0.5)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated waves with glow effect
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height * 0.6 + i * 60)

        for (let x = 0; x <= canvas.width; x += 8) {
          const y =
            canvas.height * 0.6 +
            i * 60 +
            Math.sin(x * 0.008 + time * 0.03 + i * 0.5) * 25 +
            Math.sin(x * 0.015 + time * 0.02 + i) * 15
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        // Glowing wave effect
        const waveGradient = ctx.createLinearGradient(0, canvas.height * 0.6 + i * 60, 0, canvas.height)
        waveGradient.addColorStop(0, `rgba(0, 255, 255, ${0.1 - i * 0.02})`)
        waveGradient.addColorStop(0.5, `rgba(0, 229, 255, ${0.08 - i * 0.015})`)
        waveGradient.addColorStop(1, `rgba(0, 119, 190, ${0.05 - i * 0.01})`)

        ctx.fillStyle = waveGradient
        ctx.fill()
      }

      // Draw floating particles
      particles.forEach((particle, index) => {
        particle.y -= particle.speed
        particle.x += Math.sin(time * 0.01 + index) * 0.5

        if (particle.y < -10) {
          particle.y = canvas.height + 10
          particle.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`
        ctx.fill()

        // Add glow effect to particles
        ctx.shadowBlur = 10
        ctx.shadowColor = "rgba(0, 255, 255, 0.5)"
        ctx.fill()
        ctx.shadowBlur = 0
      })

      time += 1
      animationId = requestAnimationFrame(drawScene)
    }

    drawScene()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />

      <div className="absolute top-20 right-20 float-animation glow-animation" style={{ zIndex: 2 }}>
        <div className="w-48 h-48 glassmorphism-card rounded-2xl flex items-center justify-center border-2 border-primary/30">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/40 to-accent/40 rounded-xl transform rotate-12 mx-auto mb-3 flex items-center justify-center">
              <Zap className="w-12 h-12 text-primary" />
            </div>
            <p className="text-sm font-semibold text-primary mb-1">Three.js GLTF Model</p>
            <p className="text-xs text-muted-foreground">AI Drone Scanner</p>
            <div className="mt-2 px-3 py-1 bg-primary/20 rounded-full">
              <p className="text-xs text-primary">Sketchfab Ready</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-32 left-20 float-animation glow-animation"
        style={{ zIndex: 2, animationDelay: "1s" }}
      >
        <div className="w-40 h-40 glassmorphism-card rounded-2xl flex items-center justify-center border-2 border-accent/30">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-accent/40 to-primary/40 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-12 h-12 bg-accent/60 rounded-lg transform rotate-45"></div>
            </div>
            <p className="text-sm font-semibold text-accent mb-1">3D Cleanup Bot</p>
            <p className="text-xs text-muted-foreground">Autonomous Unit</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-7xl md:text-9xl font-bold mb-4 text-gradient tracking-tight">SeaGuard</h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full"></div>
        </div>

        <p className="text-2xl md:text-4xl font-semibold text-foreground mb-6 tracking-wide">AI for Cleaner Shores</p>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Harness AI + Drones to detect, map, and act against coastal waste with cutting-edge technology
        </p>

        <Button
          onClick={scrollToUpload}
          size="lg"
          className="neon-button text-lg px-10 py-6 rounded-xl font-semibold tracking-wide transition-all duration-300 hover:scale-105"
        >
          <Upload className="mr-3 h-6 w-6" />
          Upload Waste Image
        </Button>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute particle-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div
              className="w-1 h-1 bg-primary/60 rounded-full"
              style={{
                boxShadow: `0 0 ${4 + Math.random() * 6}px rgba(0, 255, 255, 0.6)`,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
