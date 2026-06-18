import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { sendToDb } from "./Controller/netflix.controller.js";

import authRoutes from "./Routes/auth.routes.js";
import netflixRoutes from "./Routes/netflix.routes.js";
import { initSocket } from "./config/socket.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const server = http.createServer(app);

app.use("/auth", authRoutes);
app.use("/netflix", netflixRoutes);

// middlewares...


try {
  await mongoose.connect(process.env.MONGO_URL!);
  console.log("✅ DB connected");

  await sendToDb();
  console.log("✅ Data inserted");

  server.listen(3000, () => {
    console.log("🚀 Server running on 3000");
  });

} catch (err) {
  console.log("❌ DB error", err);
}