const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Subscribe = require("../models/Subscribe");
// const Public = require("../models/");

// @desc      Get reviews
// @route     GET /api/v1/reviews

// @access    Public
exports.getSubscribs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single review
// @route     GET /api/v1/reviews
// @route     GET /api/v1/products/:productId/reviews/:id
// @access    Public
// exports.getReview = asyncHandler(async (req, res, next) => {
//   const review = await Review.findById(req.params.productId).populate({
//     path: "product",
//     select: "name ",
//   });

//   if (!review) {
//     return next(
//       new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
//     );
//   }

//   res.status(200).json({
//     success: true,
//     data: review,
//   });
// });

// @desc      Add review
// @route     POST /api/v1/public/:publicId/reviews
// @access    Private
exports.addSubscribe = asyncHandler(async (req, res, next) => {
  // req.body.product = req.params.productId;
  // req.body.user = req.user.id;

  const subscribe = await Subscribe.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc      Update subscribe
// @route     PUT /api/v1/reviews/:id
// @access    Private
exports.updateSubscribe = asyncHandler(async (req, res, next) => {
  let subscribe = await Review.findById(req.params.id);

  if (!subscribe) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user is admin
  if (subscribe.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to update review`, 401));
  }

  subscribe = await Subscribe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteSubscribe = asyncHandler(async (req, res, next) => {
  const subscribe = await Subscribe.findById(req.params.id);

  if (!subscribe) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user is admin
  // if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
  //   return next(new ErrorResponse(`Not authorized to update review`, 401));
  // }

  await subscribe.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
