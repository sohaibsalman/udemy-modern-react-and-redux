import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk will automatically dispatch actions with following type
// pending === request was initiated
// fulfilled === request was completed successfully
// rejected === an error ocurred during request

// We need to listen these actions on the slice using extraReducers property!

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");
  return response.data;
});

export { fetchUsers };
