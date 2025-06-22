import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = (shouldFetch = true) => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((state) => state.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
      );

      if (!res.ok) {
        console.error(
          `❌ Failed to fetch upcoming movies: ${res.status} ${res.statusText}`
        );
        return;
      }

      const json = await res.json();
      dispatch(addUpcomingMovies(json));
    } catch (error) {
      console.error("❌ Error fetching upcoming movies:", error);
    }
  };

  useEffect(() => {
    if (shouldFetch && !upcomingMovies) {
      getUpcomingMovies();
    }
  }, [shouldFetch, upcomingMovies]);
};

export default useUpcomingMovies;
