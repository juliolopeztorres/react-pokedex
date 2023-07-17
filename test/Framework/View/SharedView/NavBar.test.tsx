import React from 'react'
import { createRoot, Root } from "react-dom/client"
import { act } from "@testing-library/react"

import DarkModeContextService from "../../../../src/Framework/Service/DarkModeContextService"
import { BrowserRouter } from "react-router-dom"

jest.mock('../../../../src/Framework/Asset/Image/pokeball.png', () => {
  return 'img/pokeball.png'
})

import NavBar from "../../../../src/Framework/View/SharedView/NavBar"

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
  const onDarkModeChanged = jest.fn()

  act(() => root.render(
    <BrowserRouter>
      <DarkModeContextService.Provider value={[false, onDarkModeChanged]}>
        <NavBar/>
      </DarkModeContextService.Provider>
    </BrowserRouter>
  ))

  expect(container.textContent).toContain('Pokédex')

  expect(onDarkModeChanged).not.toHaveBeenCalled()
  const checkbox = container.querySelector('input[data-test-id="checkbox"]')
  expect(checkbox).toBeTruthy()

  act(() => checkbox!.dispatchEvent(new MouseEvent('click', {bubbles: true})))

  expect(onDarkModeChanged).toHaveBeenCalledTimes(1)
  expect(onDarkModeChanged).toHaveBeenLastCalledWith(true)

  expect(history.length).toBe(1)
  const img = container.querySelector('img[data-test-id="logo"]')
  expect(img).toBeTruthy()

  act(() => img!.dispatchEvent(new MouseEvent('click', {bubbles: true})))
  expect(history.length).toBe(2)

  expect(container).toMatchSnapshot()
})
