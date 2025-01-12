'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Moon, Sun, Globe } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto h-16">
        <div className="flex h-full items-center justify-between px-4">
          {/* Brand and Navigation */}
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="relative font-bold text-2xl after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform hover:after:origin-left hover:after:scale-x-100"
            >
              GovEase
            </Link>
            
            <nav className="hidden md:flex items-center">
              <div className="flex space-x-1 rounded-lg bg-muted/50 p-1">
                <Link 
                  href="/schemes" 
                  className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-primary hover:shadow-sm dark:hover:bg-gray-800"
                >
                  Schemes
                </Link>
                <Link 
                  href="/categories"
                  className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-primary hover:shadow-sm dark:hover:bg-gray-800"
                >
                  Categories
                </Link>
                <Link 
                  href="/about"
                  className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-primary hover:shadow-sm dark:hover:bg-gray-800"
                >
                  About
                </Link>
              </div>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="group relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                type="search"
                placeholder="Search for schemes..."
                className="w-full pl-10 pr-4 h-9 bg-muted/40 border-muted-foreground/20 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="flex space-x-1 rounded-lg bg-muted/50 p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-md h-9 w-9 hover:bg-white hover:shadow-sm dark:hover:bg-gray-800"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-md h-9 w-9 hover:bg-white hover:shadow-sm dark:hover:bg-gray-800"
              >
                <Globe className="h-4 w-4" />
                <span className="sr-only">Change language</span>
              </Button>
            </div>
            
            <Button 
              asChild
              className="h-9 bg-primary font-medium shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}