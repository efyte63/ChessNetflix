import React, { useRef } from "react";
import { Link } from "react-router-dom"; // <-- ADDED: Import Link

// CHANGED: Props now accept one object instead of three separate arrays
type Props = {
  data: {
    thumbnail: string[];
    title: string[];
    ids: number[];
  };
};

const NetflixSlider: React.FC<Props> = ({ data }) => {
  console.log(data);

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -700,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 700,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      {/* LEFT BUTTON */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full w-[70px] bg-black/50 text-white text-5xl"
      >
        ‹
      </button>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="flex gap-20 overflow-x-scroll overflow-y-hidden scroll-smooth px-20 scrollbar-hide [&::-webkit-scrollbar]:hidden"
      >
        {/* CHANGED: map over data.thumbnail */}
        {data.thumbnail.map((movie, index) => (
          // CHANGED: div -> Link
          <Link
            key={index}
            // CHANGED: Link to corresponding id
            to={`/movie/${data.ids[index]}`}
            className="relative min-w-[320px] h-[180px] rounded-xl overflow-hidden shrink-0 hover:scale-110 hover:z-20 transition-all duration-300 group"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
              <p className="text-white text-xl font-bold tracking-wide drop-shadow-lg line-clamp-2">
                {/* SAME LOGIC */}
                {data.title[index]}
              </p>
            </div>

            <img
              src={movie}
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
        ))}
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full w-[70px] bg-black/50 text-white text-5xl"
      >
        ›
      </button>
    </div>
  );
};

export default NetflixSlider;