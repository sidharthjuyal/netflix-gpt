import { useDispatch } from "react-redux";
import { openTrailerModal } from "../utils/trailerModalSlice";

const VideoTitle = ({ title, overview, id}) => {
  const dispatch = useDispatch();
  const handleMovieClick = () => {
    dispatch(openTrailerModal({ movieName: title, movieId: id }));
  };
  return (
    <div className="w-full aspect-video xl:pt-[13%] lg:pt-[10%] md:pt-[10%] pt-[7.5%] absolute px-6 md:px-24 bg-gradient-to-r from-black">
      <h1 className="text-white xl:text-2xl lg:text-xl md:text-lg text-xl font-bold">{title}</h1>
      <div title={overview} className="text-white py-6 xl:text-md lg:text-sm md:text-xs text-xs w-10/12 md:w-1/2">{overview}</div>
      <div>
        <button onClick={handleMovieClick} className="hover:opacity-[0.85] bg-white text-black py-2 px-4 md:py-2 md:px-10 xl:text-lg lg:text-md md:text-sm text-xs rounded-lg">▷ Play</button>
        <button className="hidden md:inine-block  hover:opacity-[0.85] bg-gray-500 text-white py-4 px-10 xl:text-lg lg:text-md md:text-sm text-xl rounded-lg mx-2">ⓘ More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
