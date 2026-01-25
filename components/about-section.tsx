import { Card } from "@/components/ui/card"
import { Shield, Users, Zap, Heart, Fish, Globe } from "lucide-react"

const impactFeatures = [
  {
    icon: Shield,
    title: "Marine Protection",
    description:
      "Advanced AI algorithms detect and classify coastal waste with 95% accuracy, helping protect marine ecosystems from harmful debris.",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description:
      "Empower local communities with real-time data and actionable insights to organize effective cleanup initiatives.",
  },
  {
    icon: Zap,
    title: "Real-time Detection",
    description:
      "Instant waste identification and mapping enables rapid response and prevents further environmental damage.",
  },
  {
    icon: Heart,
    title: "Conservation Impact",
    description:
      "Every detection contributes to a global database helping researchers understand pollution patterns and develop solutions.",
  },
  {
    icon: Fish,
    title: "Wildlife Safety",
    description:
      "Protect marine life by identifying hazardous waste before it can harm sea creatures and their habitats.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Join a worldwide network of environmental guardians working together to keep our oceans clean and healthy.",
  },
]

export function AboutSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-secondary/20 relative">
      <div className="absolute top-16 left-16 float-animation" style={{ animationDelay: "1s" }}>
        <div className="w-32 h-32 bg-green-500/10 rounded-xl flex items-center justify-center glassmorphism border border-green-500/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/30 rounded-lg mx-auto mb-2 transform rotate-12"></div>
            <p className="text-xs text-muted-foreground">Sketchfab 3D</p>
            <p className="text-xs text-green-400">Coral Reef</p>
          </div>
        </div>
      </div>

      <div className="absolute top-32 right-20 float-animation" style={{ animationDelay: "1.5s" }}>
        <div className="w-28 h-28 bg-blue-500/10 rounded-xl flex items-center justify-center glassmorphism border border-blue-500/20">
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-500/30 rounded-full mx-auto mb-1"></div>
            <p className="text-xs text-muted-foreground">Sketchfab 3D</p>
            <p className="text-xs text-blue-400">Sea Turtle</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 right-16 float-animation" style={{ animationDelay: "2.5s" }}>
        <div className="w-36 h-36 bg-purple-500/10 rounded-xl flex items-center justify-center glassmorphism border border-purple-500/20">
          <div className="text-center">
            <div className="w-18 h-18 bg-purple-500/30 rounded-lg mx-auto mb-2 transform -rotate-12"></div>
            <p className="text-xs text-muted-foreground">Sketchfab 3D</p>
            <p className="text-xs text-purple-400">Cleanup Robot</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">Protecting Our Oceans with AI</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            SeaGuard combines cutting-edge artificial intelligence with environmental conservation to create a powerful
            tool for coastal waste detection and marine ecosystem protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {impactFeatures.map((feature, index) => (
            <Card
              key={index}
              className="p-6 glassmorphism border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="text-center">
          <Card className="p-8 glassmorphism border-border/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe technology can be a force for environmental good. SeaGuard represents our commitment to using
              AI innovation to address one of the most pressing challenges of our time: ocean pollution. Together, we
              can create cleaner shores and healthier marine ecosystems for future generations.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
