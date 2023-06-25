import GetPokemonsUseCase from "../../../src/Domain/UseCase/GetPokemonsUseCase";
import GetPokemonsRepositoryInterface from "../../../src/Domain/UseCase/GetPokemonsRepositoryInterface";
import Pokemon from "../../../src/Domain/Model/Pokemon";
import PokemonDetail from "../../../src/Domain/Model/PokemonDetail";
import PokemonModelDetail from "../../../src/Domain/Model/PokemonDetail";
import { Generation } from "../../../src/Domain/Model/GenerationInfo";
import BaseStat from "../../../src/Domain/Model/BaseStat";
import Exception from "../../../src/Domain/Model/Exception";

it('should get all by generation', async () => {
  const bulbasaur = new Pokemon(1, 'bulbasaur')

  expect(await (new GetPokemonsUseCase(new class implements GetPokemonsRepositoryInterface {
    getByGeneration(generation : Generation) : Promise<Pokemon[]> {
      expect(generation).toBe('1st')

      return Promise.resolve([bulbasaur])
    }

    getById(id : number) : Promise<PokemonDetail> {
      throw new Error('Not implemented')
    }
  })).getAll('1st')).toStrictEqual([bulbasaur])
})

it('should get detail by id', async () => {
  const pokemonDetail = new PokemonModelDetail(
    1,
    'bulbasaur',
    'bulbasaur-image',
    ['plant'],
    ['sprite-1', 'sprite-2'],
    [new BaseStat('Attack', 10)]
  )

  expect(await (new GetPokemonsUseCase(new class implements GetPokemonsRepositoryInterface {
    getByGeneration(generation : string) : Promise<Pokemon[]> {
      throw new Error('Not implemented')
    }

    getById(id : number) : Promise<PokemonDetail> {
      expect(id).toBe(1)

      return Promise.resolve(pokemonDetail);
    }
  })).getById(1)).toBe(pokemonDetail)
})

it('should throw error when getAll repository fails', async () => {
  const expectedError = {
    error: 0,
    message: 'Error from Pokemon Repository'
  }

  try {
    await (new GetPokemonsUseCase(new class implements GetPokemonsRepositoryInterface {
      getByGeneration(generation : Generation) : Promise<Pokemon[]> {
        return Promise.reject(expectedError)
      }

      getById(id : number) : Promise<PokemonDetail> {
        throw new Error('Not implemented')
      }
    })).getAll('1st')
  } catch (error: any) {
    expect(error).toBeInstanceOf(Exception)
    expect(error.message).toEqual('Could not recover pokemons for generation 1st')
    expect(error.context).toBeTruthy()
    expect(error.context).toEqual(expectedError)
  }
})

it('should throw error when getById repository fails', async () => {
  const expectedError = {
    error: 0,
    message: 'Error from Pokemon Repository'
  }

  try {
    await (new GetPokemonsUseCase(new class implements GetPokemonsRepositoryInterface {
      getByGeneration(generation : Generation) : Promise<Pokemon[]> {
        throw new Error('Not implemented')
      }

      getById(id : number) : Promise<PokemonDetail> {
        return Promise.reject(expectedError)
      }
    })).getById(1)
  } catch (error: any) {
    expect(error).toBeInstanceOf(Exception)
    expect(error.message).toEqual('Could not recover pokemon detail for id 1')
    expect(error.context).toBeTruthy()
    expect(error.context).toEqual(expectedError)
  }
})
