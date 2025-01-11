import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Ensure the upload directory exists
  const uploadDir = path.join(process.cwd(), 'tmp', 'uploads')
  await writeFile(path.join(uploadDir, 'placeholder'), '') // This will create the directory if it doesn't exist

  // Save the file
  const fileName = `${Date.now()}-${file.name}`
  const filePath = path.join(uploadDir, fileName)
  await writeFile(filePath, buffer)

  return NextResponse.json({ documentId: fileName })
}

