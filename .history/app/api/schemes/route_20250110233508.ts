import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const schemes = await prisma.scheme.findMany()
    return NextResponse.json(schemes)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching schemes' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, eligibility } = await req.json()
    const scheme = await prisma.scheme.create({
      data: {
        name,
        description,
        eligibility,
      },
    })
    return NextResponse.json(scheme)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating scheme' }, { status: 500 })
  }
}

