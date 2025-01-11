import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import SchemeCategories from '@/components/SchemeCategories'
import AIChat from '@/components/AIChat'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Discover government schemes for you...
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find personalized schemes based on eligibility with AI-powered assistance
              </p>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/schemes">Find Schemes For You</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/verify">Verify Documents</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8RjWp1SuZldSSJnpZnWGtuUeImDRdB.png"
                alt="Government Schemes"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { count: '2950+', label: 'Total Schemes' },
              { count: '520+', label: 'Central Schemes' },
              { count: '2410+', label: 'State/UT Schemes' },
            ].map((stat, index) => (
              <Card key={index} className="bg-green-50 dark:bg-green-950">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{stat.count}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Find schemes based on categories
          </h2>
          <SchemeCategories />
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-16 bg-green-50 dark:bg-green-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Get Personalized Assistance with AI
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our AI assistant helps you:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <ArrowRight className="mr-2 text-green-600" />
                  Verify documents automatically
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 text-green-600" />
                  Find schemes based on your profile
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 text-green-600" />
                  Get instant answers to your questions
                </li>
              </ul>
            </div>
            <div className="bg-background rounded-lg shadow-lg p-6">
              <AIChat />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

