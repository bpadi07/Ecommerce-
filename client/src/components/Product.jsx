import React from "react";
import { Link } from "react-router-dom";
import Rating from "../screens/Rating";

export default function Product({ product }) {
  return (
    <div className="w-full px-4 mb-6">
      <Link
        to={`/product/${product._id}`}
        className="transform transition-transform hover:scale-105"
      >
        <div className="bg-white p-6 shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow transform hover:scale-105 w-full max-w-lg mx-auto">
          <div className="relative h-72 overflow-hidden rounded-t-lg mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">
              {product.category}
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 truncate">
            {product.name}
          </h2>
          <div className="flex items-center mt-2 text-sm">
            {/* <span className="text-yellow-500 mr-1">⭐ {product.rating}</span>
            <span className="text-gray-500">
              ({product.numReviews} reviews)
            </span> */}
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
          <p className="mt-4 text-lg font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </p>
          {product.onSale && (
            <span className="text-sm text-red-500 font-semibold">On Sale!</span>
          )}
        </div>
      </Link>
    </div>
  );
}
