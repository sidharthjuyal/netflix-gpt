import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import  { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return <div>
    <div className="fixed -z-10">
     <img alt="background Image" src={BG_URL} />
    </div>
    <GptSearchBar />
    <GptMovieSuggestion />
  </div>
}

export default GptSearch;