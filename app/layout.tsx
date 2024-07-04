import type { Metadata } from "next"
import { M_PLUS_1 } from "next/font/google"
import "./global.css"
import Link from "next/link"
import React from "react"

const font = M_PLUS_1({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Playout",
  description: "オフラインで集まる勉強会ぷらっとフォーム",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body style={{ ...font.style }}>
        <header
          style={{
            background: "#2792c3",
            color: "#f0f0f0",
            padding: ".5rem",
            position: "fixed",
            width: "100%",
            zIndex: "2000",
          }}
        >
          <Link
            href={"/"}
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Playout!
          </Link>
          <p style={{ fontSize: ".6rem" }}>
            オフラインで集まる勉強会ぷらっとフォーム
          </p>
        </header>
        <main
          style={{
            height: "100%",
            minHeight: "100dvh",
            paddingTop: "4rem",
          }}
        >
          <>{children}</>
        </main>
      </body>
    </html>
  )
}
