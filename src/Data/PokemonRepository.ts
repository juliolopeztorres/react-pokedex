import Service from "../Domain/Service";
import { PokemonClient } from "pokenode-ts";
import generationInfo from "../Domain/GenerationInfo";
import Exception from "../Domain/Model/Exception";
import GetPokemonsRepository from "../Domain/UseCase/GetPokemonsRepository";
import Pokemon from "../Domain/Model/Pokemon";
import PokemonDetail from "../Domain/Model/PokemonDetail";
import { MapPokemon, MapPokemonDetail } from "./Mapper/PokemonMapper";

export default class PokemonRepository implements Service, GetPokemonsRepository {

  constructor(
    private readonly storage: Storage,
    private readonly client: PokemonClient
  ) {}

  getByGeneration(generation: string): Promise<Pokemon[]> {
    const localStorageKey = `pokemon-${generation}`
    const pokemonsSaved : string | null = this.storage.getItem(localStorageKey)

    if (null === pokemonsSaved) {
      return this.client.listPokemons(generationInfo[generation].offset, generationInfo[generation].limit)
          .then((response) => {
            const pokemons = response.results.map(MapPokemon)
            localStorage.setItem(localStorageKey, JSON.stringify(pokemons))

            return pokemons
          })
          .catch((error) => Promise.reject(Exception.create('Error API Pokemon List', error)))
    }

    return Promise.resolve(JSON.parse(pokemonsSaved))
  }

  getById(id : number) : Promise<PokemonDetail> {
      return this.client.getPokemonById(id)
        .then((pokemon) => MapPokemonDetail(pokemon))
        .catch((error) => Promise.reject(Exception.create('Error API Pokemon Detail', error)))
  }

  getName() : string {
    return 'PokemonRepository';
  }
}
