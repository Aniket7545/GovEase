'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight, BarChart2, FileText, MessageSquare, ArrowRight } from 'lucide-react'
import SchemeCategories from './component/SchemeCategories'
import { ChatWidget } from './component/ChatWidget'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <BarChart2 className="mr-2 h-5 w-5" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Get tailored scheme suggestions based on your profile and needs.
              </CardDescription>
              <Button variant="link" asChild className="group">
                <Link href="/questionnaire">
                  Start Questionnaire 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <FileText className="mr-2 h-5 w-5" />
                Document Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Securely upload and verify your documents for scheme eligibility.
              </CardDescription>
              <Button variant="link" asChild className="group">
                <Link href="/upload-documents">
                  Upload Documents
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <MessageSquare className="mr-2 h-5 w-5" />
                AI-Powered Assistance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Get instant help and answers to your questions about government schemes.
              </CardDescription>
              <Button variant="link" onClick={() => document.querySelector('.fixed.bottom-4.right-4')?.classList.remove('hidden')} className="group">
                Try AI Chat
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
            Explore Schemes by Category
          </h2>
          <SchemeCategories />
        </motion.div>
      </div>
      <ChatWidget />
    </main>
  )
}

