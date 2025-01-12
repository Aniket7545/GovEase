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
  const [recommendations, setRecommendations] = useState<string[]>([])
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
                {question.options.map((option) => (
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
              {question.options.map((option) => (
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
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Find Suitable Schemes</CardTitle>
            <CardDescription>Answer a few questions to get personalized scheme recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {recommendations.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-blue-600">Recommended Schemes</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {recommendations.map((scheme, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          {scheme}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  renderQuestion()
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentQuestion > 0 && recommendations.length === 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            {currentQuestion < questions.length - 1 && recommendations.length === 0 && (
              <Button onClick={handleNext} className="ml-auto flex items-center" disabled={!answers[questions[currentQuestion].id]}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {currentQuestion === questions.length - 1 && recommendations.length === 0 && (
              <Button onClick={handleSubmit} className="ml-auto flex items-center" disabled={!answers[questions[currentQuestion].id]}>
                Get Recommendations <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {recommendations.length > 0 && (
              <Button onClick={() => window.location.reload()} className="mx-auto">
                Start Over
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

