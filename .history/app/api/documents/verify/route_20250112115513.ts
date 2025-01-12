import { NextResponse } from 'next/server'
import { createWorker,Worker } from 'tesseract.js'
import { GoogleGenerativeAI } from '@google/generative-ai'
import sharp from 'sharp'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string

    if (!file || !type) {
      return NextResponse.json(
        { error: 'File and type are required' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Process image with sharp
    const processedBuffer = await sharp(buffer)
      .greyscale() // Convert to greyscale for better OCR
      .normalize() // Normalize the image
      .toBuffer()

    // Perform OCR
    const worker = await createWorker()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    
    const { data: { text } } = await worker.recognize(processedBuffer)
    await worker.terminate()

    // Use Gemini to analyze the extracted text
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = `
      Analyze the following extracted text from a ${type} document and verify its authenticity.
      Document text: ${text}
      
      Please provide a structured analysis with the following:
      1. Document Type Confirmation
      2. Key Information Extracted
      3. Potential Red Flags (if any)
      4. Verification Status (VERIFIED/REJECTED)
      
      Format the response as a JSON object with these fields.
    `

    const result = await model.generateContent(prompt)
    const analysis = result.response.text()
    
    try {
      const parsedAnalysis = JSON.parse(analysis)
      return NextResponse.json({
        status: parsedAnalysis.verificationStatus,
        analysis: parsedAnalysis
      })
    } catch (e) {
      // Fallback if AI response isn't valid JSON
      return NextResponse.json({
        status: 'PENDING',
        analysis: { error: 'Could not parse verification results' }
      })
    }

  } catch (error) {
    console.error('Document verification error:', error)
    return NextResponse.json(
      { error: 'Error processing document' },
      { status: 500 }
    )
  }
}

