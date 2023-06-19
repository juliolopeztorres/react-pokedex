import React, { useContext, useEffect, useMemo, useState } from 'react'
import { hot } from "react-hot-loader/root";
import ucWords from "../../../Domain/Util/ucWords";
import logWithLevel, { Level } from "../../../Domain/Util/logWithLevel";
import LoadingContextService from "../../Service/LoadingContextService";
import Pokemon from "../../../Domain/Model/Pokemon";
import { default as PokemonDetailModel } from "../../../Domain/Model/PokemonDetail";
import ServiceContainerContextService from "../../Service/ServiceContainerContextService";
import GetPokemonsUseCase from "../../../Domain/UseCase/GetPokemonsUseCase";

type PokemonDetailCallback = {
  onPokemonArtClicked : () => void,
  onCloseClicked : () => void
}

const PokemonDetail: (props : { pokemon : Pokemon, callback: PokemonDetailCallback}) => React.ReactNode =
  ({ pokemon, callback  }) => {
    const [isLoading, setIsLoading] = useContext(LoadingContextService)
    const serviceContainer = useContext(ServiceContainerContextService)

    const getPokemonsUseCase = useMemo<GetPokemonsUseCase>(
      () => serviceContainer.getService('GetPokemonsUseCase'),
      []
    )

    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetailModel | null>(null)

    useEffect(() => {
      setIsLoading(true)

      getPokemonsUseCase.getById(pokemon.id)
        .then((pokemonData) => setPokemonDetail(pokemonData))
        .catch((error) => {
          logWithLevel(Level.ERROR, 'error getting pokemon from repository by id', { indentation: 2, context: error })
          setPokemonDetail(null)
        }).finally(() => setIsLoading(false))

    }, [pokemon])

    return <React.Fragment>
      {(!isLoading && pokemonDetail) &&
        <div className='flex flex-col'>
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
                " style={{ cursor: 'pointer' }} onClick={() => {
              setPokemonDetail(null)
              callback.onCloseClicked()
            }}>x</span>
          </div>
          <div className='self-center mb-4 flex flex-col' style={{ cursor: 'pointer' }}
               onClick={callback.onPokemonArtClicked}>
            <img src={pokemonDetail.image} alt="Pokemon image"
                 className='w-[10rem] md:w-[15rem] dark:text-gray-200 text-xs text-center'/>
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
            {pokemonDetail.backSprites.map((sprite) => <img key={sprite} src={sprite} className='w-[10rem]'
                                                            alt="Pokemon back sprite"/>)}
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
    </React.Fragment>
}

export default hot(PokemonDetail)
