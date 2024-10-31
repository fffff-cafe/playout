import { NextPage } from "next"
import { eventList } from "../../../constants"

const EventIdPage: NextPage<{
  params: {
    id: string
  }
}> = ({ params: { id } }) => {
  const event = eventList.find((e) => e.id == id)
  return (
    <>
      <div
        style={{
          minHeight: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexFlow: "row",
            justifyContent: "center",
            minHeight: "100%",
            width: "100%",
          }}
        >
          <h2>{event.name}</h2>
        </div>
      </div>
    </>
  )
}

export const generateStaticParams = () => {
  return eventList.map((event) => ({ id: event.id }))
}

export default EventIdPage
