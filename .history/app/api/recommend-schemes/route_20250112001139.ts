import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Google Generative AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

export async function POST(req: Request) {
  try {
    const userAnswers = await req.json()

    const prompt = `Based on the following user information, recommend suitable government schemes in India:
    Age: ${userAnswers.age}
    Occupation: ${userAnswers.occupation}
    Income Range: ${userAnswers.income}
    Gender: ${userAnswers.gender}
    Location: ${userAnswers.location}

    Please provide a list of 3-5 relevant government schemes that this person might be eligible for. Format the response as a bullet point list.`

    const result = await model.generateContent(prompt)
    const response = await result.response

    // Extract scheme names from the AI response
    const schemes = response.text()
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').trim())

    return NextResponse.json({ recommendations: schemes })
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Error generating recommendations' },
      { status: 500 }
    )
  }
}

