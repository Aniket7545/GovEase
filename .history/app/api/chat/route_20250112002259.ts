import { NextResponse } from 'next/server'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

// Initialize the Google Generative AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are an AI assistant for GovEase, a platform that helps citizens find and apply for government schemes in India. You have extensive knowledge of various Indian government schemes, their eligibility criteria, and application processes. Provide helpful and accurate information to users\' queries about government schemes and services.' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am now an AI assistant for GovEase, specializing in Indian government schemes. I m ready to help users with information about various schemes, eligibility criteria, and application processes. How may I assist you today?' }],
        },
      ],
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    })

    const result = await chat.sendMessage(message)
    const response = await result.response

    return NextResponse.json({ message: response.text() })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Error processing message' },
      { status: 500 }
    )
  }
}

