import { ProfessionalHero } from "@/components/professional-hero"
import { AIDemoSection } from "@/components/ai-demo-section"
import { ImpactSection } from "@/components/impact-section"
import { DroneSection } from "@/components/drone-section"
import { UnderwaterRobotSection } from "@/components/underwater-robot-section"
import { BlueGuardFooter } from "@/components/blueguard-footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <ProfessionalHero />
      <AIDemoSection />
      <ImpactSection />
      <DroneSection />
      <UnderwaterRobotSection />
      <BlueGuardFooter />
    </main>
  )
}
