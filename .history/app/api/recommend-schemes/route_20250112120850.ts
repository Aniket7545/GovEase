import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
  try {
    const userAnswers = await req.json()

    const prompt = `As an expert government scheme advisor, analyze the following user profile and recommend suitable Indian government schemes. Format your response as a JSON array of scheme objects, each containing 'name', 'description', 'benefits', and 'eligibility' fields. Do not use asterisks or bullet points in any field.

    User Profile:
    - Age: ${userAnswers.age}
    - Occupation: ${userAnswers.occupation}
    - Income Range: ${userAnswers.income}
    - Gender: ${userAnswers.gender}
    - Location: ${userAnswers.location}

    Provide 3-5 most relevant schemes. Ensure all text is properly formatted without any markdown or special characters.`

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response

    try {
      const schemes = JSON.parse(response.text())
      return NextResponse.json({ recommendations: schemes })
    } catch (e) {
      console.error('Failed to parse AI response as JSON:', e)
      return NextResponse.json(
        { error: 'Error processing recommendations' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Error generating recommendations' },
      { status: 500 }
    )
  }
}

