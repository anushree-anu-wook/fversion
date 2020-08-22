const express = require("express");
const {
  getSubscribs,
  getSubscribe,
  addSubscribe,
  updateSubscribe,
  deleteSubscribe,
} = require("../controllers/subscribs");

const Subscribe = require("../models/Subscribe");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(advancedResults(Subscribe), getSubscribs)
  .post(addSubscribe);

router
  .route("/:id")
  // .get(getReview)
  // .put(protect, updateReview)
  .delete(protect, deleteSubscribe);

module.exports = router;
