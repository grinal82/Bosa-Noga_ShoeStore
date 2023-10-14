import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { addToCart } from '../store/buyReducer'

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    agreement: false, /* initially false as the user has not accepted the terms */
  })

  const { phone, address, agreement } = formData

  const handlePhoneChange = (e) => {
    setFormData({ ...formData, phone: e.target.value });
  }

  const handleAdressChange = (e) => {
    setFormData({ ...formData, address: e.target.value });
  }

  const handleAgreementChange = (e) => {
    setFormData({ ...formData, agreement: e.target.checked });
  }
  

  useEffect(() => {
    // Retrieve cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cartData);
    dispatch(addToCart(cartData))
  }, [dispatch]);

  const handleRemoveCartItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    dispatch(addToCart(newCartItems))
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!agreement) {
      alert('Please accept the terms and conditions');
      return;
    }

    setLoading(true); // Show loader while making the request

    // Create the order data
    const orderData = {
      owner: {
        phone: phone,
        address: address,
      },
      items: cartItems.map((item) => ({
        id: item.id,
        price: item.price,
        count: item.quantity,
      })),
    };

    // Make a POST request to the order API
    try {
      const response = await fetch('http://localhost:7070/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // If the order is successfully placed, remove cart items
        setCartItems([]);
        localStorage.removeItem('cart');
        setOrderSuccess(true);
      }
    } catch (error) {
      console.error('Error placing the order', error);
    }

    setLoading(false); // Hide the loader
  };


  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={require("../img/banner.jpg")} className="img-fluid" alt="К весне готовы!"/>
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            {cartItems.length>0 ? (
              <>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
              {cartItems.map((cartItem, index) => (
                      <tr key={index}>
                        <td scope="row">{index + 1}</td>
                        <td>
                          <div>{cartItem.title}</div>
                        </td>
                        <td>{cartItem.size}</td>
                        <td>{cartItem.quantity}</td>
                        <td>{cartItem.price} руб.</td>
                        <td>{cartItem.price * cartItem.quantity} руб.</td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemoveCartItem(index)}
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    ))}
                <tr>
                  <td colSpan="5" className="text-right">Общая стоимость</td>
                  <td>{calculateTotalPrice(cartItems)} руб.</td>
                </tr>
              </tbody>
            </table>
              </>
            ):(<h2> Sorry, there's nothing in your cart </h2>)}
            
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{maxWidth: "30rem", margin: "0, auto"}}>
              <form className="card-body">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input 
                  className="form-control" id="phone" placeholder="Ваш телефон"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handlePhoneChange} 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input 
                  className="form-control" 
                  id="address" 
                  placeholder="Адрес доставки"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleAdressChange}
                  />
                </div>
                <div className="form-group form-check">
                  <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="agreement"
                  name="agreement"
                  checked={formData.agreement} 
                  onChange={handleAgreementChange}
                  />
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button 
                type="submit" 
                className="btn btn-outline-secondary"
                onClick={handleOrderSubmit}>Оформить</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
