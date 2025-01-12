'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
//import { useToast } from '@/components/ui/use-toast'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
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
      console.error('Error:', error)
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
          <div className="space-y-2">
            <Label htmlFor={question.id}>{question.question}</Label>
            <Input
              id={question.id}
              type="number"
              placeholder="Enter your age"
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="max-w-xs"
            />
          </div>
        )
      case 'select':
        return (
          <div className="space-y-2">
            <Label>{question.question}</Label>
            <Select onValueChange={handleAnswer} value={answers[question.id]}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {question.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case 'radio':
        return (
          <div className="space-y-2">
            <Label>{question.question}</Label>
            <RadioGroup onValueChange={handleAnswer} value={answers[question.id]}>
              {question.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Progress Bar */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 w-full max-w-md">
              {questions.map((_, index) => (
                <div key={index} className="flex-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index <= currentQuestion
                        ? 'bg-blue-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {!isLoading && !recommendations.length ? (
                    <>
                      <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                          Question {currentQuestion + 1} of {questions.length}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                          {questions[currentQuestion].question}
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                        {renderQuestion()}
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        {currentQuestion > 0 && (
                          <Button
                            variant="outline"
                            onClick={() => setCurrentQuestion(currentQuestion - 1)}
                            className="min-w-[100px]"
                          >
                            Back
                          </Button>
                        )}
                        <Button
                          onClick={handleNext}
                          disabled={!answers[questions[currentQuestion].id]}
                          className="min-w-[100px] bg-blue-600 hover:bg-blue-700"
                        >
                          {currentQuestion === questions.length - 1 ? (
                            'Find Schemes'
                          ) : (
                            <>
                              Next
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </>
                  ) : isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                      <p className="mt-4 text-gray-600 dark:text-gray-300">
                        Finding the best schemes for you...
                      </p>
                    </div>
                  ) : (
                    // ... keep existing recommendations display logic ...
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>

          {/* Custom radio and select styling */}
          <style jsx global>{`
            .custom-radio {
              @apply relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
              hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20;
            }
            .custom-radio[data-state="checked"] {
              @apply border-blue-600 bg-blue-50 dark:bg-blue-900/20;
            }
            .custom-select {
              @apply relative w-full rounded-lg border-2 p-3 cursor-pointer
              hover:border-blue-500 focus:border-blue-600;
            }
          `}</style>
        </motion.div>
      </div>
    </div>
  )
}