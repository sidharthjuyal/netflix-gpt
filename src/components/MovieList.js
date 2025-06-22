import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-9 text-white">
      <h1 className="text-lg md:text-2xl text-bold py-6 text-center md:text-left">{title}</h1>
      <div className="flex overflowing-div overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
