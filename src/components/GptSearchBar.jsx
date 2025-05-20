import React from "react";

const GptSearchBar = () => {
  return (
    <div className="pt-[7%] flex justify-center ">
      <form className=" w-1/2 p-5  grid grid-cols-12">
        <input
          type="text"
          placeholder="What do you wanna watch?"
          className="bg-white text-gray-900  text-center p-3 mr-3 col-span-10"
        />
        <button className="bg-red-700 text-white p-3 col-span-2 rounded-lg cursor-pointer">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
