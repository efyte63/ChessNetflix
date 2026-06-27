import React, { useEffect, useState } from "react";
import { usechess } from "../store/chess.store";
import { useNavigate } from "react-router-dom";

const Chessconfermation = () => {
  const nav = useNavigate();
  const { board, initgame, updateboard, settime } = usechess();

  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (board.length > 0) {
      updateboard();
      settime();
      nav("/game");
    }
  }, [board, nav]);

  const handlePlay = () => {
    setIsMatching(true);
    initgame();
  };

  return (
    <div
      className="relative h-screen w-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=1920&auto=format&fit=crop)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      {/* Glow Effects */}
      <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-yellow-500/20 blur-[140px] animate-pulse"></div>

      <div className="absolute -bottom-24 -right-20 w-[500px] h-[500px] rounded-full bg-green-500/20 blur-[160px] animate-pulse"></div>

      {/* Floating Chess Pieces */}
      <div className="absolute left-12 top-10 text-[170px] text-white/10 select-none animate-bounce">
        ♔
      </div>

      <div className="absolute right-12 bottom-10 text-[170px] text-yellow-400/10 select-none animate-bounce delay-300">
        ♛
      </div>

      <div className="absolute left-1/2 top-16 text-[120px] text-white/5 select-none animate-pulse">
        ♞
      </div>

      {/* Main Card */}
      <div className="relative z-10 flex flex-col items-center gap-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl px-14 py-12 shadow-[0_25px_80px_rgba(0,0,0,.8)]">

        {!isMatching ? (
          <>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center text-5xl shadow-xl">
              ♟️
            </div>

            <h1 className="text-4xl font-extrabold text-white tracking-wide">
              Ready to Play?
            </h1>

            <p className="text-gray-300 text-center max-w-xs">
              Find a real opponent and start your next chess battle.
            </p>

            <button
              onClick={handlePlay}
              className="px-12 py-4 rounded-xl bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-white text-xl font-bold shadow-lg hover:scale-105 hover:shadow-green-500/40 active:scale-95 transition-all duration-300"
            >
              ▶ Play
            </button>
          </>
        ) : (
          <>
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-[6px] border-green-400 border-t-transparent animate-spin"></div>

              <div className="absolute inset-0 flex items-center justify-center text-3xl">
                ♟️
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white">
              Finding Opponent...
            </h2>

            <p className="text-gray-300 text-center">
              Matching you with another player.
              <br />
              Please wait a moment.
            </p>

            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400 animate-bounce"></span>
              <span className="w-3 h-3 rounded-full bg-green-400 animate-bounce delay-150"></span>
              <span className="w-3 h-3 rounded-full bg-green-400 animate-bounce delay-300"></span>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Chessconfermation;