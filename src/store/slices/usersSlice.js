import { createSlice } from "@reduxjs/toolkit";

import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";

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

    // Reducers for add user
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = userSlice.reducer;
