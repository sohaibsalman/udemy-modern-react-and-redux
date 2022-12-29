import { createSlice } from "@reduxjs/toolkit";

import { fetchUsers } from "../thunks/fetchUsers";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    // request initiated
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    // request completed successfully
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    // error ocurred during request
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = userSlice.reducer;
