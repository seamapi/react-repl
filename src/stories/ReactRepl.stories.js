import React from "react"
import pkg from "../../package.json"
import { action } from "@storybook/addon-actions"

import ReactReplView from "../ReactReplView"

export default {
  title: "ReactReplView",
  component: ReactReplView,
}
export const Main = () => (
  <ReactReplView
    title={`React REPL ${pkg.version}`}
    tabs={["Javascript", "Python"]}
    selectedTab="Javascript"
    onChangeTab={action("onChangeTab")}
    onSubmit={action("onSubmit")}
    onClear={action("onClear")}
    height={200}
    lines={[
      { type: "input", value: "obj = { something: 2 }" },
      { type: "output", value: '{ "something": 2 }' },
      { type: "input", value: "b" },
      { type: "error", value: "TypeError: b is not defined" },
    ]}
  />
)
