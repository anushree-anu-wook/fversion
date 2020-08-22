const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
//const geocoder = require("../utils/geocoder");
const Supplier = require("../models/Supplier");


exports.getMe = asyncHandler(async (req,res,next) => {
  if(req.params.id)
  {
    const supplier = await Supplier.find({user:req.params.id});
    return res.status(200).json({
      success:true,
      data:supplier,
    })
  }
  else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get all suppliers
// @route     GET /api/v1/suppliers
// @access    Public
exports.getSuppliers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single supplier
// @route     GET /api/v1/suppliers/:supplierId
// @access    Public
exports.getSupplier = asyncHandler(async (req, res, next) => {
  const supplier = await Supplier.findById(req.params.supplierId);

  if (!supplier) {
    return next(
      new ErrorResponse(
        `Supplier not found with id of ${req.params.supplierId}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: supplier });
});

// @desc      Create new supplier
// @route     POST /api/v1/suppliers
// @access    Private
exports.createSupplier = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published supplier
  const publishedsupplier = await Supplier.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one supplier
  if (publishedsupplier && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already  a supplier`,
        400
      )
    );
  }

  const supplier = await Supplier.create(req.body);

  res.status(201).json({
    success: true,
    data: supplier,
  });
});

// @desc      Update supplier
// @route     PUT /api/v1/supplier/:supplierId
// @access    Private
exports.updateSupplier = asyncHandler(async (req, res, next) => {
  let supplier = await Supplier.findById(req.params.supplierId);

  if (!supplier) {
    return next(
      new ErrorResponse(
        `Supplier not found with id of ${req.params.supplierId}`,
        404
      )
    );
  }

  // Make sure user is supplier owner
  if (supplier.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.supplierId} is not authorized to update this supplier`,
        401
      )
    );
  }

  supplier = await Supplier.findByIdAndUpdate(req.params.supplierId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: supplier });
});

// @desc      Delete supplier
// @route     DELETE /api/v1/supplier/:supplierId
// @access    Private
exports.deleteSupplier = asyncHandler(async (req, res, next) => {
  const supplier = await Supplier.findById(req.params.supplierId);

  if (!supplier) {
    return next(
      new ErrorResponse(
        `Supplier not found with id of ${req.params.supplierId}`,
        404
      )
    );
  }

  // Make sure user is supplier owner
  if (supplier.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.supplierId} is not authorized to delete this supplier`,
        401
      )
    );
  }

  supplier.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Upload photo for supplier
// @route     PUT /api/v1/supplier/:supplierId/photo
// @access    Private
exports.suppliersPhotoUpload = asyncHandler(async (req, res, next) => {
  const supplier = await Supplier.findById(req.params.supplierId);

  if (!supplier) {
    return next(
      new ErrorResponse(
        `Supplier not found with id of ${req.params.supplierId}`,
        404
      )
    );
  }

  // Make sure user is vendor owner
  if (supplier.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.supplierId} is not authorized to update this supplier`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

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

  // Create custom filename
  file.name = `photo_${supplier._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Supplier.findByIdAndUpdate(req.params.supplierId, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
