import {createSlice} from '@reduxjs/toolkit'

export const detailsMovieSlice = createSlice({
  name: 'detailsMovie',
  initialState: {id: ''},

  reducers: {
    idMovie: (state, data) => {
      state.id = data.payload
    }
  }
})

export const {idMovie} = detailsMovieSlice.actions
export const selectIdMovie = (state) => state.detailsMovie.id
export default detailsMovieSlice.reducer