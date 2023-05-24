import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3001/productss");
      return res?.data;
    } catch (error) {
      return rejectWithValue("There was an error during data fetching");
    }
  }
);

//or use RTK Query

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  // extraReducers: {
  //   //decrepated, use builder callback later
  //   [productsFetch.pending]: (state) => {
  //     state.status = "loading";
  //   },
  //   [productsFetch.fulfilled]: (state, action) => {
  //     state.status = "success";
  //     state.items = action.payload;
  //   },
  //   [productsFetch.rejected]: (state, action) => {
  //     state.status = "failure";
  //     state.error = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(productsFetch.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(productsFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload;
      state.error = "";
    });
    builder.addCase(productsFetch.rejected, (state, action) => {
      state.status = "failure";
      state.items = [];
      state.error = action.payload;
    });
  },
});

export default productsSlice.reducer;
