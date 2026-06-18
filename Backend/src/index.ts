import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import authRoutes from "./Routes/auth.routes.js";
import netflixRoutes from "./Routes/netflix.routes.js";
import { initSocket } from "./config/socket.js";
import { sendToDb } from "./Controller/netflix.controller.js";

dotenv.config();

const app = express();

// ✅ MIDDLEWARES (VERY IMPORTANT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://13.60.56.187", "http://localhost:5173"],
    credentials: true,
  })
);

const linkdb = process.env.MONGO_URL;

if (!linkdb) {
  throw new Error("MONGO_URL is not defined in .env");
}

// ✅ ROUTES
app.use("/auth", authRoutes);
app.use("/netflix", netflixRoutes);

// ✅ CREATE SERVER
const server = http.createServer(app);

// 🔥 SOCKET INIT (THIS WAS MISSING)
initSocket(server);

// 🚀 DB + SERVER START
const startServer = async () => {
  try {
    await mongoose.connect(linkdb);
    console.log("✅ DB connected");

    await sendToDb();
    console.log("✅ Data inserted");

    server.listen(3000, () => {
      console.log("🚀 Server running on 3000");
    });

  } catch (err) {
    console.log("❌ DB error", err);
  }
};

startServer();