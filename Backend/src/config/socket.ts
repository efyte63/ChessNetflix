import { Server } from "socket.io";
import { GameManager } from "../Chess/Gamemanager.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
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