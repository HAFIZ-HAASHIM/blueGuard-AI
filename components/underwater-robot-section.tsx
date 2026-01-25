import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function UnderwaterRobotSection() {
  return (
    <section id="underwater-robot-section" className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-3xl font-bold leading-tight text-white lg:text-5xl">
              <Balancer>Autonomous Underwater Robots for Deep Ocean Cleanup</Balancer>
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              <Balancer>
                Our autonomous underwater robots are engineered to explore and clean
                the deepest parts of the ocean, where waste accumulates unnoticed.
                Equipped with advanced sonar and AI-driven navigation, they precisely
                locate and collect submerged debris, microplastics, and ghost fishing
                gear without disturbing marine life. This interactive 3D model allows
                you to see the intricate design and operational capabilities of our
                underwater cleaning fleet.
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
          <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
            <iframe
              title="Physter Underwater Smart ROV"
              frameBorder="0"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking="true"
              execution-while-out-of-viewport="true"
              execution-while-not-rendered="true"
              web-share="true"
              src="https://sketchfab.com/models/d448dbea41394347ab2aece26bdb5531/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_help=0&ui_settings=0&ui_fullscreen=0&ui_watermark=0&ui_ar=0&ui_vr=0&ui_theme=dark"
              className="absolute inset-0 h-full w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
