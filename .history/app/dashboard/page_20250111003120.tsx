'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileText, Upload, AlertTriangle, CheckCircle } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
}

interface Scheme {
  id: number
  name: string
  description: string
}

interface Document {
  id: number
  type: string
  status: string
  fileUrl: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [recommendations, setRecommendations] = useState<Scheme[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [newDocument, setNewDocument] = useState<File | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      fetchRecommendations(parsedUser.id)
      fetchDocuments(parsedUser.id)
    } else {
      router.push('/login')
    }
  }, [router])

  const fetchRecommendations = async (userId: number) => {
    try {
      const response = await fetch(`/api/recommendations?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setRecommendations(data)
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    }
  }

  const fetchDocuments = async (userId: number) => {
    try {
      const response = await fetch(`/api/documents?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setDocuments(data)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewDocument(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!newDocument || !user) return

    const formData = new FormData()
    formData.append('file', newDocument)
    formData.append('userId', user.id.toString())

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        fetchDocuments(user.id)
        setNewDocument(null)
      }
    } catch (error) {
      console.error('Error uploading document:', error)
    }
  }

  const handleVerify = async (documentId: number) => {
    try {
      const response = await fetch('/api/documents/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId }),
      })

      if (response.ok) {
        fetchDocuments(user!.id)
      }
    } catch (error) {
      console.error('Error verifying document:', error)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Schemes</CardTitle>
              <CardDescription>Based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recommendations.map((scheme) => (
                  <li key={scheme.id}>
                    <Button variant="link" className="p-0 h-auto text-left">
                      {scheme.name}
                    </Button>
                    <p className="text-sm text-gray-500">{scheme.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Document Verification</CardTitle>
              <CardDescription>Upload and verify your documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="mr-2" />
                      <span>{doc.type}</span>
                    </div>
                    {doc.status === 'pending' ? (
                      <Button onClick={() => handleVerify(doc.id)} size="sm">
                        Verify
                      </Button>
                    ) : doc.status === 'verified' ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <AlertTriangle className="text-red-500" />
                    )}
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Input type="file" onChange={handleFileChange} />
                  <Button onClick={handleUpload} disabled={!newDocument}>
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

