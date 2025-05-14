import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
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

  return (
    <div className="absolute w-screen px-15 py-2 h-25 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-50 " src={LOGO_URL} alt="logo" />
      {user && (
        <div className="flex p-1 items-center">
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
