import React, { useEffect, useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Movies from './Components/Movies/Movies'
import Tvshow from './Components/Tvshow/Tvshow'
import People from './Components/People/People'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import NotFound from './Components/NotFound/NotFound'
import jwtDecode from 'jwt-decode'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import MoviesDetails from './Components/MoviesDetails/MoviesDetails'


export default function App() {
  //NOTE - to solving reload problem
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData();
    }
  }, [])
  const [UserData, setUserData] = useState(null)


  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken')
    let decodeToken = jwtDecode(encodedToken)
    setUserData(decodeToken)
  }
  let routers = createBrowserRouter([
    {
      path: '', element: <Layout setUserData={setUserData} UserData={UserData} />, children: [
        { path: '', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'movies', element: <ProtectedRoute><Movies /></ProtectedRoute> },
        { path: 'tvshow', element: <ProtectedRoute><Tvshow /></ProtectedRoute> },
        { path: 'moviesdetails/:id/:mediaType', element: <ProtectedRoute><MoviesDetails /></ProtectedRoute> },
        { path: 'people', element: <ProtectedRoute><People /></ProtectedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])

  return <>


    <RouterProvider router={routers}></RouterProvider>

  </>
}

