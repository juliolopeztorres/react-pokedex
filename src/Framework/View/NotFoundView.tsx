import React from 'react'
import { hot } from "react-hot-loader/root";
import { Link } from "react-router-dom";
import { getRoute } from "../Service/RouteService";

const NotFoundView = () => <div className='p-4'>
  <span className='text-xl'><span className="text-orange-600">404 -</span> Route not found</span>
  <div className='text-gray-600 dark:text-gray-200 text-sm mt-2'>
    Don't know where to go?
    <Link to={getRoute('home')} className="
    ml-2 skew-y-3 inline-block p-1
    bg-orange-100 hover:bg-orange-200
    text-orange-600
    dark:bg-orange-700 dark:hover:bg-orange-600 dark:text-orange-200
    " style={{cursor: 'pointer'}}>
      <div className="-skew-y-3">Take me home</div>
    </Link>
  </div>
</div>

export default hot(NotFoundView)
