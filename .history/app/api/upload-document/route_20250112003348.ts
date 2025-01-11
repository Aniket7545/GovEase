import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save the file to a temporary location
    const uploadDir = path.join(process.cwd(), 'tmp', 'uploads')
    const filePath = path.join(uploadDir, file.name)
    await writeFile(filePath, buffer)

    // In a real application, you would save the file information to a database
    // and return a document ID. For this example, we'll just return the file name.
    return NextResponse.json({ documentId: file.name })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }
}

