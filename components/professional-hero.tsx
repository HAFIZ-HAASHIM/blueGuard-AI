"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ProfessionalHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="professional-card rounded-2xl p-12 md:p-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 professional-text">BlueGuard AI</h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6 text-gray-200">
            Protecting Our Shores with Intelligent Drones & Robots
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            BlueGuard AI offers an innovative, AI-powered solution for real-time detection and cleanup of coastal waste.
            Our advanced system combines cutting-edge computer vision with autonomous drones and underwater robots
            to efficiently identify, track, and remove pollutants, ensuring cleaner oceans and healthier marine ecosystems.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="#upload-section">
              <Button className="professional-button text-white font-semibold px-10 py-4 text-lg rounded-xl">
                Try AI Demo
              </Button>
            </Link>
            <Link href="#upload-section">
              <Button
                variant="outline"
                className="professional-button-outline text-white font-semibold px-10 py-4 text-lg rounded-xl bg-transparent"
              >
                View Technology
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
