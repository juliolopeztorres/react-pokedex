import Exception from "../Model/Exception";
import GetPokemonsRepositoryInterface from "./GetPokemonsRepositoryInterface";
import Pokemon from "../Model/Pokemon";
import PokemonDetail from "../Model/PokemonDetail";
import { Generation } from "../Model/GenerationInfo";

export default class GetPokemonsUseCase {
  constructor(private repository: GetPokemonsRepositoryInterface) {}

  public getAll(generation: Generation): Promise<Pokemon[]>
  {
    return this.repository.getByGeneration(generation)
      .catch((error) => Promise.reject(Exception.create(`Could not recover pokemons for generation ${generation}`, error)))
  }

  public getById(id: number): Promise<PokemonDetail>
  {
    return this.repository.getById(id)
      .catch((error) => Promise.reject(Exception.create(`Could not recover pokemon detail for id ${id}`, error)))
  }
}
