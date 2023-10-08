import React from 'react'
import { useSelector } from 'react-redux'



export const TopSales = () => {
  const topSales = useSelector(state => state.topSales.topSales);
  const topSalesStatus = useSelector(state => state.topSales.status);

  if (topSalesStatus !== null) {
    return (
      <div className="row">
        {topSales.map(item => (
          <div className="col-4" key={item.id}>
            <div className="card">
              <img src={item.images[0]} className='card-img-top img-fluid' alt={item.title} />
              <div className="card-body">
                <p className="card-text">{item.title}</p>
                <p className="card-text">{item.price}</p>
                <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
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
