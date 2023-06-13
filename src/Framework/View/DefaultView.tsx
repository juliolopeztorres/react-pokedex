import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import { NamedAPIResource, Pokemon as PokemonApi, PokemonClient } from "pokenode-ts";

const pokemonClient = new PokemonClient()

class Pokemon {
  id : number
  name : string

  constructor(id : number, name : string) {
    this.id = id;
    this.name = name;
  }
}

class BaseStat {
  name : string
  value : number

  constructor(name : string, value : number) {
    this.name = name;
    this.value = value;
  }
}

class PokemonDetail {
  image : string
  types : string[]
  backSprites : string[]
  baseStats : BaseStat[]

  constructor(image : string, types : string[], backSprites : string[], baseStats : BaseStat[]) {
    this.image = image;
    this.types = types;
    this.backSprites = backSprites;
    this.baseStats = baseStats
  }
}

const MapPokemon = (namedApiResponse : NamedAPIResource) : Pokemon => new Pokemon(
  parseInt(namedApiResponse.url.split('/').filter((token) => token.length).pop() as string),
  namedApiResponse.name
)

const MapPokemonDetail = (pokemon : PokemonApi) : PokemonDetail => new PokemonDetail(
  'https://img.pokemondb.net/artwork/' + pokemon.name + '.jpg',
  pokemon.types.map((pokemonType) => pokemonType.type.name),
  [pokemon.sprites.back_default as string, pokemon.sprites.back_shiny as string],
  pokemon.stats.map((pokemonStat) => new BaseStat(pokemonStat.stat.name, pokemonStat.base_stat))
)

const ucWords = (str : string) : string => str.charAt(0).toUpperCase() + str.slice(1)

const DefaultView = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null)
  const [searchPokemonName, setSearchPokemonName] = useState<string>('')

  useEffect(() => {
    const pokemonsSaved : string | null = localStorage.getItem('pokemons')

    if (null === pokemonsSaved) {
      pokemonClient.listPokemons(0, 151)
        .then((response) => {
          const pokemons = response.results.map(MapPokemon)
          localStorage.setItem('pokemons', JSON.stringify(pokemons))

          setPokemons(pokemons)
        })
        .catch((error) => console.error('Error:' + error))

      return
    }

    setPokemons(JSON.parse(pokemonsSaved))
  }, []);

  const onPokemonClicked = (pokemon : Pokemon) => {
    console.log('Pokemon clicked', pokemon)

    pokemonClient.getPokemonById(pokemon.id)
      .then((pokemonData) => {
        console.log('pokemon data', pokemonData)

        setPokemonDetail(MapPokemonDetail(pokemonData))
      })
  }

  const onSearchPokemonChanged = (name : string) => {
    setSearchPokemonName(name.trim())
  }

  return <React.Fragment>
    <h1>Pokédex</h1>
    <div style={{ marginBottom: '1.25rem', backgroundColor: 'yellow' }}>
      <input type="search" placeholder={'Start typing a Pokémon name...'} size={22} value={searchPokemonName}
             onChange={(e) => {
               onSearchPokemonChanged(e.target.value)
             }}/>
    </div>
    <div style={{ display: 'flex', height: '50rem' }}>
      <div style={{ width: '50%', overflowY: 'scroll', backgroundColor: 'aqua' }}>
        <ol>
          {pokemons.filter((pokemon) => pokemon.name.includes(searchPokemonName)).map((pokemon) => <li
            key={pokemon.id} style={{ cursor: 'pointer' }}
            onClick={() => onPokemonClicked(pokemon)}>{ucWords(pokemon.name)}</li>)}
        </ol>
      </div>
      {(pokemonDetail) &&
        <div style={{ width: '50%', backgroundColor: 'beige', display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: 'red', alignSelf: 'center', marginBottom: '1.25rem' }}>
            <img src={pokemonDetail.image} alt="Pokemon image" width={'200rem'} height={'200rem'}/>
          </div>
          <div style={{
            backgroundColor: 'green',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '1.25rem'
          }}>
            {pokemonDetail.types.map((type) => <div style={{
              cursor: 'pointer',
              backgroundColor: 'aliceblue',
              borderRadius: '5px',
              width: 'fit-content',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              marginRight: '0.5rem'
            }}>{type}</div>)}
          </div>
          <div style={{ backgroundColor: 'blue', alignSelf: 'center', display: 'flex', flexDirection: 'row' }}>
            {pokemonDetail.backSprites.map((sprite) => <img src={sprite} alt="Pokemon back sprite"/>)}
          </div>
          <div style={{ backgroundColor: 'lightpink', alignSelf: 'center' }}>
            <ul style={{ columns: 2, paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
              {pokemonDetail.baseStats.map((baseStat) => <li>{ucWords(baseStat.name)}: {baseStat.value}</li>)}
            </ul>
          </div>
        </div>}
    </div>
  </React.Fragment>
};

export default hot(DefaultView);
