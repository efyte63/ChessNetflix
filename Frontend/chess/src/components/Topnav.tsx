import React from 'react'
import { Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Topnav = () => {
    const nav = useNavigate();
  return (

    <div className="absolute z-50 h-[10vh] w-full bg-black/30 hover:bg-black/50 opacity-0 hover:opacity-100 delay-150 duration-700 ease-in-out backdrop-blur-md flex border-b border-white/10">

      {/* LOGO */}
      <div className='h-full w-[20vw] flex items-center justify-center'>

        <h1 className='sm:text-sm md:text-xl lg:text-4xl text-white font-black tracking-[3px] drop-shadow-lg hover:text-red-500 transition-all duration-300'>
          Chess Netflix
        </h1>

      </div>

      {/* NAV LINKS */}
      <div className='h-full w-[70vw] flex items-center justify-between pl-28 pr-28'>

        <button 
         className='sm:text-sm md:text-xl lg:text-2xl text-zinc-200 hover:text-red-500 transition-all duration-300 font-semibold'
         onClick={()=>{
            nav("/netflix");
         }}>
          Home

        </button>

        <button className='sm:text-sm md:text-xl lg:text-2xl text-zinc-200 hover:text-red-500 transition-all duration-300 font-semibold'
        onClick={()=>{
            nav("/matches");
         }}
        >
          Matches
        </button>

        <button className='sm:text-sm md:text-xl lg:text-2xl text-zinc-200 hover:text-red-500 transition-all duration-300 font-semibold'
        onClick={()=>{
            nav("/learnchess");
         }}>
          Learn Chess
        </button>

        <button className='sm:text-sm md:text-xl lg:text-2xl text-zinc-200 hover:text-red-500 transition-all duration-300 font-semibold'
         onClick={()=>{
            nav("/chessstart");
         }}>
          Play Online
        </button>

      </div>

      {/* SEARCH */}
      <div className='h-full w-[20vw] flex items-center justify-center gap-3'>

        <button>
          <Search className="w-6 h-6 text-zinc-200 hover:text-red-500 transition-all duration-300" />
        </button>

        <input
          className='h-[5vh] w-[10vw] border border-white/20 rounded-xl bg-white/90 backdrop-blur-md px-3 text-black outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40 transition-all duration-300'
          type="text"
          placeholder='Search'
        />

      </div>

    </div>
  )
}

export default Topnav