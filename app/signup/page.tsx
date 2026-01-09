"use client"

import { SignUpForm } from "@/components/auth/SignUpForm"
import { Brain, BookOpen, Sparkles, GraduationCap, Users, Trophy, Target } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="gradient-orb absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="gradient-orb animation-delay-2 absolute bottom-20 right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="gradient-orb animation-delay-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Floating Particles */}
        <div className="particle absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float"></div>
        <div className="particle animation-delay-2 absolute top-1/3 right-1/3 w-3 h-3 bg-purple-500/40 rounded-full animate-float"></div>
        <div className="particle animation-delay-3 absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary/40 rounded-full animate-float"></div>
        <div className="particle animation-delay-4 absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-500/40 rounded-full animate-float"></div>
      </div>

      {/* Left Side - Description and AI Imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 items-center justify-center p-12">
        <div className="max-w-lg space-y-8 animate-slide-up">
          {/* AI Robot Illustration with Books */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-purple-600/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="text-7xl animate-float">🤖</div>
                <div className="text-6xl animate-float animation-delay-2">📚</div>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="floating-icon animation-delay-1 text-primary">
                  <Users size={40} />
                </div>
                <div className="floating-icon animation-delay-2 text-primary">
                  <Trophy size={40} />
                </div>
                <div className="floating-icon animation-delay-3 text-primary">
                  <Target size={40} />
                </div>
                <div className="floating-icon animation-delay-4 text-primary">
                  <Sparkles size={40} />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-center space-y-4 animate-fade-in animation-delay-2">
            <h1 className="text-4xl font-bold text-foreground">
              Start Your Journey with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                Teacher AI
              </span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Join thousands of students already learning smarter
            </p>
            <p className="text-lg text-foreground/60">
              Transform your learning experience with AI-powered personalized tutoring.
              Get instant help, track your progress, and achieve your academic goals with ease.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-4 animate-fade-in animation-delay-3">
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Brain className="text-primary" size={18} />
              </div>
              <div>
                <div className="font-semibold text-foreground">AI-Powered Learning</div>
                <div className="text-sm text-foreground/60">Get personalized lessons adapted to your learning style</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <GraduationCap className="text-primary" size={18} />
              </div>
              <div>
                <div className="font-semibold text-foreground">Multiple Subjects</div>
                <div className="text-sm text-foreground/60">Access comprehensive courses in 7+ subjects</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Trophy className="text-primary" size={18} />
              </div>
              <div>
                <div className="font-semibold text-foreground">Track Your Progress</div>
                <div className="text-sm text-foreground/60">Monitor your improvement with detailed analytics</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Sparkles className="text-primary" size={18} />
              </div>
              <div>
                <div className="font-semibold text-foreground">24/7 Availability</div>
                <div className="text-sm text-foreground/60">Learn anytime, anywhere with instant AI support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-2xl animate-slide-up animation-delay-1">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
