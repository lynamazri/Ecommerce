import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totQuantity: 0,
  //addedQuantity: 1,
  totAmount: 0,
};

//add toastify pop ups or maybe snackbar idk yet
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state = initialState, action) {
      //find a way to make it so add to cart works with quantity too as in add a quantity to cart, u can add something to the state for example
      const curItem = state.cartItems.find(
        //curItems is an index not an object
        (item) => item.id === action.payload.id
      );
      if (curItem) {
        //to find if the index exists
        curItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      toast.success("Item added to cart!", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      //state.totQuantity++;
    },
    remove(state = initialState, action) {
      state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          //keeping only the items we didn't remove and mapping them into a new array
          const newItems = state.cartItems.filter(
            //to filter the items that dont have the id that we clicked on
            (item) => item.id !== action.payload.id
          );
          state.cartItems = newItems;
        }
      });
      toast.error("Item removed from cart!", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    subTotal(state = initialState, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.totQuantity = quantity;
      state.totAmount = total;
    },
    increase(state = initialState, action) {
      const curItem = state.cartItems.findIndex(
        //curItems is an index not an object
        (item) => item.id === action.payload.id
      );

      state.cartItems[curItem].quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }, //to increase quantity,

    decrease(state = initialState, action) {
      const curItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[curItem].quantity > 1) {
        state.cartItems[curItem].quantity -= 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      } else if (state.cartItems[curItem].quantity === 1) {
        cartSlice.caseReducers.remove(state, action);
      }
    }, //to decrease quantity

    clear(state = initialState, action) {
      state.cartItems = [];

      toast.info("Cart cleared!", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }, //to remove everything from cart
  },
});

export const { add, remove, increase, decrease, clear, subTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
