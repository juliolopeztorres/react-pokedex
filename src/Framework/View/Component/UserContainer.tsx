import React, { useCallback, useState } from 'react'
import { hot } from "react-hot-loader/root";
import UserContextService from "../../Service/UserContextService";
import User from "../../../Domain/Model/User";
import { useHistory } from "react-router";
import WebClient from "../../../Data/Service/WebClient";
import getRoute from "../../../Domain/Util/getRoute";
import logWithLevel, { Level } from "../../../Domain/Util/logWithLevel";

const webClient = new WebClient(process.env.BASE_URL!)

const UserContainer: (props: {children: React.ReactNode}) => React.ReactElement = ({children}) => {
  const [user, setUser] = useState<User | null>(null)
  const history = useHistory()
  // const [email, setEmail] = useState<string | null>(null)

  console.log('render el user container')

  webClient.setOnUnauthorizedResponseCallback(() => {
    setUser(null)
    history.push(getRoute('login'))
  })

  // const onUserChanged = useCallback((user: User) => setUser(user), [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await webClient.login(username, password)

      let user = new User(username, response.data.token)

      const detailResponse = await webClient.userData(user)

      user.setDetail(detailResponse.data)

      setUser(user)

      return true
    } catch (error) {
      logWithLevel(Level.ERROR, `Error al hacer login ${error}`)
      setUser(null)

      return false
    }
  }

  const userData = async (): Promise<unknown> => {
    if (null === user) {
      return
    }

    try {
      const response = await webClient.userData(user)

      return response.data
    } catch (error) {
      logWithLevel(Level.ERROR, `Error al recuperar datos usuario ${error}`)

      return
    }
  }

  return <UserContextService.Provider value={[user, login, userData]}>
    {children}
  </UserContextService.Provider>
}

export default hot(UserContainer)
