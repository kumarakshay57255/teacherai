"use client"

import { LoginForm } from "@/components/auth/LoginForm"
import { Brain, BookOpen, Sparkles, GraduationCap } from "lucide-react"

export default function LoginPage() {
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
          {/* AI Robot Illustration */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-purple-600/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative text-center">
              <div className="text-9xl mb-6 animate-float">🤖</div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="floating-icon animation-delay-1 text-primary">
                  <Brain size={40} />
                </div>
                <div className="floating-icon animation-delay-2 text-primary">
                  <BookOpen size={40} />
                </div>
                <div className="floating-icon animation-delay-3 text-primary">
                  <GraduationCap size={40} />
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
              Welcome Back to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                Teacher AI
              </span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              India's First AI-Powered Digital Teaching Platform
            </p>
            <p className="text-lg text-foreground/60">
              Experience personalized learning with AI brilliance. Get instant help, practice questions,
              and master any subject at your own pace with 24/7 AI support.
            </p>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in animation-delay-3">
            <div className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-4">
              <Brain className="text-primary" size={24} />
              <div>
                <div className="font-semibold text-foreground">AI Powered</div>
                <div className="text-sm text-foreground/60">Smart Learning</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-4">
              <GraduationCap className="text-primary" size={24} />
              <div>
                <div className="font-semibold text-foreground">7+ Subjects</div>
                <div className="text-sm text-foreground/60">All Topics</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-4">
              <Sparkles className="text-primary" size={24} />
              <div>
                <div className="font-semibold text-foreground">24/7 Support</div>
                <div className="text-sm text-foreground/60">Always Available</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-4">
              <BookOpen className="text-primary" size={24} />
              <div>
                <div className="font-semibold text-foreground">Personalized</div>
                <div className="text-sm text-foreground/60">For You</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md animate-slide-up animation-delay-1">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
