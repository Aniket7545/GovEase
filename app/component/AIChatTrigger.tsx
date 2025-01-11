'use client'

import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export function AIChatTrigger() {
  const handleClick = () => {
    document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Button variant="link" onClick={handleClick} className="mt-4">
      Try AI Chat <ChevronRight className="ml-1 h-4 w-4" />
    </Button>
  )
}

