const path = require("path");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Foods = require("../models/Foods");
const Supplier = require("../models/Supplier");
const Category = require("../models/Category");

// @desc      Get foods
// @route     GET /api/v1/foods
// @route     GET /api/v1/supplier/:supplierID/foods
// @access    Public
exports.getFoods = asyncHandler(async (req, res, next) => {
  if (req.params.supplierId) {
    const foods = await Foods.find({ user: req.params.supplierId });

    return res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single supplier
// @route     GET api/v1/supplier/:Id/foods/:foodId
// @access    Public
exports.getFood = asyncHandler(async (req, res, next) => {
  const food = await Foods.findById(req.params.foodId)
    .populate({
      path: "category",
    })
    .populate({ path: "supplier" });

  if (!food) {
    return next(
      new ErrorResponse(`No food with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: food,
  });
});

// @desc      Add food
// @route     POST api/v1/suppliers/:suppliersId/foods
// @access    Private
exports.addFood = asyncHandler(async (req, res, next) => {
  // req.body.supplier = req.params.foodId;
  req.body.user = req.user.id;

  const supplier = await Supplier.findOne({ user: req.user.id });

  if (!supplier) {
    return next(
      new ErrorResponse(`No supplier with the id of ${req.params.supplierId}`),
      404
    );
  }

  // Make sure user is food owner
  if (supplier.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a food by ${supplier._id}`,
        401
      )
    );
  }

  const category = await Category.findById(req.body.category);
  req.body.supplier = supplier.id;
  req.body.catname = category.catname;
  const food = await Foods.create(req.body);

  res.status(200).json({
    success: true,
    data: food,
  });
});

// @desc      Update food
// @route     PUT /api/v1/suppliers/:suppliersId/:foodId
// @access    Private
exports. updateFood = asyncHandler(async (req, res, next) => {
  let food= await await Foods.findById(req.params.foodId);

  if (!food) {
    return next(
      new ErrorResponse(`No Food with the id of ${req.params.foodId}`),
      404
    );
  }

  // Make sure user is food owner
  if (food.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update food ${food._id}`,
        401
      )
    );
  }

  food = await Foods.findByIdAndUpdate(req.params.foodId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: food,
  });
});

// @desc      Delete food
// @route     DELETE /api/v1/suppliers/:suppliersId/foods/:foodId
// @access    Private
exports.deleteFood = asyncHandler(async (req, res, next) => {
  const food = await Foods.findById(req.params.foodId);

  if (!food) {
    return next(
      new ErrorResponse(`No Food with the id of ${req.params.foodId}`),
      404
    );
  }

  // Make sure user is food owner
  if (food.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete food ${food._id}`,
        401
      )
    );
  }

  await food.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Upload photo for food
// @route     PUT /api/v1/suppliers/:suppliersId/suppliers/:supplierId/photo
// @access    Private
exports.foodPhotoUpload = asyncHandler(async (req, res, next) => {
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }
  
    const file = req.files.file;
    console.log(file);
  
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }
  
    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    file.mv(
      `${__dirname}/../../need-app/public/uploads/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return next(new ErrorResponse(`Problem with file upload`, 500));
        }
  
        const files = `/uploads/${file.name}`;
  
        res.status(200).json({
          success: true,
          data: files,
        }
        )
      
      })
    })
  