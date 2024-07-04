"use client"

import { NextPage } from "next"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const Map = dynamic(() => import("../components/map"), {
  ssr: false,
})

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
        <Map location={location} />
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
              maxWidth: "48rem",
              width: "100%",
            }}
          ></section>
        </div>
      </div>
    </>
  )
}

export default HomePage
