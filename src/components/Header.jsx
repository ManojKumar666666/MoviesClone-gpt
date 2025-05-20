import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";

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

  return (
    <div className="absolute w-screen px-15 py-2 h-25 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-50 " src={LOGO_URL} alt="logo" />
      {user && (
        <div className="flex p-1 items-center">
          <button
            onClick={handleGptSearch}
            className="bg-purple-500 px-2 py-2 mx-1.5 rounded-lg cursor-pointer "
          >
            {gptSearch ? "Standard Mode" : "GPT Search"}
          </button>
          <img className="w-12 h-12" alt="user-icon" src={user.photoURL} />
          <button
            className="font-bold text-white cursor-pointer "
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
