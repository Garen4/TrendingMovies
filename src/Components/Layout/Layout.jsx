import React from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'


export default function Layout({ UserData, setUserData }) {
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/login')

  }

  return <>
    <Navbar logout={logout} UserData={UserData} />
    <div className="container">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
