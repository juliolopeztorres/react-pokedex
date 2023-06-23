import GetPokemonsUseCase from "../../../src/Domain/UseCase/GetPokemonsUseCase";
import GetPokemonsRepositoryInterface from "../../../src/Domain/UseCase/GetPokemonsRepositoryInterface";
import Pokemon from "../../../src/Domain/Model/Pokemon";
import PokemonDetail from "../../../src/Domain/Model/PokemonDetail";
import PokemonModelDetail from "../../../src/Domain/Model/PokemonDetail";
import { Generation } from "../../../src/Domain/Model/GenerationInfo";
import BaseStat from "../../../src/Domain/Model/BaseStat";

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
