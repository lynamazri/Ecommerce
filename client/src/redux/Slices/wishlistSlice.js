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
      console.log(token);
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await axios.get(
        `http://localhost:3001/profile/${userId}/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch wishlist items.");
      }

      const wishlistItems = response.data;
      return wishlistItems;
    } catch (error) {
      console.log(error);
      return rejectWithValue("There was an error during wishlist fetching");
    }
  }
);

export const createWishlist = createAsyncThunk(
  "wishlist/createWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/profile/wishlist"
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
    const token = getState().auth.token;
    try {
      const wishlistResponse = await axios
        .get(`http://localhost:3001/profile/${userId}/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => console.log(response.json()));

      if (wishlistResponse.status === 200) {
        const wishlist = wishlistResponse.data;

        // If user doesn't have a wishlist, create one
        if (!wishlist) {
          await dispatch(createWishlist());
        }

        // Add product to the wishlist
        const response = await axios.patch(
          `http://localhost:3001/profile/${userId}/${productId}`
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
      const response = await axios.patch(
        `http://localhost:3001/profile/delete/${userId}/${productId}`
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
      .addCase(createWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createWishlist.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
        state.error = null;
      })
      .addCase(createWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
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
