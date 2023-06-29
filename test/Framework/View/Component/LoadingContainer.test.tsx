import React, { useContext, useEffect } from 'react'
import { createRoot, Root } from "react-dom/client"
import { act } from "@testing-library/react";

import LoadingContainer from "../../../../src/Framework/View/Component/LoadingContainer";
import LoadingContextService from "../../../../src/Framework/Service/LoadingContextService";
import { clearTimeout } from "timers";

let root: Root
let container: HTMLElement
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)

  root = createRoot(container)
  jest.useFakeTimers()
})

afterEach(() => {
  // cleanup on exiting
  act(() => root.unmount())

  container.remove()
  jest.useRealTimers()
})

it('should render', () => {
  const Children = () => {
    const [isLoading, setIsLoading] = useContext(LoadingContextService)

    useEffect(() => {
      setIsLoading(true)

      const tid = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => {
        clearTimeout(tid)
      }
    }, [])

    return !isLoading && <div>
      <span>Children to be drawn</span>
    </div>
  }

  act(() => {
    root.render(<LoadingContainer><Children/></LoadingContainer>)
  })

  expect(container).toMatchSnapshot()

  act(() => {
    jest.advanceTimersByTime(1200)
  })

  expect(container).toMatchSnapshot()
})
