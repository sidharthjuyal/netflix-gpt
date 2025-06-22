import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      );

      if (!res.ok) {
        console.error(
          `Failed to fetch now playing movies: ${res.status} ${res.statusText}`
        );
        return;
      }

      const json = await res.json();
      dispatch(addNowPlayingMovies(json));
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    if (!nowPlayingMovies) getNowPlayingMovies();
  }, [nowPlayingMovies]);
};

export default useNowPlayingMovies;
