import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useLoginMutation,
  useForgotPasswordMutation,
} from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/userSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { BACKEND_URL } from "../constants";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const [login, { isLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: isLoadingPassword }] =
    useForgotPasswordMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Login Successful");
    } catch (error) {
      toast.error(
        error?.data?.message || error?.error || "Invalid email or password"
      );
    }
  };

  const handleForgotPassword = async () => {
    if (!email) alert("Please enter your email");
    else {
      try {
        const res = await forgotPassword({ email }).unwrap();
        toast.success(res.message);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleGoogleAuth = () => {
    try {
      window.location.href = `${BACKEND_URL}/auth/google/callback`;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img
            src="profile-placeholder.png"
            alt="profile"
            className="w-20 h-20 rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">WELCOME</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              <span className="flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 10a8 8 0 1116 0A8 8 0 012 10z"></path>
                </svg>
                Username
              </span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border border-gray-300 p-3 rounded-md mt-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              <span className="flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 8a4 4 0 018 0v2h3a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1v-8a1 1 0 011-1h3V8zm4-3a3 3 0 00-3 3v2h6V8a3 3 0 00-3-3zm-3 7h6v6H6v-6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Password
              </span>
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-100 border border-gray-300 p-3 rounded-md mt-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 text-right">
            <span
              className="text-green-500 cursor-pointer hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </span>
          </div>
          {isLoadingPassword && <Spinner />}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600 transition duration-300 ease-in-out"
            disabled={isLoading}
          >
            LOGIN
          </button>
          {isLoading && <Spinner />}
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-500 hover:underline">
            Register here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
