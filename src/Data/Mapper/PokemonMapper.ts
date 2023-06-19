import { NamedAPIResource, Pokemon as PokemonApi } from "pokenode-ts";
import BaseStat from "../../Domain/Model/BaseStat";
import Pokemon from "../../Domain/Model/Pokemon";
import PokemonDetail from "../../Domain/Model/PokemonDetail";

const MapPokemon = (namedApiResponse : NamedAPIResource) : Pokemon => new Pokemon(
  parseInt(namedApiResponse.url.split('/').filter((token) => token.length).pop() as string),
  namedApiResponse.name
)

const MapPokemonDetail = (pokemon : PokemonApi) : PokemonDetail => new PokemonDetail(
  pokemon.id,
  pokemon.name,
  'https://img.pokemondb.net/artwork/vector/' + pokemon.name + '.png',
  // 'https://img.pokemondb.net/artwork/' + pokemon.name + '.jpg',
  pokemon.types.map((pokemonType) => pokemonType.type.name),
  [pokemon.sprites.back_default as string, pokemon.sprites.back_shiny as string],
  pokemon.stats.map((pokemonStat) => new BaseStat(pokemonStat.stat.name, pokemonStat.base_stat))
)

export { MapPokemon, MapPokemonDetail }
