import React from "react";
import { MOVIES_OPTIONS } from "../utils/constants";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieID }) => {
  const trailer = useSelector((store) => store.movies?.trailer);
  useMovieTrailer(movieID);
  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailer?.key +
          "?&autoplay=1&mute=1&loop=1&playlist=" +
          trailer?.key +
          "&controls=0&modestbranding=1&showinfo=0&rel=0&fs=0&iv_load_policy=3&disablekb=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
