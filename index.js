import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {productRouter} from "./src/routes/product.route.js"
import { fetchAllCategories, getCategory } from "./src/controllers/product.controller.js";
import { filters } from "./src/middlewares/filters.js";
import { paymentRouter } from "./src/routes/payment.route.js";

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();
const router=express.Router();
app.use(express.json());
app.use(cors({
  origin:"*"
}));
app.use("/api/products",productRouter);
app.use("/api/payment",paymentRouter);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Max-Age', '86400');
      return res.status(204).end();
  }
  next();
});
app.get("/",(req,res)=>{
  res.status(200).json({
    status:"success",
    apiRoutes:{
      fetchAllProduct:"/api/products",
      changeSkipLimit:"/api/products?skip=10&limit=10",
      fetchSingleItem:"/api/products/id",
      fetchAllCategories:"/api/categories",
      fetchCategory:"/api/category/categoryName",
      search:"/api/products/search?query=example",
      sortByPrice:[
        {"asc":"/api/products?sort=priceLtoH"},
        {"desc":"/api/products?sort=priceHtoL"}
      ],
      sortByRating:[
        {"asc":"/api/products?sort=ratingLtoH"},
        {"desc":"/api/products?sort=ratingHtoL"}
      ]
    }
  })
})
app.get("/api/categories",fetchAllCategories);
app.get("/api/category/:category",filters,getCategory)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Databse connected!!!");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to database!");
    console.log(error)
  });
