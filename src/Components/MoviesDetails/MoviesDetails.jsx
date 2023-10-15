import React, { useEffect, useState } from 'react'
import styles from './MoviesDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import img from '../../Assets/images/dra.jpg'

export default function MoviesDetails() {

  let { id, mediaType } = useParams();
  const [movieDetails, setMovieDetails] = useState({})


  async function getTrending(id, mediaType) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=d9acecc58f05e7f6676c8b3a4c506126`)
    setMovieDetails(data)
    console.log(data);
  }

  useEffect(() => {getTrending(id, mediaType)}, [])




  return <>
    <div className="row align-items-center py-5">
      <div className="col-md-4 ">

        {movieDetails.poster_path ? <img src={'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path} className='w-100' alt="Movies" />
          : <img src={'https://image.tmdb.org/t/p/w500' + movieDetails.profile_path} className='w-100' alt="Movies" />}
      </div>
      <div className="col-md-8">
        <h2 className='h1 my-3 fw-bolder'> <i className="fa-solid fa-video mx-3 "></i> {movieDetails.title}  {movieDetails.name}</h2>
        <p className='text-muted'> {movieDetails.overview} {movieDetails.biography} </p>
        <div className="rate-date my-4  fw-semibold ">
          {movieDetails.release_date ? <p><i className="fa-solid fa-bell mx-3"></i> Date : {movieDetails.release_date} </p> : ""}
          {movieDetails.vote_average ? <p><i className="fa-solid fa-star mx-3"></i> Vote : {movieDetails.vote_average} </p> : ""}
          {movieDetails.original_language ? <p><i className="fa-solid fa-language mx-3"></i> Language : {movieDetails.original_language} </p> : ""}
          <div className="ticktes d-flex align-items-center">

            <a href="https://www.thepopes-exorcist.movie" className="btn text-white bg-main">
              Book your ticket
              <i className="fa-solid fa-ticket text-white mx-3">  </i>
            </a>
          </div>
        </div>



      </div>

      <div className="row py-5">
        
        <div className="col-md-4">
          <img src={img} className='w-100' alt="" />
        </div>
        <div className="col-md-8">
          <div className="image">
            <h3 className=' my-3 text-capitalize fw-bolder'> <i className="fa-solid fa-clapperboard mx-3"></i> shot from the movie</h3>

            <img src={'https://image.tmdb.org/t/p/w500' + movieDetails.backdrop_path} className=' w-100 mt-3' alt="" />
          </div>
        </div>

      </div>
    </div>




  </>

}