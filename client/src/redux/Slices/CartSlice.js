import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totQuantity: 0,
  //addedQuantity: 1,
  totAmount: localStorage.getItem("totalAmount")
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0,
};

//add toastify pop ups or maybe snackbar idk yet
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state = initialState, action) {
      //find a way to make it so add to cart works with quantity too as in add a quantity to cart, u can add something to the state for example
      const curItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (curItem) {
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

      state.totAmount += action.payload.price;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalAmount", JSON.stringify(state.totAmount));
      //state.totQuantity++;
    },
    remove(state = initialState, action) {
      state.cartItems.map((item) => {
        if (item.productId === action.payload.productId) {
          //keeping only the items we didn't remove and mapping them into a new array
          const newItems = state.cartItems.filter(
            //to filter the items that dont have the id that we clicked on
            (item) => item.productId !== action.payload.productId
          );
          state.totAmount -= action.payload.price * action.payload.quantity;
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
      localStorage.setItem("totalAmount", JSON.stringify(state.totAmount));
    },
    /*     subTotal(state = initialState, action) {
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
      state.totAmount = total.toFixed(2);
    }, */
    increase(state = initialState, action) {
      const curItem = state.cartItems.findIndex(
        //curItems is an index not an object
        (item) => item.productId === action.payload.productId
      );

      state.cartItems[curItem].quantity += 1;
      state.totAmount += action.payload.price;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalAmount", JSON.stringify(state.totAmount));
    }, //to increase quantity,

    decrease(state = initialState, action) {
      const curItem = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (state.cartItems[curItem].quantity > 1) {
        state.cartItems[curItem].quantity -= 1;
        state.totAmount -= action.payload.price;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("totalAmount", JSON.stringify(state.totAmount));
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
      state.totAmount = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalAmount", JSON.stringify(state.totAmount));
    }, //to remove everything from cart
  },
});

export const { add, remove, increase, decrease, clear, subTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
