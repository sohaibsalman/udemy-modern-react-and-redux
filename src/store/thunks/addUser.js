import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

import { config } from "../../config";

const addUser = createAsyncThunk("user/add", async () => {
  const response = await axios.post(`${config.API_URL}/users`, {
    name: faker.name.fullName(),
  });

  return response.data;
});

export { addUser };
