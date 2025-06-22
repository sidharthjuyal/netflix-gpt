import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTIONS
      );

      if (!res.ok) {
        console.error(
          `Failed to fetch popular movies: ${res.status} ${res.statusText}`
        );
        return;
      }

      const json = await res.json();
      dispatch(addPopularMovies(json));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    if (!popularMovies) getPopularMovies();
  }, [popularMovies]);
};

export default usePopularMovies;
