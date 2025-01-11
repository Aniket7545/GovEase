'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Bot, Send, User } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you find government schemes and verify your documents. What would you like to know?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            {message.role === 'assistant' && (
              <Bot className="w-6 h-6 mt-1 text-green-600" />
            )}
            <Card className={`max-w-[80%] ${
              message.role === 'user' ? 'bg-primary text-primary-foreground' : ''
            }`}>
              <CardContent className="p-3">
                <p className="text-sm">{message.content}</p>
              </CardContent>
            </Card>
            {message.role === 'user' && (
              <User className="w-6 h-6 mt-1" />
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

