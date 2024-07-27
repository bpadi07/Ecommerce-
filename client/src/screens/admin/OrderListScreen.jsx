import React from "react";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from "../../slices/orderApiSlice";

export default function OrderListScreen() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const handleDelete = async (orderId) => {
    console.log("Deleting order ID:", orderId);
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully");
    } catch (err) {
      if (err?.status === 404) {
        toast.error("Order not found");
      } else {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  if (isLoading || isDeleting) {
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
                Delivered
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
                  {order.isDelivered ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                      View Details
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-500 text-white font-bold py-2 px-4 m-2 rounded"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
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
