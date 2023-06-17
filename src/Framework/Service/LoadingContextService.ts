import { createContext } from 'react'

const LoadingContextService = createContext<[boolean, (status: boolean) => void]>([false, () => {}])

export default LoadingContextService
