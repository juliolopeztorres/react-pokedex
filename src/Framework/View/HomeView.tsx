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
  id: number
  name: string
  image : string
  types : string[]
  backSprites : string[]
  baseStats : BaseStat[]

  constructor(
    id : number,
    name : string,
    image : string,
    types : string[],
    backSprites : string[],
    baseStats : BaseStat[]
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.types = types;
    this.backSprites = backSprites;
    this.baseStats = baseStats
  }
}

const generationsInfo: {[key:string]: {offset: number, limit: number}} = {
  '1st': {
    offset: 0,
    limit: 151
  },
  '2nd': {
    offset: 151,
    limit: 100
  },
  '3rd': {
    offset: 251,
    limit: 135
  },
  '4th': {
    offset: 386,
    limit: 107
  },
  '5th': {
    offset: 493,
    limit: 156
  },
  '6th': {
    offset: 649,
    limit: 72
  },
  '7th': {
    offset: 721,
    limit: 88
  },
  '8th': {
    offset: 809,
    limit: 96
  },
  '9th': {
    offset: 905,
    limit: 111
  },
}

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

const ucWords = (str : string) : string => str.charAt(0).toUpperCase() + str.slice(1)

const HomeView = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null)
  const [searchPokemonName, setSearchPokemonName] = useState<string>('')
  const [showLoading, setShowLoading] = useState<boolean>(false)
  const [currentGeneration, setCurrentGeneration] = useState<string>(Object.keys(generationsInfo)[0])
  const [showPokemonAltArt, setShowPokemonAltArt] = useState<boolean>(false)

  useEffect(() => {
    const localStorageKey = `pokemon-${currentGeneration}`
    const generationInfo = generationsInfo[currentGeneration]
    const pokemonsSaved : string | null = localStorage.getItem(localStorageKey)

    if (null === pokemonsSaved) {
      setShowLoading(true)
      pokemonClient.listPokemons(generationInfo.offset, generationInfo.limit)
        .then((response) => {
          const pokemons = response.results.map(MapPokemon)
          localStorage.setItem(localStorageKey, JSON.stringify(pokemons))
          setShowLoading(false)
          setPokemons(pokemons)
        })
        .catch((error) => console.error('Error:' + error))

      return
    }

    setPokemons(JSON.parse(pokemonsSaved))
  }, [currentGeneration]);

  const onPokemonClicked = (pokemon : Pokemon) => {
    setShowLoading(true)

    pokemonClient.getPokemonById(pokemon.id)
      .then((pokemonData) => {
        setShowLoading(false)
        setPokemonDetail(MapPokemonDetail(pokemonData))
      })
  }

  const onSearchPokemonChanged = (name : string) => {
    const cleanedName = name.trim()

    setSearchPokemonName(cleanedName)
  }

  const onGenerationChanged = (generation: string) => {
    setSearchPokemonName('')
    setPokemonDetail(null)
    setCurrentGeneration(generation)
  }

  const onPokemonArtClicked = (show: boolean) => {
    setShowPokemonAltArt(show)
  }

  return <React.Fragment>
    {(pokemonDetail && showPokemonAltArt) &&
    <div className="z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 dark:bg-gray-700 bg-opacity-75 dark:bg-opacity-90 transition-opacity"/>
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={() => onPokemonArtClicked(false)}>
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              className="relative transform overflow-hidden rounded-lg bg-white p-4">
              <img src={'https://img.pokemondb.net/artwork/' + pokemonDetail.name + '.jpg'} alt="Pokemon image"/>
              <span className="italic text-gray-400 text-xs text-center mt-2">.jpg art with white background</span>
            </div>
          </div>
        </div>
      </div>}
    <div className='pl-2 mb-4 flex flex-row'>
      <div className='basis-3/4'>
        <input type="search"
               className='
             w-[12rem]
             md:w-[20rem]
             pl-2
             py-1
             md:pl-6
             truncate
             focus:shadow-md dark:shadow-gray-700
             border
             border-red-200
             rounded-lg hover:border-red-400 focus:outline-none
             placeholder:text-red-200
             text-red-400
             dark:bg-slate-600
             dark:placeholder:text-gray-200
             dark:text-gray-200
             dark:border-red-400
             '
               placeholder={'Start typing a Pokémon name...'} value={searchPokemonName}
               onChange={(e) => {
                 onSearchPokemonChanged(e.target.value)
               }}/>
        {searchPokemonName.length !== 0 && <span
          className='w-5 h-5 absolute ml-[-1.25rem] mt-[0.25rem] text-orange-500 font-mono dark:text-gray-200'
          style={{cursor: 'pointer'}}
          onClick={() => onSearchPokemonChanged('')}
        >x</span>}
      </div>
      <div className="basis-1/4 flex flex-row place-content-end pr-2">
        <label htmlFor="pokemon-gen" className="
        self-center mr-1
        text-sm font-mono text-slate-800 dark:text-gray-200
        before:md:content-['Pokémon\00a0gen.'] before:content-['Gen.']
        "/>
        <select id='pokemon-gen' className="
        text-end
        px-2
      bg-white
      border border-red-200 text-red-400 text-sm rounded-lg focus:outline-none
      hover:border-red-400
      dark:bg-slate-600 dark:border-red-400
      dark:text-gray-200
      " onChange={(e) => onGenerationChanged(e.target.value)}>
          {Object.keys(generationsInfo).map((key) => <option key={key} value={key}>{key}</option>)}
        </select>
      </div>
    </div>
    <div className='mb-4 flex md:flex-row flex-col-reverse md:max-h-[40rem]'>
        <div className='mx-2 basis-2/3 p-4 border rounded-md border-orange-400 shadow dark:shadow-gray-700' style={{ overflowY: 'scroll' }}>
          <ul className='
        columns-2
        md:columns-3
        lg:columns-4
        xl:columns-5
        font-mono
        text-xs
        md:text-sm
        '>
            {pokemons.filter((pokemon) => pokemon.name.includes(searchPokemonName.toLowerCase())).map((pokemon) =>
              <li
                className='
            text-slate-800
            dark:text-gray-200
            hover:shadow dark:shadow-gray-700
            hover:bg-orange-100 dark:hover:bg-orange-700
            hover:rounded-lg
            '
                key={pokemon.id}
                style={{ cursor: 'pointer' }}
                onClick={() => onPokemonClicked(pokemon)}>
                <span className="text-orange-600 dark:text-red-400">{String(pokemon.id).length === 1 ?
                  <>&nbsp;&nbsp;</> :
                  String(pokemon.id).length === 2 ? <>&nbsp;</> : ''
                }{pokemon.id}.</span> {ucWords(pokemon.name)}
              </li>)}
          </ul>
        </div>

        {showLoading && <div className='basis-1/3 self-center text-center mb-4'>
          <svg aria-hidden="true"
               className="inline w-20 h-20 text-orange-200 animate-spin dark:text-gray-600 fill-orange-600"
               viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"/>
          </svg>
        </div>}

        {(!showLoading && pokemonDetail) &&
          <div className='basis-1/3 flex flex-col mx-2 mb-4 md:mb-0'>
            <div className="flex flex-row mb-4">
              <span className="
              w-full text-xl lg:text-2xl text-red-600 dark:text-red-400
              text-center font-mono
              underline decoration-dashed underline-offset-8
              ">
                #{pokemonDetail.id} {ucWords(pokemonDetail.name)}
              </span>
                <span className="
                w-5 h-6
                text-orange-600 dark:text-orange-100
                text-center
                rounded bg-orange-100 dark:bg-orange-700
                font-mono
                " style={{cursor: 'pointer'}} onClick={() => {
                  setPokemonDetail(null)
                }}>x</span>
            </div>
            <div className='self-center mb-4 flex flex-col' style={{cursor: 'pointer'}} onClick={() => onPokemonArtClicked(true)}>
              <img src={pokemonDetail.image} alt="Pokemon image" className='w-[10rem] md:w-[15rem] dark:text-gray-200 text-xs text-center'/>
              <span className="italic text-gray-400 text-xs text-center mt-2">Click to show alternative art</span>
            </div>
            <div className='flex flex-row self-center mb-4'>
              {pokemonDetail.types.map((type) => <div
                key={type}
                className='
                bg-orange-100 border border-orange-400 dark:bg-orange-700
                w-fit px-2 py-1 mr-1 dark:text-gray-200
                last:mr-0 rounded-md hover:bg-orange-300 dark:hover:bg-orange-500
                '
                style={{ cursor: 'pointer' }}>{type}</div>)}
            </div>
            <div className='self-center flex flex-row mb-4'>
              {pokemonDetail.backSprites.map((sprite) => <img key={sprite} src={sprite} className='w-[10rem]' alt="Pokemon back sprite"/>)}
            </div>
            <div className='
            w-100 border rounded border-orange-400
            bg-orange-100 dark:bg-orange-700
            text-xs md:text-sm dark:text-gray-200
            '>
              <ul className='px-5 py-2 columns-2'>
                {pokemonDetail.baseStats.map((baseStat) => <li key={baseStat.name} className='mb-1 last:mb-0'>
                  <span className="text-orange-600 dark:text-red-200">{ucWords(baseStat.name)}</span>: {baseStat.value}
                </li>)}
              </ul>
            </div>
          </div>}
      </div>
  </React.Fragment>
};

export default hot(HomeView);