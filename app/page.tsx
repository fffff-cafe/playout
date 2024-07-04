import { NextPage } from "next"

const HomePage: NextPage = () => {
  return (
    <>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexFlow: "row",
          justifyContent: "center",
          minHeight: "100%",
        }}
      >
        <section
          style={{
            maxWidth: "48rem",
            width: "100%",
          }}
        ></section>
      </div>
    </>
  )
}

export default HomePage
