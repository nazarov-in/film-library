import React from 'react'
import {Route, Switch} from "react-router-dom"
import Header from "../header/Header"
import Home from "../home/Home"
import Premieres from "../premieres/Premieres"
import TopMovies from "../top-movies/TopMovies"
import MovieInfo from "../movie-info/MovieInfo"
import Footer from "../footer/Footer"

const UseRouter = (isAuth) => {
  if (isAuth) {
    return (
        <>
          <Header/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/premieres" component={Premieres}/>
            <Route path="/top100" component={TopMovies}/>
            <Route path="/movie" component={MovieInfo}/>
            <Route component={Home}/>
          </Switch>
          <Footer/>
        </>
    )
  }

  return (
      <Switch>
        {/*<Route path="/sign-in" component={}/>*/}
        {/*<Route path="/sign-up" component={}/>*/}
      </Switch>
  )
}

export default UseRouter