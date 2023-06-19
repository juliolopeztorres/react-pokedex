import Pokemon from "../Model/Pokemon";
import PokemonDetail from "../Model/PokemonDetail";

export default interface GetPokemonsRepository {
  getByGeneration(generation: string): Promise<Pokemon[]>

  getById(id: number): Promise<PokemonDetail>
}
