import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../store/itemsReducer'
import { clearItems } from '../store/itemsReducer'
import { clearOffset } from '../store/itemsReducer'
import { setCategory } from '../store/itemsReducer'
import { clearStatus } from '../store/itemsReducer'
import { Link } from 'react-router-dom'


export const Category = () => {
  const catalog = useSelector(state => state.catalog.catalog);
  const dispatch = useDispatch();
  const offset = useSelector(state=> state.products.offset);
  const items = useSelector(state => state.products.items);
  const [activeCategory, setActiveCategory] = useState(null)
  const handleCategoryClick = (categoryID) => {
    dispatch(setCategory(categoryID));
    dispatch(clearStatus());
    dispatch(clearItems())
    dispatch(clearOffset());
    dispatch(fetchProducts(categoryID))
    if(categoryID === null) {
      setActiveCategory(null)
    } else {
      setActiveCategory(categoryID)
    }
    // setActiveCategory(categoryID)
    console.log('offset in the state: ', offset)
    console.log('items in the state: ', items)
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      <Link style={{cursor: 'pointer'}} className="nav-item">
        <div onClick={(e) => { 
            e.preventDefault(); 
            handleCategoryClick()}} className={`nav-link ${activeCategory===null? "active" : '' }`}>Все
        </div>
      </Link>
      {catalog.map(item => (
        <Link style={{cursor: 'pointer'}} className="nav-item" key={item.id}>
          <div 
          className={`nav-link ${activeCategory===item.id ? "active" : '' }`} onClick={(e) => { 
            e.preventDefault(); 
            handleCategoryClick(item.id)}}>{item.title}
            </div>
        </Link>
      ))}
    </ul>
  );
}
