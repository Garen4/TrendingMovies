import React from 'react'
import styles from './MediaItem.module.css'
import { Link } from 'react-router-dom'

export default function MediaItem({ item }) {
  return <>


    <div className="col-md-4">
      <Link className=' text-decoration-none text-white ' to={`/moviesdetails/${item.id}/${item.media_type}`}>
        <div className="content position-relative">
          {item.poster_path ? <img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100' alt="Movies" /> : <img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} className='w-100' alt="Movies" />}
          <div className="title bg-main text-center  my-3 p-1  ">
            <h2 className='h6 fw-semibold'> {item.title} {item.name} </h2>
          </div>
          {item.vote_average ?
            <div className="vote top-0 end-0 position-absolute p-2 rounded-start rounded-bottom fw-bolder" > {item.vote_average.toFixed(1)} </div>
            : ''
          }

        </div>
      </Link>

    </div>
  </>
}
