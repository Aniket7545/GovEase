import { Check, Clock, X } from 'lucide-react'

interface DocumentStatusProps {
  document: {
    id: number
    type: string
    status: string
    data?: any
  }
}

export function DocumentStatus({ document }: DocumentStatusProps) {
  const getStatusIcon = () => {
    switch (document.status) {
      case 'verified':
        return <Check className="h-5 w-5 text-green-500" />
      case 'rejected':
        return <X className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusText = () => {
    switch (document.status) {
      case 'verified':
        return 'Verified'
      case 'rejected':
        return 'Verification Failed'
      default:
        return 'Processing'
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        {getStatusIcon()}
        <div>
          <h4 className="font-medium">{document.type}</h4>
          <p className="text-sm text-gray-500">{getStatusText()}</p>
        </div>
      </div>
      {document.data && (
        <div className="text-sm text-gray-600">
          {/* Display extracted information */}
          {document.type === 'aadhaar' && (
            <p>Name: {document.data.name}</p>
          )}
        </div>
      )}
    </div>
  )
}

