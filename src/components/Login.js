import Header from "./Header";
import { useState, useRef } from "react";
import checkValidData from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // validate the form data
    const validationResult = checkValidData(email.current.value, password.current.value);
    setErrorMessage(validationResult);
  };

  return (
    <div className="select-none"> 
      <Header />
      <div className="absolute">
        <img
          alt="background image"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7968847f-3da9-44b3-8bbb-13a46579881f/web/IN-en-20250609-TRIFECTA-perspective_32b70b51-20d4-46db-8a1a-3d5428be5f0e_large.jpg"
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-[rgba(0,0,0,0.9)] my-36 mx-auto right-0 left-0 text-white rounded-md">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && 
          <input
            type="text"
            placeholder="Full Name"
            className="text-xs p-2 my-2 w-full bg-[rgba(47,47,47,0.95)]"
          />
        }
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
