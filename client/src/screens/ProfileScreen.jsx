import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetOrderDetailsQuery,
  useGetUserOrdersQuery,
  useReturnProductMutation,
} from "../slices/orderApiSlice";
import { useUpdateUserProfileMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/userSlice";
import Spinner from "../components/Spinner";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { data: orderItems } = useGetOrderDetailsQuery();
  const { data: userOrders, isLoading, error } = useGetUserOrdersQuery();
  const [updateUser, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [returnProduct] = useReturnProductMutation();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateUser({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Updated Profile");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleReturnProduct = async (orderId, productId) => {
    try {
      await returnProduct({ orderId, productId }).unwrap();
      toast.success("Product return request submitted.");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const calculateRemainingDays = (returnduedate) => {
    const today = new Date();
    const deadlineDate = new Date(returnduedate);
    const differenceInTime = deadlineDate - today;
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <h1 className="text-xl font-semibold mb-4">Profile</h1>
        <form className="mb-6" onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border p-2 w-full rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border p-2 w-full rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border p-2 w-full rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="border p-2 w-full rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Update Profile
          </button>
          {isUpdating && <Spinner />}
        </form>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userOrders?.length > 0 ? (
              userOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border p-2">{order._id}</td>
                  <td className="border p-2">{order.createdAt.slice(0, 10)}</td>
                  <td className="border p-2">${order.totalPrice}</td>
                  <td className="border p-2">
                    {order.isDelivered ? (
                      <p
                        style={{
                          color: "green",
                          fontSize: 20,
                          fontFamily: "sans-serif",
                        }}
                      >
                        Delivered
                      </p>
                    ) : (
                      <p
                        style={{
                          color: "red",
                          fontSize: 20,
                          fontFamily: "sans-serif",
                        }}
                      >
                        Not Delivered
                      </p>
                    )}
                  </td>
                  <td className="border p-2">
                    {order.orderItems?.map((item) => {
                      const remainingDays = calculateRemainingDays(
                        item.returnduedate
                      );
                      return (
                        <div key={item._id}>
                          {/* <p>
                            {item.isDelivered
                              ? `${remainingDays} days left`
                              : "Return period expired"}
                          </p> */}
                          {order.isDelivered && remainingDays > 0 && (
                            <button
                              className="bg-red-500 text-white p-1 rounded-md mt-2"
                              onClick={() =>
                                handleReturnProduct(order._id, item._id)
                              }
                            >
                              Return Product
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 p-4">
                  No Orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
