import React, { useState } from 'react'
import { clearCart } from '../store/buyReducer'
import { useDispatch } from 'react-redux'
import { clearSelectedItem } from '../store/catalogReducer'

export const CartSubmitForm = ({ cartItems, setCartItems, setLoading, setOrderSuccess, orderSuccess, loading, setError }) => {
  const dispatch = useDispatch();

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

    setError(null);

    // Make a POST request to the order API
    try {
      const response = await fetch('http://localhost:7070/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.status === 204) {
        // If the order is successfully placed, remove cart items
        setCartItems([]);
        localStorage.removeItem('cart');
        setOrderSuccess(true);
      }
    } catch (error) {
      console.error('Error placing the order', error);
      setError(error.message);
    }

    setLoading(false); // Hide the loader
    dispatch(clearCart()); // Clear the cart
    dispatch(clearSelectedItem()); // Clear the selected item state
    };

    return (
      <>
          {orderSuccess ? (
              <div className="alert alert-success" style={{ fontSize: '20px' }}> Заказ оформлен</div>
          ) : loading ? (
              <div className="preloader">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
          ) : cartItems.length > 0 && (
              <section className="order">
                  <h2 className="text-center">Оформить заказ</h2>
                  <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
                      <form className="card-body">
                          <div className="form-group">
                              <label htmlFor="phone">Телефон</label>
                              <input
                                  className="form-control"
                                  id="phone"
                                  placeholder="Ваш телефон"
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
                              onClick={handleOrderSubmit}
                          >
                              Оформить
                          </button>
                      </form>
                  </div>
              </section>
          )}
      </>
  );
}
