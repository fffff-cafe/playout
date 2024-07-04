"use client"

import React, { type FC, type ComponentProps, useEffect, useState } from "react"
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import { LatLng, icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import iconImage from "leaflet/dist/images/marker-icon.png"
import type { Event } from "../type"
import Link from "next/link"

export const Map: FC<
  ComponentProps<"div"> & { location?: GeolocationPosition; events: Event[] }
> = ({ location, events, ...props }) => {
  const [position, setPosition] = useState<LatLng>()
  useEffect(() => {
    setPosition(
      new LatLng(
        location?.coords.latitude ?? 35.69411866263864,
        location?.coords.longitude ?? 139.7686725854874
      )
    )
  }, [location])
  return (
    <>
      <div style={{ height: "20rem", width: "100%" }} {...props}>
        {position && (
          <MapContainer
            center={position}
            zoom={15}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
              url={`https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png`}
            />
            {events.map((event, key) => (
              <Marker
                key={key}
                position={new LatLng(event.latitude, event.longitude)}
                icon={icon({
                  iconUrl: iconImage.src,
                })}
              >
                <Popup>
                  <Link href={event.url}>{event.name}</Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </>
  )
}

export default Map
