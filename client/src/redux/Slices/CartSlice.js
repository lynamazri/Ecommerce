import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  quantity: 0,
  //addedQuantity: 1,
  amount: 0,
};

//add toastify pop ups or maybe snackbar idk yet
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      //find a way to make it so add to cart works with quantity too as in add a quantity to cart, u can add something to the state for example
      const curItem = state.cartItems.findIndex(
        //curItems is an index not an object
        (item) => item.id === action.payload.id
      );
      if (curItem >= 0) {
        //to find if the index exists
        state.cartItems[curItem].quantity += 1; //state.cartItems[curItem].addedQuantity;
      } else {
        const product = { ...action.payload, quantity: 1 };
        state.cartItems.push(product);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    remove(state, action) {
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

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    /* subTotal(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.quantity = quantity;
      state.amount = total;
    }, */
    increase(state, action) {
      const curItem = state.cartItems.findIndex(
        //curItems is an index not an object
        (item) => item.id === action.payload.id
      );

      state.cartItems[curItem].quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }, //to increase quantity,

    decrease(state, action) {
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

    clear(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }, //to remove everything from cart
  },
});

export const { add, remove, increase, decrease, clear, subTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
