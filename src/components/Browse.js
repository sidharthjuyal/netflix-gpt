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

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.searchBarToggleFlag);
  const trailerModal = useSelector((store) => store.trailerModal);

  useNowPlayingMovies(!showGptSearch);
  usePopularMovies(!showGptSearch);
  useTopRatedMovies(!showGptSearch);
  useUpcomingMovies(!showGptSearch);

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
