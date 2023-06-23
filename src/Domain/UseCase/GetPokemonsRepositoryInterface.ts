import Pokemon from "../Model/Pokemon";
import PokemonDetail from "../Model/PokemonDetail";
import { Generation } from "../Model/GenerationInfo";

export default interface GetPokemonsRepositoryInterface {
  getByGeneration(generation: Generation): Promise<Pokemon[]>

  getById(id: number): Promise<PokemonDetail>
}
