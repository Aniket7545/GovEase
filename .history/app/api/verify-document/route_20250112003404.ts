import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { readFile } from 'fs/promises'
import path from 'path'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
  try {
    const { documentId } = await req.json()

    // In a real application, you would retrieve the file path from a database
    const filePath = path.join(process.cwd(), 'tmp', 'uploads', documentId)

    // Read the file content
    const fileContent = await readFile(filePath, 'utf-8')

    // Use Gemini to analyze the document
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(`
      Analyze the following document content and verify its authenticity:

      ${fileContent}

      Provide a brief summary of the document and state whether it appears to be a valid government document or not.
    `)
    const response = await result.response

    // In a real application, you would update the document status in the database
    const status = response.text().includes('valid government document') ? 'verified' : 'rejected'

    return NextResponse.json({ status, analysis: response.text() })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json({ error: 'Error verifying document' }, { status: 500 })
  }
}

