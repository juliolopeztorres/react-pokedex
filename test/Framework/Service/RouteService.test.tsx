import React from 'react'
import { createRoot, Root } from "react-dom/client"
import { act } from "@testing-library/react"
import { BrowserRouter, MemoryRouter } from "react-router-dom";

jest.mock("../../../src/Framework/View/HomeView", () => {
  return () => <div>
    Home view
  </div>
})

jest.mock("../../../src/Framework/View/NotFound", () => {
  return () => <div>
    Not found
  </div>
})

import RouteService from "../../../src/Framework/Service/RouteService";

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

it('should render home', () => {
  act(() => {
    root.render(<BrowserRouter>
      <RouteService/>
    </BrowserRouter>)
  })

  expect(container).toMatchSnapshot()
})

it('should render not found', () => {
  act(() => {
    root.render(<MemoryRouter initialEntries={['/whatever']}>
      <RouteService/>
    </MemoryRouter>)
  })

  expect(container).toMatchSnapshot()
})
