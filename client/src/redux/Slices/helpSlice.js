import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const helpFetch = createAsyncThunk(
  "help/helpFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3001/help");
      return res?.data;
    } catch (error) {
      return rejectWithValue("There was an error during data fetching");
    }
  }
);

//or use RTK Query

const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {},
  extraReducers: {
    //decrepated, use builder callback later
    [helpFetch.pending]: (state, action) => {
      state.status = "loading";
    },
    [helpFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [helpFetch.rejected]: (state, action) => {
      state.status = "failure";
      state.error = action.payload;
    },
  },
});

export default helpSlice.reducer;
