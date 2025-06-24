import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = (shouldFetch = true) => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
      );

      if (!res.ok) {
        console.error(
          `❌ Failed to fetch top rated movies: ${res.status} ${res.statusText}`
        );
        return;
      }

      const json = await res.json();
      dispatch(addTopRatedMovies(json));
    } catch (error) {
      console.error("❌ Error fetching top rated movies:", error);
    }
  };

  useEffect(() => {
    if (shouldFetch && !topRatedMovies) {
      getTopRatedMovies();
    }
  }, [shouldFetch, topRatedMovies]);
};

export default useTopRatedMovies;
