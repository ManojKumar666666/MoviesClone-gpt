import React from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const language = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[7%] flex justify-center ">
      <form className=" w-1/2 p-5  grid grid-cols-12">
        <input
          type="text"
          placeholder={lang[language].gptSearchPlaceholder}
          className="bg-white text-black   pl-2 mr-7 col-span-10"
        />
        <button className="bg-red-700 text-white p-3 col-span-2 rounded-lg cursor-pointer">
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
