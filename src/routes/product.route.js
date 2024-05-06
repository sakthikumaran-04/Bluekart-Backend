import express from "express";
import { getProducts , getCategory, searchProducts, fetchSingleProduct, fetchAllCategories} from "../controllers/product.controller.js";
import { filters } from "../middlewares/filters.js";
const productRouter =express.Router();
productRouter.get("/search",filters,searchProducts)
productRouter.get("/:id",fetchSingleProduct)
productRouter.get("/",filters,getProducts);

export {productRouter}