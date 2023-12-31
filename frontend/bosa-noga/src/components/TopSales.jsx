import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchIndividualProduct } from '../store/buyReducer'



export const TopSales = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const topSales = useSelector(state => state.topSales.topSales);
  const topSalesStatus = useSelector(state => state.topSales.status);

  const handleClick = (item) => {
    dispatch(fetchIndividualProduct(item.id));
    navigate(`/catalog/${item.id}`);
}

  if (topSalesStatus !== null) {
    return (
      <div className="row">
        {topSales.map(item => (
          <div className="col-4" key={item.id}>
            <div className="card">
              <img src={item.images[0]} 
              className='card-img-top img-fluid' 
              alt={item.title} 
              style={{objectFit: 'cover', width: '100%', height: '280px'}}
              />
              <div className="card-body">
                <p className="card-text">{item.title}</p>
                <p className="card-text">{item.price}</p>
                <button 
                onClick={() => handleClick(item)} 
                className="btn btn-outline-primary">Заказать</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
}
