const express = require("express");

const {
  getFoods,
  getFood,
  getCategoryFood,
  addFood,
  updateFood,
  deleteFood,
  foodPhotoUpload,
} = require("../controllers/foods");
const reviewRouter = require("./reviews");

const Food = require("../models/Foods");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");
router.use("/:foodId/reviews", reviewRouter);

router
  .route("/photo")
  .post(protect, foodPhotoUpload);

router
  .route("/")
  .get(
    advancedResults(Food, {
      path: "category",
      select: "catname",
    }),
    getFoods
  )
  .post(protect, authorize("supplier", "admin"), addFood);

router
  .route("/:foodId")
  .get(getFood)
  .put(protect, authorize("supplier", "admin"), updateFood)
  .delete(protect, authorize("supplier", "admin"), deleteFood);

module.exports = router;
