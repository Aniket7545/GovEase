import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const response = await generateText({
      model: openai('gpt-4'),
      prompt: message,
      system: `You are an AI assistant for GovEase, a platform that helps citizens find and apply for government schemes. 
      You have extensive knowledge of various Indian government schemes, their eligibility criteria, and application processes. 
      Provide helpful and accurate information to users' queries about government schemes and services.`,
    })

    return NextResponse.json({ message: response.text })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Error processing message' },
      { status: 500 }
    )
  }
}

