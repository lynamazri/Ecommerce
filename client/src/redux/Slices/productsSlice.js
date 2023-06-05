import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  filteredItems: [],
  status: "idle",
  error: null,
  sortingCriteria: "",
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3001/productss");
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch products data");
    }
  }
);

//or use RTK Query

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsFetch: (state) => {
      state.status = "loading";
    },
    productsFetchSuccess: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
      state.filteredItems = action.payload.map((item) => {
        const Count = item.reviews.length;
        let Avg = 0;
        if (item.reviews.length > 0) {
          for (let i = 0; i < item.reviews.length; i++) {
            Avg += item.reviews[i].stars / item.reviews.length;
          }
        }
        return {
          ...item,
          reviewsCount: Count,
          reviewsAvg: Avg,
        };
      }); // Initialize filteredItems with all items
    },
    productsFetchError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    updateFilteredItems: (state, action) => {
      state.filteredItems = action.payload.map((item) => {
        const Count = item.reviews.length;
        let Avg = 0;
        if (item.reviews.length > 0) {
          for (let i = 0; i < item.reviews.length; i++) {
            Avg += item.reviews[i].stars / item.reviews.length;
          }
        }
        return {
          ...item,
          reviewsCount: Count,
          reviewsAvg: Avg,
        };
      });
      state.sortingCriteria = ""; // Clear the sorting criteria when filtered
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.map((item) => {
          const Count = item.reviews.length;
          let Avg = 0;
          if (item.reviews.length > 0) {
            for (let i = 0; i < item.reviews.length; i++) {
              Avg += item.reviews[i].stars / item.reviews.length;
            }
          }
          return {
            ...item,
            reviewsCount: Count,
            reviewsAvg: Avg,
          };
        });
        state.filteredItems = action.payload.map((item) => {
          const Count = item.reviews.length;
          let Avg = 0;
          if (item.reviews.length > 0) {
            for (let i = 0; i < item.reviews.length; i++) {
              Avg += item.reviews[i].stars / item.reviews.length;
            }
          }
          return {
            ...item,
            reviewsCount: Count,
            reviewsAvg: Avg,
          };
        });
        state.error = null;
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.items = [];
        state.filteredItems = [];
      })
      .addCase(setSortingCriteria, (state, action) => {
        state.sortingCriteria = action.payload;
      });
  },
});

export const { productsFetchSuccess, productsFetchError, updateFilteredItems } =
  productsSlice.actions;
export const setSortingCriteria = createAction("products/setSortingCriteria");

export default productsSlice.reducer;
