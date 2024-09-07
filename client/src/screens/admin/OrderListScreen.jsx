import React, { useState } from "react";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useUpdateOrderToProcessedMutation,
  useAssignTrackingNumberMutation,
  useDeleteOrderMutation,
} from "../../slices/orderApiSlice";

export default function OrderListScreen() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [deliverOrder] = useDeliverOrderMutation();
  const [updateOrderToProcessed] = useUpdateOrderToProcessedMutation();
  const [assignTrackingNumber] = useAssignTrackingNumberMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [trackingNumbers, setTrackingNumbers] = useState({});

  const handleProcessOrder = async (orderId) => {
    try {
      await updateOrderToProcessed(orderId).unwrap();
      toast.success("Order marked as processed");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const handleAssignTracking = async (orderId) => {
    const trackingNumber = trackingNumbers[orderId];
    if (!trackingNumber) {
      toast.error("Please enter a tracking number");
      return;
    }
    try {
      await assignTrackingNumber({ orderId, trackingNumber }).unwrap();
      toast.success("Tracking number assigned");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const handleDeliverOrder = async (orderId) => {
    try {
      await deliverOrder(orderId).unwrap();
      toast.success("Order marked as delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const handleTrackingInputChange = (orderId, value) => {
    setTrackingNumbers((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error.message);
    return null;
  }

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                ID
              </th>
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                User
              </th>
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                Date
              </th>
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                Total
              </th>
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                Status
              </th>
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                  {order._id}
                </td>
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                  {order.user?.name}
                </td>
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                  {order.createdAt.slice(0, 10)}
                </td>
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                  ${order.totalPrice}
                </td>
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                  {order.isDelivered
                    ? "Delivered"
                    : order.trackingNumber
                    ? "Assigned to Tracking"
                    : order.isProcessed
                    ? "Processed"
                    : "Pending"}
                </td>
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                      View Details
                    </button>
                  </Link>
                  {!order.isProcessed && (
                    <button
                      className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 m-2 rounded"
                      onClick={() => handleProcessOrder(order._id)}
                    >
                      Mark as Processed
                    </button>
                  )}
                  {order.isProcessed && !order.trackingNumber && (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Tracking Number"
                        value={trackingNumbers[order._id] || ""}
                        onChange={(e) =>
                          handleTrackingInputChange(order._id, e.target.value)
                        }
                        className="border border-gray-300 py-1 px-2 m-2 rounded"
                      />
                      <button
                        className="bg-yellow-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded"
                        onClick={() => handleAssignTracking(order._id)}
                      >
                        Assign Tracking
                      </button>
                    </div>
                  )}
                  {order.trackingNumber && !order.isDelivered && (
                    <button
                      className="bg-red-500 hover:bg-red-500 text-white font-bold py-2 px-4 m-2 rounded"
                      onClick={() => handleDeliverOrder(order._id)}
                    >
                      Mark as Delivered
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
