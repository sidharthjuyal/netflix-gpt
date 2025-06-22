import { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const languageKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // ✅ Track loading state

  const searchMovieTmdb = async (movie) => {
    const key = process.env.REACT_APP_TMDB_API_KEY;
    const baseUrl = `https://api.themoviedb.org/3/search/movie`;

    const url = `${baseUrl}?query=${encodeURIComponent(
      movie
    )}&include_adult=false&language=en-US&page=1&api_key=${key}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Primary TMDB fetch failed");
      const json = await res.json();
      return json?.results || [];
    } catch (err1) {
      console.warn(
        `❌ Primary fetch failed for "${movie}", trying fallback...`
      );

      // 🔁 Try fallback once
      try {
        const res = await fetch(url); // fire again
        if (!res.ok) throw new Error("Fallback TMDB fetch also failed");
        const json = await res.json();
        return json?.results || [];
      } catch (err2) {
        console.error(`❌ Fallback fetch failed for "${movie}":`, err2);
        return [];
      }
    }
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current.value) return;

    try {
      setIsLoading(true);

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

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("GPT or TMDB fetch failed:", error);
    } finally {
      setIsLoading(false);
    }
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
          className="w-9/12 md:w-4/5 p-2 m-2 md:m-4 bg-white text-sm rounded-sm"
        />
        <button
          onClick={handleGptSearchClick}
          disabled={isLoading}
          className={`w-3/12 md:w-1/5 p-2 m-2 md:m-4 text-white rounded-sm text-sm ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-700 hover:cursor-pointer"
          }`}
        >
          {isLoading ? "Loading..." : lang[languageKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
