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


// router.get("/",asyncHandler(async(req,res)=>{
  
//       const products=await Product.find({})
//       if(products){
//         res.json(products)
//       }
//       else{
//         res.status(404)
//         throw new Error("Products not found")
//       }
//       // console.log(products);
//       // res.json(products)
// })

// )
// router.get("/:id",asyncHandler(async(req,res)=>{

//   const product=await Product.findById(req.params.id)
//   if(product){
//     res.json(product)
//   }
//   else{
//     res.status(404)
//     throw new Error("product is not found")
//   }
//   // res.json(product)



  
// })
// )
export default router
