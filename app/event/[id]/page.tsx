import { eventList } from "../../../constants"

const EventIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const event = eventList.find((e) => e.id == id)
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

export const generateStaticParams = () => {
  return eventList.map((event) => ({ id: event.id }))
}

export default EventIdPage
