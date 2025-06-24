import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleSearchBar } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = ({ fetchMovies }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.searchBarToggleFlag);

  const handleGPTSearchClick = () => {
    dispatch(toggleSearchBar());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => navigate("/error"));
  };

  const handleGetMovies = () => {
    if (typeof fetchMovies === "function") {
      fetchMovies();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:justify-between absolute px-4 md:px-8 py-2 bg-gradient-to-b from-black z-10 w-full">
      <img className="w-40 mx-auto md:mx-0" alt="logo" src={LOGO} />
      {user && (
        <div className="flex justify-center items-center p-0 md:p-2">
          {showGPTSearch && (
            <select
              onChange={handleLanguageChange}
              className="bg-white border-0 outline-0 rounded-sm text-xs m-2 p-2"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
            </select>
          )}
          <button
            onClick={showGPTSearch ? handleGetMovies : handleGPTSearchClick}
            className="rounded-sm cursor-pointer m-2 p-2 bg-white text-black text-xs"
          >
            {showGPTSearch ? "Get Movies" : "GPT Search"}
          </button>
          <button
            onClick={handleSignOut}
            className="rounded-sm cursor-pointer m-2 p-2 bg-red-700 text-white text-xs"
          >
            Sign Out
          </button>
          <img
            className="w-8 h-8 m-2 rounded-full"
            alt="user icon"
            src={user?.photoURL}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
