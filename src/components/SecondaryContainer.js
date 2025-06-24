import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black pb-24">
        <div className="mt-0 md:-mt-44 md:pl-12 relative z-20">
          <MovieList
            title={"Now Playing"}
            movies={movies?.nowPlayingMovies?.results}
          />
          <MovieList
            title={"Top Rated Movies"}
            movies={movies?.topRatedMovies?.results}
          />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies?.upcomingMovies?.results}
          />
          <MovieList
            title={"Popular Movies"}
            movies={movies?.popularMovies?.results}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
