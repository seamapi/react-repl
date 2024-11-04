// from https://github.com/seamapi/react-repl/blob/main/src/useReactReplJS.js
// converted with https://js2ts.com 

import React, { useMemo, useRef } from "react"
import { ReactReplJS } from "./ReactReplJS"
import type { EvalCodeFunction, ReactReplPropsT } from "./types"

export const useReactReplJS = () => {
  const submitCodeRef = useRef<EvalCodeFunction>()

  return useMemo(
    () => {
      return (
        {
          ReactRepl: (props: ReactReplPropsT) => (
            <ReactReplJS {...props} submitCodeRef={submitCodeRef} />
          ),
          submitCode: (code: string): void => {
            if (submitCodeRef.current) {
              submitCodeRef.current(code)
            }
          }
        }
      )
    },
    []
  )
}

export default useReactReplJS
