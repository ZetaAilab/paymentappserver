import Crypto from "crypto";
import { NextFunction, Request, Response } from "express";

import envConfig from "../config/env.config.js";
import { razorpayInstance } from "../config/razorpay.config.js";

// interface RazorpayWebhookPayload {
//   amount: number;
//   orderID: string;
// }

export const receivePayment = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { amount } = req.body;
  console.log(amount);
  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "receipt_order_74394",
  };
  try {
    const razorpay = razorpayInstance();
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const verifyPayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const secret = envConfig.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    res.status(500).json({ message: "Server misconfiguration" });
    return;
  }

  try {
    const generatedSignature = Crypto.createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      res.status(200).json({
        message: "Payment verified successfully",
        success: true,
      });
    } else {
      res.status(400).json({
        message: "Payment verification failed",
        success: false,
      });
    }
  } catch (error) {
    next(error);
  }
};
