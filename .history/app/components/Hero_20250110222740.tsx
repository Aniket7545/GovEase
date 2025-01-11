import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Simplifying Access to Government Services
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Discover, verify, and access government schemes effortlessly with our AI-powered platform.
        </p>
        <Button size="lg" className="mr-4">Get Started</Button>
        <Button variant="outline" size="lg">Learn More</Button>
      </div>
      <div className="md:w-1/2">
        <Image
          src="/placeholder.svg?height=400&width=400"
          alt="GovEase Platform"
          width={400}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  )
}

