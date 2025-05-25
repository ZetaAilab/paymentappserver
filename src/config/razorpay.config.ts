import Razorpay from "razorpay";

import envConfig from "../config/env.config.js";

export const razorpayInstance = () => {
  return new Razorpay({
    key_id: envConfig.RAZORPAY_KEY_ID,
    key_secret: envConfig.RAZORPAY_KEY_SECRET,
  });
};
