import React, { useEffect, useState } from "react";
import { usechess } from "../store/chess.store";
import { formatTime } from "../components/timeformater";

// Type for chess move
type Move = {
  from: string;
  to: string;
  promotion?: string;
};

const Chessgame = () => {

  // Store data
  const {
    board,
    makemove,
    color,
    winner,
    whitetime,
    blacktime,
  } = usechess();

  // Promotion popup
  const [makepeice, setmakepeice] = useState(false);

  // Selected square
  const [from, setfrom] = useState("");

  // Pending promotion move
  const [pendingMove, setPendingMove] = useState<{
    from: string;
    to: string;
  } | null>(null);


  const [pp , setpp]  = useState(false);

  // Function to make move
  function makeamove(move: Move) {

    console.log("MOVE:", move);

    makemove(move);

    // Reset selected square
    setfrom("");
  }

  // Debug board
  useEffect(() => {
    console.log(board);
  }, [board]);

  // Reverse board for black
  const displayBoard =
    color === "black"
      ? [...board].reverse()
      : board;

  return (

    // Main container
    <div className="h-[100vh] w-[100vw] bg-blue-200 flex">

      {/* Left Side */}
      <div className="h-[100vh] w-[70vw] bg-black pt-4 flex gap-40">

        {/* TIMER PANEL */}
        <div className="w-[340px] h-fit flex flex-col gap-8 p-7 rounded-[32px] bg-gradient-to-br from-zinc-900 via-black to-zinc-950 shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/10">

          {/* Header */}
          <div className="flex flex-col items-center">

            <h1 className="text-4xl font-black tracking-[6px] text-white">
              CHESS
            </h1>

            <div className="w-28 h-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 mt-3"></div>

          </div>

          {/* White Timer */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-zinc-100 to-zinc-300 p-6 shadow-2xl border border-zinc-300">

            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-4">

                <div>

                  <p className="text-zinc-600 text-sm tracking-[4px] font-bold">
                    WHITE PLAYER
                  </p>

                  <h2 className="text-black text-xl font-black mt-1">
                    ♔ KING SIDE
                  </h2>

                </div>

                <div className="text-5xl">
                  ♔
                </div>

              </div>

              <div className="text-6xl font-black tracking-[4px] text-black font-mono text-center">
                {formatTime(whitetime)}
              </div>

            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center">

            <div className="w-full h-[1px] bg-zinc-700"></div>

            <div className="px-5 text-zinc-400 text-xl font-bold tracking-[5px]">
              VS
            </div>

            <div className="w-full h-[1px] bg-zinc-700"></div>

          </div>

          {/* Black Timer */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-black to-zinc-800 p-6 shadow-2xl border border-white/10">

            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-zinc-500/20 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-4">

                <div>

                  <p className="text-zinc-400 text-sm tracking-[4px] font-bold">
                    BLACK PLAYER
                  </p>

                  <h2 className="text-white text-xl font-black mt-1">
                    ♚ KING SIDE
                  </h2>

                </div>

                <div className="text-5xl text-white">
                  ♚
                </div>

              </div>

              <div className="text-6xl font-black tracking-[4px] text-white font-mono text-center">
                {formatTime(blacktime)}
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-3 text-zinc-500 text-sm tracking-[4px] uppercase font-semibold">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

            Live Match

          </div>
        </div>

        {/* CHESS BOARD */}
        <div className="relative">

          {/* Promotion Popup */}
          {makepeice && (
            <div className="absolute inset-0 w-full h-full bg-black/40 flex items-center justify-center z-50">

              <div className="bg-white p-8 rounded-2xl flex gap-5">

                <button
                  className="bg-black text-white px-6 py-4 rounded-xl text-2xl"
                  onClick={() => {

                    if (pendingMove) {

                      makeamove({
                        from: pendingMove.from,
                        to: pendingMove.to,
                        promotion: "q",
                      });
                    }

                    setmakepeice(false);
                    setPendingMove(null);
                  }}
                >
                  Queen
                </button>

                <button
                  className="bg-black text-white px-6 py-4 rounded-xl text-2xl"
                  onClick={() => {

                    if (pendingMove) {

                      makeamove({
                        from: pendingMove.from,
                        to: pendingMove.to,
                        promotion: "r",
                      });
                    }

                    setmakepeice(false);
                    setPendingMove(null);
                  }}
                >
                  Rook
                </button>

                <button
                  className="bg-black text-white px-6 py-4 rounded-xl text-2xl"
                  onClick={() => {

                    if (pendingMove) {

                      makeamove({
                        from: pendingMove.from,
                        to: pendingMove.to,
                        promotion: "b",
                      });
                    }

                    setmakepeice(false);
                    setPendingMove(null);
                  }}
                >
                  Bishop
                </button>

                <button
                  className="bg-black text-white px-6 py-4 rounded-xl text-2xl"
                  onClick={() => {

                    if (pendingMove) {

                      makeamove({
                        from: pendingMove.from,
                        to: pendingMove.to,
                        promotion: "n",
                      });
                    }

                    setmakepeice(false);
                    setPendingMove(null);
                  }}
                >
                  Knight
                </button>

              </div>
            </div>
          )}

          {/* Winner Overlay */}
          {winner && (
            <div className="absolute inset-0 w-full h-full bg-black/40 flex items-center justify-center z-50">

              <div className="bg-white/10 backdrop-blur-md px-8 py-5 rounded-2xl shadow-2xl border border-white/20">

                <h1 className="text-4xl font-bold text-white tracking-wide animate-pulse">
                  Winner 🎉 {winner}
                </h1>

              </div>
            </div>
          )}

          {/* Board */}
          <div className="grid grid-cols-8 w-[680px]">

            {displayBoard.map((row, i) =>

              (color === "black"
                ? [...row].reverse()
                : row
              ).map((cell, j) => {

                const isDark =
                  (i + j) % 2 === 0;

                return (

                  <div
                    key={`${i}-${j}`}

                    className={`
                      aspect-square
                      flex items-center justify-center
                      text-6xl
                      cursor-pointer
                      select-none
                      transition-all duration-200
                      hover:scale-105
                      ${isDark
                        ? "bg-white"
                        : "bg-green-200"}
                    `}

                    onClick={() => {

                      const actualI =
                        color === "black"
                          ? 7 - i
                          : i;

                      const actualJ =
                        color === "black"
                          ? 7 - j
                          : j;

                      const rowtype =
                        8 - actualI;

                      const celltype =
                        String.fromCharCode(
                          97 + actualJ
                        );

                      const squaretype =
                        `${celltype}${rowtype}`;

                      // first click
                      if (from === "") {
                        if(cell?.type == "p")
                        {
                          setpp(true);
                        }
                        setfrom(squaretype);
                      
                      }

                      // second click
                      else {

                        // selecting own piece again
                        if (
                          (cell?.color === "w" &&
                            color == "white") ||

                          (cell?.color === "b" &&
                            color == "black")
                        ) {
                          if(cell?.type == "p")
                          {
                            setpp(true);
                          }
                          else
                          {
                            setpp(false);
                          }
                          setfrom(squaretype);
                        }

                        else {

                          // WHITE PROMOTION
                          if (
                           
                            
                            pp == true &&
                            rowtype == 8
                          ) {
                             console.log("hii white");
                             setpp(false);

                            setPendingMove({
                              from: from,
                              to: squaretype,
                            });

                            setmakepeice(true);
                            
                          }

                          // BLACK PROMOTION
                          else if (
                                                        
                           pp == true &&
                            rowtype == 1
                          ) {
                            console.log("hii blabk");
                            setpp(false);

                            setPendingMove({
                              from: from,
                              to: squaretype,
                            });

                            setmakepeice(true);
                            
                          }

                          // normal move
                          else {

                            const move: Move = {
                              from: from,
                              to: squaretype,
                            };

                            console.log("MOVE:", move);

                            makeamove(move);
                          }
                        }
                      }
                    }}
                  >

                    {/* Pieces */}
                    {cell
                      ? {

                          p:
                            cell.color === "w"
                              ? (
                                <img
                                  src="/P.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ) : (
                                <img
                                  src="/bp.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ),

                          r:
                            cell.color === "w"
                              ? (
                                <img
                                  src="/R.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ) : (
                                <img
                                  src="/br.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ),

                          n:
                            cell.color === "w"
                              ? (
                                <img
                                  src="/N.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ) : (
                                <img
                                  src="/bn.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ),

                          b:
                            cell.color === "w"
                              ? (
                                <img
                                  src="/B.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ) : (
                                <img
                                  src="/bb.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ),

                          q:
                            cell.color === "w"
                              ? (
                                <img
                                  src="/Q.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ) : (
                                <img
                                  src="/bq.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ),

                          k:
                            cell.color === "w"
                              ? (
                                <img
                                  src="/K.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ) : (
                                <img
                                  src="/bk.svg"
                                  alt=""
                                  className="w-[70px] h-[70px]"
                                />
                              ),
                        }[cell.type]
                      : ""}

                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="h-[100vh] w-[30vw] bg-purple-500"></div>

    </div>
  );
};

export default Chessgame;