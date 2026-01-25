"use client"

import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { Suspense } from "react"

function DroneModel() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.3, 2]} />
        <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.3} />
      </mesh>
      {/* Propellers */}
      {[
        [-0.8, 0.1, -0.8],
        [0.8, 0.1, -0.8],
        [-0.8, 0.1, 0.8],
        [0.8, 0.1, 0.8],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.15, 0.15, 0.05]} />
          <meshStandardMaterial color="#00FF7F" emissive="#00FF7F" emissiveIntensity={0.4} />
        </mesh>
      ))}
    </Float>
  )
}

function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => (
    <Float key={i} speed={Math.random() * 2 + 1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  ))

  return <>{particles}</>
}

export function BlueGuardHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center blueguard-gradient overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00BFFF" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FFFF" />

            <DroneModel />
            <ParticleField />

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="marine-glassmorphism rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 neon-text">BlueGuard AI</h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-white">
            Protecting Our Shores with Intelligent Drones & Robots
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            An AI-powered solution to detect and clean coastal waste in real-time using advanced computer vision and
            autonomous robotics.
          </p>
          <Button className="cta-button text-white font-semibold px-8 py-4 text-lg rounded-xl marine-pulse">
            Try Demo
          </Button>
        </div>
      </div>

      {/* Animated Wave Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-30">
        <div className="wave-animation absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div
          className="wave-animation absolute bottom-4 left-0 w-full h-12 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="wave-animation absolute bottom-8 left-0 w-full h-8 bg-gradient-to-r from-transparent via-green-400 to-transparent"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </section>
  )
}
