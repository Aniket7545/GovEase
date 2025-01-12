import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
  try {
    const userAnswers = await req.json()

    const prompt = `Based on the following user information, recommend suitable government schemes in India:
    Age: ${userAnswers.age}
    Occupation: ${userAnswers.occupation}
    Income Range: ${userAnswers.income}
    Gender: ${userAnswers.gender}
    Location: ${userAnswers.location}

    Please provide a list of 3-5 relevant government schemes that this person might be eligible for. Format each scheme as a clear, concise statement without bullet points or asterisks.`

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response

    // Process the response to remove any asterisks or bullet points
    const schemes = response.text()
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.replace(/^[*•-]\s*/, ''))

    return NextResponse.json({ recommendations: schemes })
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Error generating recommendations' },
      { status: 500 }
    )
  }
}

