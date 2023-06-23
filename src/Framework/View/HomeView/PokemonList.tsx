import React, { useContext, useEffect, useMemo, useState } from 'react'
import { hot } from "react-hot-loader/root";
import logWithLevel, { Level } from "../../../Domain/Util/logWithLevel";
import ucWords from "../../../Domain/Util/ucWords";
import LoadingContextService from "../../Service/LoadingContextService";
import ServiceContainerContextService from "../../Service/ServiceContainerContextService";
import GetPokemonsUseCase from "../../../Domain/UseCase/GetPokemonsUseCase";
import Pokemon from "../../../Domain/Model/Pokemon";
import { Generation } from "../../../Domain/Model/GenerationInfo";

const PokemonList: (props: {
  searchPokemonName: string,
  onPokemonClicked: (pokemon: Pokemon) => void,
  generation: Generation,
}) => React.ReactNode =
  ({
     searchPokemonName,
     onPokemonClicked,
     generation,
  }) => {
    const [isLoading, setIsLoading] = useContext(LoadingContextService)
    const serviceContainer = useContext(ServiceContainerContextService)

    const getPokemonsUseCase = useMemo<GetPokemonsUseCase>(
      () => serviceContainer.getService('GetPokemonsUseCase'),
      []
    )

    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    useEffect(() => {
      setIsLoading(true)

      getPokemonsUseCase
        .getAll(generation)
        .then((pokemons) => {
          setPokemons(pokemons)
        })
        .catch((error) => {
          logWithLevel(Level.ERROR, 'error getting pokemons from repository', { indentation: 2, context: error })
          setPokemons([])
        }).finally(() => setIsLoading(false))

    }, [generation]);

    return !isLoading && <ul data-test-id='list' className='
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
