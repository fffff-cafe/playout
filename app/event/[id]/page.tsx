import { prisma } from "../../../utils/database"
import { notFound } from "next/navigation"

const EventIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const event = await prisma.event.findUnique({
    where: { id }
  })
  
  if (!event) {
    notFound()
  }
  return (
    <>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexFlow: "row",
          justifyContent: "center",
          minHeight: "100%",
          padding: "1rem",
          width: "100%",
        }}
      >
        <section
          style={{
            maxWidth: "72rem",
            padding: ".5rem",
            width: "100%",
          }}
        >
          <div style={{ width: "100%" }}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
          </div>
        </section>
      </div>
    </>
  )
}

export const generateStaticParams = async () => {
  const events = await prisma.event.findMany()
  return events.map((event) => ({ id: event.id }))
}

export default EventIdPage
