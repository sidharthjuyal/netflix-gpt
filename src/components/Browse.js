import Header from "./Header";
import NetworkError from "./NetworkError";
import Loading from "./Loading";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { useSelector, useDispatch } from "react-redux";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} from "../utils/moviesSlice";
import { useEffect, useState } from "react";
import TrailerModal from "./TrailerModal";

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

  const hasReloaded = sessionStorage.getItem("hasReloadedOnce");

  if (!hasReloaded) {
    sessionStorage.setItem("hasReloadedOnce", "true");
    console.warn("❌ First fail: triggering reload...");
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
    throw new Error("Reloading after first fail.");
  }

  // Second fail after reload
  throw new Error("❌ Second fetch fail – showing error screen.");
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

        // Clear the reload flag if everything worked
        sessionStorage.removeItem("hasReloadedOnce");
      } catch (err) {
        console.error("Error fetching movies:", err.message);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [dispatch]);

  if (hasError) {
    return (
      <NetworkError />
    );
  }

  if (isLoading || !isDataReady) {
    return (
      <Loading />
    );
  }

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
