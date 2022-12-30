import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({
  // reducerPath will be set as the key of the state object in store
  reducerPath: "albums",

  // baseQuery is used to define the configurations for the fetch api.
  // redux toolkit query by default uses fetch api to fetch the data
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),

  // describes how we will fetch data from server
  endpoints: (builder) => {
    return {
      fetchAlbums: builder.query({
        query: (user) => {
          return {
            url: "/albums",
            params: { userId: user.id },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
