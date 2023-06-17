import React, { useState } from 'react'
import { hot } from "react-hot-loader/root";
import DarkModeContextService from "../../Service/DarkModeContextService";

const DarkModeContainer: (props: {children: React.ReactNode}) => React.ReactElement = ({children}) => {
  const [darkMode, setDarkMode] = useState<boolean>('true' === localStorage.getItem('darkMode'))

  const onDarkModeChanged = (status : boolean) => {
    setDarkMode(status)
    localStorage.setItem('darkMode', status.toString())
  }

  return <div className={`${darkMode ? 'dark' : ''}`}>
    <div className="antialiased transition-colors duration-500 ease-in-out flex flex-col min-h-screen dark:bg-slate-800 dark:text-gray-200">
      <DarkModeContextService.Provider value={[darkMode, onDarkModeChanged]}>
        {children}
      </DarkModeContextService.Provider>
    </div>
  </div>
}

export default hot(DarkModeContainer)
