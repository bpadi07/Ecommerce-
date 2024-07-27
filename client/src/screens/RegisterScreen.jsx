import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/userSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { BACKEND_URL } from "../constants";

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        const res = await register({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Register Successful");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
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
    <div className="flex items-center justify-center min-h-screen bg-orange-100">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
        <div className="w-1/2 p-8 bg-orange-500 text-white flex flex-col items-center justify-center">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.msfb5Wm3RTKAQ01R6EZgRgHaHa&pid=Api&P=0&h=180"
            alt="Illustration"
            className="w-3/4 mb-4"
          />
          <h2 className="text-2xl font-semibold">
            Start for free and get attractive offers.
          </h2>
        </div>
        <div className="w-1/2 p-8 py-2">
          <h2 className="text-2xl px-40 py-5 font-semibold text-gray-700">
            Register
          </h2>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-700">
                I agree to the{" "}
                <span className="text-blue-500">Terms of Service</span> and{" "}
                <span className="text-blue-500">Privacy Policy</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-orange-600"
              disabled={isLoading}
            >
              Register
            </button>
            {isLoading && <Spinner />}
            <h1 className="px-40 py-2 items-center justify-center">OR</h1>
            <div className="flex justify-center mt-4 mb-6">
              <button
                onClick={handleGoogleAuth}
                className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md mx-2 flex items-center hover:bg-blue-500 justify-center"
              >
                <i className="fab fa-google mr-2"></i> Sign up with Google
              </button>
            </div>
            <p className="mt-2">
              Already have an account?
              <Link to="/login" className="text-blue-500">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
