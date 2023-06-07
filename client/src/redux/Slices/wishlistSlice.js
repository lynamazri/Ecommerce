import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const wishlistFetch = createAsyncThunk(
  "wishlist/wishlistFetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.user.userId;
      const response = await axios.get(
        `http://localhost:3001/profile/wishlist/${userId}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch wishlist items.");
      }

      const wishlistItems = response.data;
      return wishlistItems;
    } catch (error) {
      return rejectWithValue("There was an error during wishlist fetching");
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/productss/${userId}/product/${productId}`
      );

      if (response.status === 200) {
        return productId;
      } else {
        throw new Error("Unable to add product to wishlist.");
      }
    } catch (error) {
      return rejectWithValue(
        "There was an error adding the product to the wishlist."
      );
    }
  }
);

export const deleteProductFromWishlist = createAsyncThunk(
  "wishlist/deleteProductFromWishlist",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/productss/${userId}/product/${productId}`
      );
      if (response.status === 200) {
        return productId;
      } else {
        throw new Error("Unable to delete product from wishlist.");
      }
    } catch (error) {
      return rejectWithValue(
        "There was an error deleting the product from the wishlist."
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // other wishlist-related reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(wishlistFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(wishlistFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(wishlistFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.items = [];
      })
      .addCase(addProductToWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProductFromWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductFromWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (product) => product !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProductFromWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
