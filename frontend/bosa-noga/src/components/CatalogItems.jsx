import React from 'react'
import { useSelector } from 'react-redux'

export const CatalogItems = () => {
    const items = useSelector(state => state.products.items);
    const status = useSelector(state => state.products.status);
    return (
      <div className="row">
      {status !== null ? (items.map(item => (
        <div className="col-4" key={item.id}>
          <div className="card catalog-item-card">
            <img src={item.images[0]}
              className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
            <div className="card-body">
              <p className="card-text">{item.title}</p>
              <p className="card-text">{item.price}</p>
              <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
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
