import { NextPage } from "next"
import { eventList } from "../../../constants"

const EventIdPage: NextPage = () => {
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
          <section
            style={{
              maxWidth: "72rem",
              padding: ".5rem",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", padding: ".5rem 0" }}></div>
          </section>
        </div>
      </div>
    </>
  )
}

export const generateStaticParams = () => {
  return eventList.map((event) => ({ id: event.id }))
}

export default EventIdPage
