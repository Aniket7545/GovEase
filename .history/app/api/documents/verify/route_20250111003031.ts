import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const { documentId } = await req.json()

  if (!documentId) {
    return NextResponse.json({ error: 'Document ID is required' }, { status: 400 })
  }

  try {
    // Simulate document verification process
    const verificationResult = Math.random() < 0.8 ? 'verified' : 'rejected'

    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: { status: verificationResult },
    })

    return NextResponse.json(updatedDocument)
  } catch (error) {
    console.error('Error verifying document:', error)
    return NextResponse.json({ error: 'Error verifying document' }, { status: 500 })
  }
}

