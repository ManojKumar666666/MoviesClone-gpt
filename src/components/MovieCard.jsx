import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 pr-1.5 cursor-pointer">
      <img alt="movie poster" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
