// generate-signature.js

const crypto = require("crypto");

// 1. Define your webhook secret (same as in Razorpay dashboard & your .env)
const secret = "swapnesh@839";

// 2. Define the exact payload you’ll send
const payload = JSON.stringify({
  amount: 12234,
  orderID: 4532145643,
});

// 3. Compute the HMAC SHA256 signature
const signature = crypto
  .createHmac("sha256", secret)
  .update(payload)
  .digest("hex");

// 4. Print out both so you can copy/paste
console.log("---- Copy these for your test request ----");
console.log("Payload JSON:");
console.log(payload);
console.log("\nCalculated x-razorpay-signature:");
console.log(signature);
