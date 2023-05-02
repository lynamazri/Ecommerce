import React from "react";

import { RiShoppingCart2Line, RiShoppingCart2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

function CartIcon({ count, open }) {
  const openCart = <RiShoppingCart2Fill size={21} color="#ffffff" />;
  {
    count > 0 && <span className="cart-badge">{count}</span>;
  }

  const closedCart = <RiShoppingCart2Line size={21} color="#ffffff" />;
  {
    count > 0 && <span className="cart-badge">{count}</span>;
  }

  return (
    <div>
      <div className="cart">{open ? openCart : closedCart}</div>
    </div>
  );
}

export default CartIcon;
