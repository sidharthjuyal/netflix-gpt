import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((state) => state.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS
      );

      if (!res.ok) {
        console.error(
          `Failed to fetch upcoming movies: ${res.status} ${res.statusText}`
        );
        return;
      }

      const json = await res.json();
      dispatch(addUpcomingMovies(json));
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  useEffect(() => {
    if (!upcomingMovies) getUpcomingMovies();
  }, [upcomingMovies]);
};

export default useUpcomingMovies;
