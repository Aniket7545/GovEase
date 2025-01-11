import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SchemeCategories from '@/components/SchemeCategories'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800 dark:text-blue-300">
            Welcome to GovEase
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Your personalized gateway to government schemes and benefits
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/questionnaire">Find Schemes For You</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/upload-documents">Upload Documents</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
            Explore Schemes by Category
          </h2>
          <SchemeCategories />
        </div>
      </div>
    </main>
  )
}

