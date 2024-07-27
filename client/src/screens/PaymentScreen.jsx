import React, { useState } from "react";
import { savePaymentMethod } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PaymentScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");

  const handleContinue = () => {
    dispatch(savePaymentMethod(selectedPayment));
    navigate("/place-order");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Payment Method
        </h2>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 text-lg">
            Select Payment:
          </label>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Stripe or Credit card"
                className="form-radio h-5 w-5 text-blue-600"
                onChange={(e) => setSelectedPayment(e.target.value)}
                checked={selectedPayment === "Stripe or Credit card"}
              />
              <span className="ml-2 text-gray-700">Stripe or Credit Card</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Cash on delivery"
                className="form-radio h-5 w-5 text-blue-600"
                onChange={(e) => setSelectedPayment(e.target.value)}
                checked={selectedPayment === "Cash on delivery"}
              />
              <span className="ml-2 text-gray-700">Cash On Delivery</span>
            </label>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 text-white text-lg px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleContinue}
          disabled={!selectedPayment}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
