import React from 'react'
import {Link} from "react-router-dom"

const Card = ({path, id, url, name, country, genres, rating, handlerFunc}) => {
  return (
      <Link to="/movie" className="wrapp-card" onClick={handlerFunc} id={id}>
        <img className="image-card" src={url}/>
        <div className="blackout-card">
          <p className="movie-title">{name}</p>
          <p>{country}</p>
          <p>{genres}</p>
          <p>{path === '/premieres' ? 'Премьера' : 'Кинопоиск'}: {rating}</p>
        </div>
      </Link>
  )
}

export default Card