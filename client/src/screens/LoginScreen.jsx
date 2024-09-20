import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useLoginMutation,
  useForgotPasswordMutation,
} from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/userSlice";
import { BACKEND_URL, BASE_URL } from "../constants";
import Spinner from "../components/Spinner";

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
      toast.error(error?.data?.message || error?.error);
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Login </h1>
            </div>
            <form onSubmit={handleLogin} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-500"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-500"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm text-green-500 cursor-pointer hover:underline"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </span>
                </div>
                {isLoadingPassword && <Spinner />}
                <div className="relative">
                  <button
                    type="submit"
                    className="bg-green-500 text-white rounded-md px-2 py-1 w-full hover:bg-green-600"
                    disabled={isLoading}
                  >
                    Login
                  </button>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md px-2 py-1 w-full hover:bg-red-600 mt-2"
                    onClick={handleGoogleAuth}
                  >
                    Sign in with Google
                  </button>
                </div>
                {isLoading && <Spinner />}
              </div>
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
      </div>
    </div>
  );
}
