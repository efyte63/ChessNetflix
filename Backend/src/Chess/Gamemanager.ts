import { Socket } from "socket.io";
import { Game } from "./Game.js";

export class GameManager {
  private games: Game[];
  private pendingUser: Socket | null;

  constructor() {
    this.games = [];
    this.pendingUser = null;
  }

  public addUser(user: Socket) {
    if (this.pendingUser) {
      const game = new Game(this.pendingUser, user);
      this.games.push(game);
      this.pendingUser = null;

      console.log("✅ game created");
    } else {
      this.pendingUser = user;
      console.log("⏳ user waiting");
    }
  }

  public makeMove(user: Socket, move: any) {
    const game = this.games.find(
      (g) => g.player1 === user || g.player2 === user
    );

    if (!game) return;

    const result = game.makeMove(user, move);

    if (!result) return;

   
     if (result.winner) {
      game.player1.emit("gameOver", result.winner);
      game.player2.emit("gameOver", result.winner);
    }


    game.player1.emit("updatedGame", {
      board: game.board,
      moveNo: game.moveNo,
    });

    game.player2.emit("updatedGame", {
      board: game.board,
      moveNo: game.moveNo,
    });

 
  }
}