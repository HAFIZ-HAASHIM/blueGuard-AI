"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ExternalLink, Heart } from "lucide-react"

export function BlueGuardFooter() {
  return (
    <footer className="relative py-16 px-4 border-t border-primary/20 bg-black">
      {/* Neon glow line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold professional-text">BlueGuard AI</h3>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Protecting our shores with intelligent drones and robots. An AI-powered solution for real-time coastal
              waste detection and cleanup.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="professional-button-outline bg-transparent">
                <Github className="w-4 h-4 mr-2" />
                View Source
              </Button>
              <Button variant="outline" size="sm" className="professional-button-outline bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "AI Demo", href: "#demo" },
                { name: "Impact", href: "#impact" },
                { name: "Technology", href: "#tech" },
                { name: "Contact", href: "#contact" },
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-primary transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="mailto:team@blueguard.ai"
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                team@blueguard.ai
              </a>
              <a
                href="https://github.com/team-bit-busters"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
              </a>
              <a
                href="https://linkedin.com/company/blueguard-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-center space-y-4">
            <h4 className="text-xl font-bold text-white">Team Bit Busters</h4>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Four passionate innovators united by our commitment to ocean conservation and cutting-edge AI technology.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for our oceans</span>
            </div>

            <div className="text-center text-gray-400">
              <p>&copy; 2024 BlueGuard AI - Team Bit Busters. Built for hackathon.</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Powered by:</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">React</span>
                <span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs">Three.js</span>
                <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">Roboflow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
