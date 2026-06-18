import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Usenetflix } from "../store/netflix.store";

const Des = () => {
  const { getcontent, content } = Usenetflix();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getcontent(id);
    }
  }, [id, getcontent]);

  // ✅ FIX: supports both youtube formats
  const getEmbedUrl = (url) => {
    if (!url) return "";

    let videoId = "";

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center px-4 py-6">

      {/* TITLE + DESCRIPTION */}
      <div className="w-full max-w-5xl mb-4">
        <h1 className="text-2xl md:text-4xl font-bold">
          {content?.title}
        </h1>

        <p className="text-gray-300 mt-2 text-sm md:text-base">
          {content?.description}
        </p>
      </div>

      {/* VIDEO */}
      <div className="w-full max-w-5xl aspect-video">
        <iframe
          className="w-full h-full rounded-xl shadow-2xl"
          src={getEmbedUrl(content?.video)}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

    </div>
  );
};

export default Des;