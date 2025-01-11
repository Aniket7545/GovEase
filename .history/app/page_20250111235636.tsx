import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight, BarChart2, FileText, MessageSquare } from 'lucide-react'
import SchemeCategories from '@/components/SchemeCategories'
import AIChat from '@/components/AIChat'
import { AIChatTrigger } from '@/components/AIChatTrigger'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-blue-800 dark:text-blue-300">
            Welcome to GovEase
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your personalized gateway to government schemes and benefits. Discover, verify, and access services tailored to your needs.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/questionnaire">Find Schemes For You</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
              <Link href="/upload-documents">Upload Documents</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-blue-600" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get tailored scheme suggestions based on your profile and needs.
              </CardDescription>
              <Button variant="link" asChild className="mt-4">
                <Link href="/questionnaire">Start Questionnaire <ChevronRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                Document Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Securely upload and verify your documents for scheme eligibility.
              </CardDescription>
              <Button variant="link" asChild className="mt-4">
                <Link href="/upload-documents">Upload Documents <ChevronRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
                AI-Powered Assistance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get instant help and answers to your questions about government schemes.
              </CardDescription>
              <AIChatTrigger />
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
            Explore Schemes by Category
          </h2>
          <SchemeCategories />
        </div>

        <div id="ai-chat" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
            AI-Powered Assistance
          </h2>
          <Card>
            <CardContent className="p-6">
              <AIChat />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

