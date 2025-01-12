'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, Send, User, X, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I assist you with government schemes today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

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
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              className="rounded-full p-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 w-96 h-[600px] z-50"
          >
            <Card className="h-full flex flex-col shadow-xl border-2 border-blue-200">
              <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                <h3 className="font-semibold text-lg">GovEase Chat Assistant</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:text-blue-200">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <ScrollArea className="flex-grow p-4 bg-gray-50" ref={scrollAreaRef}>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start space-x-2 mb-4 ${
                      message.role === 'assistant' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                    <div className={`p-3 rounded-lg max-w-[80%] ${
                      message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white shadow-md'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-md">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                        className="text-blue-600"
                      >
                        Typing...
                      </motion.div>
                    </div>
                  </div>
                )}
              </ScrollArea>
              <CardContent className="border-t p-4 bg-white">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow"
                  />
                  <Button type="submit" size="icon" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

