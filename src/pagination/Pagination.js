import React from 'react'
import {useDispatch} from "react-redux"
import './Pagination.css'

const Pagination = ({pagesCount, currentPage, setCurrentPage, handlerBubbleUp, disp}) => {
  const dispatch = useDispatch()
  const pages = []

  const createPages = () => {
    for(let i = 1; i <= pagesCount; i++){
      pages.push(i)
    }
  }
  createPages()

  return (
      <div className="pagination">
        {pages.map((page, index) => (
            <span
                key={index}
                className={currentPage === page ? 'current-page' : 'page'}
                onClick={() => {
                  handlerBubbleUp()
                  disp ? dispatch(setCurrentPage(page)) : setCurrentPage(page)
                }}
            >
                {page}
              </span>
        ))}
      </div>
  )
}

export default Pagination