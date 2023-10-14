import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link, NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { filterItems } from '../store/itemsReducer'
import { clearStatus, clearItems } from '../store/itemsReducer'


export const Header = () => {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const cartItems = useSelector(state => state.buy.cart)
  // active class assignment
  const active = ({ isActive }) => isActive ? "nav-item active" : "nav-item";
  const [isSearchVisible, setIsSearchVisible] =useState(false)
  const dispatch = useDispatch()
  // toggle input field visibility
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    dispatch(filterItems(content))
    dispatch(clearStatus())
    dispatch(clearItems())
    navigate('/catalog')
    setIsSearchVisible(!isSearchVisible)
    setContent('')
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
            <img src={require('../img/header-logo.png')} alt="Bosa Noga"/>
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className={active}>
                  <NavLink className="nav-link" to="/">Главная</NavLink>
                </li>
                <li className={active}>
                  <NavLink className="nav-link" to="/catalog">Каталог</NavLink>
                </li>
                <li className={active}>
                  <NavLink className="nav-link" to="/about">О магазине</NavLink>
                </li>
                <li className={active}>
                  <NavLink className="nav-link" to="/contacts">Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" onClick={toggleSearchVisibility} className="header-controls-pic header-controls-search"></div>
                  <Link to="/cart" className="header-controls-pic header-controls-cart">
                    {cartItems &&cartItems.length > 0 && (
                      <div className="header-controls-cart-full">{cartItems.length}</div>
                    )}                    
                    <div className="header-controls-cart-menu"></div>
                  </Link>
                </div>
                <form 
                data-id="search-form"
                onSubmit={handleSearchSubmit} 
                className={`header-controls-search-form form-inline ${isSearchVisible ? '' : 'invisible'}`}
                >
                  <input 
                  className="form-control" 
                  placeholder="Поиск"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
