import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {
  isEmptyArray,
  isLoading,
  pageCount,
  selectCurrentPage,
  sortedMovies
} from "../store/sortedMoviesSlice"
import './SearchByFilters.css'

const SearchByFilters = () => {
  const dispatch = useDispatch()
  const [sort, setSort] = useState('rating')
  const [ratingMin, setRatingMin] = useState(0)
  const [ratingMax, setRatingMax] = useState(10)
  const [yearMin, setYearMin] = useState(1888)
  const [yearMax, setYearMax] = useState(2021)
  const [ratingNumber, setRatingNumber] = useState([])
  const [yearNumber, setYearNumber] = useState([])
  const currentPg = useSelector(selectCurrentPage)

  useEffect(() => {
    const getDataFromApi = async () => {
      dispatch(isEmptyArray(false))
      dispatch(isLoading(true))
      const arrInfoForMovie = []
      await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?order=${sort}&type=ALL&ratingFrom=${ratingMin}&ratingTo=${ratingMax}&yearFrom=${yearMin}&yearTo=${yearMax}&page=${currentPg}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': 'a33ced8d-040f-44cf-b1b3-1a44a8268f6e'
        }
      })
          .then(response => response.json())
          .then(response => arrInfoForMovie.push(response))
          .catch(error => console.log(error))

      if (arrInfoForMovie[0].films.length !== 0) {
        dispatch(sortedMovies(arrInfoForMovie[0].films))
        dispatch(pageCount(arrInfoForMovie[0].pagesCount))
      }
      else dispatch(isEmptyArray(true))

      dispatch(isLoading(false))
    }

    getDataFromApi().catch()

    getYearsForInput(0, 10, setRatingNumber)
    getYearsForInput(1888, 2021, setYearNumber)

  }, [currentPg, sort, ratingMin, ratingMax, yearMin, yearMax, dispatch])

  const getYearsForInput = (min, max, state) => {
    const arrYears = []
    for(let i = min; i <= max; i++) arrYears.push(i)
    state(arrYears)
  }

  const handleSelects = (options, state) => {
    const value = []
    for(let i = 0; i < options.length; i++){
      if(options[i].selected) value.push(options[i].value)
    }
    state(value)
  }

  return (
      <div className="filters-wrapper">
        <div className="d-flex">
          <div className="d-flex">
            <p>Сортировать по:</p>
            <select
                value={sort}
                onChange={(e) => handleSelects(e.target.options, setSort)}
                className="filter-sort select-css"
            >
              <option value="rating">Рейтинг</option>
              <option value="num_vote">Кол-во голосов</option>
              <option value="year">Год выпуска</option>
            </select>
          </div>
          <div className="d-flex">
            <p>Рейтинг от</p>
            <select
                value={ratingMin}
                onChange={(e) => handleSelects(e.target.options, setRatingMin)}
                className="filter-sort select-css"
            >
              {ratingNumber.map(num => (
                  <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="d-flex">
            <p>Рейтинг до</p>
            <select
                value={ratingMax}
                onChange={(e) => handleSelects(e.target.options, setRatingMax)}
                className="filter-sort select-css"
            >
              {ratingNumber.map(num => (
                  <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="d-flex">
            <p>Год от</p>
            <select
                value={yearMin}
                onChange={(e) => handleSelects(e.target.options, setYearMin)}
                className="filter-sort select-css"
            >
              {yearNumber.map(num => (
                  <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="d-flex">
            <p>Год до</p>
            <select
                value={yearMax}
                onChange={(e) => handleSelects(e.target.options, setYearMax)}
                className="filter-sort select-css"
            >
              {yearNumber.map(num => (
                  <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
  )
}

export default SearchByFilters