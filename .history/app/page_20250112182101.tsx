'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart2, FileText, MessageSquare, ArrowRight } from 'lucide-react'
import SchemeCategories from './component/SchemeCategories'
import { ChatWidget } from './component/ChatWidget'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Welcome to GovEase
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your personalized gateway to government schemes and benefits. 
              Discover, verify, and access services tailored to your needs.
            </p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={itemVariants}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-8">
                <Link href="/questionnaire">Find Schemes For You</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
                <Link href="/upload-documents">Upload Documents</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          {/* Features Section */}
<motion.div variants={itemVariants}>
  <div className="grid md:grid-cols-3 gap-8">
    {[
      {
        icon: <BarChart2 className="h-6 w-6" />,
        title: "Personalized Recommendations",
        description: "Get tailored scheme suggestions based on your profile and needs.",
        href: "/questionnaire",
        linkText: "Start Questionnaire"
      },
      {
        icon: <FileText className="h-6 w-6" />,
        title: "Document Verification",
        description: "Securely upload and verify your documents for scheme eligibility.",
        href: "/upload-documents",
        linkText: "Upload Documents"
      },
      {
        icon: <MessageSquare className="h-6 w-6" />,
        title: "AI-Powered Assistance",
        description: "Get instant help and answers to your questions about government schemes.",
        href: "#",
        linkText: "Try AI Chat",
        onClick: () => document.querySelector('.fixed.bottom-4.right-4')?.classList.remove('hidden')
      }
    ].map((feature, index) => (
      <motion.div
        key={index}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link 
          href={feature.href}
          onClick={feature.onClick}
          className="block h-full"
        >
          <Card className="relative h-full overflow-hidden border-none bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-50" />
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                {feature.icon}
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
              <span className="group text-blue-600 dark:text-blue-400 flex items-center">
                {feature.linkText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    ))}
  </div>
</motion.div>

          {/* Categories Section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Explore Schemes by Category
            </h2>
            <SchemeCategories />
          </motion.div>
        </motion.div>
      </div>
      <ChatWidget />
    </main>
  )
}