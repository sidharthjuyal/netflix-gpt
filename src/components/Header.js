import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User Signed In
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
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    
    // unsunscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-between absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full">
      <img
        className="w-40"
        alt="logo"
        src={LOGO}
      />
      {user && (
        <div className="flex justify-center items-center p-2">
          <img className="w-8 h-8" alt="user icon" src={user?.photoURL} />
          <button
            onClick={handleSignOut}
            className="rounded-sm cursor-pointer m-2 p-2 bg-red-700 text-white text-xs"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
