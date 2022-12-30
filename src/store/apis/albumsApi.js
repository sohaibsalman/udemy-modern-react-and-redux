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
          return [{ type: "UserAlbums", id: user.id }];
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
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UserAlbums", id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            url: "/albums",
            params: { userId: user.id },
            method: "GET",
          };
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "Album", id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
