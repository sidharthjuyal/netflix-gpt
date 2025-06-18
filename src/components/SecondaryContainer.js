import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black pb-24">
        <div className="-mt-44 pl-12 relative z-20">
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
