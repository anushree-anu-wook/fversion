const express = require("express");
const {
  getPublics,
  getPublic,
  createPublic,
  updatePublic,
  deletePublic,
  getMe,
  // getVendorsInRadius,
  publicPhotoUpload,
} = require("../controllers/public");

const Public = require("../models/Public");

// Include other resource routers
const cartRouter = require("./order");
// const reviewRouter = require("./reviews");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:publicId/order", cartRouter);
// router.use("/:publicId/reviews", reviewRouter);

// router.route("/radius/:zipcode/:distance").get(getVendorsInRadius);

router
  .route("/:publicId/photo")
  .put(protect, authorize("ngo", "admin"), publicPhotoUpload);

router
  .route("/")
  .get(advancedResults(Public), getPublics)
  .post(protect, authorize("ngo", "admin"), createPublic);

router
  .route("/:publicId")
  .get(getPublic)
  .put(protect, authorize("ngo", "admin"), updatePublic)
  .delete(protect, authorize("ngo", "admin"), deletePublic);
  router.get("/:id/me",protect,getMe);
module.exports = router;
