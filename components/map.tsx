"use client"

import React, { type FC, type ComponentProps, useEffect, useState } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import { LatLng, icon } from "leaflet"
import "leaflet/dist/leaflet.css"

export const Map: FC<
  ComponentProps<"div"> & { location?: GeolocationPosition }
> = ({ location, ...props }) => {
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
          </MapContainer>
        )}
      </div>
    </>
  )
}

export default Map
