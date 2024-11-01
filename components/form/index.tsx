import { ComponentProps, FC } from "react"

export const Button: FC<ComponentProps<"button">> = ({ style, ...props }) => {
  return (
    <button
      style={{
        background: "#444",
        border: "none",
        color: "#ccc",
        borderRadius: "1rem",
        padding: ".5rem 1rem",
        ...style,
      }}
      {...props}
    ></button>
  )
}
