const express = require("express");

const {
  getOrders,
  getPlacedOrders,
  addCart,
  placeOrder,
  deleteCart,
  getPendingOrders,
  getOrderdOrders,
} = require("../controllers/order");

const Orders = require("../models/Order");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Orders, {
      path: "food",
      select: "title price qty photo ",
    }),
    getOrders
  )
  .post(protect, addCart);

router.route("/orders").get(getPlacedOrders);
router.route("/orders/:id").get(getOrderdOrders);
router.route("/pending").get(protect, getPendingOrders);

router.route("/orders/:orderId").put(protect, placeOrder);

router
  .route("/:orderId")
  //.post(protect, authorize("public", "admin"), addOrder)
  // .put(protect, authorize("public", "admin"), updateOrder)
  .delete(protect, deleteCart);

module.exports = router;
