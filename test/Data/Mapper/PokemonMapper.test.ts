import { MapPokemon, MapPokemonDetail } from "../../../src/Data/Mapper/PokemonMapper";
import Pokemon from "../../../src/Domain/Model/Pokemon";
import PokemonDetail from "../../../src/Domain/Model/PokemonDetail";
import BaseStat from "../../../src/Domain/Model/BaseStat";

it('should map Pokemon', () => {
  expect(
    [{name: 'bulbasaur', url: 'http://my-url.domain/my/path/1'}].map(MapPokemon)
  ).toStrictEqual([new Pokemon(1, 'bulbasaur')])
})

it('should map Pokemon detail', () => {
  expect(
    [{
      id: 1,
      name: 'bulbasaur',
      types: [{type: {name: 'plant'}}],
      sprites: {back_default: 'back_default', back_shiny: 'back_shiny'},
      stats: [{stat: {name: 'hola'}, base_stat: 10}]
    }].map(MapPokemonDetail)
  ).toStrictEqual([new PokemonDetail(
    1,
    'bulbasaur',
    'https://img.pokemondb.net/artwork/vector/bulbasaur.png',
    ['plant'],
    ['back_default', 'back_shiny'],
    [new BaseStat('hola', 10)]
  )])
})
