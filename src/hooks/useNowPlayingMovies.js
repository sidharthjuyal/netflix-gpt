import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlaying = useSelector((store) => store.movies.nowPlayingMovies);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"

  const fetchMoviesWithRetry = async (retryCount = 3) => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`;

    for (let i = 0; i < retryCount; i++) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Bad Response");
        const json = await res.json();
        dispatch(addNowPlayingMovies(json));
        setStatus("success");
        return;
      } catch (err) {
        console.warn(`Retry ${i + 1} failed: ${err.message}`);
        await new Promise((res) => setTimeout(res, 1000));
      }
    }
    throw new Error("All retries failed");
  };

  useEffect(() => {
    if (nowPlaying?.results) {
      setStatus("success");
      return;
    }

    const run = async () => {
      try {
        await fetchMoviesWithRetry();
      } catch (e) {
        const reloaded = sessionStorage.getItem("nowPlayingReloaded");
        if (!reloaded) {
          sessionStorage.setItem("nowPlayingReloaded", "true");
          console.warn("Reloading page for second round of retries...");
          window.location.reload();
        } else {
          setStatus("error");
        }
      }
    };

    run();
  }, [nowPlaying]);

  return status;
};

export default useNowPlayingMovies;
