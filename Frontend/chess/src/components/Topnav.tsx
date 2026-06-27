import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topnav = () => {
  const nav = useNavigate();

  // Mobile Menu State
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div className="sm:h-[13vh] h-[10vh] w-full bg-black/30 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-50 relative">

        {/* LOGO */}
        <div className="sm:w-[30vw] md:w-[15vw] h-full flex items-center justify-center">
          <h1 className="text-lg md:text-2xl lg:text-4xl font-black tracking-[3px] text-red-500">
            Chess Netflix
          </h1>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex h-full w-[55vw] items-center justify-evenly">
          <button
            className="text-xl lg:text-2xl text-zinc-200 hover:text-red-500 transition-all duration-300 font-semibold"
            onClick={() => nav("/netflix")}
          >
            Home
          </button>

          <button
            className="text-xl lg:text-2xl text-zinc-200 hover:text-red-500 transition-all duration-300 font-semibold"
            onClick={() => nav("/matches")}
          >
            Matches
          </button>

          <button
            className="text-xl lg:text-2xl text-zinc-200 hover:text-red-500 transition-all duration-300 font-semibold"
            onClick={() => nav("/learnchess")}
          >
            Learn Chess
          </button>

          <button
            className="text-xl lg:text-2xl text-zinc-200 hover:text-red-500 transition-all duration-300 font-semibold"
            onClick={() => nav("/chessstart")}
          >
            Play Online
          </button>
        </div>

        {/* SEARCH (VISIBLE ON ALL SCREEN SIZES) */}
        <div className="flex items-center justify-center gap-2 sm:w-[45vw] md:w-[20vw]">

          <button>
            <Search className="w-5 h-5 md:w-6 md:h-6 text-zinc-200 hover:text-red-500 transition-all duration-300" />
          </button>

          <input
            className="h-[5vh] w-[28vw] sm:w-[28vw] md:w-[10vw] border border-white/20 rounded-xl bg-white/90 backdrop-blur-md px-3 text-black outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40 transition-all duration-300"
            type="text"
            placeholder="Search"
          />
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex md:hidden items-center justify-center px-4">
          <button onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? (
              <X className="w-8 h-8 text-white" />
            ) : (
              <Menu className="w-8 h-8 text-white" />
            )}
          </button>
        </div>

      </div>

      {/* MOBILE POPUP MENU */}
      {openMenu && (
        <div className="md:hidden fixed top-[10vh] left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 z-50 flex flex-col items-center py-10 gap-8">

          <button
            className="text-2xl font-semibold text-white hover:text-red-500 transition-all duration-300"
            onClick={() => {
              nav("/netflix");
              setOpenMenu(false);
            }}
          >
            Home
          </button>

          <button
            className="text-2xl font-semibold text-white hover:text-red-500 transition-all duration-300"
            onClick={() => {
              nav("/matches");
              setOpenMenu(false);
            }}
          >
            Matches
          </button>

          <button
            className="text-2xl font-semibold text-white hover:text-red-500 transition-all duration-300"
            onClick={() => {
              nav("/learnchess");
              setOpenMenu(false);
            }}
          >
            Learn Chess
          </button>

          <button
            className="text-2xl font-semibold text-white hover:text-red-500 transition-all duration-300"
            onClick={() => {
              nav("/chessstart");
              setOpenMenu(false);
            }}
          >
            Play Online
          </button>

        </div>
      )}
    </>
  );
};

export default Topnav;