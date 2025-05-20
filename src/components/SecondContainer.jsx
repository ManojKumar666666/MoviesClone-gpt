import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className=" relative -mt-52  z-10 pl-5">
        {movies.nowPlayingMovies && (
          <MovieList title={"Now Playing "} movies={movies.nowPlayingMovies} />
        )}
        {movies.topRatedMovies && (
          <MovieList title={"Top Rated "} movies={movies.topRatedMovies} />
        )}
        {movies.popularMovies && (
          <MovieList title={"Popular Movies "} movies={movies.popularMovies} />
        )}
      </div>
    </div>
  );
};

export default SecondContainer;
