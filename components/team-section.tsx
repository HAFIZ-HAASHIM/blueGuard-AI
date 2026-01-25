"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Code, Brain, Palette, Database } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  bio: string
  skills: string[]
  avatar: string
  github?: string
  linkedin?: string
  email?: string
  icon: React.ReactNode
  accentColor: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "AI/ML Engineer",
    bio: "Specializes in computer vision and machine learning algorithms. Led the development of our waste detection AI model using advanced neural networks and Roboflow integration.",
    skills: ["Python", "TensorFlow", "Computer Vision", "Roboflow API"],
    avatar: "/team-alex-chen.jpg",
    github: "alexchen-ai",
    linkedin: "alex-chen-ml",
    email: "alex@blueguard.ai",
    icon: <Brain className="w-6 h-6" />,
    accentColor: "primary",
  },
  {
    name: "Sarah Rodriguez",
    role: "Robotics Engineer",
    bio: "Expert in autonomous systems and marine robotics. Designed the mechanical systems for both our surveillance drone and underwater cleaning robot with precision engineering.",
    skills: ["Robotics", "Arduino", "3D Modeling", "Autonomous Systems"],
    avatar: "/team-sarah-rodriguez.jpg",
    github: "sarah-robotics",
    linkedin: "sarah-rodriguez-robotics",
    email: "sarah@blueguard.ai",
    icon: <Code className="w-6 h-6" />,
    accentColor: "secondary",
  },
  {
    name: "Marcus Johnson",
    role: "Full-Stack Developer",
    bio: "Full-stack developer with expertise in React, Node.js, and cloud infrastructure. Built our entire web platform and integrated all APIs for seamless user experience.",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    avatar: "/team-marcus-johnson.jpg",
    github: "marcus-dev",
    linkedin: "marcus-johnson-dev",
    email: "marcus@blueguard.ai",
    icon: <Database className="w-6 h-6" />,
    accentColor: "accent",
  },
  {
    name: "Emma Thompson",
    role: "UI/UX Designer",
    bio: "Creative designer focused on user experience and environmental sustainability. Crafted our intuitive interface design and brand identity with a focus on marine conservation.",
    skills: ["Figma", "UI/UX Design", "Branding", "User Research"],
    avatar: "/team-emma-thompson.jpg",
    github: "emma-design",
    linkedin: "emma-thompson-ux",
    email: "emma@blueguard.ai",
    icon: <Palette className="w-6 h-6" />,
    accentColor: "primary",
  },
]

export function TeamSection() {
  const getAccentClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          border: "border-primary/30 hover:border-primary/60",
          glow: "hover:shadow-primary/20",
          icon: "text-primary",
          badge: "bg-primary/20 text-primary border-primary/30",
        }
      case "secondary":
        return {
          border: "border-secondary/30 hover:border-secondary/60",
          glow: "hover:shadow-secondary/20",
          icon: "text-secondary",
          badge: "bg-secondary/20 text-secondary border-secondary/30",
        }
      case "accent":
        return {
          border: "border-accent/30 hover:border-accent/60",
          glow: "hover:shadow-accent/20",
          icon: "text-accent",
          badge: "bg-accent/20 text-accent border-accent/30",
        }
      default:
        return {
          border: "border-primary/30 hover:border-primary/60",
          glow: "hover:shadow-primary/20",
          icon: "text-primary",
          badge: "bg-primary/20 text-primary border-primary/30",
        }
    }
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text">Meet Team Bit Busters</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Four passionate innovators united by a mission to protect our oceans through cutting-edge AI and robotics
            technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => {
            const accentClasses = getAccentClasses(member.accentColor)

            return (
              <Card
                key={index}
                className={`marine-card group transition-all duration-500 hover:scale-105 ${accentClasses.border} hover:shadow-2xl ${accentClasses.glow}`}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-600 group-hover:border-current transition-colors duration-300">
                        <img
                          src={member.avatar || "/placeholder.svg?height=96&width=96&query=professional headshot"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-muted/80 backdrop-blur-sm border border-current flex items-center justify-center ${accentClasses.icon}`}
                      >
                        {member.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className={`font-semibold mb-3 ${accentClasses.icon}`}>{member.role}</p>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-2">SKILLS</p>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className={`text-xs ${accentClasses.badge}`}>
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center gap-3 pt-2">
                      {member.github && (
                        <a
                          href={`https://github.com/${member.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors ${accentClasses.icon} hover:scale-110 transform duration-200`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${member.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors ${accentClasses.icon} hover:scale-110 transform duration-200`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className={`p-2 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors ${accentClasses.icon} hover:scale-110 transform duration-200`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Team Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="marine-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <p className="text-gray-300">Team Members</p>
            </CardContent>
          </Card>
          <Card className="marine-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-secondary mb-2">72hrs</div>
              <p className="text-gray-300">Hackathon Duration</p>
            </CardContent>
          </Card>
          <Card className="marine-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <p className="text-gray-300">Ocean Conservation</p>
            </CardContent>
          </Card>
        </div>

        {/* Team Mission */}
        <div className="mt-16">
          <Card className="marine-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Team Bit Busters is committed to leveraging artificial intelligence and robotics to address one of the
                most pressing environmental challenges of our time: ocean pollution. Through innovative technology and
                collaborative engineering, we're building solutions that can detect, map, and clean coastal waste at
                scale, protecting marine ecosystems for future generations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
