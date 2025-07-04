import Header from "./Header";
import { useState, useRef } from "react";
import checkValidData from "../utils/validate";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // validate the form data
    const validationResult = checkValidData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(validationResult);

    if (validationResult) return;

    // Sign In / Sign Up logic here
    if (!isSignInForm) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
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
            })
            .catch((error) => {});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("Email or Password is Wrong!");
        });
    }
  };

  return (
    <div className="select-none">
      <Header />
      <div className="absolute w-full h-full bg-cover bg-center">
        <img
          alt="background image"
          src={BG_URL}
          className="w-full h-full object-cover"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-[500px]:w-2/3 xl:w-3/12 lg:w-4/12 md:w-1/2 sm:w-1/2 w-1/2 absolute p-12 bg-[rgba(0,0,0,0.9)] my-36 mx-auto right-0 left-0 text-white rounded-md"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="text-xs p-2 my-2 w-full bg-[rgba(47,47,47,0.95)]"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="text-xs p-2 my-2 w-full bg-[rgba(47,47,47,0.95)]"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="text-xs p-2 my-2 w-full bg-[rgba(47,47,47,0.95)]"
        />
        <p className="py-2 text-red-500 text-xs">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="text-sm py-2 px-1 my-2 w-full bg-red-700 cursor-pointer"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          onClick={toggleSignInForm}
          className="my-4 text-xs cursor-pointer text-gray-300"
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
