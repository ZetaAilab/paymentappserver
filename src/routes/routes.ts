import express from "express";

import authRouter from "./auth.routes.js";
import { receivePayment, verifyPayment } from "../controller/razorpay.controller.js";
const RootRouter = express.Router();

RootRouter.use("/auth", authRouter);

export default RootRouter;
