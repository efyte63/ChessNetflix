import { create } from "zustand";
import { Chess } from "chess.js";
import type { Square, PieceSymbol, Color } from "chess.js";
import { userauth } from "./auth.store";

type Move = {
  from: string;
  to: string;
};

type BoardSquare =
  | {
      square: Square;
      type: PieceSymbol;
      color: Color;
    }
  | null;

type Store = {
  chess: Chess | null;
  board: BoardSquare[][];
  color: "white" | "black" | null;
  winner : "white" | "black" | null;
  whitetime:number
  blacktime:number
  updateboard: () => void;
  initgame: () => void;
  makemove: (move: Move) => void;
  settime:()=>void
};
export const usechess = create<Store>((set, get) => ({
  chess: null,
  board: [],
  color: null,
  winner: null,
  whitetime:900,
  blacktime:900,
 initgame: () => {
  const socket = userauth.getState().socket;
  if (!socket) return;
  const { chess } = get();
  if (chess) return; // ✅ prevent re-init
  socket.off("yourcolour");
  socket.off("initBoard");
  socket.emit("Init_Game");
  socket.on("yourcolour", (color: "white" | "black") => {
    set({
      color,
      chess: new Chess(),
    });
  });
  socket.on("initBoard", (boardData) => {
    set({ board: boardData });
  });
},
  makemove: async (move) => {
    const socket = userauth.getState().socket;
    if (!socket) return;  
    await socket.emit("make-move", move);
    get().updateboard();
},
  updateboard: () => {
    const socket = userauth.getState().socket;
    if (!socket) return;
    socket.off("updatedGame"); 
    socket.off("gameOver");
    socket.on("gameOver" , (message)=>{
      set({winner:message});
    })

    
    socket.on("updatedGame", (message: { board: BoardSquare[][] }) => {
      set({ board: message.board });
    });
  },
   settime:()=>{
    const socket = userauth.getState().socket;
    if (!socket) return;  
    socket.off("timer");
    socket.on("timer" , (message)=>{
      set({whitetime:message.whiteTime})
      set({blacktime:message.blackTime})
    })
    }

}));