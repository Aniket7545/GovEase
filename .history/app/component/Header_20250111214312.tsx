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
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="GovEase Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-xl font-bold">GovEase</span>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/schemes" className="text-muted-foreground hover:text-primary">
                Schemes
              </Link>
              <Link href="/categories" className="text-muted-foreground hover:text-primary">
                Categories
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                About
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for schemes..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

