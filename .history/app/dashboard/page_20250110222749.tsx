import Header from '../components/Header'
import Footer from '../components/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, MessageCircle, Zap } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome, Priya!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Schemes</CardTitle>
              <CardDescription>Based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="p-0">Pradhan Mantri Awas Yojana</Button>
                </li>
                <li>
                  <Button variant="link" className="p-0">National Rural Livelihood Mission</Button>
                </li>
                <li>
                  <Button variant="link" className="p-0">Skill India Mission</Button>
                </li>
              </ul>
              <Button className="mt-4">Explore More</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Document Verification</CardTitle>
              <CardDescription>Upload and verify your documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FileText className="mr-2 text-green-500" />
                  <span>Aadhaar Card - Verified</span>
                </div>
                <div className="flex items-center">
                  <FileText className="mr-2 text-yellow-500" />
                  <span>PAN Card - Pending</span>
                </div>
                <Button>Upload Documents</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get instant help and guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>How can I help you today?</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <Zap className="mr-2 h-4 w-4" />
                    Quick Actions
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

