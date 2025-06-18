import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ( {movie} ) => {
    const { poster_path } = movie;
  return (
    <div className="w-48 pr-4">
      <img alt="movie name" src={IMG_CDN_URL + poster_path} />
    </div>
  );
};

export default MovieCard;
