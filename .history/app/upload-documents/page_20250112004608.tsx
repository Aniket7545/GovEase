import { DocumentUpload } from './components/DocumentUpload'

export default function UploadDocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload and Verify Documents</h1>
      <DocumentUpload />
    </div>
  )
}

