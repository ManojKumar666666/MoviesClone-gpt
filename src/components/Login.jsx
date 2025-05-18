import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { PROFILE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUp, setSignUp] = useState(false);
  const [errmessage, setErrmessage] = useState("");
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleSignup = () => {
    setSignUp(!signUp);
    setErrmessage("");
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    const message = checkValidation(
      email.current.value,
      password.current.value
    );
    console.log("hello");
    setErrmessage(message);
    console.log(signUp);
    if (message) return;

    if (signUp) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PROFILE_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrmessage(error.message);
            });

          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrmessage(errorCode);

          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");

          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrmessage(errorCode);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="https://images.unsplash.com/photo-1744068631576-132a67696f5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-1/3 my-36 p-12 mx-auto right-0 left-0 bg-black/60 text-white  "
      >
        <h1 className="text-3xl font-bold">{signUp ? "Sign Up" : "Sign In"}</h1>
        {signUp && (
          <input
            ref={name}
            className="p-3 my-4 w-full border border-b-amber-50"
            type="text"
            placeholder="Enter your name "
          />
        )}
        <input
          ref={email}
          className="p-3 my-4 w-full border border-b-amber-50"
          type="email"
          placeholder="Enter Email  "
        />
        <input
          ref={password}
          className=" p-3 my-4 w-full border border-b-amber-50"
          type="Password"
          placeholder="Enter Password "
        />
        {signUp && (
          <input
            className=" p-3 my-4 w-full border border-b-amber-50"
            type="Password"
            placeholder="Conform Password "
          />
        )}
        <p className="text-red-400">{errmessage}</p>
        <button
          type="submit"
          onClick={(e) => handleSignIn(e)}
          className=" p-3 my-4 w-full bg-red-800  cursor-pointer"
        >
          {signUp ? "Sign Up" : "Sign In"}
        </button>
        <p>
          {signUp ? "Already have an account ? " : "New User?"}
          <span
            onClick={handleSignup}
            className="font-bold hover:underline cursor-pointer"
          >
            {signUp ? "Sign in" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
