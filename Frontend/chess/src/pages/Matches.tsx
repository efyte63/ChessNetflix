import React, { useEffect } from 'react'
import Topnav from '../components/Topnav'
import { Usenetflix } from '../store/netflix.store'

const Matches = () => {

  const {
    getbycatgery,
    catogerycontent
  } = Usenetflix();

  useEffect(() => {

    getbycatgery("matches");
    console.log(catogerycontent);
    

  }, []);

  return (

    <div className='min-h-screen w-full bg-black'>

      <Topnav />

      <div className='pt-[12vh] px-10'>

        <h1 className='text-white text-5xl font-bold mb-10'>
          Chess Matches
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>

          {catogerycontent?.map((data, index) => (

            <div
              key={index}
              className='relative h-[32vh] rounded-2xl overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300'
            >

              {/* Thumbnail */}
              <img
                src={data.thumbnail}
                alt=""
                className='w-full h-full object-cover'
              />

              {/* Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4'>

                <h1 className='text-white text-xl font-bold line-clamp-2'>
                  {data.title}
                </h1>

                <p className='text-zinc-300 text-sm mt-2 line-clamp-3'>
                  {data.description}
                </p>

                <div className='flex items-center justify-between mt-4'>

                  <span className='text-red-500 font-semibold'>
                    {data.type}
                  </span>

                  <span className='text-zinc-400 text-sm'>
                    👁 {data.totalViews}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default Matches