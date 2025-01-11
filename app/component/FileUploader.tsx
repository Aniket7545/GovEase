'use client'

import { useState } from 'react'
import { Upload, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileUploaderProps {
  onUpload: (file: File) => void
  accept: string
}

export function FileUploader({ onUpload, accept }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleFile = (file: File) => {
    setError(null)
    if (!file.type.match(/(image\/.*|application\/pdf)/)) {
      setError('Please upload an image or PDF file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB')
      return
    }
    onUpload(file)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center ${
        isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex flex-col items-center">
          <Upload className="h-8 w-8 mb-2 text-gray-400" />
          <p className="text-sm text-gray-600">
            Drag and drop or click to upload
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Supported formats: JPG, PNG, PDF (max 5MB)
          </p>
        </div>
      </label>
      {error && (
        <div className="mt-2 text-sm text-red-500 flex items-center justify-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  )
}

