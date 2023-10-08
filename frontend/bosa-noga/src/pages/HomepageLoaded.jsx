import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoreProducts, clearOffset } from '../store/itemsReducer';
import { TopSales } from '../components/TopSales';
import { Category } from '../components/Category';
import { CatalogItems } from '../components/CatalogItems';

export const HomepageLoaded = () => {
  const items = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const category = useSelector((state) => state.products.selectedCategory);
  const offset = useSelector((state) => state.products.offset);
  const dispatch = useDispatch();

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const handleLoadMore = () => {
    if(!isLoadingMore){
      setIsLoadingMore(true);
      console.log('Offset before dispatch:', offset);
      dispatch(fetchMoreProducts({category, offset}));
      setIsLoadingMore(false)
      console.log('statue: ', status);
      console.log('Длинна массива', items.length);
      console.log('Текущий оффсет: ', offset);
      console.log('сравнение длинны и оффсета: ',items.length >= offset + 6);
      if (status ==='success' && (offset-items.length)>6) {
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
            <img src={require("../img/banner.jpg")} className="img-fluid" alt="К весне готовы!"/>
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
              <TopSales/>
          </section>
          <section className="catalog">
              <h2 className="text-center">Каталог</h2>
              <Category/>
              <CatalogItems/>
              <div className="text-center">
                {hasMoreItems && (
                  <button 
                  className="btn btn-outline-primary"
                  onClick={handleLoadMore}
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

