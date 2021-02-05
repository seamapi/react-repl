import React from "react"
import { action } from "@storybook/addon-actions"

import ReactReplJS from "../ReactReplJS"

export default {
  title: "ReactReplJS",
  component: ReactReplJS,
}
export const Main = () => (
  <ReactReplJS
    title="<ReactReplJS />"
    height={200}
    initiallyExecute={["a = 3", "b = 4", "a * b"]}
  />
)
