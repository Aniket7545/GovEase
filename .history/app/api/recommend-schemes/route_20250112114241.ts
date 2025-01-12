import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
  try {
    const userAnswers = await req.json()

    const prompt = `As an expert government scheme advisor, analyze the following user profile and recommend suitable Indian government schemes. Format your response as a detailed list of schemes, with each scheme containing a title, description, and key benefits.

    User Profile:
    - Age: ${userAnswers.age}
    - Occupation: ${userAnswers.occupation}
    - Income Range: ${userAnswers.income}
    - Gender: ${userAnswers.gender}
    - Location: ${userAnswers.location}

    For each scheme, provide:
    1. Scheme Name (as a clear title)
    2. Brief Description (2-3 sentences explaining the scheme)
    3. Key Benefits (2-3 main benefits)
    4. Eligibility Highlights (key eligibility criteria)

    Format each scheme as a JSON object with these fields. Return an array of 3-5 most relevant schemes.`

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response

    try {
      // Try to parse the response as JSON
      const schemes = JSON.parse(response.text())
      return NextResponse.json({ recommendations: schemes })
    } catch (e) {
      // If parsing fails, format the text response
      const formattedSchemes = response.text()
        .split('\n\n')
        .filter(scheme => scheme.trim().length > 0)
        .map(scheme => ({
          name: scheme.split('\n')[0].replace(/^[^a-zA-Z]+/, ''),
          description: scheme.split('\n').slice(1).join('\n').trim()
        }))

      return NextResponse.json({ recommendations: formattedSchemes })
    }
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Error generating recommendations' },
      { status: 500 }
    )
  }
}

