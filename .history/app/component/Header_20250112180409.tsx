'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Moon, Sun, Globe } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="GovEase Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                GovEase
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/schemes" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Schemes
              </Link>
              <Link 
                href="/categories"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Categories
              </Link>
              <Link 
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for schemes..."
                className="w-full pl-10 pr-4 h-10 bg-muted/40 focus:bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-muted"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-muted"
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>
            
            <Button 
              asChild
              variant="default"
              className="font-medium shadow-sm"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}