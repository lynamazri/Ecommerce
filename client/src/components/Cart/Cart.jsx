import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { getStars } from "../../utils";

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
    dispatch(subTotal());
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
      <div className="cart-container">
        <h2 className="cart-header">Shopping Cart</h2>
        {cart.cartItems.length === 0 ? (
          <div className="empty-cart-container">
            <span>There are no items in your cart.</span>
            <div className="link-home">
              <Link to="/">
                <span>Shop Now</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="full-cart-container">
            {/* use css grid */}
            <div className="cart-items">
              {cart.cartItems?.map((item) => (
                <div className="item-card" key={item.id}>
                  <div className="left-container">
                    <img src={item.image} alt={item.name} />
                    <Link to="/wishlist" className="wishlist">
                      <span className="svg">
                        <AiOutlineHeart size={11} color="#D1D1D1" />
                      </span>
                      <h4>Wishlist</h4>
                    </Link>
                    <Link to="/compare" className="compare">
                      <span className="svg">
                        <TbListDetails size={11} color="#FF7F50" />
                      </span>
                      <h4>Compare</h4>
                    </Link>
                    <button
                      className="remove-item"
                      onClick={() => handleRemove(item)}
                    >
                      <span className="svg">
                        <TiDeleteOutline size={11} color="#151515" />
                      </span>
                      <h4>Remove</h4>
                    </button>
                  </div>
                  <div className="product-info">
                    <h4>product title</h4>
                    <span>store: </span>
                    <span className="product-rating">{getStars(3.6)}</span>
                    {/* <span className="item-price">DZD{item.price}</span> */}
                    <div className="product-pay">
                      <div className="total-price">
                        <span>DZD{item.price * item.quantity}</span>
                      </div>

                      <div className="item-quantity">
                        <button onClick={() => handleDecrease(item)}>-</button>
                        <div>{item.quantity}</div>
                        <button onClick={() => handleIncrease(item)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lower-cart">
              <div className="amount">
                <h4>Subtotal</h4>
                <span>DZD{cart.totAmount}</span>
                {/* <span>Taxes and shipping calculated at checkout</span> */}
              </div>
              <div className="operations">
                {/* <div>Quantity: {cart.totQuantity}</div> */}
                <button
                  onClick={() => handleClear(cart)}
                  className="clear-cart"
                >
                  Clear Cart
                </button>
                <Link to="/checkout">
                  <button className="checkout">Go to checkout</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
