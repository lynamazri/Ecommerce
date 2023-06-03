import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clear } from "../../redux/Slices/CartSlice";
import { GrFormClose } from "react-icons/gr";
import CartItem from "./CartItem";
import "./Cart.css";

function Cart({ isCheckoutPage, closeMenu }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clear(cart));
  };
  console.log(cart.cartItems);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        {!isCheckoutPage && closeMenu && (
          <button className="close-button" onClick={closeMenu}>
            Close <GrFormClose size={20} />
          </button>
        )}
      </div>
      {cart.cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <span>There are no items in your cart.</span>
          <div className="link-home">
            <Link to="/">Shop Now</Link>
          </div>
        </div>
      ) : (
        <div className="full-cart-container">
          <div className="cart-items">
            {cart.cartItems.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
          <div className="lower-cart">
            <div className="amount">
              <h4>Subtotal</h4>
              <div>DZD {cart.totAmount}</div>
            </div>
            <div className="operations">
              <button className="clear-cart" onClick={handleClear}>
                Clear Cart
              </button>
              {!isCheckoutPage && (
                <Link to="/checkout">
                  <button className="checkout-button">Go to Checkout</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
