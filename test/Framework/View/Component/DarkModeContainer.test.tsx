import React, { useContext, useEffect } from 'react'
import { createRoot, Root } from "react-dom/client"
import { act } from "@testing-library/react";
import { clearTimeout } from "timers";
import DarkModeContextService from "../../../../src/Framework/Service/DarkModeContextService";
import DarkModeContainer from "../../../../src/Framework/View/Component/DarkModeContainer";

let root: Root
let container: HTMLElement
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);

  root = createRoot(container)
  jest.useFakeTimers()
});

afterEach(() => {
  // cleanup on exiting
  act(() => root.unmount())

  container.remove();
  jest.useRealTimers()
});

it('should render', () => {
  const Children = () => {
    const [darkMode, setDarkMode] = useContext(DarkModeContextService)

    useEffect(() => {
      const tid = setTimeout(() => {
        setDarkMode(true)
      }, 1000)

      return () => {
        clearTimeout(tid)
      }
    }, [])

    return <div>
      <span>Children to be drawn. Dark mode is {darkMode.toString()}</span>
    </div>
  }

  act(() => {
    root.render(<DarkModeContainer><Children/></DarkModeContainer>)
  })

  expect(container).toMatchSnapshot()

  act(() => {
    jest.advanceTimersByTime(1200)
  })

  expect(container).toMatchSnapshot()
});


it('should render using localStorage saved value', () => {
  localStorage.setItem('darkMode', 'true')

  const Children = () => {
    const [darkMode, setDarkMode] = useContext(DarkModeContextService)

    useEffect(() => {
      const tid = setTimeout(() => {
        setDarkMode(false)
      }, 1000)

      return () => {
        clearTimeout(tid)
      }
    }, [])

    return <div>
      <span>Children to be drawn. Dark mode is {darkMode.toString()}</span>
    </div>
  }

  act(() => {
    root.render(<DarkModeContainer><Children/></DarkModeContainer>)
  })

  expect(container).toMatchSnapshot()

  act(() => {
    jest.advanceTimersByTime(1200)
  })

  expect(container).toMatchSnapshot()
});
