import React, { useState, useEffect } from "react"
import ReactReplView from "./ReactReplView"
import useReactReplJS from "./useReactReplJS"
import prettyFormat from "pretty-format"

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
function scopeEval(scope, script) {
  script = script
    .trim()
    .replace(/^var /, "")
    .replace(/^let /, "")
    .replace(/^const /, "")
  return AsyncFunction("return (" + script + ")").bind(scope)()
}

async function execAndGetLine(execLine) {
  if (!execLine.trim()) return []
  try {
    const evalOutput = await scopeEval(window, execLine)
    if (evalOutput) {
      return { type: "output", value: prettyFormat(evalOutput) }
    }
  } catch (e) {
    return { type: "error", value: e }
  }
}

export const ReactReplJS = ({
  title,
  onChangeTab,
  initiallyExecute = [],
  height,
  submitCodeRef = null,
}) => {
  const [lines, setLines] = useState([])

  const onSubmit = async (execLine) => {
    const newLines = lines.concat([{ type: "input", value: execLine }])
    setLines(newLines)
    if (!execLine.trim()) return
    setLines(newLines.concat([await execAndGetLine(execLine)]))
  }

  if (submitCodeRef) submitCodeRef.current = onSubmit

  useEffect(() => {
    ;(async () => {
      if (initiallyExecute.length === 0) return
      const lines = []
      for (const execLine of initiallyExecute) {
        lines.push({ type: "input", value: execLine })
        if (!execLine.trim()) continue
        lines.push(await execAndGetLine(execLine))
      }
      setLines(lines)
    })()
  }, [])

  return (
    <ReactReplView
      title={title}
      tabs={["Javascript"]}
      selectedTab="Javascript"
      onChangeTab={onChangeTab}
      onSubmit={onSubmit}
      height={height}
      lines={lines}
      onClear={() => setLines([])}
    />
  )
}

export { ReactReplView, useReactReplJS }

export default ReactReplJS
