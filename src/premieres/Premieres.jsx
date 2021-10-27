import React, {useState, useEffect} from 'react'
import {useRouteMatch} from "react-router-dom"
import {useDispatch} from "react-redux"
import {idMovie} from "../store/detailsMovieSlice"
import Card from "../card/Card"
import './Premieres.css'

const Premieres = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const {path} = useRouteMatch()
  const [resMonth, setResMonth] = useState()
  const [resYear, setResYear] = useState()

  useEffect(() => {
    const getMonthAndYear = async () => {
      const arrMonth = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
      const date = new Date()
      const dataMonth = date.getMonth()
      setResYear(date.getFullYear())

      await arrMonth.forEach((month, index) => {
        if(index === dataMonth) setResMonth(month)
      })
    }
    getMonthAndYear().catch()

    const getDataFromApi = async () => {
      const arrInfoForMovie = []

      await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${resYear}&month=${resMonth}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': 'a33ced8d-040f-44cf-b1b3-1a44a8268f6e'
        }
      })
          .then(response => response.json())
          .then(res => arrInfoForMovie.push(res))
          .catch(error => console.log(error))

      setData(arrInfoForMovie[0].items)
    }

    if(resMonth) getDataFromApi().catch()
  }, [resMonth, resYear])

  const getIdForClick = (e) => {
    const atr = e.target.closest('a').getAttribute('id')
    dispatch(idMovie(atr))
  }

  return (
      <div className="premieres-wrapper">
        <div className="container">
          <div className="wrapper-all-movie">
            <h2>Ожидаемые кинопремьеры:</h2>
            {data && data.map(item => (
               <Card
                  path={path}
                  key={item.kinopoiskId}
                  id={item.kinopoiskId}
                  url={item.posterUrlPreview}
                  name={item.nameRu}
                  country={item.countries[0].country}
                  genres={item.genres[0] ? item.genres[0].genre : null}
                  rating={item.premiereRu}
                  handlerFunc={getIdForClick}
               />
            ))}
          </div>
        </div>
      </div>
  )
}

export default Premieres