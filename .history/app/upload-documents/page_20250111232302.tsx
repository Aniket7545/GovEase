'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
'
import { Loader2, Upload } from 'lucide-react'

export default function UploadDocuments() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/verify-document', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      setVerificationResult(data.result)
      toast({
        title: 'Document Uploaded',
        description: 'Your document has been successfully uploaded and verified.',
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your document. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>Upload your documents for verification and scheme eligibility.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="document">Document</Label>
              <Input id="document" type="file" onChange={handleFileChange} />
            </div>
            {verificationResult && (
              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-md">
                <p className="text-green-800 dark:text-green-200">{verificationResult}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
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
        </CardFooter>
      </Card>
    </div>
  )
}

