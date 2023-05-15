import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { Link } from "react-router-dom";
import {
  clear,
  decrease,
  increase,
  remove,
  subTotal,
} from "../../redux/Slices/CartSlice";
import CartItem from "./CartItem";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  /*   useEffect(() => {
    dispatch(subTotal());
  }, [cart, dispatch]); */

  const handleClear = (cart) => {
    dispatch(clear(cart));
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
                <CartItem key={item.id} item={item} />
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
