import { useEffect } from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  useEffect(() => {
    const hasRefreshed = localStorage.getItem("gpt_refreshed");

    if (!hasRefreshed) {
      localStorage.setItem("gpt_refreshed", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          alt="background Image"
          src={BG_URL}
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptSearch;
