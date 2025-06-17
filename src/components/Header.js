import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  console.log("user: " + user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="flex justify-between absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full">
      <img
        className="w-40"
        alt="logo"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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
