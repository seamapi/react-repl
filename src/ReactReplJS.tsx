// "use client";
// from https://github.com/seamapi/react-repl/blob/main/src/ReactReplJS.js
// converted with https://js2ts.com 
import React, { useState, useEffect, FC } from "react";
import { useReactReplJS } from "./useReactReplJS"
import { ReactRepl    } from "./ReactReplView";
import { Scope, LineT, LinesT, FCReactReplPropsT, ReactReplPropsT    } from "./types";
import prettyFormat from "pretty-format"

const AsyncFunction: FunctionConstructor = Object.getPrototypeOf(async function () {}).constructor

function scopeEval(scope: Scope, script: string): Promise<Scope> {
  script = script
    .trim()
    .replace(/^var /, "")
    .replace(/^let /, "")
    .replace(/^const /, "")
  return AsyncFunction("return (" + script + ")").bind(scope)()
}

async function execAndGetLine(execLine: string): Promise<LineT> {
  console.log("execAndGetLine", execLine);
   if (!execLine.trim()) return { type: "error", value: "Empty"}
   try {
     const evalOutput = await scopeEval(window, execLine)
     console.log("evalOutput", evalOutput);
     return { type: "output", value: prettyFormat(evalOutput) }
   } catch (e) {
       return { type: "error", value: JSON.stringify(e) }
   }
 }

export const ReactReplJS: FCReactReplPropsT = (args: ReactReplPropsT) => {
  console.log("repl",args)
  const title=args.title
  const tabs=args.tabs
  const selectedTab=args.selectedTab
  const onChangeTab=args.onChangeTab
  const initialLines = args.initialLines
  const initiallyExecute =args.initiallyExecute
  const  height=args.height
  const submitCodeRef = args.submitCodeRef
  
  const [lines, setLines] = useState<LinesT|undefined>(initialLines)

  const onSubmit = async (execLine: string) => {
    console.log("onsubmit",lines)
    let newLines:LinesT=[];
    const new_node : LineT = { type: 'input', value: execLine };
    const initial_list : LinesT =  [new_node];
    if (!lines) {
      newLines = initial_list;
    }
    else {
      newLines = lines.concat(initial_list);
    }    
    setLines(newLines)
    if (!execLine.trim()) return
    setLines(newLines.concat([await execAndGetLine(execLine)]))
  }
   

  if (submitCodeRef) submitCodeRef.current = onSubmit;

  useEffect(() => {
    ;(async () => {
      
      if (initiallyExecute) {
	if (initiallyExecute.length === 0) return
	const lines: LinesT = []
	for (const execLine of initiallyExecute) {
          lines.push({ type: "input", value: execLine })
          if (!execLine.trim()) continue
          lines.push(await execAndGetLine(execLine))
	}
	setLines(lines)
      }
    })()
  }, [])

  return (
    <ReactRepl
      title={title}
      tabs={tabs || ["Javascript"]}
      selectedTab={selectedTab || "Javascript"}
      onChangeTab={onChangeTab}
      onSubmit={onSubmit}
      height={ Number(height)}
      lines={lines}
      onClear={() => setLines([])}
    />
  )
}

export { ReactRepl, useReactReplJS }

export default ReactReplJS
