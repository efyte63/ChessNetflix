import React, { useEffect, useState } from "react";
import { usechess } from "../store/chess.store";
import { useNavigate } from "react-router-dom";

const Chessconfermation = () => {
  const nav = useNavigate();
  const { board, initgame , updateboard , settime } = usechess();

  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (board.length > 0) {
      updateboard();
      settime();
      nav("/game");
    }
  }, [board, nav]);

  const handlePlay =  () => {
    setIsMatching(true);
    initgame();
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-gray-800 shadow-xl">
        
        {!isMatching ? (
          <>
            <h1 className="text-2xl font-bold">Ready to Play?</h1>
            <button
              onClick={handlePlay}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold transition"
            >
              Play
            </button>
          </>
        ) : (
          <>
            <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-medium">Matching with opponent...</p>
          </>
        )}

      </div>
    </div>
  );
};

export default Chessconfermation;