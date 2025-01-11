import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import type { Scheme } from '@prisma/client';


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { profile: true },
    })

    if (!user || !user.profile) {
      return NextResponse.json({ error: 'User or profile not found' }, { status: 404 })
    }

    const schemes = await prisma.scheme.findMany()

    // Simple recommendation algorithm (can be improved with more complex logic)
    const recommendations = schemes.filter(scheme => {
      if (scheme.name.includes('Youth') && user.profile.age <= 35) return true
      if (scheme.name.includes('Rural') && user.profile.occupation.toLowerCase().includes('farmer')) return true
      if (scheme.name.includes('Women') && user.profile.maritalStatus.toLowerCase() === 'single') return true
      if (scheme.eligibility.includes('low income') && user.profile.income < 300000) return true
      return false
    })

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json({ error: 'Error fetching recommendations' }, { status: 500 })
  }
}

