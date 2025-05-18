import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className=" relative -mt-52  z-10 pl-5">
          <MovieList title={"Now Playing "} movies={movies.nowPlayingMovies} />
          <MovieList title={"Now Playing "} movies={movies.nowPlayingMovies} />
          <MovieList title={"Now Playing "} movies={movies.nowPlayingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondContainer;
