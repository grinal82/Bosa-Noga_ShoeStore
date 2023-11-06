import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearFilter, fetchProducts, clearItems, clearOffset, setCategory, clearStatus, fetchFilteredProducts } from '../store/itemsReducer'


export const Category = ({content, filter, setHasMoreItems}) => {
  const catalog = useSelector(state => state.catalog.catalog);
  const dispatch = useDispatch();
  const offset = useSelector(state => state.products.offset);
  const items = useSelector(state => state.products.items);
  const status = useSelector(state => state.catalog.status);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = useCallback(categoryID => {
    setHasMoreItems(true)
    dispatch(setCategory(categoryID));
    dispatch(clearStatus());
    dispatch(clearItems());
    dispatch(clearOffset());
    dispatch(clearFilter());
    if (content !== undefined|| filter !== '') {
      dispatch(fetchFilteredProducts({categoryID, filter:content}));
    } else {
      dispatch(fetchProducts(categoryID));
    }
    if (categoryID === null) {
      setActiveCategory(null);
      dispatch(setCategory(null));
    } else {
      setActiveCategory(categoryID);
    }
    console.log('offset in the state: ', offset);
    console.log('items in the state: ', items);
  }, [setHasMoreItems, dispatch, content, filter, offset, items]);

  return (
    <ul className="catalog-categories nav justify-content-center">
      {status === 'success' && (<Link style={{cursor: 'pointer'}} className="nav-item">
        <div onClick={(e) => { 
          e.preventDefault(); 
          handleCategoryClick();}} className={`nav-link ${activeCategory === null ? "active" : ""}`}>Все
        </div>
      </Link>)}
      
      {catalog.map(item => (
        <Link style={{cursor: 'pointer'}} className="nav-item" key={item.id}>
          <div 
            className={`nav-link ${activeCategory === item.id ? "active" : ""}`} onClick={(e) => { 
              e.preventDefault(); 
              handleCategoryClick(item.id);}}>{item.title}
          </div>
        </Link>
      ))}
    </ul>
  );
}
