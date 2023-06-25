import React from 'react'
import { createRoot, Root } from "react-dom/client"
import { act } from "@testing-library/react";

import Pokemon from "../../../../src/Domain/Model/Pokemon";
import PokemonModelDetail from "../../../../src/Domain/Model/PokemonDetail";
import ServiceContainerInterface, {
  ServiceType
} from "../../../../src/Framework/DependencyInjection/ServiceContainerInterface";
import GetPokemonsUseCase from "../../../../src/Domain/UseCase/GetPokemonsUseCase";
import GetPokemonsRepositoryInterface from "../../../../src/Domain/UseCase/GetPokemonsRepositoryInterface";
import ServiceContainerContextService from "../../../../src/Framework/Service/ServiceContainerContextService";
import LoadingContextService from "../../../../src/Framework/Service/LoadingContextService";
import BaseStat from "../../../../src/Domain/Model/BaseStat";
import Exception from "../../../../src/Domain/Model/Exception";

const logFunctionMock = jest.fn()
jest.mock('../../../../src/Domain/Util/logWithLevel', () => {
  return {
    __esModule: true,
    Level: jest.requireActual('../../../../src/Domain/Util/logWithLevel').Level,
    default: logFunctionMock,
  }
})

import PokemonDetail, { PokemonDetailCallback } from "../../../../src/Framework/View/HomeView/PokemonDetail";

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
  const pokemonDetail = new PokemonModelDetail(
    1,
    'bulbasaur',
    'bulbasaur-image',
    ['plant'],
    ['sprite-1', 'sprite-2'],
    [new BaseStat('Attack', 10)]
  )

  const setIsLoading = jest.fn()

  const onPokemonArtClicked = jest.fn()
  const onCloseClicked = jest.fn()

  const callback: PokemonDetailCallback = {
    onPokemonArtClicked,
    onCloseClicked
  }

  await act( async () => {
    root.render(
      <ServiceContainerContextService.Provider value={new class implements ServiceContainerInterface {
        getService(name : ServiceType) : any {
           expect(name).toBe('GetPokemonsUseCase')

          return new GetPokemonsUseCase(new class implements GetPokemonsRepositoryInterface {
            getByGeneration(generation : string) : Promise<Pokemon[]> {
              return Promise.reject('Not implemented');
            }

            getById(id : number) : Promise<PokemonModelDetail> {
              expect(id).toBe(1)

              return Promise.resolve(pokemonDetail);
            }

          })
        }
      }}>
        <LoadingContextService.Provider value={[false, setIsLoading]}>
          <PokemonDetail pokemon={new Pokemon(1, 'bulbasaur')} callback={callback}/>
        </LoadingContextService.Provider>
      </ServiceContainerContextService.Provider>
    )
  })

  expect(container).toMatchSnapshot()

  expect(setIsLoading).toHaveBeenCalledTimes(2)
  expect(setIsLoading).toHaveBeenNthCalledWith(1, true)
  expect(setIsLoading).toHaveBeenNthCalledWith(2, false)

  const pokemonImage = container.querySelector('div[data-test-id="pokemonImage"]')
  expect(pokemonImage).toBeTruthy()

  expect(onPokemonArtClicked).not.toHaveBeenCalled()
  act(() => {
    pokemonImage!.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })

  expect(onPokemonArtClicked).toHaveBeenCalledTimes(1)

  const closeBtn = container.querySelector('span[data-test-id="closeBtn"]')
  expect(closeBtn).toBeTruthy()

  expect(onCloseClicked).not.toHaveBeenCalled()
  act(() => {
    closeBtn!.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })

  expect(onCloseClicked).toHaveBeenCalledTimes(1)

  expect(container).toMatchSnapshot()
});

it('should log if use case fails', async () => {
  const setIsLoading = jest.fn()

  const onPokemonArtClicked = jest.fn()
  const onCloseClicked = jest.fn()

  const callback: PokemonDetailCallback = {
    onPokemonArtClicked,
    onCloseClicked
  }

  const expectedException = Exception.create('Error coming from Repository')

  await act(async () => {
    root.render(
      <ServiceContainerContextService.Provider value={new class implements ServiceContainerInterface {
        getService(name : ServiceType) : any {
          if (name === 'GetPokemonsUseCase') {
            return new GetPokemonsUseCase(new class implements GetPokemonsRepositoryInterface {
              getByGeneration(generation : string) : Promise<Pokemon[]> {
                throw new Error('Not implemented')
              }

              getById(id : number) : Promise<PokemonModelDetail> {
                return Promise.reject(expectedException);
              }
            })
          }

          throw new Error('Unexpected service requested')
        }
      }}>
        <LoadingContextService.Provider value={[false, setIsLoading]}>
          <PokemonDetail pokemon={new Pokemon(1, 'bulbasaur')} callback={callback}/>
        </LoadingContextService.Provider>
      </ServiceContainerContextService.Provider>
    )
  })

  expect(setIsLoading).toHaveBeenCalledTimes(2)
  expect(setIsLoading).toHaveBeenNthCalledWith(1, true)
  expect(setIsLoading).toHaveBeenNthCalledWith(2, false)

  expect(logFunctionMock).toHaveBeenCalledTimes(1)
  expect(logFunctionMock).toHaveBeenLastCalledWith(
    '🔴',
    'error getting pokemon from repository by id',
    { indentation: 2, context: Exception.create(
        'Could not recover pokemon detail for id 1',
        expectedException
      )}
  )

  expect(container).toMatchSnapshot()
});
