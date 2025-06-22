import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const languageKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  
  // search movie in TMDB
  const searchMovieTmdb = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    return json?.results;
  }

  const handleGptSearchClick = async () => {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "Act as a Movie Recommendation system and suggest some movies for the query: " +
            searchText.current.value +
            ". Only give me 5 movies - commas separated (and don't type anything else) like the example given ahead. Example: Gadar, Sholay, Rush Hour, The Dark Knight, The Shawshank Redemption.",
        },
      ],
      model: "llama3-8b-8192",
    });
    const gptMovies = chatCompletion.choices?.[0]?.message?.content.split(", ");
    const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults}));
  };
  return (
    <div className="w-full flex justify-center items-end h-64 md:h-60 bg-gradient-to-b from-black">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-1/2 flex justify-center px-3 mx-3 py-6 my-6 md:p-6 md:m-6"
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[languageKey]?.gptSearchPlaceholder}
          className="w-5/6 md:w-4/5 p-2 m-2 md:m-4 bg-white text-sm rounded-sm"
        />
        <button
          onClick={handleGptSearchClick}
          className="w-1/6 md:w-1/5 p-2 m-2 md:m-4 bg-red-700 text-white rounded-sm hover:cursor-pointer text-sm"
        >
          {lang[languageKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
