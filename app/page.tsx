import { prisma } from "../utils/database"
import { Event } from "@prisma/client"
import HomePageClient from "../components/home-page-client"

const HomePage = async () => {
  const events = await prisma.event.findMany()
  
  return <HomePageClient events={events} />
}

export default HomePage
