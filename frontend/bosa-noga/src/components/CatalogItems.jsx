import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchIndividualProduct } from '../store/buyReducer';
import { useDispatch } from 'react-redux';

export const CatalogItems = () => {
    const items = useSelector(state => state.products.items);
    const status = useSelector(state => state.products.status);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (item) => {
        dispatch(fetchIndividualProduct(item.id));
        navigate(`/catalog/${item.id}`);
    }

    return (
      <div className="row">
      {status !== null ? (items.map(item => (
        <div className="col-4" key={item.id}>
          <div className="card catalog-item-card" >
            <img src={item.images[0]}
              className="card-img-top img-fluid" alt={item.title} />
            <div className="card-body">
              <p className="card-text">{item.title}</p>
              <p className="card-text">{item.price}</p>
              <button 
              onClick={() => handleClick(item)} 
              className="btn btn-outline-primary"
              >Заказать
              </button>
            </div>
          </div>
        </div>
      ))) : (
        <div className="preloader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
    )
}
