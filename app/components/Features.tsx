import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, FileSearch, ShieldCheck } from 'lucide-react'

const features = [
  {
    title: 'AI-Powered Assistance',
    description: 'Get instant help and personalized guidance from our AI chatbot.',
    icon: Bot,
  },
  {
    title: 'Smart Scheme Discovery',
    description: 'Find relevant government schemes tailored to your profile and needs.',
    icon: FileSearch,
  },
  {
    title: 'Secure Document Verification',
    description: 'Easily upload and verify your documents with advanced AI technology.',
    icon: ShieldCheck,
  },
]

export default function Features() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

