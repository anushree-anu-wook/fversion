const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const stripe = require("stripe")("sk_test_n19GAD7uXrcV0wAhF5VbnHCV00SByPcC7K");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");


 
  

//Load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

//Route files
const suppliers = require("./routes/suppliers");
const foods = require("./routes/foods");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const subscribs = require("./routes/subscribs");
const public = require("./routes/public");
const order = require("./routes/order");
const category = require("./routes/category");


//initialize app with express
const app = express();

//bodyparser
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.json());




// Cookie parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

//Mount routers
app.use("/api/v1/suppliers", suppliers);
app.use("/api/v1/foods", foods);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/subscribs", subscribs);
app.use("/api/v1/public", public);
app.use("/api/v1/orders", order);
app.use("/api/v1/category", category);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//get information
app.get("/",(req,res)=> {
  res.send("Add yourStripe Secret key to the .require('stripe')statement!");
});

//route handler
app.post("/payment",async(req,res) => {
console.log("Request:",req.body);
let error;
let status;
try {
  const {product,token}=req.body;
  const customer = await
  stripe.customers.create({
    email:token.email,
    source:token.id
  });

  const idempotencyKey = uuid();
  const charge = await stripe.charges.create(
    {
      amount:foods.rate * 100,
      currency:"inr",
      customer:customer.id,
      receipt_email:token.email,
      description:`purchased the Rs {product.title}`,
      shipping:
      {
        name:token.card.name,
        address:{
          line1:token.card.address_line1,
          line2:token.card.address.address_line2,
          city:token.card.address_country,
          postal_code:token.card.address_zip
        }
      }
    },
    {
      idempontencyKey
    }
  );
console.log("charge:",{charge});
status ="success";
}catch(error)
{
  console.error("Error:",error);
  status="failure";
}
res.json({error,status});
});

//handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error :${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});
