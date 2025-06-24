import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import TrailerModal from "./TrailerModal";
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { BG_URL } from "../utils/constants";

const Browse = () => {
  const trailerModal = useSelector((store) => store.trailerModal);
  const showGptSearch = useSelector((store) => store.gpt.searchBarToggleFlag);

  // always call all hooks
  const nowPlayingStatus = useNowPlayingMovies(); // returns "loading", "success", or "error"
  usePopularMovies(nowPlayingStatus === "success");
  useTopRatedMovies(nowPlayingStatus === "success");
  useUpcomingMovies(nowPlayingStatus === "success");

  if (nowPlayingStatus === "loading") {
    return (
      <div className="w-full h-full flex justify-center items-center text-black text-xl p-4">
        <div className="relative min-h-screen">
          <div className="fixed inset-0 -z-10">
            <img
              className="w-full h-full object-cover"
              alt="background Image"
              src={BG_URL}
            />
          </div>
          <div className="backdrop-blur-sm rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-3 bg-[rgba(0,0,0,0.8)]">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (nowPlayingStatus === "error") {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black text-white text-center p-4">
        <div className="max-w-md bg-red-800/60 p-4 rounded-xl backdrop-blur">
          <h2 className="text-xl font-bold mb-2">⚠️ Network Issue</h2>
          <p className="text-sm">
            We tried reloading the page, but it still didn't work. Please check
            your internet and try manually refreshing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {trailerModal.isOpen && (
        <TrailerModal
          movieId={trailerModal.movieId}
          movieName={trailerModal.movieName}
        />
      )}
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;

