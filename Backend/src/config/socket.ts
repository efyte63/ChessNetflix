import { Server, Socket } from "socket.io";
import http from "http";
import { GameManager } from "../Chess/Gamemanager.js";


let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  const gameManager = new GameManager();

  io.on("connection", (socket: Socket) => {
    console.log("🔌 User connected:", socket.id);

    socket.on("Init_Game", () => {
      console.log("♟️ Init_Game");
      gameManager.addUser(socket);
    });

    socket.on("make-move", (move) => {
      console.log("♟️ make-move:", move);
      gameManager.makeMove(socket, move);
    });

    
    socket.on("disconnect", () => {
      console.log("❌ disconnected:", socket.id);
    });
  });
};

export { io };