import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { config } from "../../config";

const removeUser = createAsyncThunk("users/remove", async (user) => {
  await axios.delete(`${config.API_URL}/users/${user.id}`);
  return user;
});

export { removeUser };
