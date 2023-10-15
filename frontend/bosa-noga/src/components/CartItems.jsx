import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart} from '../store/buyReducer'



export const CartItems = ({ cartItems, setCartItems,orderSuccess}) => {

	const dispatch = useDispatch()

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

  return (
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
            ):orderSuccess ? (
							<div></div>
						):(<h2> Ваша корзина пуста...выберите товар </h2>)}
          </section>
  )
}
