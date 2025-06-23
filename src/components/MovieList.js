import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import { SVG_URL } from "../utils/constants";

const MovieList = ({ title, movies }) => {
  const showGptSearch = useSelector((store) => store.gpt.searchBarToggleFlag);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  if (!movies || movies.length === 0) return null;

  const handleTooltipClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000); // auto-hide after 2s
  };

  return (
    <div className="px-9 text-white relative">
      <h1 className="text-md md:text-2xl font-bold py-6 flex items-center text-left md:text-left">
        <span>{title}</span>
        {showGptSearch && (
          <div
            className="relative ml-2 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleTooltipClick} // for mobile tap
          >
            <svg
              color="white"
              xmlns= {SVG_URL}
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-circle w-[14px] h-[14px] md:w-[16px] md:h-[16px] mt-[2px] md:mt-1"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>

            {(isHovered || isClicked) && (
              <div className="absolute bottom-full left-full px-3 py-1 bg-black text-[10px] font-light text-white rounded z-40 w-[150px]">
                {`This section contains movies with similar name as: ${title}`}
              </div>
            )}
          </div>
        )}
      </h1>

      <div className="flex overflowing-div overflow-x-scroll overflow-y-hidden">
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
