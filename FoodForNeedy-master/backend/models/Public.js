const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const PublicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      maxlength: [50, "Name can not be more than 50 characters"],
    },

    phone: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Transender"],
    },
    dob: {
      type: String,
      required: [true, "Please add Date of Birth"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    /*location: {
       //GeoJSON Point
      type: {
        type: String,
       enum: ["Point"],
      },
      coordinates: {
       type: [Number],
       index: "2dsphere",
      },
     formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },*/
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create  slug from the name




// Cascade delete order when a public is deleted
PublicSchema.pre("remove", async function (next) {
  console.log(`Order being removed from list ${this._id}`);
  await this.model("Order").deleteMany({ public: this._id });
  next();
});

// Reverse populate with virtuals
PublicSchema.virtual("order", {
  ref: "Orderlist",
  localField: "_id",
  foreignField: "public",
  justOne: false,
});

module.exports = mongoose.model("Public", PublicSchema);
