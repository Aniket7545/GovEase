'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  email: string
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">GovEase</Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</Link>
          <Link href="/schemes" className="text-gray-600 hover:text-blue-600 transition-colors">Schemes</Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
          {user ? (
            <>
              <span className="text-gray-600">Welcome, {user.name}</span>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

