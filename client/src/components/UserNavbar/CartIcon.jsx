import { RiShoppingCart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function CartIcon({ count }) {
  return (
    <div>
      <Link to="/cart" className="cart">
        <RiShoppingCart2Line size={21} color="#ffffff" />
        {count > 0 && <span className="cart-badge">{count}</span>}
      </Link>
    </div>
  );
}

export default CartIcon;
