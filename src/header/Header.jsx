import React from 'react'
import {Link, NavLink} from "react-router-dom"
import './Header.css'

const Header = () => {
  return (
      <div className="wrapper-header">
        <div className="container">
          <div className="inner-header">
            <Link to="/" className="logo-header">Киномания</Link>
            <nav className="nav-header">
              <ul>
                <NavLink activeClassName="active" to="/premieres">Премьеры</NavLink>
                <NavLink activeClassName="active" to="/top100">Топ 100</NavLink>
              </ul>
            </nav>
          </div>
        </div>
      </div>
  )
}

export default Header