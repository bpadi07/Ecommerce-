import express from "express"
import { protect, admin } from "../middleware/authMiddleware.js"

import {
  addOrderItems,
  getUserOrders,
  getOrderById,
  getOrders,
  deleteOrder,
  updateOrderToProcessed,
  updateOrderToTrackingAssigned,
  updateOrderToDelivered,
  setReturnDeadline,
  returnProduct,
} from "../controllers/orderController.js"
const router = express.Router()

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders)
router.route("/user-orders").get(protect, getUserOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id").delete(protect,admin,deleteOrder);



router.route('/:id/processed').patch(protect, admin,  updateOrderToProcessed);
router.route('/:id/tracking').patch(protect, admin, updateOrderToTrackingAssigned);
router.route('/:id/deliver').patch(protect, admin, updateOrderToDelivered);
router.route('/:id/set-return-deadline').put(protect, admin, setReturnDeadline);
router.route('/:id/return').put(protect, returnProduct);


export default router
