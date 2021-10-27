import React, {useEffect, useState} from 'react'
import {selectIdMovie} from "../store/detailsMovieSlice"
import {useSelector} from "react-redux"
import './MovieInfo.css'

const MovieInfo = () => {
  const [data, setData] = useState([])
  const setId = useSelector(selectIdMovie)

  useEffect(() => {
    if(setId.length !== 0) {
      const getDataFromApi = async () => {
        await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${setId}`, {
          method: 'GET',
          headers: {
            'X-API-KEY': 'a33ced8d-040f-44cf-b1b3-1a44a8268f6e'
          }
        })
            .then(response => response.json())
            .then(res => setData(res))
            .catch(error => console.log(error))
      }

      getDataFromApi().catch()
    }
  }, [])

  return (
      <div className="wrapper-movie">
        <div className="container">
          <div className="inner-movie">
            <img src={data.posterUrl} className="poster-movie" alt="poster"/>
            <div className="description-movie">
              <h3>{data.nameRu}</h3>
              <p>Название оригинал: {data.nameOriginal ? data.nameOriginal : '—'}</p>
              <p>Жанр: {data.genres ? data.genres[0].genre : '—'}</p>
              <p>Год выпуска: {data.year}</p>
              <p>Страна: {data.countries ? data.countries[0].country : '—'}</p>
              <p>Длительность: {data.filmLength ? `${data.filmLength} мин` : '—'}</p>
              <p>Слоган: {data.slogan ? data.slogan : '—'}</p>
              <p>Кинопоиск: {data.ratingKinopoisk ? data.ratingKinopoisk : '—'}</p>
              <p>IMDb: {data.ratingImdb ? data.ratingImdb : '—'}</p>
              <span>{data.description}</span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MovieInfo