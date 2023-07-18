import { createContext } from 'react'
import User from "../../Domain/Model/User";

const UserContextService = createContext<[User | null, (username: string, password: string) => Promise<boolean>, () => Promise<unknown>]>([null, () => Promise.resolve(false), () => Promise.resolve()])
// const UserContextService = createContext<[string | null, (email: string) => void]>(['', () => {}])

export default UserContextService
