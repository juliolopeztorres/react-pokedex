import React, { useContext, useEffect, useState } from 'react'
import { hot } from "react-hot-loader/root";
import { NamedAPIResource, PokemonClient } from "pokenode-ts";
import logWithLevel, { Level } from "../../../Domain/Util/logWithLevel";
import ucWords from "../../../Domain/Util/ucWords";
import LoadingContextService from "../../Service/LoadingContextService";

const pokemonClient = new PokemonClient()

const MapPokemon = (namedApiResponse : NamedAPIResource) : Pokemon => new Pokemon(
  parseInt(namedApiResponse.url.split('/').filter((token) => token.length).pop() as string),
  namedApiResponse.name
)

export class Pokemon {
  id : number
  name : string

  constructor(id : number, name : string) {
    this.id = id;
    this.name = name;
  }
}

const PokemonList: (props: {
  searchPokemonName: string,
  onPokemonClicked: (pokemon: Pokemon) => void,
  generation: string,
  generationInfo: {
    offset: number,
    limit: number
  },
}) => React.ReactNode =
  ({
     searchPokemonName,
     onPokemonClicked,
     generation,
     generationInfo
  }) => {
    const [isLoading, setIsLoading] = useContext(LoadingContextService)
    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    useEffect(() => {
      setIsLoading(true)

      const localStorageKey = `pokemon-${generation}`
      const pokemonsSaved : string | null = localStorage.getItem(localStorageKey)

      if (null === pokemonsSaved) {
        pokemonClient.listPokemons(generationInfo.offset, generationInfo.limit)
          .then((response) => {
            const pokemons = response.results.map(MapPokemon)
            localStorage.setItem(localStorageKey, JSON.stringify(pokemons))

            setIsLoading(false)
            setPokemons(pokemons)
          })
          .catch((error) => logWithLevel(Level.ERROR, 'Error API', {indentation: 2, context: error}))

        return
      }

      setPokemons(JSON.parse(pokemonsSaved))

      setIsLoading(false)
    }, [generation]);

    return !isLoading && <ul className='
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
  }

export default hot(PokemonList)
