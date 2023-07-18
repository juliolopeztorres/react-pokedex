import axios, { AxiosInstance, AxiosResponse } from "axios";
import User from "../../Domain/Model/User";

const StatusCodes = axios.HttpStatusCode

// const webClient = axios.create({
//   baseURL: process.env.BASE_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// webClient.interceptors.response.use(null, (error) => {
//   if (error.response.status === StatusCodes.Unauthorized) {
//     if (unauthorizedCallback) {
//       unauthorizedCallback()
//
//       return
//     }
//
//     console.log('se debería redireccionar')
//
//     return
//   }
//
//   return Promise.reject(error)
// })



export default class WebClient {
  private readonly actualClient: AxiosInstance
  private callbackId: number | null = null

  constructor(baseUrl: string) {
    this.actualClient = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public login(username: string, password: string): Promise<AxiosResponse> {
      return this.actualClient.post('/login', {username, password})
  }

  public userData(user: User): Promise<AxiosResponse> {
    return this.actualClient.get('/user/data', {
      headers: {'Authorization': `Bearer ${user.token}`}
    })
  }

  public setOnUnauthorizedResponseCallback(callback: () => void): void {
    if (this.callbackId) {
      this.actualClient.interceptors.response.eject(this.callbackId)
    }

    this.callbackId = this.actualClient.interceptors.response.use(
      null,
      (error) => {
        if (error.response.status === StatusCodes.Unauthorized) {
          console.log('se debería redireccionar')
          callback()

          return
        }

        return Promise.reject(error)
      }
    )
  }
}
