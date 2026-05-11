import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import authRoutes from "./Routes/auth.routes.js";
import netflixRoutes from "./Routes/netflix.routes.js";
import { initSocket } from "./config/socket.js";



dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/netflix", netflixRoutes);


// ✅ Init socket AFTER creating server
initSocket(server);



server.listen(3000, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("✅ DB connected");
    console.log("🚀 Server running on 3000");
  } catch (err) {
    console.log("❌ DB error", err);
  }
});