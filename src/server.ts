import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response as ExpressResponse } from "express";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
// import Razorpay from "razorpay";
import { fileURLToPath } from "url";

import envConfig from "./config/env.config.js";
import { startServer } from "./config/template.config.js";
import {
  receivePayment,
  verifyPayment,
} from "./controller/razorpay.controller.js";
import { notFoundMiddleware } from "./middlewares/error.middleware.js";
import { responseMiddleware } from "./middlewares/request.middleware.js";
import RootRouter from "./routes/routes.js";
// import connectDB from "./config/db.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
export type ServerType = ReturnType<typeof app>;

startServer({ port: Number(envConfig.PORT), app });
// db connection
// const initialize = () => {
//  connectDB();
// };
// initialize();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  }),
);

app.use(mongoSanitize());
app.use(responseMiddleware);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/payment/receive", receivePayment);
app.post("/payment/verify", verifyPayment);
app.use(RootRouter);

app.get("/", (_: Request, res: ExpressResponse) => {
  res.sendFile(path.join(__dirname, "../public/pay.html"));
});

app.use(notFoundMiddleware);
// server.listen(envConfig.PORT, () => {
//   console.log(`Server is running at http://localhost:${envConfig.PORT}/`);
// })
//   .on("error", (err: NodeJS.ErrnoException) => {
//     console.log(err)
//     process.exit(1);
//   })
