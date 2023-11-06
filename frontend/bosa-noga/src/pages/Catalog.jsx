import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  fetchFilteredProducts, 
  clearStatus, 
  clearItems, 
  fetchMoreProducts, 
  clearOffset, 
  fetchProducts 
} from '../store/itemsReducer'
import { Category } from '../components/Category'
import { CatalogItems } from '../components/CatalogItems'




export const Catalog = () => {
  const dispatch = useDispatch()
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const filter = useSelector(state=>state.products.filter)
  const categoryID = useSelector(state=>state.products.selectedCategory)
  const [content, setContent] = useState(filter)
  const offset = useSelector((state) => state.products.offset);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state)=> state.products.error)

  useEffect(() => {
    if(content === '') {
      dispatch(fetchProducts(categoryID));
      // setContent(null)
    }
    dispatch(fetchFilteredProducts({categoryID, filter:content}))
  }, [dispatch, filter, content, categoryID])

  const items = useSelector(state => state.products.items);

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchFilteredProducts({categoryID, filter:content}))
    dispatch(clearStatus())
    dispatch(clearItems())
    // setContent('')
  }
  const handleLoadMore = () => {
    if(!isLoadingMore){
      setIsLoadingMore(true);
      console.log('Offset before dispatch:', offset);
      dispatch(fetchMoreProducts({categoryID, offset}));
      setIsLoadingMore(false)
      console.log('statue: ', status);
      console.log('Длинна массива', items.length);
      console.log('Текущий оффсет: ', offset);
      console.log('сравнение длинны и оффсета: ',items.length >= offset + 6);
      if (status ==='success' && (offset-items.length)>6 && items.length) {
        dispatch(clearOffset());
        setHasMoreItems(false);
        
      }
    }
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img
              src={require("../img/banner.jpg")}
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <form
              className="catalog-search-form form-inline"
              onSubmit={handleSearchSubmit}
            >
              <input
                name="search"
                className="form-control"
                placeholder="Поиск"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </form>
            {status === 'loading' ? (
              <div className="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : error === null ? (
              <>
                <Category setHasMoreItems={setHasMoreItems} content={content} />
                <CatalogItems />
                <div className="text-center">
                  {hasMoreItems && items.length > 0 && (
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleLoadMore}
                    >
                      Загрузить ещё
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="alert alert-danger">{error}</div>
                <button 
                  onClick={() => dispatch(fetchProducts())} className='btn btn-primary'>Try again</button>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
