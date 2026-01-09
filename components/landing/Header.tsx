"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-700 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-white">T</span>
          </div>
          <span className="text-xl font-bold text-foreground">Teacher AI</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-foreground/80 hover:text-foreground transition">
            Features
          </Link>
          <Link href="#subjects" className="text-foreground/80 hover:text-foreground transition">
            Subjects
          </Link>
          <Link href="#about" className="text-foreground/80 hover:text-foreground transition">
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="text-foreground">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
