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
      providesTags: ["getProduct"],
    }),
    getStores: builder.query({
      query: () => "/store/",
      providesTags: ["getStores"],
    }),
    patchProfile: builder.mutation({
      query: ({ newUsername, firstName, lastName, bankAccount, user }) => ({
        url: `/profile/${user}`,
        method: "PATCH",
        body: { newUsername, firstName, lastName, bankAccount },
      }),
    }),
    createReview: builder.mutation({
      query: ({ content, stars, productId, userId }) => ({
        url: `/productss/${productId}/review/${userId}`,
        method: "POST",
        body: { content, stars },
      }),
      invalidatesTags: ["getProduct"],
    }),
    getStoreBanner: builder.query({
      query: (storeId) => `/store/banner/${storeId}`,
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
        user,
      }) => ({
        url: `/order/checkout/${user}`,
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
      query: () => "/category/",
      providesTags: ["getCategory"],
    }),
    getReviews: builder.query({
      query: (id) => `/store/reviews/${id}`,
    }),
    getQuestions: builder.query({
      query: (id) => `/store/questions/${id}`,
    }),

    answerQuestion: builder.mutation({
      query: ({ answer, id }) => ({
        url: `/store/questions/answer/${id}`,
        method: "PATCH",
        body: { answer },
      }),
    }),
    deleteStore: builder.mutation({
      query: (id) => ({
        url: `/store/${id}`, // Endpoint URL with the `addressId` parameter
        method: "DELETE",
      }),
      invalidatesTags: ["getStores"],
    }),

    getStores: builder.query({
      query: () => `/store`,
      providesTags: ["getStores"],
    }),

    getUsers: builder.query({
      query: () => `/admin`,
      providesTags: ["getUsers"],
    }),

    getAdmins: builder.query({
      query: () => `/admin/admins`,
      providesTags: ["getAdmins"],
    }),

    getAllStores: builder.query({
      query: () => `/admin/stores`,
      providesTags: ["getAllStores"],
    }),

    getAllProducts: builder.query({
      query: () => `/admin/products`,
      providesTags: ["getAllProducts"],
    }),

    getStoreFromUser: builder.query({
      query: (userId) => `/store/mystore/${userId}`,
      providesTags: ["getStoreFromUser"],
    }),

    editStore: builder.mutation({
      query: ({ name, email, description, phone, workingHours, store }) => ({
        url: `/store/edit/${store}`,
        method: "PATCH",
        body: { name, email, description, phone, workingHours },
      }),
    }),

    editBanner: builder.mutation({
      query: ({ banner, store }) => ({
        url: `/store/edit/banner/${store}`,
        method: "PATCH",
        body: { banner },
      }),
    }),

    getStoreOrders: builder.query({
      query: (store) => `/order/${store}`,
      providesTags: ["getStoreOrders"],
    }),

    getProductsFromStore: builder.query({
      query: (store) => `/productss/${store}`,
      providesTags: ["getStoreProducts"],
    }),

    handleOrder: builder.mutation({
      query: ({ order, state }) => ({
        url: `/order/shop/${order}`,
        method: "PATCH",
        body: { state },
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ name, price, quantity, description, id }) => ({
        url: `/productss/${id}`,
        method: "PATCH",
        body: { name, price, quantity, description },
      }),
    }),
    searchProduct: builder.query({
      query: ({ fsearch, category }) =>
        `productss/search/${fsearch}/category/${category}`,
    }),

    getUserOrders: builder.query({
      query: (user) => `/order/completed/${user}`,
      providesTags: ["getStoreFromUser"],
    }),
    userHasStore: builder.query({
      query: (userId) => `/store/hasStore/${userId}`,
    }),

    createReport: builder.mutation({
      query: ({ review, user, type }) => ({
        url: `/productss/report/user`,
        method: "POST",
        body: { type, review, user },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getUsers"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/productss/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    verifyProduct: builder.mutation({
      query: (id) => ({
        url: `/productss/verify/${id}`,
        method: "PATCH",
      }),
    }),
    verifyStore: builder.mutation({
      query: (id) => ({
        url: `/store/${id}`,
        method: "PATCH",
      }),
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
  useGetReviewsQuery,
  useGetQuestionsQuery,
  useAnswerQuestionMutation,
  useDeleteStoreMutation,
  useVerifyStoreMutation,
  useGetStoresQuery,
  useEditStoreMutation,
  useGetStoreFromUserQuery,
  useEditBannerMutation,
  useGetStoreOrdersQuery,
  useHandleOrderMutation,
  useGetProductsFromStoreQuery,
  useUpdateProductMutation,
  useSearchProductQuery,
  useGetUserOrdersQuery,
  useUserHasStoreQuery,
  useCreateReportMutation,
  useGetAllStoresQuery,
  useGetAllProductsQuery,
  useGetUsersQuery,
  useGetAdminsQuery,
  useDeleteUserMutation,
  useDeleteProductMutation,
  useVerifyProductMutation,
} = apiSlice;
