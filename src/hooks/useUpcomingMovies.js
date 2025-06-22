import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((state) => state.movies.upcomingMovies);
  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    if (!data.ok) {
      console.error(`TMDB Fetch Error: ${data.status} - ${data.statusText}`);
      return; // stop here
    }
    const json = await data.json();
    dispatch(addUpcomingMovies(json));
  };

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, [upcomingMovies]);
};

export default useUpcomingMovies;
