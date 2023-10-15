import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addQuantity, reduceQuantity, addSelectedSize, removeSelectedInfo } from '../store/buyReducer'



export const Product = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const item = useSelector(state => state.buy.item)
  const quantity = useSelector(state => state.buy.quantity)
  const size = useSelector(state => state.buy.sizeToBuy)
  const [selectedSize, setSelectedSize] = useState(null)


  const handleSizeClick = (index, size) => {
    setSelectedSize(index)
    dispatch(addSelectedSize(size))
  }

  const handleIncrement = () => {
    dispatch(addQuantity())
  }
  
  const handleDecrement = () => {
    dispatch(reduceQuantity())
  }

  // Add to Cart
const addToCart = (item, size, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if the same item with the same size already exists
  const existingItem = cart.find(product => product.id === item.id && product.size === size.size);

  if (existingItem) {
    // If it exists, update the quantity
    existingItem.quantity += 1;
  }  if (!size) {
    const warningMessage = 'Please select a size';
    alert(warningMessage);
    return;
  }
  else {
    // If it doesn't exist, add a new item to the cart
    cart.push({ id:item.id, title:item.title, size:size.size, quantity:quantity, price:item.price });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  dispatch(removeSelectedInfo())
  
  navigate('/cart')
};

  return (
    <main className="container">
        <div className="row">
            <div className="col">
                <div className="banner">
                    <img src={require("../img/banner.jpg")} alt="К весне готовы!"/>
                    <h2 className="banner-header">К весне готовы!</h2>
                </div>

                <section className="catalog-item">
                  {item ? (
                  <>
                    <h2 className="text-center">{item.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src={item.images[0]}
                                className="img-fluid" alt=""/>
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>{item.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>{item.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>{item.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>{item.material}</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>{item.season}</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>{item.reason}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <p>Размеры в наличии: {item.sizes
                                .filter((size) => size.available)
                                .map((size, index) =>(
                                <span 
                                key={index} 
                                className={`catalog-item-size ${index===selectedSize ? 'selected' : ''}`}
                                style={{cursor: 'pointer'}}
                                onClick={() => handleSizeClick(index, size)}
                                >{size.size}
                                </span>))}
                                </p>
                                {item.sizes.some((size)=>size.available) && (
                                  <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                  <button 
                                  onClick={handleDecrement} className="btn btn-secondary"
                                  >-</button>
                                  <span className="btn btn-outline-primary">{quantity}</span>
                                  <button 
                                  onClick={handleIncrement} 
                                  className="btn btn-secondary"
                                  >+</button>
                                </span>
                                </p>
                                )}
                            </div>

                            {item.sizes.some((size)=>size.available) && (
                              <button 
                              className="btn btn-danger btn-block btn-lg"
                              onClick={()=>addToCart(item, size, quantity)}>В корзину</button>
                            )}
                            
                        </div>
                    </div>
                    </>
                    ):(
                        <div className="preloader">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    )}
                </section>
            </div>
        </div>
    </main>
  )
}
