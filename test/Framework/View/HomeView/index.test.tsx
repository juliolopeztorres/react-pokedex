import React from 'react'
import { createRoot, Root } from "react-dom/client"
import { act, fireEvent } from "@testing-library/react";
import { PokemonDetailCallback } from "../../../../src/Framework/View/HomeView/PokemonDetail";
import Pokemon from "../../../../src/Domain/Model/Pokemon";
import { Generation } from "../../../../src/Domain/Model/GenerationInfo";

jest.mock('../../../../src/Framework/View/Component/LoadingContainer', () => {
  return ({children}: {children: React.ReactElement}) => children
})

let outerOnPokemonClicked: (pokemon: Pokemon) => void

jest.mock('../../../../src/Framework/View/HomeView/PokemonList', () => {
  return ({searchPokemonName, onPokemonClicked, generation}: {searchPokemonName: string, onPokemonClicked: () => void, generation: Generation}) => {

    outerOnPokemonClicked = onPokemonClicked

    return <div>
      Pokemon List
      <span>Pokemon search name: {searchPokemonName}</span>
      <span>Pokemon generation: {generation}</span>
    </div>
  }
})

let outerOnPokemonArtCloseClicked: () => void

jest.mock('../../../../src/Framework/View/HomeView/PokemonModal', () => {
  return ({name, onPokemonArtClicked}: {name: string, onPokemonArtClicked: () => void}) => {

    outerOnPokemonArtCloseClicked = onPokemonArtClicked

    return <div>
      Pokemon Modal
      Name: {name}
    </div>
  }
})

let outerPokemonDetailCallback: PokemonDetailCallback

jest.mock('../../../../src/Framework/View/HomeView/PokemonDetail', () => {
  return ({pokemon, callback}: {pokemon: Pokemon, callback: PokemonDetailCallback}) => {

    outerPokemonDetailCallback = callback

    return <div>
      Pokemon Detail

      Pokemon Info: #{pokemon.id} {pokemon.name}
    </div>
  }
})

import HomeView from "../../../../src/Framework/View/HomeView";

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
  // Initial state
  act(() => {root.render(<HomeView/>)})

  expect(container).toMatchSnapshot()

  const search: HTMLInputElement | null = container.querySelector('input[data-test-id="search"]')
  expect(search).toBeTruthy()

  // Trigger filtering pokemon by name
  act(() => {fireEvent.input(search!, {target: {value: 'chari'}})})

  expect(container).toMatchSnapshot()

  // Trigger clean search input
  const cleanSearch: HTMLInputElement | null = container.querySelector('span[data-test-id="clearSearchPokemonName"]')
  expect(cleanSearch).toBeTruthy()

  act(() => {cleanSearch!.dispatchEvent(new MouseEvent('click', {bubbles: true}))})

  expect(container).toMatchSnapshot()

  // Trigger filtering pokemon by name again
  act(() => {fireEvent.input(search!, {target: {value: 'chari'}})})

  expect(container).toMatchSnapshot()

  // Select new generation
  const select: HTMLInputElement | null = container.querySelector('select#pokemon-gen')
  expect(select).toBeTruthy()

  act(() => {fireEvent.change(select!, {target: {value: '2nd'}})})

  expect(container).toMatchSnapshot()

  // Click on one pokemon from within the list
  act(() => {outerOnPokemonClicked(new Pokemon(1, 'charizard'))})

  expect(container).toMatchSnapshot()

  // Click on the pokemon art to see alternative one in modal
  act(() => {outerPokemonDetailCallback.onPokemonArtClicked()})

  expect(container).toMatchSnapshot()

  // Click on close the alternative art
  act(() => {outerOnPokemonArtCloseClicked()})

  expect(container).toMatchSnapshot()

  // Click on close pokemon detail
  act(() => {outerPokemonDetailCallback.onCloseClicked()})

  expect(container).toMatchSnapshot()
})
