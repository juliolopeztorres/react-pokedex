import Exception from "../Model/Exception";
import GetPokemonsRepository from "./GetPokemonsRepository";
import Service from "../Service";
import Pokemon from "../Model/Pokemon";
import PokemonDetail from "../Model/PokemonDetail";

export default class GetPokemonsUseCase implements Service {
  constructor(private repository: GetPokemonsRepository) {}

  public getAll(generation: string): Promise<Pokemon[]>
  {
    return this.repository.getByGeneration(generation)
      .catch((error) => Promise.reject(Exception.create(`Could not recover pokemons for generation ${generation}`, error)))
  }

  public getById(id: number): Promise<PokemonDetail>
  {
    return this.repository.getById(id)
      .catch((error) => Promise.reject(Exception.create(`Could not recover pokemon detail for id ${id}`, error)))
  }

  getName() : string {
    return 'GetPokemonsUseCase';
  }
}
