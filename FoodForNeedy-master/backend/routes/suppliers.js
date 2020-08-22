const express = require("express");
const {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getMe,
  // getSupplierInRadius,
  suppliersPhotoUpload,
} = require("../controllers/supplier");

const Supplier = require("../models/Supplier");

// Include other resource routers
const FoodsRouter = require("./foods");
const reviewRouter = require("./reviews");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:supplierId/foods", FoodsRouter);
router.use("/:supplierId/reviews", reviewRouter);

// router.route("/radius/:zipcode/:distance").get(getSuppliersInRadius);

router
  .route("/photo")
  .post(protect, authorize("supplier", "admin"), suppliersPhotoUpload);

router
  .route("/")
  .get(advancedResults(Supplier, "Foods"), getSuppliers)
  .post(protect, authorize("supplier", "admin"), createSupplier);

router
  .route("/:supplierId")
  .get(getSupplier)
  .put(protect, authorize("supplier", "admin"), updateSupplier)
  .delete(protect, authorize("supplier", "admin"), deleteSupplier);

  router.get("/:id/me",protect,getMe);

module.exports = router;
