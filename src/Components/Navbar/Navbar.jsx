import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../Assets/images/logo.png'
export default function Navbar({ UserData, logout }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
          <div className="logo">
            <img className='' src={img} alt="Logo-Movie" />
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">


            {UserData !== null ?
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link className="nav-link active" to='home'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to='movies'>Movies</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to='tvshow'>Tvshow</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to='people'>People</Link>
                </li>
              </ul>
              : null
            }


            <ul className="navbar-nav mb-2 mb-lg-0 ">

              <>
                <li className="nav-item d-flex align-items-center">
                  <i className='fab mx-2 fa-facebook'></i>
                  <i className='fab mx-2 fa-twitter'></i>
                  <i className='fab mx-2 fa-instagram'></i>
                  <i className='fab mx-2 fa-soundcloud'></i>
                </li>

              </>



              {UserData === null ?
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to='register'>Register</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link active" to='login'>Login</Link>
                  </li>
                </>
                :
                <li className="nav-item">
                  <span onClick={logout} className="nav-link active cursor-pointer" to={'logout'}>Logout</span>
                </li>
              }

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
