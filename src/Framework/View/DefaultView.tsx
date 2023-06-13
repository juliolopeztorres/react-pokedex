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
  const [searchingPokemon, setSearchingPokemon] = useState<boolean>(false)

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
    const cleanedName = name.trim()

    setSearchingPokemon(cleanedName.length !== 0)
    setSearchPokemonName(cleanedName)
  }

  return <React.Fragment>
    <h1 className={'text-red-600 text-3xl mb-4 pl-2 font-mono'}>Pokédex</h1>
    <div className={'pl-2 mb-4'}>
      <input type="search"
             className='
             py-1
             pl-6
             pr-4
             focus:shadow-md
             border
             border-red-200
             rounded-lg hover:border-red-400 focus:outline-none
             placeholder:text-red-200
             text-red-400
             '
             placeholder={'Start typing a Pokémon name...'} size={22} value={searchPokemonName}
             onChange={(e) => {
               onSearchPokemonChanged(e.target.value)
             }}/>
      {searchingPokemon && <span
        className='w-5 h-5 absolute ml-[-1.25rem] mt-[0.25rem] text-orange-500 font-mono'
        style={{cursor: 'pointer'}}
        onClick={() => onSearchPokemonChanged('')}
      >x</span>}
    </div>
    <div className='flex md:flex-row flex-col-reverse max-h-screen'>
      <div className='mx-2 basis-2/3 p-4 border rounded-md border-orange-400 shadow' style={{ overflowY: 'scroll' }}>
        <ul className='
        list-decimal
        list-inside
        marker:text-orange-600
        columns-2
        md:columns-3
        lg:columns-4
        xl:columns-5
        '>
          {pokemons.filter((pokemon) => pokemon.name.includes(searchPokemonName.toLowerCase())).map((pokemon) =>
            <li
            className='
            text-slate-800
            hover:shadow
            hover:bg-orange-100
            hover:rounded-lg
            '
            key={pokemon.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onPokemonClicked(pokemon)}>{ucWords(pokemon.name)}
          </li>)}
        </ul>
      </div>
      {(pokemonDetail) &&
        <div className='basis-1/3 flex flex-col mx-2 mb-2 md:mb-0'>
          <span className="self-end text-orange-600 bg-orange-100 rounded w-5 h-6 text-center font-mono" style={{cursor: 'pointer'}} onClick={() => {
            setPokemonDetail(null)
          }}>x</span>
          <div className='self-center mb-4'>
            <img src={pokemonDetail.image} alt="Pokemon image" className='w-[10rem] md:w-[15rem]'/>
          </div>
          <div className='flex flex-row self-center mb-4'>
            {pokemonDetail.types.map((type) => <div
              className='bg-orange-100 border border-orange-400 w-fit px-2 py-1 mr-1 last:mr-0 rounded-md hover:bg-orange-300'
              style={{ cursor: 'pointer' }}>{type}</div>)}
          </div>
          <div className='self-center flex flex-row mb-4'>
            {pokemonDetail.backSprites.map((sprite) => <img src={sprite} className='w-[10rem]' alt="Pokemon back sprite"/>)}
          </div>
          <div className='w-100 border rounded border-orange-400 bg-orange-100 text-sm'>
            <ul className='px-5 py-2 columns-2'>
              {pokemonDetail.baseStats.map((baseStat) => <li className='mb-1 last:mb-0'>{ucWords(baseStat.name)}: {baseStat.value}</li>)}
            </ul>
          </div>
        </div>}
    </div>
  </React.Fragment>
};

export default hot(DefaultView);
