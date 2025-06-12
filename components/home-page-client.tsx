"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const Map = dynamic(() => import("./map"), {
  ssr: false,
})

import { Star } from "./svg/icon"
import Link from "next/link"
import { Event } from "@prisma/client"

const HomePageClient = ({ events }: { events: Event[] }) => {
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
        <Map location={location} events={events} />
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
            <div style={{ display: "flex", gap: ".5rem", padding: ".5rem 0" }}>
              {events.map((event, i) => (
                <Link
                  href={`/event/${event.id}`}
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
                  <p>{event.description.slice(0, 200)}</p>
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
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default HomePageClient