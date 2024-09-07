import React from "react";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayWithStripeMutation,
} from "../slices/orderApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function OrderScreen() {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payWithStripe, { isLoading: loadingStripe }] =
    usePayWithStripeMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error.message || "Failed to load order details.");
    return <div>Error loading order details.</div>;
  }

  const {
    shippingAddress,
    user,
    isDelivered,
    orderItems,
    shippingPrice,
    taxPrice,
    trackingNumber,
    isProcessed,
  } = order;

  const calculateTotal = (orderItems) => {
    return orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  const handleStripePayment = async (orderItems) => {
    try {
      const res = await payWithStripe(orderItems).unwrap();
      window.location.href = res.url;
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const deliverOrderHandler = async (orderId) => {
    try {
      await deliverOrder(orderId);
      refetch();
    } catch (error) {
      toast.error("Failed to mark the order as delivered.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start">
      <div className="md:w-2/3 p-4">
        <h2 className="text-3xl font-semibold mb-4">Order Details</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Order Number:</h3>
          <p>{orderId}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Details:</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Address: {shippingAddress.address}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Order Status:</h3>

          {isDelivered ? (
            <p
              style={{ color: "green", fontSize: 20, fontFamily: "sans-serif" }}
            >
              Delivered
            </p>
          ) : trackingNumber ? (
            <p
              style={{ color: "green", fontSize: 20, fontFamily: "sans-serif" }}
            >
              Assigned Tracking Number
            </p>
          ) : isProcessed ? (
            <p
              style={{
                color: "green",
                fontSize: 20,
                fontFamily: "sans-serif",
              }}
            >
              Processed
            </p>
          ) : (
            <p style={{ color: "Red", fontSize: 20, fontFamily: "sans-serif" }}>
              Pending
            </p>
          )}
        </div>
      </div>

      <div className="md:w-1/3 bg-gray-100 p-4">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left">Product</th>
              <th className="text-right">Quantity</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item) => (
              <tr key={item._id} className="border-b border-gray-400">
                <td className="text-left">{item.name}</td>
                <td className="text-right">{item.qty}</td>
                <td className="text-right">
                  ${(item.price * item.qty).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="border-b border-gray-400">
              <td className="text-left font-semibold">Shipping</td>
              <td className="text-right"></td>
              <td className="text-right">${shippingPrice}</td>
            </tr>
            <tr className="border-b border-gray-400">
              <td className="text-left font-semibold">Tax</td>
              <td className="text-right"></td>
              <td className="text-right">${taxPrice}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <p className="text-right font-semibold">
            Total: $
            {(
              calculateTotal(orderItems) +
              Number(shippingPrice) +
              Number(taxPrice)
            ).toFixed(2)}
          </p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 mr-3"
          onClick={() => handleStripePayment(orderItems)}
        >
          Pay with Stripe
        </button>
        {userInfo.isAdmin && !isDelivered && (
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-950"
            onClick={() => deliverOrderHandler(orderId)}
          >
            Mark as Delivered
          </button>
        )}
        {loadingStripe && <Spinner />}
      </div>
    </div>
  );
}
