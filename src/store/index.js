import {configureStore} from '@reduxjs/toolkit'
import {detailsMovieSlice} from './detailsMovieSlice'
import {sortedMoviesSlice} from './sortedMoviesSlice'

export default configureStore({
  reducer: {
    detailsMovie: detailsMovieSlice.reducer,
    sort: sortedMoviesSlice.reducer
  }
})