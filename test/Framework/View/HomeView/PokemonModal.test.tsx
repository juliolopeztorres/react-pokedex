import React from 'react'
import { createRoot, Root } from "react-dom/client"
import { act } from "@testing-library/react";
import PokemonModal from "../../../../src/Framework/View/HomeView/PokemonModal";

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
  const onPokemonArtClicked = jest.fn()

  act(() => {
    root.render(<PokemonModal name={'bulbasaur'} onPokemonArtClicked={onPokemonArtClicked}/>)
  })

  expect(container).toMatchSnapshot()

  const closeBtnContainer = container.querySelector('span[data-test-id="closeBtn"]')
  expect(closeBtnContainer).toBeTruthy()

  expect(onPokemonArtClicked).not.toHaveBeenCalled()
  act(() => {
    closeBtnContainer!.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })

  expect(onPokemonArtClicked).toHaveBeenCalledTimes(1)
})
