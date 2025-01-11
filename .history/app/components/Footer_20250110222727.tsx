import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-blue-600 mb-4">GovEase</h3>
            <p className="text-gray-600">Simplifying access to government services for all citizens.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</Link></li>
              <li><Link href="/schemes" className="text-gray-600 hover:text-blue-600 transition-colors">Schemes</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-600">Email: support@govease.com</p>
            <p className="text-gray-600">Phone: +91 123-456-7890</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Facebook</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Twitter</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">&copy; 2023 GovEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

