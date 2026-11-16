import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import dns from "node:dns";

import authRoutes from "./Routes/auth.routes.js";
import netflixRoutes from "./Routes/netflix.routes.js";
import { initSocket } from "./config/socket.js";
import { sendToDb } from "./Controller/netflix.controller.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chessnetflixnewp.onrender.com",
      "https://chessnetflix-chess.vercel.app",
    ],
    credentials: true,
  }),
);

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const linkdb = process.env.MONGO_URL;

if (!linkdb) {
  throw new Error("MONGO_URL is not defined in .env");
}

app.use("/auth", authRoutes);
app.use("/netflix", netflixRoutes);

const server = http.createServer(app);

// Initialize Socket.IO ONCE
initSocket(server);

app.get("/health", (req, res) => {
  
  res.status(200).json({
    msg:"healthy"
  })
})

const startServer = async () => {
  try {
    await mongoose.connect(linkdb);
    console.log("DB connected");

    await sendToDb();
    console.log("Data inserted");

    server.listen(3000, () => {
      console.log("Server running on 3000");
    });
  } catch (err) {
    console.log("DB error", err);
  }
};

startServer();
