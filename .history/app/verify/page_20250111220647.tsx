'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
//import { FileUploader } from './component/FileUploader'
import { DocumentStatus } from '@/components/DocumentStatus'
import { Loader2 } from 'lucide-react'

export default function VerifyDocuments() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState<Array<{
    id: number;
    type: string;
    status: string;
    data?: any;
  }>>([])
  const router = useRouter()

  const handleFileUpload = async (file: File, type: string) => {
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    try {
      const response = await fetch('/api/documents/verify', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      setUploadedDocs(prev => [...prev, data])
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Document Verification</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label>Aadhaar Card</Label>
                  <FileUploader
                    onUpload={(file) => handleFileUpload(file, 'aadhaar')}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
                <div>
                  <Label>PAN Card</Label>
                  <FileUploader
                    onUpload={(file) => handleFileUpload(file, 'pan')}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
                <div>
                  <Label>Income Certificate</Label>
                  <FileUploader
                    onUpload={(file) => handleFileUpload(file, 'income')}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {uploadedDocs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedDocs.map((doc) => (
                    <DocumentStatus key={doc.id} document={doc} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {isUploading && (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

