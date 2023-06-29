import React, { useContext } from "react";
import { hot } from "react-hot-loader/root";
import { useHistory } from "react-router";
import DarkModeContextService from "../../Service/DarkModeContextService";
import Pokeball from "../../Asset/Image/pokeball.png"
import getRoute from "../../../Domain/Util/getRoute";

const NavBar = () => {
  const [darkMode, onDarkModeChanged] = useContext(DarkModeContextService)
  const history = useHistory()

  return <div className='sticky top-0 flex flex-row bg-orange-600 shadow-md mb-4 pl-2 py-5 dark:bg-orange-800 dark:shadow-gray-700' style={{cursor: 'pointer'}}>
    <div className="grow flex flex-row">
      <div className="w-10 self-center">
        <img data-test-id='logo' src={Pokeball} className='w-7 mx-auto text-white font-mono dark:text-gray-200 text-xs' alt="pokeball"
             onClick={() => {
               history.push(getRoute('home'));
             }}/>
      </div>
      <span className='text-white text-2xl font-mono ml-2'>Pokédex</span>
    </div>
    <div className='mr-2'>
      <label className="relative inline-flex items-center cursor-pointer align-middle">
        <input data-test-id='checkbox' type="checkbox" value="" className="sr-only peer" checked={darkMode} onChange={(e) => onDarkModeChanged!(e.target.checked)}/>
        <div className="w-11
            h-6
            bg-orange-200
            rounded-full
            peer
            peer-focus:outline-none
            peer-checked:after:translate-x-full
            peer-checked:after:border-white
            peer-checked:bg-orange-400
            after:content-['']
            after:absolute
            after:top-[2px]
            after:left-[2px]
            after:bg-orange-600
            after:rounded-full
            after:h-5 after:w-5 after:transition-all
            "/>
      </label>
    </div>
  </div>
}

export default hot(NavBar)
