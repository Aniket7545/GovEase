import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import prisma from '@/lib/prisma'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const response = await generateText({
      model: openai('gpt-4'),
      prompt: `You are a helpful assistant for a government schemes platform. Help the user with their query: ${message}`,
      system: `You are an AI assistant for GovEase, a platform that helps citizens find and apply for government schemes. 
      You have knowledge of various government schemes and can help users find relevant schemes based on their eligibility.
      You can also help with document verification and application processes.`,
    })

    // Store chat message in database
    await prisma.chatMessage.create({
      data: {
        content: message,
        role: 'user',
        userId: 1, // In real implementation, get from authenticated user
      },
    })

    await prisma.chatMessage.create({
      data: {
        content: response.text,
        role: 'assistant',
        userId: 1, // In real implementation, get from authenticated user
      },
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

