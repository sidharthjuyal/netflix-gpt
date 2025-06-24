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
import TrailerModal from "./TrailerModal";

const safeReload = () => {
  try {
    console.log("🔁 Reloading the page...");
    window.location.reload(true); // Hard reload attempt
  } catch {
    window.location.href = window.location.href; // Fallback
  }
};

// Retry wrapper with smart reload logic
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

  let hasFailedBefore = false;
  try {
    hasFailedBefore = localStorage.getItem("netflixFetchFailedOnce");
  } catch (e) {
    console.warn("⚠️ localStorage not available");
  }

  if (!hasFailedBefore) {
    try {
      localStorage.setItem("netflixFetchFailedOnce", "true");
    } catch (e) {
      console.warn("⚠️ Failed to set localStorage flag");
    }

    console.error("❌ All retries failed. Forcing reload...");
    setTimeout(safeReload, 1500);
  }

  throw new Error("❌ Fetch failed after all retries.");
};

const Browse = () => {
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.searchBarToggleFlag);
  const trailerModal = useSelector((store) => store.trailerModal);

  const nowPlaying = useSelector((store) => store.movies.nowPlayingMovies);
  const popular = useSelector((store) => store.movies.popularMovies);
  const topRated = useSelector((store) => store.movies.topRatedMovies);
  const upcoming = useSelector((store) => store.movies.upcomingMovies);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isDataReady =
    nowPlaying?.results &&
    popular?.results &&
    topRated?.results &&
    upcoming?.results;

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        if (!navigator.onLine) throw new Error("Offline");

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

        // ✅ Clear the fail flag after success
        try {
          localStorage.removeItem("netflixFetchFailedOnce");
        } catch (e) {
          console.warn("⚠️ Failed to clear localStorage flag");
        }
      } catch (err) {
        console.error("Error fetching movies:", err.message);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [dispatch]);

  // ❌ Error fallback UI
  if (hasError) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black text-white text-center p-4">
        <div className="max-w-md bg-red-800/60 p-4 rounded-xl backdrop-blur">
          <h2 className="text-xl font-bold mb-2">⚠️ Network Issue</h2>
          <p className="text-sm">
            Something went wrong while loading movies. Please check your
            internet connection and try refreshing the page manually.
          </p>
        </div>
      </div>
    );
  }

  // ⏳ Loading Screen
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
          <div className="backdrop-blur-sm rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-3 bg-[rgba(0,0,0,0.8)]">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  // ✅ Actual Content
  return (
    <div>
      <Header />
      {trailerModal.isOpen && (
        <TrailerModal
          movieId={trailerModal.movieId}
          movieName={trailerModal.movieName}
        />
      )}
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
