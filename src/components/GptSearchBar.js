import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const languageKey = useSelector((store) => store.config.lang);
  return (
    <div className="w-full flex justify-center items-center h-60 bg-gradient-to-b from-black">
      <form className="w-1/2 flex justify-center p-6 m-6">
        <input
          type="text"
          placeholder={lang[languageKey]?.gptSearchPlaceholder}
          className="w-4/5 p-2 m-4 bg-white text-sm"
        />
        <button className="w-1/5 p-2 m-4 bg-red-700 text-white rounded-lg hover:cursor-pointer text-sm">
          {lang[languageKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
