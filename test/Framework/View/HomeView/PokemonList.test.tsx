import React from 'react'
import { createRoot, Root } from "react-dom/client"
import { act } from "@testing-library/react";
import ServiceContainerInterface, { ServiceType } from "../../../../src/Framework/DependencyInjection/ServiceContainerInterface";
import GetPokemonsUseCase from "../../../../src/Domain/UseCase/GetPokemonsUseCase";
import GetPokemonsRepositoryInterface from "../../../../src/Domain/UseCase/GetPokemonsRepositoryInterface";
import Pokemon from "../../../../src/Domain/Model/Pokemon";
import PokemonDetail from "../../../../src/Domain/Model/PokemonDetail";

import LoadingContextService from "../../../../src/Framework/Service/LoadingContextService";
import ServiceContainerContextService from "../../../../src/Framework/Service/ServiceContainerContextService";
import PokemonList from "../../../../src/Framework/View/HomeView/PokemonList";

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

it('should render', async () => {
  const setLoading = jest.fn()
  const onPokemonClicked = jest.fn()

  await act(async () => {
    root.render(
      <ServiceContainerContextService.Provider value={new class implements ServiceContainerInterface {
        getService(name : ServiceType) : any {
          if (name === 'GetPokemonsUseCase') {
            return new GetPokemonsUseCase(new class implements GetPokemonsRepositoryInterface {
              getByGeneration(generation : string) : Promise<Pokemon[]> {
                return Promise.resolve([{id: 1, name: 'bulbasaur'}, {id: 2, name: 'charizard'}]);
              }

              getById(id : number) : Promise<PokemonDetail> {
                throw new Error('Not implemented')
              }
            })
          }

          throw new Error('Unexpected service requested')
        }
      }}>
        <LoadingContextService.Provider value={[false, setLoading]}>
          <PokemonList
            searchPokemonName={'bulba'}
            onPokemonClicked={onPokemonClicked}
            generation={'1st'}
          />
        </LoadingContextService.Provider>
      </ServiceContainerContextService.Provider>
    )
  })

  expect(setLoading).toHaveBeenCalledTimes(2)
  expect(setLoading).toHaveBeenNthCalledWith(1, true)
  expect(setLoading).toHaveBeenNthCalledWith(2, false)

  const list = container.querySelector('ul[data-test-id="list"]')
  expect(list).toBeTruthy()

  expect(list!.childElementCount).toBe(1)
  const listElement = list!.firstElementChild!

  expect(listElement.textContent).toContain('1. Bulbasaur')

  expect(onPokemonClicked).not.toHaveBeenCalled()
  act(() => {
    listElement.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })

  expect(onPokemonClicked).toHaveBeenCalledTimes(1)
  expect(onPokemonClicked).toHaveBeenLastCalledWith(new Pokemon(1, 'bulbasaur'))

  expect(container).toMatchSnapshot()
});
