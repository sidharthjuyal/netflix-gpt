import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import { BG_URL } from "../utils/constants";
import GptSearch from "./GptSearch";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.searchBarToggleFlag);

  useNowPlayingMovies(!showGptSearch);
  usePopularMovies(!showGptSearch);
  useTopRatedMovies(!showGptSearch);
  useUpcomingMovies(!showGptSearch);

  const nowPlaying = useSelector((store) => store.movies.nowPlayingMovies);
  const popular = useSelector((store) => store.movies.popularMovies);
  const topRated = useSelector((store) => store.movies.topRatedMovies);
  const upcoming = useSelector((store) => store.movies.upcomingMovies);

  const isDataReady = nowPlaying && popular && topRated && upcoming;

  if (!showGptSearch && !isDataReady) {
    return (
      <div className="w-full h-full flex justify-center items-center text-black text-xl p-4">
        <div className="relative min-h-screen">
          <div className="fixed inset-0 -z-10">
            <img className="w-full h-full object-cover" alt="background Image" src={BG_URL} />
          </div>
          <div className="backdrop-blur-sm rounded-sm absolute top-1/2 left-1/2 text-white p-3 bg-[rgba(0,0,0,0.8)]">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
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
