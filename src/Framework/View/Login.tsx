import React, {
  FormEvent,
  MutableRefObject, ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState
} from 'react'
import { hot } from "react-hot-loader/root";
import logWithLevel, { Level } from "../../Domain/Util/logWithLevel";
import UserContextService from "../Service/UserContextService";
import { Link } from "react-router-dom";
import getRoute from "../../Domain/Util/getRoute";
import User from "../../Domain/Model/User";
import LoadingContainer from "./Component/LoadingContainer";
import LoadingContextService from "../Service/LoadingContextService";

// import webClient from "../../Data/Service/WebClient";
//
// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODk2MDI5NzAsImV4cCI6MTY4OTYwMjk4MCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlckBlbWFpbC5lcyJ9.jzr31v6Lv-xvSikxwedsNSCUWZhKFp-rzXbN3TNaMSwA7Piemuv8-1qrJscGNJnD09vu64MMmfKdyEbDhi2NkctImU6yKx4lxcA7ZvKQ9wpGMp_Z_nqPUQNkS-OAXkG3pWgIZAf-RMvdi-YTQ-KQ66LDzLrJtl7_OS_LLqP4qgtLNIG2WoFtqPmFn79WGFlbQXYCzWl_g2rcPmysdhuyLso_Jn_nXlAktHB26KZDjswgBrU3HMFS1Uq8V-tcafd1vKEnJU-luqt6hge0T4yPrvhXs9XfTz478sL1br2XDtzZ4rBlXWS4k1TVzU-m_9y_sKSBjseWkqSADkvdeKfKMA'
//
// webClient.get('/user/data', {headers: {
//     'Authorization': `Bearer ${token}`
//   }}).then(console.log).catch(console.error)

const Login = () => {
  const [isLoading, setIsLoading] = useContext(LoadingContextService)
  const [user, login] = useContext(UserContextService)

  const [error, setError] = useState<boolean>(false)

  const myForm: MutableRefObject<HTMLFormElement | null> = useRef(null);

  // Concept function
  // const onFormSubmitted: (e: FormEvent) => void = useCallback((e) => {
  //     e.preventDefault()
  //     const target = e.target as unknown as {email: {value: string}, password: {value: string}}
  //
  //     const email = target.email.value
  //     const password = target.password.value
  //
  //     if (email !== 'asdf@asdf.es' || password !== 'asdf') {
  //       setError(true)
  //       return
  //     }
  //
  //     setError(false)
  //     logWithLevel(Level.DEBUG, 'logging in')
  //     setEmail(email)
  //   },
  //   []
  // )

  const onFormSubmitted: (e: FormEvent) => void = useCallback((e) => {
      console.log('hey yo')
      e.preventDefault()
      e.stopPropagation()
      setIsLoading(true)

      setError(false)
      const target = e.target as unknown as {email: {value: string}, password: {value: string}}

      const email = target.email.value
      const password = target.password.value

      login(email, password).then((successfully) => {
        if (!successfully) {
          setError(true)
        }
      }).finally(() => setIsLoading(false))

      // fetch(
      //   `${process.env.BASE_URL}/login`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({username: email, password: password}),
      //     headers: {"Content-Type": 'application/json'}}
      // ).then(
      //   async (data) => Promise.resolve({statusCode: data.status, body: await data.json()})
      // ).then(
      //   (data) => {
      //     if (data.statusCode !== 200) {
      //       throw new Error(data.body.message)
      //     }
      //
      //     logWithLevel(Level.DEBUG, `logging in with token ${data.body.token}`)
      //     setUser(new User(email, data.body.token))
      //   }
      // ).catch(
      //   (err) => {
      //     setError(true)
      //     logWithLevel(Level.ERROR, err)
      //   }
      // )
    },
    []
  )

  return <div className='p-4 flex flex-col'>
    <div className='flex flex-col mb-4'>
      <span className='text-xl text-orange-600 dark:text-orange-300 mb-1'>Login</span>
      <span className="text-gray-600 dark:text-gray-200 text-sm">
          {user === null ? <span>Please, fill in your log in detail</span> :
            (<React.Fragment>
            <div className='text-gray-600 dark:text-gray-200 text-sm mt-2'>
              Welcome back, {user.email}
              <Link to={getRoute('secured')} className="
            ml-2 skew-y-3 inline-block p-1
            bg-orange-100 hover:bg-orange-200
            text-orange-600
            dark:bg-orange-700 dark:hover:bg-orange-600 dark:text-orange-200
            " style={{cursor: 'pointer'}}>
                <div className="-skew-y-3">Take me to secured section</div>
              </Link>
            </div>
          </React.Fragment>)}
      </span>
    </div>
    {!isLoading && user === null && (<div className='w-full md:w-[25rem] self-center'>
      <form onSubmit={onFormSubmitted} ref={myForm}>
        <div className="relative z-0 w-full mb-6">
          <input type="email" id="email"
                 className="
                 block py-2.5 w-full text-sm text-orange-600 bg-transparent border-0
                 border-b-2 border-orange-400 appearance-none
                 dark:text-orange-300
                 focus:outline-none focus:ring-0 peer"
                 placeholder=" " required/>
          <label htmlFor="email"
                 className="
                 absolute text-sm text-orange-600 peer-focus:-translate-y-5
                 duration-300 transform -translate-y-5 scale-75 top-3 -z-10
                 origin-[0]
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                 dark:text-orange-300
                 ">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-6">
          <input type="password" id="password"
                 className="
                 block py-2.5 w-full text-sm text-orange-600 bg-transparent border-0
                 border-b-2 border-orange-400 appearance-none
                 dark:text-orange-300
                 focus:outline-none focus:ring-0 peer"
                 placeholder=" " required/>
          <label htmlFor="password"
                 className="
                 absolute text-sm text-orange-600 peer-focus:-translate-y-5
                 duration-300 transform -translate-y-5 scale-75 top-3 -z-10
                 origin-[0]
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                 dark:text-orange-300
                 ">Password</label>
        </div>
        {error && (<div className='flex flex-row justify-end mb-2'>
          <p className="text-sm text-red-600 dark:text-red-500">Oops! Error during communication!</p>
        </div>)}
        <div className='flex flex-row justify-end'>
          <div className="
            skew-y-3 p-2
            bg-orange-100 hover:bg-orange-200
            text-orange-600
            dark:bg-orange-700 dark:hover:bg-orange-600 dark:text-orange-200
          " style={{cursor: 'pointer'}} onClick={() => {
              myForm.current!.dispatchEvent(
                new Event("submit", {bubbles: true, cancelable: true})
              )
            }}>
            <button type="button" className="-skew-y-3">Submit</button>
          </div>
        </div>
      </form>
    </div>)}
  </div>
}

export default hot(Login)
