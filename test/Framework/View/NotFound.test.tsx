import React from 'react'
import { BrowserRouter } from "react-router-dom"
import { createRoot, Root } from "react-dom/client";
import { act } from "@testing-library/react";

import NotFoundView from "../../../src/Framework/View/NotFound";

let root: Root
let container: HTMLElement
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);

  root = createRoot(container)
});

afterEach(() => {
  // cleanup on exiting
  act(() => root.unmount())

  container.remove();
});

it('should render', () => {
  act(() => root.render(
      <BrowserRouter>
        <NotFoundView/>
      </BrowserRouter>,
    )
  )

  expect(container.textContent).toContain('404 - Route not found')
  expect(container.textContent).toContain('Don\'t know where to go?')

  const a = container.querySelector('a')
  expect(a).not.toBeNull()

  expect(a!.textContent).toContain('Take me home')
  expect(a!.hasAttribute('href')).toBe(true)
  expect(a!.getAttribute('href')).toBe('/')

  expect(container).toMatchSnapshot()
})
