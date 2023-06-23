import React from 'react'
import { hot } from "react-hot-loader/root";

const PokemonModal: (props: {name: string, onPokemonArtClicked: () => void}) => React.ReactNode = ({name, onPokemonArtClicked}) => {

  return <div className="z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500 dark:bg-gray-700 bg-opacity-75 dark:bg-opacity-90 transition-opacity"/>
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center text-center p-4 sm:p-0">
        <div className="rounded-lg bg-white">
          <div className="text-end mt-1">
            <span data-test-id='closeBtn' className='text-black text-xl font-mono hover:text-orange-600 mr-3' style={{cursor: 'pointer'}} onClick={() => onPokemonArtClicked()}>x</span>
          </div>
          <img className='px-4 pb-2' src={'https://img.pokemondb.net/artwork/' + name + '.jpg'} alt="Pokemon image"/>
          <p className="italic text-gray-400 text-xs text-center mb-2">.jpg art with white background</p>
        </div>
      </div>
    </div>
  </div>
}

export default hot(PokemonModal)
