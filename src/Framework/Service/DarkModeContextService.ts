import { createContext } from 'react'

const DarkModeContextService = createContext<[boolean, (status: boolean) => void]>([false, () => {}])

export default DarkModeContextService
