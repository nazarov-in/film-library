import React from 'react'
import Releases from "../releases/Releases"
import SearchByFilters from "../search-by-filters/SearchByFilters"
import SortedMovies from "../sorted-movies/SortedMovies"
import './Home.css'

const Home = () => {
  return (
      <div className="wrapper-home">
        <div className="container">
          <Releases />
          <SearchByFilters />
          <SortedMovies />
        </div>
      </div>
  )
}

export default Home