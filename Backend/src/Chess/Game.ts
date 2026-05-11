import { Socket } from "socket.io";
import { Chess } from "chess.js";
import type { Square } from "chess.js";
export class Game {
  public player1: Socket;
  public player2: Socket;
  public chess: Chess;
  public board: any[][];
  public moveNo: number;
  // Timers
  public whiteTime: number;
  public blackTime: number;
  public intervalId: NodeJS.Timeout | null;
  constructor(user1: Socket, user2: Socket) {
    this.player1 = user1;
    this.player2 = user2;
    this.chess = new Chess();
    this.board = this.chess.board();
    this.moveNo = 0;
    // 15 minutes each
    this.whiteTime = 900;
    this.blackTime = 900;
    this.intervalId = null;
    // assign colors
    this.player1.emit("yourcolour", "white");
    this.player2.emit("yourcolour", "black");
    // send initial board
    this.player1.emit("initBoard", this.board);
    this.player2.emit("initBoard", this.board);
    // send initial timers
    this.player1.emit("timer", {
      whiteTime: this.whiteTime,
      blackTime: this.blackTime,
    });
    this.player2.emit("timer", {
      whiteTime: this.whiteTime,
      blackTime: this.blackTime,
    });
    // start timer
    this.startTimer();
    console.log("♟️ Game initialized");
  }
  // =========================================
  // MAKE MOVE
  // =========================================
  public makeMove(
    user: Socket,
    move: {
      from: Square;
      to: Square;
      promotion?: string;
    }
  ) {
    const isPlayer1Turn =
      this.moveNo % 2 === 0;
    // turn validation
    if (
      (user === this.player1 &&
        isPlayer1Turn) ||
      (user === this.player2 &&
        !isPlayer1Turn)
    ) {
      let result;
      try {
        result = this.chess.move(move);

       


      } catch (err) {
        console.log(
          "❌ invalid move (caught error):",
          move
        );
        return null;
      }
      // invalid move
      if (!result) {
        console.log(
          "❌ invalid move:",
          move
        );
        return null;
      }
      // update board
      this.board = this.chess.board();
      // next turn
      this.moveNo++;
      // checkmate
      if (this.chess.isCheckmate()) {
        clearInterval(this.intervalId!);
        console.log("♚ Checkmate");
        const winner =
          isPlayer1Turn
            ? "white"
            : "black";
        // send winner
        this.player1.emit("gameover", {
          winner,
          reason: "checkmate",
        });
        this.player2.emit("gameover", {
          winner,
          reason: "checkmate",
        });
        return { winner };
      }
      // send updated board
      this.player1.emit(
        "move",
        this.board
      );
      this.player2.emit(
        "move",
        this.board
      );
      return { success: true };
    } else {
      console.log("⛔ not your turn");
      return null;
    }
  }
  // =========================================
  // TIMER
  // =========================================
  public startTimer() {
    this.intervalId = setInterval(() => {
      // white turn
      const isWhiteTurn =
        this.moveNo % 2 === 0;
      if (isWhiteTurn) {
        this.whiteTime--;
      } else {
        this.blackTime--;
      }
      // send timers
      this.player1.emit("timer", {
        whiteTime: this.whiteTime,
        blackTime: this.blackTime,
      });
      this.player2.emit("timer", {
        whiteTime: this.whiteTime,
        blackTime: this.blackTime,
      });
      // white timeout
      if (this.whiteTime <= 0) {
        clearInterval(this.intervalId!);
        this.player1.emit("gameover", {
          winner: "black",
          reason: "timeout",
        });
        this.player2.emit("gameover", {
          winner: "black",
          reason: "timeout",
        });
        console.log(
          "⏰ White lost on time"
        );
      }
      // black timeout
      if (this.blackTime <= 0) {
        clearInterval(this.intervalId!);
        this.player1.emit("gameover", {
          winner: "white",
          reason: "timeout",
        });
        this.player2.emit("gameover", {
          winner: "white",
          reason: "timeout",
        });
        console.log(
          "⏰ Black lost on time"
        );
      }
    }, 1000);
  }
}