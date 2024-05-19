import { Router } from "express";
import { payment } from "../controllers/payment.controller.js";
const paymentRouter = Router();
paymentRouter.post("/",payment);
export {paymentRouter}