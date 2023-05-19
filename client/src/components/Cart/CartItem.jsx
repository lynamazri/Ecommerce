import { AiOutlineHeart } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { MdKeyboardArrowDown } from "react-icons/md";
import { getStars } from "../../utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decrease, increase, remove } from "../../redux/Slices/CartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleRemove = (item) => {
    dispatch(remove(item));
  };
  const handleDecrease = (item) => {
    dispatch(decrease(item));
  };
  const handleIncrease = (item) => {
    dispatch(increase(item));
  };

  const [showHandler, setShowHandler] = useState(false);
  const toogleHandler = () => {
    setShowHandler((prevShowHandler) => !prevShowHandler);
  };
  return (
    <div className="item-card" key={item.id}>
      <div className="upper-card">
        <img src={item.image} alt={item.title} />
        <div className="item-info">
          <Link to={`/product/${item.category}/${item.id}`}>
            <h3>{item.title}</h3>
          </Link>

          <h4>store: </h4>
          <span className="rating">{getStars(3.6, 12)}</span>
        </div>
      </div>
      <div className="lower-card">
        <div className="list">
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
          <button className="remove-item" onClick={() => handleRemove(item)}>
            <span className="svg">
              <TiDeleteOutline size={11} color="#151515" />
            </span>
            <h4>Remove</h4>
          </button>
        </div>
        {/* <span className="item-price">DZD{item.price}</span> */}
        <div className="item-pay">
          <div className="item-total-price">
            {/* {item.isOnSale ? ( */}
            <>
              <span>DZD{item.price * item.quantity}</span>
              <span className="old-price">DZD{item.price * item.quantity}</span>
            </>
            {/* ) : null}
                      <span>DZD{item.price * item.quantity}</span> */}
          </div>

          <div className="item-quantity">
            <div className="quantity-container" onClick={toogleHandler}>
              <span className="item-qt">{item.quantity}</span>
              <div className="pieces">
                <span>pcs</span>
                <span className="arrowDown">
                  <MdKeyboardArrowDown />
                </span>
              </div>
            </div>
            {showHandler && (
              <div className="quantity-handler">
                <button onClick={() => handleDecrease(item)}>-</button>
                <button onClick={() => handleIncrease(item)}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
