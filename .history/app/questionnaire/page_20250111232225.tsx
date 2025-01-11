'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
//import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
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
              onChange={(e) => handleAnswer(e.target.value)}
            />
          </div>
        )
      case 'select':
        return (
          <div className="space-y-2">
            <Label>{question.question}</Label>
            <Select onValueChange={handleAnswer}>
              <SelectTrigger>
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
            <RadioGroup onValueChange={handleAnswer}>
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
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (recommendations.length > 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Schemes</CardTitle>
            <CardDescription>Based on your answers, we recommend the following schemes:</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {recommendations.map((scheme, index) => (
                <li key={index}>{scheme}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()}>Start Over</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Find Suitable Schemes</CardTitle>
          <CardDescription>Answer a few questions to get personalized scheme recommendations.</CardDescription>
        </CardHeader>
        <CardContent>{renderQuestion()}</CardContent>
        <CardFooter>
          {currentQuestion > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="mr-2"
            >
              Previous
            </Button>
          )}
          {currentQuestion < questions.length - 1 && (
            <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</Button>
          )}
          {currentQuestion === questions.length - 1 && (
            <Button onClick={handleSubmit}>Get Recommendations</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

