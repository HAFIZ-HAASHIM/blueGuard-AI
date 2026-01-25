import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function DroneSection() {
  return (
    <section id="drone-section" className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
            <iframe
              title="Buster Drone"
              frameBorder="0"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking="true"
              execution-while-out-of-viewport="true"
              execution-while-not-rendered="true"
              web-share="true"
              src="https://sketchfab.com/models/294e79652f494130ad2ab00a13fdbafd/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_help=0&ui_settings=0&ui_fullscreen=0&ui_watermark=0&ui_ar=0&ui_vr=0&ui_theme=dark"
              className="absolute inset-0 h-full w-full"
            ></iframe>
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-heading text-3xl font-bold leading-tight text-white lg:text-5xl">
              <Balancer>AI-Powered Drones for Marine Waste Detection</Balancer>
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              <Balancer>
                Our advanced drones leverage artificial intelligence to detect and
                identify various types of marine waste, from microplastics to
                larger debris, with exceptional accuracy. Equipped with high-resolution
                cameras and intelligent algorithms, these drones can patrol vast
                ocean areas, pinpointing pollution hotspots and collecting crucial
                data for optimized cleanup operations. The interactive 3D model
                allows you to explore the drone's design and features in detail.
              </Balancer>
            </p>
            <div className="mt-8 flex justify-center gap-4 md:justify-start">
              <Link href="#upload-section" className={cn(buttonVariants({ size: "lg" }))}>
                Try AI Demo
              </Link>
              <Link
                href="#upload-section"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                View Technology
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
