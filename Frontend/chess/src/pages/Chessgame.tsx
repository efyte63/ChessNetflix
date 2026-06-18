import React, { useEffect, useState } from "react";
import { usechess } from "../store/chess.store";
import { formatTime } from "../components/Timeformater";

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

  const [pp, setpp] = useState(false);

  // Function to make move
  function makeamove(move: Move) {
    console.log("MOVE:", move);
    makemove(move);
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

    // Main container — stacks vertically on mobile, side-by-side on lg+
    <div className="min-h-screen w-full bg-black flex flex-col lg:flex-row overflow-x-hidden">

      {/* ── TIMER PANEL ──────────────────────────────────────────── */}
      {/* On mobile: full-width strip at top; on lg: fixed 30vw sidebar */}
      <div className="w-full lg:w-[30vw] lg:min-h-screen flex-shrink-0 flex items-center justify-center p-4 lg:p-7">

        <div className="w-full max-w-sm lg:max-w-none flex flex-col gap-5 lg:gap-8 p-5 lg:p-7 rounded-[24px] lg:rounded-[32px] bg-gradient-to-br from-zinc-900 via-black to-zinc-950 shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/10">

          {/* Header */}
          <div className="flex flex-col items-center">
            <h1 className="text-2xl lg:text-4xl font-black tracking-[6px] text-white">
              CHESS
            </h1>
            <div className="w-20 lg:w-28 h-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 mt-2 lg:mt-3"></div>
          </div>

          {/* Timers — side-by-side on mobile, stacked on lg */}
          <div className="flex flex-row lg:flex-col gap-3 lg:gap-0">

            {/* White Timer */}
            <div className="relative overflow-hidden flex-1 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white via-zinc-100 to-zinc-300 p-4 lg:p-6 shadow-2xl border border-zinc-300">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 lg:mb-4">
                  <div>
                    <p className="text-zinc-600 text-[10px] lg:text-sm tracking-[3px] lg:tracking-[4px] font-bold">
                      WHITE
                    </p>
                    <h2 className="text-black text-sm lg:text-xl font-black mt-0.5 lg:mt-1">
                      ♔ KING SIDE
                    </h2>
                  </div>
                  <div className="text-3xl lg:text-5xl">♔</div>
                </div>
                <div className="text-3xl lg:text-6xl font-black tracking-[2px] lg:tracking-[4px] text-black font-mono text-center">
                  {formatTime(whitetime)}
                </div>
              </div>
            </div>

            {/* VS Divider — vertical on mobile, horizontal on lg */}
            <div className="flex lg:hidden flex-col items-center justify-center px-1">
              <div className="flex-1 w-[1px] bg-zinc-700"></div>
              <span className="py-1 text-zinc-400 text-xs font-bold tracking-[3px]">VS</span>
              <div className="flex-1 w-[1px] bg-zinc-700"></div>
            </div>

            <div className="hidden lg:flex items-center justify-center my-2">
              <div className="w-full h-[1px] bg-zinc-700"></div>
              <div className="px-5 text-zinc-400 text-xl font-bold tracking-[5px]">VS</div>
              <div className="w-full h-[1px] bg-zinc-700"></div>
            </div>

            {/* Black Timer */}
            <div className="relative overflow-hidden flex-1 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-zinc-950 via-black to-zinc-800 p-4 lg:p-6 shadow-2xl border border-white/10">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-zinc-500/20 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 lg:mb-4">
                  <div>
                    <p className="text-zinc-400 text-[10px] lg:text-sm tracking-[3px] lg:tracking-[4px] font-bold">
                      BLACK
                    </p>
                    <h2 className="text-white text-sm lg:text-xl font-black mt-0.5 lg:mt-1">
                      ♚ KING SIDE
                    </h2>
                  </div>
                  <div className="text-3xl lg:text-5xl text-white">♚</div>
                </div>
                <div className="text-3xl lg:text-6xl font-black tracking-[2px] lg:tracking-[4px] text-white font-mono text-center">
                  {formatTime(blacktime)}
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-3 text-zinc-500 text-xs lg:text-sm tracking-[4px] uppercase font-semibold">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            Live Match
          </div>

        </div>
      </div>

      {/* ── CHESS BOARD ──────────────────────────────────────────── */}
      {/* Fills remaining space; board is always square via aspect-ratio */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 lg:p-8">

        <div className="relative w-full" style={{ maxWidth: "min(680px, 96vw, 96vh)" }}>

          {/* Promotion Popup */}
          {makepeice && (
            <div className="absolute inset-0 w-full h-full bg-black/40 flex items-center justify-center z-50 rounded-lg">
              <div className="bg-white p-4 sm:p-8 rounded-2xl flex flex-wrap gap-3 justify-center">
                {[
                  { label: "Queen", value: "q" },
                  { label: "Rook", value: "r" },
                  { label: "Bishop", value: "b" },
                  { label: "Knight", value: "n" },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    className="bg-black text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-lg sm:text-2xl"
                    onClick={() => {
                      if (pendingMove) {
                        makeamove({ from: pendingMove.from, to: pendingMove.to, promotion: value });
                      }
                      setmakepeice(false);
                      setPendingMove(null);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Winner Overlay */}
          {winner && (
            <div className="absolute inset-0 w-full h-full bg-black/40 flex items-center justify-center z-50 rounded-lg">
              <div className="bg-white/10 backdrop-blur-md px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-2xl border border-white/20">
                <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-wide animate-pulse text-center">
                  Winner 🎉 {winner}
                </h1>
              </div>
            </div>
          )}

          {/* Board — fills the container width, stays square via aspect-square cells */}
          <div className="grid grid-cols-8 w-full">
            {displayBoard.map((row, i) =>
              (color === "black" ? [...row].reverse() : row).map((cell, j) => {

                const isDark = (i + j) % 2 === 0;

                return (
                  <div
                    key={`${i}-${j}`}
                    className={`
                      aspect-square
                      flex items-center justify-center
                      cursor-pointer
                      select-none
                      transition-all duration-200
                      hover:brightness-110
                      ${isDark ? "bg-white" : "bg-green-200"}
                    `}
                    onClick={() => {
                      const actualI = color === "black" ? 7 - i : i;
                      const actualJ = color === "black" ? 7 - j : j;
                      const rowtype = 8 - actualI;
                      const celltype = String.fromCharCode(97 + actualJ);
                      const squaretype = `${celltype}${rowtype}`;

                      // first click
                      if (from === "") {
                        if (cell?.type == "p") { setpp(true); }
                        setfrom(squaretype);
                      }

                      // second click
                      else {
                        // selecting own piece again
                        if (
                          (cell?.color === "w" && color == "white") ||
                          (cell?.color === "b" && color == "black")
                        ) {
                          if (cell?.type == "p") { setpp(true); } else { setpp(false); }
                          setfrom(squaretype);
                        }

                        else {
                          // WHITE PROMOTION
                          if (pp == true && rowtype == 8) {
                            console.log("hii white");
                            setpp(false);
                            setPendingMove({ from: from, to: squaretype });
                            setmakepeice(true);
                          }

                          // BLACK PROMOTION
                          else if (pp == true && rowtype == 1) {
                            console.log("hii blabk");
                            setpp(false);
                            setPendingMove({ from: from, to: squaretype });
                            setmakepeice(true);
                          }

                          // normal move
                          else {
                            const move: Move = { from: from, to: squaretype };
                            console.log("MOVE:", move);
                            makeamove(move);
                          }
                        }
                      }
                    }}
                  >
                    {/* Pieces — sized relative to cell via w-full/h-full with padding */}
                    {cell
                      ? {
                          p: cell.color === "w"
                            ? <img src="/P.svg" alt="" className="w-[80%] h-[80%] object-contain" />
                            : <img src="/bp.svg" alt="" className="w-[80%] h-[80%] object-contain" />,

                          r: cell.color === "w"
                            ? <img src="/R.svg" alt="" className="w-[80%] h-[80%] object-contain" />
                            : <img src="/br.svg" alt="" className="w-[80%] h-[80%] object-contain" />,

                          n: cell.color === "w"
                            ? <img src="/N.svg" alt="" className="w-[80%] h-[80%] object-contain" />
                            : <img src="/bn.svg" alt="" className="w-[80%] h-[80%] object-contain" />,

                          b: cell.color === "w"
                            ? <img src="/B.svg" alt="" className="w-[80%] h-[80%] object-contain" />
                            : <img src="/bb.svg" alt="" className="w-[80%] h-[80%] object-contain" />,

                          q: cell.color === "w"
                            ? <img src="/Q.svg" alt="" className="w-[80%] h-[80%] object-contain" />
                            : <img src="/bq.svg" alt="" className="w-[80%] h-[80%] object-contain" />,

                          k: cell.color === "w"
                            ? <img src="/K.svg" alt="" className="w-[80%] h-[80%] object-contain" />
                            : <img src="/bk.svg" alt="" className="w-[80%] h-[80%] object-contain" />,
                        }[cell.type]
                      : ""}
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Chessgame;
