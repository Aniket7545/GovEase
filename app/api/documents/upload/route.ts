import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const userId = formData.get('userId') as string

  if (!file || !userId) {
    return NextResponse.json({ error: 'File and user ID are required' }, { status: 400 })
  }

  try {
    // In a real-world scenario, you would upload the file to a storage service
    // and get a URL. For this example, we'll use a placeholder URL.
    const fileUrl = `https://example.com/documents/${file.name}`

    const document = await prisma.document.create({
      data: {
        type: file.name.split('.').pop() || 'unknown',
        status: 'pending',
        fileUrl: fileUrl,
        userId: parseInt(userId),
      },
    })

    return NextResponse.json(document)
  } catch (error) {
    console.error('Error uploading document:', error)
    return NextResponse.json({ error: 'Error uploading document' }, { status: 500 })
  }
}

