// SchemeCategories.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, GraduationCap, Heart, Home, Sprout, Users } from 'lucide-react'

const categories = [
  { icon: Briefcase, name: 'Employment', count: 42 },
  { icon: GraduationCap, name: 'Education', count: 35 },
  { icon: Heart, name: 'Health', count: 28 },
  { icon: Home, name: 'Housing', count: 20 },
  { icon: Sprout, name: 'Agriculture', count: 31 },
  { icon: Users, name: 'Social Welfare', count: 39 },
]

export default function SchemeCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => {
        const Icon = category.icon
        return (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href={`/categories/${category.name.toLowerCase()}`}>
              <Card className="relative overflow-hidden border-none bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-50" />
                <CardContent className="p-6 relative">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 p-3 rounded-full shadow-sm">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category.count} Schemes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}