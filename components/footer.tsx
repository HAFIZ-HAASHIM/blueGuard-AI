import { Github, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gradient mb-4">SeaGuard</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              AI-powered coastal waste detection system helping protect marine ecosystems and empower communities
              worldwide.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg hover:bg-primary/30 transition-colors"
              >
                <Github className="h-5 w-5 text-primary" />
              </a>
              <a
                href="mailto:contact@seaguard.ai"
                className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg hover:bg-primary/30 transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#upload-section" className="text-muted-foreground hover:text-primary transition-colors">
                  Upload Image
                </a>
              </li>
              <li>
                <a href="#dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Research Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 SeaGuard. Built with AI for a cleaner future.
          </p>
          <div className="flex items-center text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-destructive mx-1" />
            <span>for our oceans</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
