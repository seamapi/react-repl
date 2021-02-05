import React, { useMemo, useRef } from "react"
import ReactReplJS from "./ReactReplJS"

export const useReactReplJS = () => {
  const submitCodeRef = useRef()

  return useMemo(
    () => ({
      ReactRepl: (props) => (
        <ReactReplJS {...props} submitCodeRef={submitCodeRef} />
      ),
      submitCode: (code) => {
        submitCodeRef.current(code)
      },
    }),
    []
  )
}

export default useReactReplJS
