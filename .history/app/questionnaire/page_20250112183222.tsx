'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, RefreshCcw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const questions = [
  {
    id: 'age',
    question: 'What is your age?',
    type: 'number',
  },
  {
    id: 'occupation',
    question: 'What is your occupation?',
    type: 'select',
    options: ['Student', 'Employed', 'Self-employed', 'Unemployed', 'Retired'],
  },
  {
    id: 'income',
    question: 'What is your annual income range?',
    type: 'select',
    options: ['Below ₹2.5 lakh', '₹2.5 lakh - ₹5 lakh', '₹5 lakh - ₹10 lakh', 'Above ₹10 lakh'],
  },
  {
    id: 'gender',
    question: 'What is your gender?',
    type: 'radio',
    options: ['Male', 'Female', 'Other'],
  },
  {
    id: 'location',
    question: 'Which state do you live in?',
    type: 'select',
    options: ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Other'],
  },
]

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const { toast } = useToast()

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/recommend-schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      })
      if (!response.ok) throw new Error('Failed to get recommendations')
      const data = await response.json()
      setRecommendations(data.recommendations)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get recommendations. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderQuestion = () => {
    const question = questions[currentQuestion]
    switch (question.type) {
      case 'number':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Input
              type="number"
              placeholder="Enter your age"
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="text-lg p-6 rounded-xl border-2 focus:border-primary"
            />
          </motion.div>
        )
      case 'select':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Select onValueChange={handleAnswer} value={answers[question.id]}>
              <SelectTrigger className="text-lg p-6 rounded-xl border-2">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {question.options?.map((option) => (
                  <SelectItem 
                    key={option} 
                    value={option}
                    className="text-lg p-3"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        )
      case 'radio':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {question.options?.map((option) => (
              <div
                key={option}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  answers[question.id] === option
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
                onClick={() => handleAnswer(option)}
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    answers[question.id] === option ? 'border-primary' : 'border-gray-400'
                  }`}>
                    {answers[question.id] === option && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg">Finding the best schemes for you...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {questions.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 w-12 rounded-full ${
                    index <= currentQuestion ? 'bg-primary' : 'bg-gray-200'
                  }`}
                  animate={{
                    scale: index === currentQuestion ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: index === currentQuestion ? Infinity : 0 }}
                />
              ))}
            </div>
          </div>

          <Card className="border-none shadow-xl bg-white/80 backdrop-blur">
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {recommendations.length > 0 ? (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-primary">
                        Recommended Schemes for You
                      </h2>
                      {recommendations.map((scheme, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden">
                            <div className="p-6">
                              <h3 className="text-xl font-semibold mb-2">{scheme.name}</h3>
                              <p className="text-gray-600">{scheme.description}</p>
                              <div className="mt-4">
                                <h4 className="font-medium">Key Benefits:</h4>
                                <p className="text-gray-600">{scheme.benefits}</p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                      <div className="flex justify-center">
                        <Button 
                          onClick={() => window.location.reload()}
                          className="flex items-center space-x-2"
                        >
                          <RefreshCcw className="h-4 w-4" />
                          <span>Start Over</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-primary">
                          {questions[currentQuestion].question}
                        </h2>
                        <p className="text-gray-500">
                          Question {currentQuestion + 1} of {questions.length}
                        </p>
                      </div>

                      {renderQuestion()}

                      <div className="flex justify-between pt-6">
                        {currentQuestion > 0 && (
                          <Button
                            variant="outline"
                            onClick={() => setCurrentQuestion(currentQuestion - 1)}
                          >
                            Back
                          </Button>
                        )}
                        <Button
                          onClick={handleNext}
                          disabled={!answers[questions[currentQuestion].id]}
                          className={`${currentQuestion === 0 ? 'w-full' : 'ml-auto'}`}
                        >
                          {currentQuestion === questions.length - 1 ? 'Find Schemes' : 'Next'}
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}