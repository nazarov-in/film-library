import React, {useRef} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {
  currentPage,
  selectCurrentPage,
  selectIsEmptyArray,
  selectIsLoading,
  selectPageCount,
  selectSortedMovies
} from "../store/sortedMoviesSlice"
import {idMovie} from "../store/detailsMovieSlice"
import Pagination from "../pagination/Pagination"
import Card from "../card/Card"
import './SortedMovies.css'

const SortedMovies = () => {
  const dispatch = useDispatch()
  const data = useSelector(selectSortedMovies)
  const loading = useSelector(selectIsLoading)
  const pagesCount = useSelector(selectPageCount)
  const currentPg = useSelector(selectCurrentPage)
  const selEmptyArray = useSelector(selectIsEmptyArray)
  const refScroll = useRef()

  const handlerBubbleUp = () => {
    refScroll.current.parentNode
        .childNodes[1].scrollIntoView({
      behavior: "smooth",
      inline: "start"
    })
  }

  const getIdForClick = (e) => {
    const atr = e.target.closest('a').getAttribute('id')
    dispatch(idMovie(atr))
  }

  return (
     <>
       <div className="wrapper-all-movie" ref={refScroll}>
         {selEmptyArray ? <span className="sorted-movies-span">Фильмы не найдены!</span> : null}
         {
           loading ? <div className="pag-loader"><img src="https://superoil.ru/wp-content/plugins/payment-qr-woo/assets/loader.gif"  alt="loading"/></div>
               :
               data && data.map(item => (
                   <Card
                       // path={path}
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
           currentPage={currentPg}
           setCurrentPage={currentPage}
           handlerBubbleUp={handlerBubbleUp}
           disp={true}
       />:null}
     </>
  )
}

export default SortedMovies