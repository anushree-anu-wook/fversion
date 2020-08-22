const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "Please add a category"],
  },
  rate: {
    type: String,
    required: [true, "Please add rate"],
  },
  stock: {
    type: String,
    required: [true, "Please add in stock"],
  },
  
  file: 
    {
      type: String,
      default: "/uploads/no-photo.jpg",
    },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: "Supplier",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Static method to get avg of course tuitions
FoodSchema.statics.getAverageCost = async function (supplierId) {
  const obj = await this.aggregate([
    {
      $match: { supplier: supplierId },
    },
    {
      $group: {
        _id: "$supplier",
        averageCost: { $avg: "$tuition" },
      },
    },
  ]);

  try {
    await this.model("Supplier").findByIdAndUpdate(supplierId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
FoodSchema.post("save", function () {
  this.constructor.getAverageCost(this.supplier);
});

// Call getAverageCost before remove
FoodSchema.pre("remove", function () {
  this.constructor.getAverageCost(this.supplier);
});

module.exports = mongoose.model("Food", FoodSchema);
