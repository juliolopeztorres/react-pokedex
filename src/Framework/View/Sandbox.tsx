import React, { useCallback, useContext, useEffect } from 'react'
import { hot } from "react-hot-loader/root";
import { useHistory } from "react-router";
import UserContextService from "../Service/UserContextService";
import getRoute from "../../Domain/Util/getRoute";

// const Content = () => {
//   const [isLoading, setIsLoading] = useContext(LoadingContextService)
//
//   useEffect(() => {
//     setIsLoading(true)
//   }, [])
//
//   return !isLoading && <div className='bg-red-200 text-center text-black'>
//     <span>content 1</span>
//   </div>
// }
//
// const Sandbox = () => {
//   const params = useParams<{parameter: string} | null>()
//
//   logWithLevel(Level.INFO, window.location.search)
//   logWithLevel(Level.INFO, params ? JSON.stringify(params): 'null', {indentation: 2})
//
//
//   return <React.Fragment>
//     {/*</div>*/}
//     {/* Texto de prueba para ver alineación por bloques*/}
//     {/*<div>*/}
//     {/*  <p>*/}
//     {/*  When controlling the flow of text, using the CSS property&nbsp;*/}
//     {/*  <span className="inline">display: inline</span>&nbsp;*/}
//     {/*  will cause the text inside the element to wrap normally.*/}
//     {/*  </p>*/}
//     {/*  <p>*/}
//     {/*    While using the property aaaaaaaaaaaaaaaaa <span className="inline-block">display: inline-block</span>&nbsp;*/}
//     {/*    will wrap the element to prevent the text inside from extending beyond its parent.*/}
//     {/*  </p>*/}
//     {/*  <p>*/}
//     {/*    Lastly, using the property <span className="block">display: block</span>*/}
//     {/*    will put the element on its own line and fill its parent.*/}
//     {/*  </p>*/}
//     {/*</div>*/}
//
//     {/*Testeo de loading y contenedores*/}
//     <div className='p-4 bg-blue-400 flex flow-col'>
//       <div className="basis-1/3 bg-purple-200 self-center">
//         <LoadingContainer>
//           <Content/>
//         </LoadingContainer>
//       </div>
//       <div className='basis-1/3 text-black bg-orange-400 self-center p-4'>
//         <div className='bg-green-200 text-center'>
//           <span className='bg-yellow-600'>hola</span>
//         </div>
//       </div>
//       <div className="basis-1/3 bg-yellow-300 text-black p-4 text-justify">
//         <p className='indent-8'>
//           a very long text for testing purposes a very long text for testing purposes a very long text for testing purposes a very long text for testing purposes a very long text for testing purposes a very long text for testing purposes
//           a very long text for testing purposes a very long text for testing purposes a very long text for testing purposes
//           a very long text for testing purposes a very long text for testing purposes a very long text for testing purposes
//           a very long text for testing purposes a very long text for testing purposes a very long text for testing purposesa very long text for testing purposes a very long text for testing purposes a very long text for testing purposesa very long text for testing purposes a very long text for testing purposes a very long text for testing purposesa very long text for testing purposes a very long text for testing purposes a very long text for testing purposes
//           a very long text for testing purposes a very long text for testing purposes a very long text for testing purposes
//         </p>
//       </div>
//     </div>
//   </React.Fragment>
// }

const Sandbox = () => {
  const [user, login, data] = useContext(UserContextService)
  const history = useHistory()

  const fetchUserData = useCallback(() => {
    data().then(console.log)
  }, [])


  if (null === user) {
    history.push(getRoute('login'))

    return
  }

  return <React.Fragment>
    <div className='flex flex-row'>
      <h1>hey</h1>
      {user && <span className="ml-4">{user.detail as string}</span>}
      <div onClick={fetchUserData} className="
              ml-4
              skew-y-3 p-2
              bg-orange-100 hover:bg-orange-200
              text-orange-600
              dark:bg-orange-700 dark:hover:bg-orange-600 dark:text-orange-200
            " style={{cursor: 'pointer'}}>
        <button type="submit" className="-skew-y-3">Get user data</button>
      </div>
    </div>
  </React.Fragment>
}

export default hot(Sandbox)
