import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MOVIES_OPTIONS } from "../utils/constants";
import { addMovieTrailer } from "../utils/moviesSlice";

const useMovieTrailer = (movieID) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`,
      MOVIES_OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
    const filterVideos = json.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailerVideo = filterVideos.length
      ? filterVideos[0]
      : json.results[0];
    console.log(trailerVideo);
    dispatch(addMovieTrailer(trailerVideo));
  };
 
  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
