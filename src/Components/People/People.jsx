import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function People() {

  const [tv, setTv] = useState([])
  let Pagnation = new Array(10).fill(1).map((element, index) => index + 1)
  let mediaType = 'person'
  async function getTrending(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=d9acecc58f05e7f6676c8b3a4c506126&language=en-US&page=${page}`)
    setTv(data.results)
    console.log(data.results);

  }

  useEffect(() => {
    getTrending()
  }, [])


  return <>
    <div className="row py-5 gy-3">
      {tv.map((item, index) =>
        <div className="col-md-3 " key={index}>
          <Link className=' text-decoration-none text-white' to={`/moviesdetails/${item.id}/${mediaType}`}>
            <div className="content position-relative">
              {item.profile_path ? <img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} className='w-100' alt="Artists" /> :'' }           
              <h2 className='h5 text-center py-1 bg-main'> {item.name}</h2>
            </div>
          </Link>
        </div>
      )}


    </div>

    <section className="Page navigation d-flex justify-content-center" >

      <ul className="pagination">
        {Pagnation.map((page) =>
          <li key={page} onClick={() => getTrending(page)} className="page-item  mb-4">
            <Link className="page-link bg-main text-white fw-bold fs-5 mx-2" href="#"> {page} </Link></li>)}
      </ul>
    </section>
  </>
}

