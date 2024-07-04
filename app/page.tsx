"use client"

import { NextPage } from "next"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const Map = dynamic(() => import("../components/map"), {
  ssr: false,
})
import { Event } from "../type"
import { Star } from "../components/svg/icon"

const eventList: Event[] = [
  {
    name: "神田・秋葉原 ハッカソン会",
    description: "内容自由のゆるいハッカソン会です",
    beginDate: "2024-07-04",
    latitude: 35.69411866263864,
    longitude: 139.7686725854874,
    rating: 5,
    url: "https://fffff.connpass.com/event/322453/",
  },
]

const HomePage: NextPage = () => {
  const [location, setLocation] = useState<GeolocationPosition>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position)
    })
  }, [])

  return (
    <>
      <div
        style={{
          minHeight: "100%",
        }}
      >
        <Map location={location} events={eventList} />
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
            <h2
              style={{
                borderBottom: "solid #2792c3 2px",
                display: "inline-block",
              }}
            >
              近くで開催予定のイベント
            </h2>
            <div style={{ display: "flex", padding: ".5rem 0" }}>
              {eventList.map((event, i) => (
                <div
                  key={i}
                  style={{
                    border: "solid 1px #2792c3",
                    borderRadius: ".4rem",
                    maxWidth: "30rem",
                    padding: ".5rem 1rem",
                    width: "100%",
                  }}
                >
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: ".5rem 0",
                    }}
                  >
                    <div>
                      {Array(event.rating)
                        .fill(undefined)
                        .map((_, i) => (
                          <Star key={i} height={14} fill="#2792c3" />
                        ))}
                    </div>
                    <time>
                      {new Date(event.beginDate).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default HomePage
