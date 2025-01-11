'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Scheme {
  id: number
  name: string
  description: string
  eligibility: string
}

export default function Schemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([])

  useEffect(() => {
    const fetchSchemes = async () => {
      const response = await fetch('/api/schemes')
      const data = await response.json()
      setSchemes(data)
    }
    fetchSchemes()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Government Schemes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((scheme) => (
            <Card key={scheme.id}>
              <CardHeader>
                <CardTitle>{scheme.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{scheme.description}</CardDescription>
                <p className="mt-4 font-semibold">Eligibility:</p>
                <p>{scheme.eligibility}</p>
                <Button className="mt-4">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

