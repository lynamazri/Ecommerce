import React from "react";
import { RiShoppingCart2Line, RiShoppingCart2Fill } from "react-icons/ri";

function CartIcon({ count, open }) {
  const openCart = <RiShoppingCart2Fill size={21} color="#ffffff" />;
  const closedCart = <RiShoppingCart2Line size={21} color="#ffffff" />;

  return (
    <div className="cart">
      {open ? openCart : closedCart}
      {count > 0 && <span className="cart-badge">{count}</span>}
    </div>
  );
}

export default CartIcon;
