import {createSlice} from '@reduxjs/toolkit'

export const sortedMoviesSlice = createSlice({
  name: 'sort',
  initialState: {
    arrSorted: [],
    page: 0,
    current: 1,
    loading: false,
    emptyArray: false
  },

  reducers: {
    sortedMovies: (state, data) => {
      state.arrSorted = data.payload
    },
    pageCount: (state, data) => {
      state.page = data.payload
    },
    currentPage: (state, data) => {
      state.current = data.payload
    },
    isLoading: (state, data) => {
      state.loading = data.payload
    },
    isEmptyArray: (state, data) => {
      state.emptyArray = data.payload
    },
  }
})

export const {sortedMovies, pageCount, currentPage, isLoading, isEmptyArray} = sortedMoviesSlice.actions
export const selectSortedMovies = (state) => state.sort.arrSorted
export const selectPageCount = (state) => state.sort.page
export const selectCurrentPage = (state) => state.sort.current
export const selectIsLoading = (state) => state.sort.loading
export const selectIsEmptyArray = (state) => state.sort.emptyArray
export default sortedMoviesSlice.reducer