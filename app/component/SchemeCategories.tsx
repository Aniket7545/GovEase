import Link from 'next/link'
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
          <Link key={index} href={`/categories/${category.name.toLowerCase()}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category.count} Schemes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

