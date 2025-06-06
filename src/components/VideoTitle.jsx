import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" absolute aspect-video w-screen text-white pt-[13%] pl-15 bg-gradient-to-r from-black ">
      <h1 className="text-5xl text-white font-bold">{title}</h1>
      <p className="py-3 w-1/4 text-md">{overview}</p>
      <button className="text-black bg-white font-bold px-8 py-3 hover:opacity-90 mr-3 cursor-pointer rounded-md">
        ▶️ Play
      </button>
      <button className=" text-white bg-gray-600/70 font-bold px-7 py-3 hover:opacity-40 cursor-pointer rounded-md">
        ℹ️ More Info
      </button>
    </div>
  );
};

export default VideoTitle;
