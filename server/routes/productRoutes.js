import express from "express"
// import Product from "../models/productModel.js"
// import asyncHandler from "express-async-handler"
const router=express.Router()
import { protect, admin } from "../middleware/authMiddleware.js"
import {
  createProduct,
  createProductReview,
  deleteProduct,
  updateProduct,
  updateProductDiscount
} from "../controllers/productController.js"

import {
  getProductbyId,
  getProducts,
} from "../controllers/productController.js"


router.route("/").get(getProducts).post(protect, admin, createProduct)
router
  .route("/:id")
  .get(getProductbyId)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

router.route("/:id/review").post(protect, createProductReview)
router.put('/:id/discount', updateProductDiscount);



export default router
