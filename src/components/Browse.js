import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { useSelector, useDispatch } from "react-redux";
import { BG_URL } from "../utils/constants";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} from "../utils/moviesSlice";
import { useEffect, useState } from "react";

// ✅ Centralized retry with short delay
const fetchWithRetry = async (url, retries = 3, delay = 500) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`Retry ${i + 1} failed:`, err.message);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("❌ All retry attempts failed due to network or CORS error.");
};

const Browse = () => {
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.searchBarToggleFlag);

  const nowPlaying = useSelector((store) => store.movies.nowPlayingMovies);
  const popular = useSelector((store) => store.movies.popularMovies);
  const topRated = useSelector((store) => store.movies.topRatedMovies);
  const upcoming = useSelector((store) => store.movies.upcomingMovies);

  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const isDataReady = nowPlaying && popular && topRated && upcoming;

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const key = process.env.REACT_APP_TMDB_API_KEY;
        const urls = [
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
          `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
        ];

        const [np, pop, top, up] = await Promise.all(
          urls.map((url) => fetchWithRetry(url))
        );

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
  }, [dispatch]);

  if (isLoading || !isDataReady) {
    return (
      <div className="w-full h-full flex justify-center items-center text-black text-xl p-4">
        <div className="relative min-h-screen">
          <div className="fixed inset-0 -z-10">
            <img
              className="w-full h-full object-cover"
              alt="background Image"
              src={BG_URL}
            />
          </div>

          <div className="backdrop-blur-sm rounded-sm absolute top-1/2 left-1/2 text-white p-3 bg-[rgba(0,0,0,0.8)] text-center">
            {fetchError ? (
              <>
                <div>❌ {fetchError}</div>
                <button
                  className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  onClick={() => window.location.reload()}
                >
                  Retry / Refresh Page
                </button>
              </>
            ) : (
              "Loading..."
            )}
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
