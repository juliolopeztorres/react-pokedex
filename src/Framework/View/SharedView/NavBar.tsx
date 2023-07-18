import React, { useContext } from "react";
import { hot } from "react-hot-loader/root";
import { useHistory } from "react-router";
import DarkModeContextService from "../../Service/DarkModeContextService";
import Pokeball from "../../Asset/Image/pokeball.png";
import getRoute from "../../../Domain/Util/getRoute";

const NavBar = () => {
  const [darkMode, onDarkModeChanged] = useContext(DarkModeContextService)
  const history = useHistory()

  // const fetchUserData = () => {
  //   getUserData().then(console.log)
  //
  //   // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODk2MDI5NzAsImV4cCI6MTY4OTYwMjk4MCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlckBlbWFpbC5lcyJ9.jzr31v6Lv-xvSikxwedsNSCUWZhKFp-rzXbN3TNaMSwA7Piemuv8-1qrJscGNJnD09vu64MMmfKdyEbDhi2NkctImU6yKx4lxcA7ZvKQ9wpGMp_Z_nqPUQNkS-OAXkG3pWgIZAf-RMvdi-YTQ-KQ66LDzLrJtl7_OS_LLqP4qgtLNIG2WoFtqPmFn79WGFlbQXYCzWl_g2rcPmysdhuyLso_Jn_nXlAktHB26KZDjswgBrU3HMFS1Uq8V-tcafd1vKEnJU-luqt6hge0T4yPrvhXs9XfTz478sL1br2XDtzZ4rBlXWS4k1TVzU-m_9y_sKSBjseWkqSADkvdeKfKMA'
  //   //
  //   // webClient.get('/user/data', {headers: {
  //   //     'Authorization': `Bearer ${token}`
  //   //   }}).then(console.log).catch(console.error)
  //
  //   // fetch(
  //   //   'http://localhost:8080/user/data',
  //   //   {
  //   //     method: 'GET',
  //   //     headers: {
  //   //       "Authorization": `Bearer ${user.token}`,
  //   //     }}
  //   // ).then(
  //   //   async (data) => Promise.resolve({statusCode: data.status, body: await data.json()})
  //   // ).then(
  //   //   (data) => {
  //   //     if (data.statusCode !== 200) {
  //   //       throw new Error(data.body.message)
  //   //     }
  //   //
  //   //     logWithLevel(Level.DEBUG, `user data retrieved ${data.body}`)
  //   //   }
  //   // ).catch(
  //   //   (err) => {
  //   //     logWithLevel(Level.ERROR, err)
  //   //   }
  //   // )
  // }

  return <div className='sticky top-0 flex flex-row bg-orange-600 shadow-md mb-4 pl-2 py-5 dark:bg-orange-800 dark:shadow-gray-700' style={{cursor: 'pointer'}}>
    <div className="grow flex flex-row">
      <div className="w-10 self-center">
        <img data-test-id='logo' src={Pokeball} className='w-7 mx-auto text-white font-mono dark:text-gray-200 text-xs' alt="pokeball"
             onClick={() => {
               history.push(getRoute('home'));
             }}/>
      </div>
      <div className="flex flex-col ml-2">
        <span className='text-white text-2xl font-mono'>Pokédex</span>
        {/*{user && (<span className='text-white text-xs italic font-mono' onClick={fetchUserData}>Welcome back, {user.email}</span>)}*/}
      </div>
    </div>
    <div className='mr-2 flex'>
      <div className='self-center'>
        <label className="relative inline-flex cursor-pointer items-center align-middle">
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
  </div>
}

export default hot(NavBar)
