import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are an AI assistant for GovEase, a platform that helps citizens find and apply for government schemes in India. Provide helpful and accurate information about various Indian government schemes, their eligibility criteria, and application processes. Format your responses without using asterisks or bullet points.' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am now an AI assistant for GovEase, specializing in Indian government schemes. I will provide information about schemes, eligibility criteria, and application processes without using asterisks or bullet points. How may I assist you today?' }],
        },
      ],
      generationConfig: {
        temperature: 0.8,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1000,
      },
    })

    const result = await chat.sendMessage(message)
    const response = await result.response

    // Process the response to remove any remaining asterisks or bullet points
    const cleanedResponse = response.text()
      .replace(/\*/g, '')
      .split('\n')
      .map(line => line.replace(/^[-•]\s*/, ''))
      .join('\n')

    return NextResponse.json({ message: cleanedResponse })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Error processing message' },
      { status: 500 }
    )
  }
}
