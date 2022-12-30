import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

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
      addAlbum: builder.mutation({
        // invalidatesTags will allow the the resultant data to be marked as un-sync
        invalidatesTags: (result, error, user) => {
          return [{ type: "Album", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              title: faker.commerce.productName(),
              userId: user.id,
            },
          };
        },
      }),
      fetchAlbums: builder.query({
        // provideTags marks the resultant data to be un-sync when used in mutation
        providesTags: (result, error, user) => {
          return [{ type: "Album", id: user.id }];
        },
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

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
