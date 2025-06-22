import MovieCard from "./MovieCard";
import { InfoCircle } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const MovieList = ({ title, movies }) => {
  const showGptSearch = useSelector((store) => store.gpt.searchBarToggleFlag);
  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-9 text-white">
      <h1 className="text-lg md:text-2xl font-bold py-6 flex items-center text-center md:text-left">
        <span>{title}</span>
        {showGptSearch && <span><InfoCircle color="white" size={16} className="ml-2 cursor-pointer mt-1" title={"This section contains movies with similar name as: " + title} /></span>}
      </h1>
      <div className="flex overflowing-div overflow-x-scroll">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
