import { useDispatch, useSelector } from "react-redux";
import { closeTrailerModal } from "../utils/trailerModalSlice";
import useTrailerModalVideo from "../hooks/useTrailerModalVideo";
import { SVG_URL } from "../utils/constants";
import { useState, useEffect } from "react";

const TrailerModal = ({ movieName, movieId }) => {
  const dispatch = useDispatch();
  const trailerId = useSelector((store) => store.trailerModal.trailerId);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const handleCloseModal = () => {
    dispatch(closeTrailerModal());
  };

  useTrailerModalVideo(movieId);

  // If there's no trailer, stop the spinner after short delay
  useEffect(() => {
    if (trailerId === "none") {
      const timeout = setTimeout(() => setIsIframeLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [trailerId]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen overflow-hidden flex justify-center items-center bg-[rgba(0,0,0,0.9)]">
      <div className="rounded-md bg-white w-[80%] md:w-[40%] m-2 p-6 pt-3">
        <div className="flex justify-between items-center mb-4">
          <div className="truncate font-bold text-md mr-4">{movieName}</div>
          <svg
            onClick={handleCloseModal}
            xmlns={SVG_URL}
            width="16"
            height="16"
            fill="currentColor"
            className="hover:text-red-700 bi bi-x-circle w-[14px] h-[14px] md:w-[16px] md:h-[16px] mt-[2px] md:mt-1 cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>

        {/* Show spinner always while loading */}
        {isIframeLoading && (
          <div className="flex justify-center items-center h-[175px] md:h-[225px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Show iframe when trailerId is valid */}
        {trailerId !== "none" && (
          <iframe
            className={`w-full h-[175px] md:h-[225px] ${isIframeLoading ? "hidden" : ""}`}
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&color=white&playlist=${trailerId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsIframeLoading(false)}
          ></iframe>
        )}

        {/* Show "no video" only after loading completes */}
        {!isIframeLoading && trailerId === "none" && (
          <h1 className="text-center py-6 text-sm text-gray-600">
            No Video Available!
          </h1>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
