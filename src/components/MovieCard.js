import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ( {movie} ) => {
    const { poster_path } = movie;
    if(!poster_path) return null;
  return (
    <div className="w-48 h-52 pr-4 rounded-md">
      <img className="h-52 rounded-md" alt="movie name" src={IMG_CDN_URL + poster_path} />
    </div>
  );
};

export default MovieCard;
