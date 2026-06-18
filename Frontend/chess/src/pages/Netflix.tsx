import React, { useEffect } from 'react'
import Topnav from '../components/Topnav'
import { Usenetflix } from '../store/netflix.store'
import NetflixSlider from '../components/NetflixSlider'
const Netflix = () => {
  const{topten , gettopten}=Usenetflix();
    const thumbarr = topten?.map((data) => data.thumbnail);
    const titles = topten?.map((data) => data.title);
    const ids = topten?.map((data)=> data.id);

  const data : {
    thumbnail :string[];
    title : string[];
    ids:number[]
  } = {
    thumbnail:thumbarr||[],
    title:titles||[],
    ids:ids||[]
    }

  useEffect(()=>{
    gettopten();
    console.log(topten);
    
  },[]);

  return (
    <div className='h-[100vh] w-full bg-black'>
      <Topnav></Topnav>
  <div className="h-[60vh] w-full flex items-center justify-center " >

  <div className="h-[50vh] w-[80vw] rounded-2xl overflow-hidden">

    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/0zJd6chacL4"
      title="YouTube video player"
      allowFullScreen
    ></iframe>

  </div>

</div>
<div className='h-[10vh] w-full '>
<h1 className='text-white sm:text-3xl md:text-5xl font-bold pl-10 drop-shadow-lg'>
  Top 10 today . . . . . .
</h1>
</div>
<div className='h-[29vh] w-full bg-black overflow-hidden'>
  
  <NetflixSlider
  data={data}
/>

</div>

</div>
  )
}

export default Netflix