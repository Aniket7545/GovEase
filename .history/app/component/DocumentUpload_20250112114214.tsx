'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Upload, CheckCircle, AlertTriangle, FileText, RefreshCw } from 'lucide-react'


interface VerificationResult {
  status: string
  analysis: {
    documentTypeConfirmation?: string
    keyInformation?: Record<string, string>
    potentialRedFlags?: string[]
    verificationStatus?: string
  }
}

export function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const { toast } = useToast()
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type === 'application/pdf')) {
      setFile(droppedFile)
      await handleVerification(droppedFile)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      await handleVerification(selectedFile)
    }
  }

  const handleVerification = async (fileToVerify: File) => {
    setIsUploading(true)
    setVerificationResult(null)

    const formData = new FormData()
    formData.append('file', fileToVerify)
    formData.append('type', fileToVerify.type.includes('pdf') ? 'pdf' : 'image')

    try {
      const response = await fetch('/api/documents/verify', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Verification failed')

      const result = await response.json()
      setVerificationResult(result)

      toast({
        title: result.status === 'VERIFIED' ? 'Document Verified' : 'Verification Failed',
        description: result.status === 'VERIFIED' 
          ? 'Your document has been successfully verified.'
          : 'There were issues verifying your document. Please check the details below.',
        variant: result.status === 'VERIFIED' ? 'default' : 'destructive',
      })
    } catch (error) {
      console.error('Verification error:', error)
      toast({
        title: 'Error',
        description: 'Failed to verify document. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-600">Document Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
              isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
              </motion.div>
              <h3 className="mt-4 text-lg font-medium">
                Drag and drop your document here
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                or
              </p>
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                variant="outline"
                className="mt-2"
              >
                Browse Files
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
              <p className="mt-2 text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>

          <AnimatePresence>
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 text-center"
              >
                <RefreshCw className="animate-spin h-8 w-8 mx-auto text-blue-600" />
                <p className="mt-2 text-sm text-gray-600">Verifying document...</p>
              </motion.div>
            )}

            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-4"
              >
                <div className={`p-4 rounded-lg ${
                  verificationResult.status === 'VERIFIED'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center">
                    {verificationResult.status === 'VERIFIED' ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span className={`font-medium ${
                      verificationResult.status === 'VERIFIED'
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}>
                      {verificationResult.status === 'VERIFIED'
                        ? 'Document Verified Successfully'
                        : 'Verification Failed'}
                    </span>
                  </div>
                </div>

                {verificationResult.analysis && (
                  <div className="space-y-3">
                    {verificationResult.analysis.documentTypeConfirmation && (
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Document Type</p>
                          <p className="text-sm text-gray-600">
                            {verificationResult.analysis.documentTypeConfirmation}
                          </p>
                        </div>
                      </div>
                    )}

                    {verificationResult.analysis.keyInformation && (
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <p className="font-medium mb-2">Extracted Information</p>
                        {Object.entries(verificationResult.analysis.keyInformation).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    )}

                    {verificationResult.analysis.potentialRedFlags && 
                     verificationResult.analysis.potentialRedFlags.length > 0 && (
                      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                        <p className="font-medium text-yellow-700">Potential Issues</p>
                        <ul className="mt-2 text-sm text-yellow-600 list-disc list-inside">
                          {verificationResult.analysis.potentialRedFlags.map((flag, index) => (
                            <li key={index}>{flag}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

