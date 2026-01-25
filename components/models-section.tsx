"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ModelsSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text">AI-Powered Marine Technology</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our intelligent drones and robots work together to detect, collect, and clean coastal waste with
            unprecedented precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Surveillance Drone */}
          <div className="space-y-6">
            <Card className="marine-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full marine-pulse"></div>
                  AI Surveillance Drone
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">Advanced aerial monitoring system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 rounded-lg overflow-hidden marine-card mb-6">
                  <div className="sketchfab-embed-wrapper w-full h-full">
                    <iframe
                      title="Buster Drone"
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allowFullScreen
                      mozallowfullscreen="true"
                      webkitallowfullscreen="true"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      xr-spatial-tracking="true"
                      execution-while-out-of-viewport="true"
                      execution-while-not-rendered="true"
                      web-share="true"
                      src="https://sketchfab.com/models/294e79652f494130ad2ab00a13fdbafd/embed?autostart=1&ui_theme=dark&ui_controls=1&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    AI-powered coastal surveillance drone that detects floating plastic waste using advanced computer
                    vision and machine learning algorithms.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30">
                      Computer Vision
                    </span>
                    <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm border border-secondary/30">
                      Real-time Detection
                    </span>
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm border border-accent/30">
                      GPS Mapping
                    </span>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                    <p className="text-sm text-primary mb-2">✅ Sketchfab Model Active:</p>
                    <p className="text-xs text-gray-400">
                      Buster Drone by LaVADraGoN - Interactive 3D model with full controls
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Aquatic Cleaning Robot */}
          <div className="space-y-6">
            <Card className="marine-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-3 h-3 bg-secondary rounded-full marine-pulse"></div>
                  Aquatic Cleaning Robot
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Autonomous underwater waste collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 rounded-lg overflow-hidden marine-card mb-6">
                  <div className="sketchfab-embed-wrapper w-full h-full">
                    <iframe
                      title="Physter Underwater Smart ROV"
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allowFullScreen
                      mozallowfullscreen="true"
                      webkitallowfullscreen="true"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      xr-spatial-tracking="true"
                      execution-while-out-of-viewport="true"
                      execution-while-not-rendered="true"
                      web-share="true"
                      src="https://sketchfab.com/models/d448dbea41394347ab2aece26bdb5531/embed?autostart=1&ui_theme=dark&ui_controls=1&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    Autonomous underwater robot designed to clean organic and metallic waste from the ocean floor using
                    intelligent navigation and collection systems.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm border border-secondary/30">
                      Autonomous Navigation
                    </span>
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm border border-accent/30">
                      Waste Collection
                    </span>
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30">
                      Deep Sea Ready
                    </span>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                    <p className="text-sm text-secondary mb-2">✅ Sketchfab Model Active:</p>
                    <p className="text-xs text-gray-400">
                      Physter Underwater Smart ROV by TheRedMan - Interactive 3D model with full controls
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Card className="marine-card max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">🎉 Sketchfab Integration Complete</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <div className="space-y-4 text-gray-300">
                <p className="font-semibold text-primary">Successfully integrated high-quality 3D models:</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-primary/10 rounded border border-primary/30">
                    <p className="font-semibold text-primary mb-2">Buster Drone</p>
                    <p className="text-xs text-gray-400">
                      Advanced surveillance capabilities with interactive 3D visualization
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded border border-secondary/30">
                    <p className="font-semibold text-secondary mb-2">Physter Underwater ROV</p>
                    <p className="text-xs text-gray-400">Smart underwater robot with autonomous waste collection</p>
                  </div>
                </div>
                <div className="p-3 bg-accent/10 rounded border border-accent/30 mt-4">
                  <p className="text-xs text-accent">
                    💡 Models feature full interactive controls, dark theme integration, and optimized loading
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
