import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Sprout, Building2, GraduationCap, Heart, Home, Scale, Atom, Users, Trophy, Bus, Plane, Droplet, Baby } from 'lucide-react'

const categories = [
  { icon: Sprout, name: 'Agriculture & Rural', count: 378 },
  { icon: Building2, name: 'Banking & Finance', count: 215 },
  { icon: GraduationCap, name: 'Education & Learning', count: 728 },
  { icon: Heart, name: 'Health & Wellness', count: 286 },
  { icon: Home, name: 'Housing & Shelter', count: 86 },
  { icon: Scale, name: 'Law & Justice', count: 18 },
  { icon: Atom, name: 'Science & Technology', count: 57 },
  { icon: Users, name: 'Skills & Employment', count: 238 },
  { icon: Trophy, name: 'Sports & Culture', count: 110 },
  { icon: Bus, name: 'Transport', count: 48 },
  { icon: Plane, name: 'Travel & Tourism', count: 34 },
  { icon: Droplet, name: 'Utility & Sanitation', count: 34 },
  { icon: Baby, name: 'Women and Child', count: 353 }
]

export default function SchemeCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => {
        const Icon = category.icon
        return (
          <Link key={index} href={`/categories/${category.name.toLowerCase()}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Icon className="h-8 w-8 mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} Schemes
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

