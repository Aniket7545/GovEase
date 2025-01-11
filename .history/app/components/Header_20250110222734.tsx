import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">GovEase</Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</Link>
          <Link href="/schemes" className="text-gray-600 hover:text-blue-600 transition-colors">Schemes</Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
          <Button variant="outline">Login</Button>
        </div>
      </nav>
    </header>
  )
}

