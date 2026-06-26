import { Server } from "socket.io";
import type http from "http";
import { GameManager } from "../Chess/Gamemanager.js";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "http://100.48.100.255",
      credentials: true,
    },
  });

  const gameManager = new GameManager();

  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    socket.on("Init_Game", () => {
      gameManager.addUser(socket);
    });

    socket.on("make-move", (move) => {
      gameManager.makeMove(socket, move);
    });

    socket.on("disconnect", () => {
      console.log("❌ disconnected:", socket.id);
    });
  });
};

export { io };