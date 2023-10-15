import React from 'react'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { addToCart } from '../store/buyReducer'
import { CartSubmitForm } from '../components/CartSubmitForm'
import { CartItems } from '../components/CartItems'

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  

  useEffect(() => {
    // Retrieve cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cartData);
    dispatch(addToCart(cartData))
  }, [dispatch]);

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={require("../img/banner.jpg")} className="img-fluid" alt="К весне готовы!"/>
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <CartItems
            setCartItems={setCartItems}
            cartItems={cartItems}
            orderSuccess={orderSuccess} />
          {error!==null && (
            <div className="alert alert-danger">{error}</div>
          )}
          <CartSubmitForm
            setCartItems={setCartItems}
            setOrderSuccess={setOrderSuccess}
            setLoading={setLoading}
            cartItems={cartItems}
            orderSuccess={orderSuccess}
            loading={loading}
            setError={setError} />
        </div>
      </div>
    </main>
  )
}
