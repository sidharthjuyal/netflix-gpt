import { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { addGptMovieResult } from "../utils/gptSlice";

// Reusable fetch with retry + reload logic
const fetchWithRetry = async (url, retries = 3, delay = 500) => {
  for (let i = 0; i < retries; i++) {
    try {
      if (!navigator.onLine) throw new Error("Offline");
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`Retry ${i + 1} failed:`, err.message);
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  const hasReloaded = sessionStorage.getItem("searchReloadedOnce");
  if (!hasReloaded) {
    sessionStorage.setItem("searchReloadedOnce", "true");
    console.warn("🔁 Reloading due to GPT search fetch failure...");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    throw new Error("Reloading after failed GPT fetch.");
  }

  throw new Error("❌ Final GPT fetch failure.");
};

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const languageKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const searchMovieTmdb = async (movie) => {
    const key = process.env.REACT_APP_TMDB_API_KEY;
    const baseUrl = `https://api.themoviedb.org/3/search/movie`;
    const url = `${baseUrl}?query=${encodeURIComponent(
      movie
    )}&include_adult=false&language=en-US&page=1&api_key=${key}`;

    try {
      const json = await fetchWithRetry(url);
      return json?.results || [];
    } catch (err) {
      console.error(`❌ Final failure for movie: "${movie}"`);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current.value) return;

    try {
      setIsLoading(true);
      setSearchError(false);

      await new Promise((res) => setTimeout(res, 800));

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

      const gptMovies =
        chatCompletion.choices?.[0]?.message?.content.split(", ") || [];

      const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie));
      const tmdbResults = await Promise.all(promiseArray);

      const allEmpty = tmdbResults.every((res) => res.length === 0);
      if (allEmpty) throw new Error("All TMDB searches returned empty");

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      console.error("GPT Search failed completely:", error);
      setSearchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-64 md:h-60 bg-gradient-to-b from-black text-white">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-1/2 flex justify-center px-3 mx-3 py-6 md:p-6"
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[languageKey]?.gptSearchPlaceholder}
          className="w-9/12 md:w-4/5 p-2 m-2 md:m-4 bg-white text-black text-sm rounded-sm"
        />
        <button
          onClick={handleGptSearchClick}
          disabled={isLoading}
          className={`w-3/12 md:w-1/5 p-2 m-2 md:m-4 rounded-sm text-sm ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-700 hover:cursor-pointer"
          }`}
        >
          {isLoading ? "Loading..." : lang[languageKey]?.search}
        </button>
      </form>

      {searchError && (
        <div className="text-center text-xs text-red-300">
          ⚠️ Could not fetch movies. Please check your network and try again.
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
