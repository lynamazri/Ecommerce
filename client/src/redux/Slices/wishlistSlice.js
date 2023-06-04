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
      const token = getState().auth.token;
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch("/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist items.");
      }

      const wishlistItems = await response.json();
      return wishlistItems;
    } catch (error) {
      return rejectWithValue("There was an error during wishlist fetching");
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async ({ user, product }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/controllers/productController/addProductWish/${user}/${product}`
      );
      if (response.status === 200) {
        return product;
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
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export the additional actions
export const { wishlistAdd } = wishlistSlice.actions;

export default wishlistSlice.reducer;
