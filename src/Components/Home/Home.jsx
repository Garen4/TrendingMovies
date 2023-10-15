import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import axios from 'axios'
import MediaItem from '../MediaItem/MediaItem'
import img from '../../Assets/images/iocn.jpg'
export default function Home() {

  const [movies, setMovies] = useState([])
  const [tv, setTv] = useState([])
  const [pepole, setPepole] = useState([])

  async function getTrending(mediaItem, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaItem}/week?api_key=d9acecc58f05e7f6676c8b3a4c506126`)
    console.log(data.results)
    callback(data.results);
  }

  useEffect(() => {
    getTrending('movie', setMovies)
    getTrending('tv', setTv)
    getTrending('person', setPepole)
  }, [])

  return <>
    {movies ? <section id='home'>
      <div className="row py-5">
        <div className="col-md-4">
          <div className="content">
            <div className="brdr w-25 mb-5"></div>
            <h2 className='h3'>Trending <br /> Movies <br /> To Watch Right Now</h2>
            <p className='text-muted'>Most Watched Movies By Week </p>
            <div className="brdr w-100 mt-5"></div>
          </div>
          <div className="img my-3">
            <img src={img} alt="" className='w-100 ' />
          </div>
        </div>
        {movies.slice(0, 11).map((item, index) => <MediaItem key={index} item={item} />)}
      </div>
      <div className="row py-5">
        <div className="col-md-4">
          <div className="content">
            <div className="brdr w-25 mb-3"></div>
            <h2 className='h3'>Trending <br /> Tv <br /> To Watch Right Now</h2>
            <p className='text-muted'>Most Watched tv By Week </p>
            <div className="brdr w-100 mt-3"></div>
          </div>
          <div className="img my-3">
            <img src={img} alt="" className='w-100 ' />
          </div>
        </div>
        {tv.slice(0, 10).map((item, index) => <MediaItem key={index} item={item} />)}
      </div>
      <div className="row py-5">
        <div className="col-md-4">
          <div className="content">
            <div className="brdr w-25 mb-3"></div>
            <h2 className='h3'>Trending <br /> Pepole <br /> To Watch Right Now</h2>
            <p className='text-muted'>Most Watched pepole By Week </p>
            <div className="brdr w-100 mt-3"></div>
          </div>
          <div className="img my-3">
            <img src={img} alt="" className='w-100 ' />
          </div>
        </div>
        {pepole.slice(0, 10).map((item, index) => <MediaItem key={index} item={item} />)}
      </div>
    </section> : <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="spiner fs-1"></div>
    </div>
    }

  </>
}
