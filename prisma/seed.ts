import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const schemes = [
    {
      name: 'Pradhan Mantri Awas Yojana',
      description: 'Housing scheme for the urban poor',
      eligibility: 'Urban poor with annual income up to INR 3 lakh',
    },
    {
      name: 'National Rural Livelihood Mission',
      description: 'Poverty alleviation program',
      eligibility: 'Rural poor, especially women',
    },
    {
      name: 'Skill India Mission',
      description: 'Skill development initiative',
      eligibility: 'Youth aged 15-59 years',
    },
  ]

  for (const scheme of schemes) {
    await prisma.scheme.create({ data: scheme })
  }

  console.log('Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })