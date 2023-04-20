import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import { Link } from "react-router-dom";
import {
  clear,
  decrease,
  increase,
  remove,
  subTotal,
} from "../../redux/Slices/CartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  /*   useEffect(() => {
    dispatch(subTotal);
  }, [cart, dispatch]); */

  const handleRemove = (item) => {
    dispatch(remove(item));
  };
  const handleDecrease = (item) => {
    dispatch(decrease(item));
  };
  const handleClear = (cart) => {
    dispatch(clear(cart));
  };
  const handleIncrease = (item) => {
    dispatch(increase(item));
  };
  return (
    <>
      <UserNavbar />
      <div className="container">
        <h2>Shopping Cart</h2>
        {cart.cartItems.length === 0 ? (
          <div className="empty">
            <span>There are no items in your cart.</span>
            <div className="link-home">
              <Link to="/">
                <span>Shop Now</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-container">
            <div className="info">
              <h3>Product Name & Details</h3>
              <h3>Price</h3>
              <h3>Quantity</h3>
              <h3>Total</h3>
            </div>
            {/* use css grid */}
            <div className="cart-content">
              {cart.cartItems?.map((item) => (
                <div className="item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <span>{item.desc}</span>
                    <button onClick={() => handleRemove(item)}>Remove</button>
                  </div>
                  <div className="item-price">
                    <span>DZD{item.price}</span>
                  </div>
                  <div className="item-quantity">
                    <button onClick={() => handleDecrease(item)}>-</button>
                    <div>{item.quantity}</div>
                    <button onClick={() => handleIncrease(item)}>+</button>
                  </div>
                  <div className="quantity-total-price">
                    <span>DZD{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="operations">
              <div className="proceed-checkout">
                <h4>Subtotal</h4>
                <span>DZD{cart.amount}</span>
                <span>Taxes and shipping calculated at checkout</span>
                <button>Checkout</button>
              </div>
              <div className="clear-cart">
                <span>Start Over?</span>
                <button onClick={() => handleClear(cart)}>Clear Cart</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
