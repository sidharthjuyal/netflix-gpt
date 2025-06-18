import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  setLoading,
  setError,
} from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useLoadAllMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const [nowPlayingRes, popularRes, topRatedRes, upcomingRes] =
          await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${API_OPTIONS.api_key}`,
              API_OPTIONS
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_OPTIONS.api_key}`,
              API_OPTIONS
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_OPTIONS.api_key}`,
              API_OPTIONS
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${API_OPTIONS.api_key}`,
              API_OPTIONS
            ),
          ]);

        const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
          nowPlayingRes.json(),
          popularRes.json(),
          topRatedRes.json(),
          upcomingRes.json(),
        ]);

        dispatch(addNowPlayingMovies(nowPlaying));
        dispatch(addPopularMovies(popular));
        dispatch(addTopRatedMovies(topRated));
        dispatch(addUpcomingMovies(upcoming));
      } catch (err) {
        dispatch(setError("Failed to load movies"));
        console.error("Fetch error:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMovies();
  }, [dispatch]);
};

export default useLoadAllMovies;
