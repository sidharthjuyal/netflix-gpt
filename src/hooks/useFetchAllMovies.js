import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} from "../utils/moviesSlice";

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

  throw new Error("❌ Second fetch fail – showing error screen.");
};

const useFetchAllMovies = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const key = process.env.REACT_APP_TMDB_API_KEY;
        const urls = [
          [`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`, addNowPlayingMovies],
          [`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`, addPopularMovies],
          [`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`, addTopRatedMovies],
          [`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`, addUpcomingMovies],
        ];

        for (const [url, action] of urls) {
          const data = await fetchWithRetry(url);
          dispatch(action(data));
        }

        sessionStorage.removeItem("hasReloadedOnce");
        setStatus("success");
      } catch (err) {
        console.error("❌ useFetchAllMovies failed:", err.message);
        setStatus("error");
      }
    };

    fetchMovies();
  }, [dispatch]);

  return status;
};

export default useFetchAllMovies;
