import { PrismaClient } from '@prisma/client'
import { eventList } from '../constants'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  for (const event of eventList) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: {},
      create: {
        id: event.id,
        name: event.name,
        description: event.description || '',
        beginDate: event.beginDate,
        latitude: event.latitude,
        longitude: event.longitude,
        rating: event.rating,
        url: event.url || '',
      },
    })
  }
  
  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })