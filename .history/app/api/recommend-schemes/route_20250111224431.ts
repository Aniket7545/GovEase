import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  try {
    const userAnswers = await req.json()

    const prompt = `Based on the following user information, recommend suitable government schemes:
    Age: ${userAnswers.age}
    Occupation: ${userAnswers.occupation}
    Income Range: ${userAnswers.income}
    Gender: ${userAnswers.gender}
    Location: ${userAnswers.location}

    Please provide a list of 3-5 relevant government schemes that this person might be eligible for.`

    const response = await generateText({
      model: openai('gpt-4'),
      prompt: prompt,
      system: `You are an AI assistant for GovEase, a platform that helps citizens find and apply for government schemes. 
      You have extensive knowledge of various Indian government schemes and their eligibility criteria. 
      Provide scheme recommendations based on the user's profile information.`,
    })

    // Extract scheme names from the AI response
    const schemes = response.text
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

