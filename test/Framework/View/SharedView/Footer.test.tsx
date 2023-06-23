import React from 'react'
import { createRoot, Root } from "react-dom/client"
import { act } from "@testing-library/react"

import Footer from "../../../../src/Framework/View/SharedView/Footer"

let root: Root
let container: HTMLElement
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)

  root = createRoot(container)
})

afterEach(() => {
  // cleanup on exiting
  act(() => root.unmount())

  container.remove()
})

it('should render', () => {
  act(() => root.render(<Footer/>))

  expect(container.textContent).toContain('Julio + React + Tailwind')
  expect(container.childElementCount).toBe(1)

  expect(container).toMatchSnapshot()
})
