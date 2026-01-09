"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Brain, GraduationCap, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Icons */}
        <div className="floating-icon absolute top-20 left-10 text-primary/20">
          <BookOpen size={60} />
        </div>
        <div className="floating-icon animation-delay-2 absolute top-40 right-20 text-primary/20">
          <GraduationCap size={80} />
        </div>
        <div className="floating-icon animation-delay-4 absolute bottom-32 left-1/4 text-primary/20">
          <Brain size={70} />
        </div>
        <div className="floating-icon animation-delay-3 absolute bottom-20 right-1/3 text-primary/20">
          <Sparkles size={50} />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="gradient-orb absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="gradient-orb animation-delay-2 absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">India's First AI Powered Teaching Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight animate-slide-up">
            Learn Smarter with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              AI-Powered
            </span>
            <br />
            Personal Tutoring
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto animate-slide-up animation-delay-1">
            Experience personalized learning with our AI tutor. Get instant help, practice questions, and master any subject at your own pace.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-2">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 group">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:border-primary">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 animate-fade-in animation-delay-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">7+</div>
              <div className="text-sm text-foreground/60">Subjects</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-foreground/60">AI Support</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-foreground/60">Personalized</div>
            </div>
          </div>
        </div>

        {/* Animated Robot/AI Illustration */}
        <div className="mt-16 relative animate-float">
          <div className="mx-auto w-64 h-64 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-full blur-2xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl">🤖</div>
          </div>
        </div>
      </div>
    </section>
  )
}
