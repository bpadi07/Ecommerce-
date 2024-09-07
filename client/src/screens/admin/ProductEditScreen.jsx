import React, { useState, useEffect } from "react";
import {
  useGetProductDetailsQuery,
  //useGetProductsQuery,
  useUpdateProductMutation,
  useUploadFileHandlerMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function ProductEditScreen() {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading: loadingProduct,
    error,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: uploadLoading }] =
    useUploadFileHandlerMutation();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    discount: 0,
    image: "",
    brand: "",
    category: "",
    countInStock: 0,
    returnduedate: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.image,
        brand: product.brand,
        category: product.category,
        countInStock: product.countInStock,
        returnduedate: product.returnduedate,
        description: product.description,
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        ...productData,
      }).unwrap();
      toast.success("Product Updated");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setProductData((prev) => ({
        ...prev,
        image: res.image,
      }));
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  if (loadingProduct) return <Spinner />;
  if (error) {
    toast.error(error?.data?.message || error?.error);
    return null;
  }

  return (
    <div className="w-1/3 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discount" className="block font-medium">
            Discount:
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={productData.discount}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-medium">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={uploadFileHandler}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="brand" className="block font-medium">
            Brand:
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium">
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="countInStock" className="block font-medium">
            Count In Stock:
          </label>
          <input
            type="number"
            id="countInStock"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="returnduedate" className="block font-medium">
            Return Due Date:
          </label>
          <input
            type="number"
            id="returnduedate"
            name="returnduedate"
            value={productData.returnduedate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update Product
          </button>
          {loadingUpdate && <Spinner />}
        </div>
      </form>
    </div>
  );
}
