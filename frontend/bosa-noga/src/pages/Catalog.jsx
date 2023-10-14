import React, { useEffect } from 'react'
import { Category } from '../components/Category'
import { CatalogItems } from '../components/CatalogItems'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFilteredProducts, clearStatus, clearItems } from '../store/itemsReducer'


export const Catalog = () => {
  const dispatch = useDispatch()
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const filter = useSelector(state=>state.products.filter)
  const [content, setContent] = useState(filter)
  useEffect(() => {
    dispatch(fetchFilteredProducts(filter))
  }, [dispatch, filter])
  const items = useSelector(state => state.products.items);

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchFilteredProducts(content))
    dispatch(clearStatus())
    dispatch(clearItems())
    setContent('')
  }

  useEffect(() => {
    if (items.length < 6) {
      setHasMoreItems(false);
    }
  }, [items.length]);

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={require("../img/banner.jpg")} className="img-fluid" alt="К весне готовы!"/>
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <form className="catalog-search-form form-inline"
            onSubmit={handleSearchSubmit}>
              <input 
              name='search' 
              className="form-control" 
              placeholder="Поиск"
              value={content}
              onChange={(e) => setContent(e.target.value)}/>
            </form>
            <Category/>
            <CatalogItems/>
            <div className="text-center">
            {hasMoreItems && (
                  <button 
                  className="btn btn-outline-primary"
                  // onClick={handleLoadMore}
                  >
                    Загрузить ещё
                  </button>
                )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
