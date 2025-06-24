import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { openTrailerModal } from "../utils/trailerModalSlice";

const MovieCard = ({ movie }) => {
  const { poster_path, id, original_title } = movie;
  const dispatch = useDispatch();
  const handleMovieClick = () => {
    dispatch(openTrailerModal({ movieName: movie.title, movieId: movie.id }));
  };
  if (!poster_path) return null;
  const imageSize = window.innerWidth <= 768 ? "w342" : "w500";
  return (
    <div
      onClick={handleMovieClick}
      className="cursor-pointer transition duration-300 hover:scale-103 w-32 h-40 md:w-48 md:h-52 pr-4 rounded-md"
    >
      <img
        className="h-40 md:h-52 rounded-md"
        alt="movie name"
        loading="lazy"
        src={IMG_CDN_URL + imageSize + poster_path}
      />
    </div>
  );
};

export default MovieCard;
