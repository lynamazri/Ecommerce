import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  tags: ["Products"],
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/productss`,
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (id) => `/productss/store/${id}`,
      providesTags: [],
    }),
    patchProfile: builder.mutation({
      query: ({ newUsername, firstName, lastName, bankAccount, user }) => ({
        url: `/profile/${user}`,
        method: "PATCH",
        body: { newUsername, firstName, lastName, bankAccount },
      }),
    }),
    createReview: builder.mutation({
      query: ({ content, stars, productId }) => ({
        url: `/productss/${productId}/review`,
        method: "POST",
        body: { content, stars },
      }),
    }),
    getStoreBanner: builder.query({
      query: (storeId) => `/store/banner/${storeId}`,
      providesTags: [],
    }),
    getUsername: builder.query({
      query: (userId) => `/profile/username/${userId}`,
    }),
    getSubCategories: builder.query({
      query: () => "/category/category",
    }),
    getCategory: builder.query({
      query: (categoryId) => `/category/${categoryId}`,
    }),
    getAdresses: builder.query({
      query: (userId) => `/address/all/${userId}`,
      providesTags: ["getAddresses"],
    }),
    patchAddress: builder.mutation({
      query: ({ street, city, state, zip, editAddressId }) => ({
        url: `/address/${editAddressId}`,
        method: "PATCH",
        body: { street, city, state, zip },
      }),
      invalidatesTags: ["getAddresses"],
    }),
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `/address/${addressId}`, // Endpoint URL with the `addressId` parameter
        method: "DELETE",
      }),
      invalidatesTags: ["getAddresses"],
    }),
    addAddress: builder.mutation({
      query: ({ street, city, state, zip, userId }) => ({
        url: `/address/${userId}`,
        method: "POST",
        body: { street, city, state, zip },
      }),
      invalidatesTags: ["getAddresses"],
    }),
    patchPassword: builder.mutation({
      query: ({ curPassword, newPassword, userId }) => ({
        url: `/profile/password/${userId}`,
        method: "PATCH",
        body: { curPassword, newPassword },
      }),
    }),
    createOrder: builder.mutation({
      query: ({
        total,
        method,
        cart,
        address,
        coupon,
        street,
        city,
        state,
        zip,
        userId,
      }) => ({
        url: `/order/checkout/${userId}`,
        method: "POST",
        body: {
          total,
          method,
          cart,
          address,
          coupon,
          street,
          city,
          state,
          zip,
        },
      }),
    }),
    createStore: builder.mutation({
      query: (fd) => ({
        url: `/store/open/${fd.get("userId")}`,
        method: "POST",
        body: fd,
      }),
    }),
    getCategories: builder.query({
      query: () => '/category/',
      providesTags: ["getCategory"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductQuery,
  usePatchProfileMutation,
  useCreateReviewMutation,
  useGetStoreBannerQuery,
  useGetUsernameQuery,
  useGetSubCategoriesQuery,
  useGetCategoryQuery,
  useGetAdressesQuery,
  usePatchAddressMutation,
  useDeleteAddressMutation,
  useAddAddressMutation,
  usePatchPasswordMutation,
  useCreateOrderMutation,
  useCreateStoreMutation,
  useGetCategoriesQuery,
} = apiSlice;
