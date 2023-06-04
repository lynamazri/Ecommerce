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

      const response = await fetch(
        "http://localhost:3001/api/controllers/profileController/:user/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

export const createWishlist = createAsyncThunk(
  "wishlist/createWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/controllers/profileController/createWish`,
        { userId }
      );
      if (response.status === 200) {
        return true;
      } else {
        throw new Error("Unable to create new wishlist.");
      }
    } catch (error) {
      return rejectWithValue("There was an error creating a new wishlist.");
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async ({ userId, productId }, { rejectWithValue, dispatch }) => {
    try {
      const wishlistResponse = await axios.get(
        `http://localhost:3001/api/controllers/profileController/getWishlist/${userId}`
      );
      if (wishlistResponse.status === 200) {
        const wishlist = wishlistResponse.data;

        // If user doesn't have a wishlist, create one
        if (!wishlist) {
          await dispatch(createWishlist());
        }

        // Add product to the wishlist
        const response = await axios.post(
          `http://localhost:3001/api/controllers/productController/addProductWish/${userId}/${productId}`
        );
        if (response.status === 200) {
          return productId;
        } else {
          throw new Error("Unable to add product to wishlist.");
        }
      } else {
        throw new Error("Unable to fetch wishlist data.");
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
        `http://localhost:3001/api/controllers/productController/deleteProductWish/${userId}/${productId}`
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

export const getWishlistData = createAsyncThunk(
  "wishlist/getWishlistData",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/controllers/profileController/getWishlist/${userId}`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Unable to fetch wishlist data.");
      }
    } catch (error) {
      return rejectWithValue("There was an error fetching the wishlist data.");
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
      .addCase(createWishlist.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(createWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteProductFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (product) => product !== action.payload
        );
      })
      .addCase(deleteProductFromWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getWishlistData.fulfilled, (state, action) => {
        state.items = action.payload.products;
      })
      .addCase(getWishlistData.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export the additional actions
export const { wishlistAdd, wishlistRemove, wishlistClear } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
