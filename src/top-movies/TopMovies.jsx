import React, {useState, useEffect, useRef} from 'react'
import {useRouteMatch} from "react-router-dom"
import {useDispatch} from "react-redux"
import {idMovie} from "../store/detailsMovieSlice"
import Pagination from "../pagination/Pagination"
import Card from "../card/Card"
import './TopMovies.css'

const TopMovies = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const {path} = useRouteMatch()
  const dispatch = useDispatch()
  const refScroll = useRef()

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true)
      const arrInfoForMovie = []
      await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${currentPage}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': 'a33ced8d-040f-44cf-b1b3-1a44a8268f6e'
        }
      })
          .then(response => response.json())
          .then(res => {
            setPagesCount(res.pagesCount)
            arrInfoForMovie.push(res)
          })
          .catch(error => console.log(error))

      setData(arrInfoForMovie[0].films)
      setLoading(false)
    }

    getMovie().catch()
  }, [currentPage])

  const handlerBubbleUp = () => {
    refScroll.current.scrollIntoView({
      behavior: "smooth",
      inline: "start"
    })
  }

  const getIdForClick = (e) => {
    const atr = e.target.closest('a').getAttribute('id')
    dispatch(idMovie(atr))
  }

  return (
      <div className="premieres-wrapper" ref={refScroll}>
        <div className="container">
          <div className="wrapper-all-movie">
            {!loading ? <h2>Топ 100 лучших фильмов:</h2> : null}
            {
              loading ? <div className="pag-loader"><img src="https://superoil.ru/wp-content/plugins/payment-qr-woo/assets/loader.gif"  alt="loading"/></div>
                  :
                  data && data.map(item => (
                      <Card
                          path={path}
                          key={item.filmId}
                          id={item.filmId}
                          url={item.posterUrlPreview}
                          name={item.nameRu}
                          country={item.countries[0].country}
                          genres={item.genres[0] ? item.genres[0].genre : null}
                          rating={item.rating}
                          handlerFunc={getIdForClick}
                      />
                  ))
            }
          </div>
          {!loading ? <Pagination
              pagesCount={pagesCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handlerBubbleUp={handlerBubbleUp}
          />:null}
        </div>
      </div>
  )
}

export default TopMovies