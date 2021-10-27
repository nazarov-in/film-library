import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import {idMovie} from "../store/detailsMovieSlice"
import {useDispatch} from "react-redux"

const Releases = () => {
  const dispatch = useDispatch()
  const [resMonth, setResMonth] = useState()
  const [resYear, setResYear] = useState()
  const [releases, setReleases] = useState([])

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
      await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${resYear}&month=${resMonth}&page=1`, {
        method: 'GET',
        headers: {
          'X-API-KEY': 'a33ced8d-040f-44cf-b1b3-1a44a8268f6e'
        }
      })
          .then(response => response.json())
          .then(response => setReleases(response.releases))
          .catch(error => console.log(error))
    }

    if(resMonth) getDataFromApi().catch()
  }, [resMonth, resYear])

  const getIdForClick = (e) => {
    const atr = e.target.closest('a').getAttribute('id')
    dispatch(idMovie(atr))
  }

  return (
      <div className="slider-wrapper">
        <h3 className="slider-title">Релизы месяца:</h3>
        <div className="slider-home">
          {releases.map(release => (
              <Link
                  to="/movie"
                  className="slider-card-home"
                  key={release.filmId}
                  id={release.filmId}
                  onClick={getIdForClick}
              >
                <img src={release.posterUrlPreview} className="slider-card-image" alt={release.nameRu}/>
                <div className="blackout-card">
                  <h4>{release.nameRu}</h4>
                  <p>
                    {release.countries[0].country ? release.countries[0].country : null}
                    {release.genres[0].genre ? ', '+release.genres[0].genre : null}
                    {release.rating ? ', '+release.rating.toFixed(1) : null}
                  </p>
                </div>
              </Link>
          ))}
        </div>
      </div>
  )
}

export default Releases