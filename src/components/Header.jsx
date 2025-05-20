import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL, Supported_Languages } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const gptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubsribe();
  }, []);
  const handleGptSearch = () => {
    dispatch(toggleGptSearch());
    
  };
  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-15 py-2 h-25 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-50 " src={LOGO_URL} alt="logo" />
      {user && (
        <div className="flex p-1  ">
          {gptSearch && (
            <select
              className="bg-gray-600 text-white my-5 cursor-pointer rounded-lg p-1 "
              onChange={handleLangChange}
            >
              {Supported_Languages.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearch}
            className="bg-purple-500 p-2 mx-1.5 my-5 rounded-lg cursor-pointer "
          >
            {gptSearch ? "Standard Mode" : "GPT Search"}
          </button>
          <img className="w-12 mb-5 mt-2" alt="user-icon" src={user.photoURL} />
          <button
            className="font-bold text-white mb-3 cursor-pointer "
            onClick={handleClick}
          >
            (sign out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
