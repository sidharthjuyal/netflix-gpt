import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { useSelector, useDispatch } from "react-redux";
import { BG_URL } from "../utils/constants";
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect, useState } from "react";

// 🌟 Centralized retry utility
const fetchWithRetry = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`Fetch failed (Attempt ${i + 1}):`, err);
      await new Promise(res => setTimeout(res, 500));
    }
  }
  throw new Error("❌ All retry attempts failed.");
};

const Browse = () => {
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.searchBarToggleFlag);
  const [isLoading, setIsLoading] = useState(!showGptSearch);
  const [fetchError, setFetchError] = useState(null);

  const nowPlaying = useSelector((store) => store.movies.nowPlayingMovies);
  const popular = useSelector((store) => store.movies.popularMovies);
  const topRated = useSelector((store) => store.movies.topRatedMovies);
  const upcoming = useSelector((store) => store.movies.upcomingMovies);

  useEffect(() => {
    if (!showGptSearch) {
      const fetchMovies = async () => {
        setIsLoading(true);
        try {
          const [np, pop, top, up] = await Promise.all([
            fetchWithRetry(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`),
            fetchWithRetry(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`),
            fetchWithRetry(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`),
            fetchWithRetry(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`),
          ]);

          dispatch(addNowPlayingMovies(np));
          dispatch(addPopularMovies(pop));
          dispatch(addTopRatedMovies(top));
          dispatch(addUpcomingMovies(up));
        } catch (err) {
          setFetchError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchMovies();
    }
  }, [showGptSearch, dispatch]);

  const isDataReady = nowPlaying && popular && topRated && upcoming;

  if (!showGptSearch && (isLoading || !isDataReady)) {
    return (
      <div className="w-full h-full flex justify-center items-center text-black text-xl p-4">
        <div className="relative min-h-screen">
          <div className="fixed inset-0 -z-10">
            <img className="w-full h-full object-cover" alt="background Image" src={BG_URL} />
          </div>
          <div className="backdrop-blur-sm rounded-sm absolute top-1/2 left-1/2 text-white p-3 bg-[rgba(0,0,0,0.8)]">
            {fetchError ? `Error: ${fetchError}` : "Loading..."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
