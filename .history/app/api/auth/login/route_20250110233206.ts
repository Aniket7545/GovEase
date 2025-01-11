import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })

    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 })
  }
}

