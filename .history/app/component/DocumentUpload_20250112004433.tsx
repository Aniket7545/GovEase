'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Upload, FileCheck } from 'lucide-react'

export function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const uploadResponse = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) throw new Error('Upload failed')

      const uploadData = await uploadResponse.json()
      setVerificationStatus('Uploaded successfully. Verifying...')

      // Start verification process
      const verificationResponse = await fetch('/api/verify-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: uploadData.documentId }),
      })

      if (!verificationResponse.ok) throw new Error('Verification failed')

      const verificationData = await verificationResponse.json()
      setVerificationStatus(verificationData.status)

      toast({
        title: 'Document Processed',
        description: `Your document has been uploaded and ${verificationData.status}.`,
      })
    } catch (error) {
      console.error('Upload/Verification error:', error)
      toast({
        title: 'Error',
        description: 'There was an error processing your document. Please try again.',
        variant: 'destructive',
      })
      setVerificationStatus(null)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>Upload your document for verification</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="document">Document</Label>
          <Input id="document" type="file" onChange={handleFileChange} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </>
          )}
        </Button>
        {verificationStatus && (
          <div className="flex items-center text-sm text-green-600">
            <FileCheck className="mr-2 h-4 w-4" />
            {verificationStatus}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

