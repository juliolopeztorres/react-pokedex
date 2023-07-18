import React, { useCallback, useContext, useState } from "react";
import { hot } from "react-hot-loader/root";
import PokemonList from "./PokemonList";
import PokemonModal from "./PokemonModal";
import PokemonDetail from "./PokemonDetail";
import LoadingContainer from "../Component/LoadingContainer";
import Pokemon from "../../../Domain/Model/Pokemon";
import { Generation, generationLabels } from "../../../Domain/Model/GenerationInfo";
import { Link } from "react-router-dom";
import getRoute from "../../../Domain/Util/getRoute";
import UserContextService from "../../Service/UserContextService";

const HomeView = () => {
  const [email, setEmail] = useContext(UserContextService)

  const [currentGeneration, setCurrentGeneration] = useState<Generation>(generationLabels[0])
  const [searchPokemonName, setSearchPokemonName] = useState<string>('')
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [showPokemonAltArt, setShowPokemonAltArt] = useState<boolean>(false)

  const onSearchPokemonChanged = useCallback(
    (name : string) => setSearchPokemonName(name.trim()),
    []
  )

  const onGenerationChanged = useCallback((generation: Generation) => {
      setSearchPokemonName('')
      setPokemon(null)
      setCurrentGeneration(generation)
    }, 
    [])

  return <React.Fragment>
    {(pokemon && showPokemonAltArt) && <PokemonModal name={pokemon.name} onPokemonArtClicked={() => setShowPokemonAltArt(false)}/>}
    {email === null && (<div className="pl-2 mb-4 text-sm">
      Want to log in?
      <Link to={getRoute('login')} className="
    ml-2 skew-y-3 inline-block p-1
    bg-orange-100 hover:bg-orange-200
    text-orange-600
    dark:bg-orange-700 dark:hover:bg-orange-600 dark:text-orange-200
    " style={{cursor: 'pointer'}}>
        <div className="-skew-y-3">Click here</div>
      </Link>
    </div>)}
    <div className='pl-2 mb-4 flex flex-row'>
      <div className='basis-3/4'>
        <div className="flex flex-row">
          <input
            data-test-id='search'
            type="search"
             className='
               appearance-none
               pr-6
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
            data-test-id='clearSearchPokemonName'
            className='text-orange-500 font-mono dark:text-gray-200 ml-[-1.25rem] self-center'
            style={{cursor: 'pointer'}}
            onClick={() => onSearchPokemonChanged('')}
          >x</span>}
        </div>
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
      " onChange={(e) => onGenerationChanged(e.target.value as Generation)}>
          {generationLabels.map((generationLabel) => <option key={generationLabel} value={generationLabel}>{generationLabel}</option>)}
        </select>
      </div>
    </div>
    <div className='mb-4 flex md:flex-row flex-col-reverse md:max-h-[40rem]'>
      <div className='basis-2/3 mx-2 p-4 border rounded-md border-orange-400 shadow dark:shadow-gray-700 overflow-y-scroll'>
        <LoadingContainer>
          <PokemonList
            searchPokemonName={searchPokemonName}
            onPokemonClicked={(pokemon : Pokemon) => setPokemon(pokemon)}
            generation={currentGeneration}
          />
        </LoadingContainer>
      </div>

      {pokemon && <div className='basis-1/3 mb-4 md:mb-0 mx-2'>
        <LoadingContainer>
          <PokemonDetail pokemon={pokemon} callback={{
            onPokemonArtClicked: () => setShowPokemonAltArt(true),
            onCloseClicked: () => setPokemon(null)
          }}/>
        </LoadingContainer>
      </div>}
    </div>
  </React.Fragment>
};

export default hot(HomeView);
