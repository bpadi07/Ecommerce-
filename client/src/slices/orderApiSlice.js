import { apiSlice } from "./apiSlice";
import { BACKEND_URL, ORDERS_URL } from "../constants.js";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "GET", // Changed to GET
        
      }),
      keepUnusedDataFor: 5,
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/user-orders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "DELETE",
      }),
    }),
    payWithStripe: builder.mutation({
      query: (orderItems) => ({
        url: `${BACKEND_URL}/create-checkout-session`,
        method: "POST",
        body: orderItems,
      }),
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PATCH",
      }),
    }),
    updateOrderToProcessed: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/processed`,
        method: "PATCH",
      }),
    }),
    assignTrackingNumber: builder.mutation({
      query: ({ orderId, trackingNumber }) => ({
        url: `${ORDERS_URL}/${orderId}/tracking`,
        method: "PATCH",
        body: { trackingNumber },
      }),
    }),
    setReturnDeadline: builder.mutation({
      query: ({ orderId, returnDays }) => ({
        url: `${ORDERS_URL}/${orderId}/set-return-deadline`,
        method: "PUT",
        body: { returnDays },
      }),
    }),
    returnProduct: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/return`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetUserOrdersQuery,
  usePayWithStripeMutation,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderToProcessedMutation,
  useAssignTrackingNumberMutation,
  useSetReturnDeadlineMutation,
  useReturnProductMutation,
} = orderApiSlice;
