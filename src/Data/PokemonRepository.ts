import Exception from "../Domain/Model/Exception";
import GetPokemonsRepositoryInterface from "../Domain/UseCase/GetPokemonsRepositoryInterface";
import Pokemon from "../Domain/Model/Pokemon";
import PokemonDetail from "../Domain/Model/PokemonDetail";
import { MapPokemon, MapPokemonDetail } from "./Mapper/PokemonMapper";
import generationsInfo, { Generation } from "../Domain/Model/GenerationInfo";
import { NamedAPIResourceList } from "pokenode-ts";

export type PokemonApiMin = {
  id: number,
  name: string,
  types: {type: {name: string}}[],
  sprites: {back_default: string | null, back_shiny: string | null},
  stats: {stat: {name: string}, base_stat: number}[]
}

export interface PokemonClient {
  listPokemons(offset: number, limit: number): Promise<NamedAPIResourceList>,
  getPokemonById(id: number): Promise<PokemonApiMin>
}

export default class PokemonRepository implements GetPokemonsRepositoryInterface {

  constructor(
    private readonly storage: Storage,
    private readonly client: PokemonClient
  ) {}

  getByGeneration(generation: Generation): Promise<Pokemon[]> {
    const localStorageKey = `pokemon-${generation}`
    const pokemonsSaved : string | null = this.storage.getItem(localStorageKey)

    if (null === pokemonsSaved) {
      return this.client.listPokemons(generationsInfo[generation].offset, generationsInfo[generation].limit)
          .then((response) => {
            const pokemons = response.results.map(MapPokemon)
            this.storage.setItem(localStorageKey, JSON.stringify(pokemons))

            return pokemons
          })
          .catch((error) => {
            return Promise.reject(Exception.create('Error API Pokemon List', error))
          })
    }

    return Promise.resolve(JSON.parse(pokemonsSaved))
  }

  getById(id : number) : Promise<PokemonDetail> {
      return this.client.getPokemonById(id)
        .then((pokemon) => MapPokemonDetail(pokemon))
        .catch((error) => Promise.reject(Exception.create('Error API Pokemon Detail', error)))
  }
}
