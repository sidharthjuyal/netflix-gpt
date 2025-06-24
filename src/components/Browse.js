import Header from "./Header";
import NetworkError from "./NetworkError";
import Loading from "./Loading";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import TrailerModal from "./TrailerModal";
import { useSelector } from "react-redux";
import useFetchAllMovies from "../hooks/useFetchAllMovies";

const Browse = () => {
  const trailerModal = useSelector((store) => store.trailerModal);
  const showGptSearch = useSelector((store) => store.gpt.searchBarToggleFlag);

  const fetchStatus = useFetchAllMovies(); // "loading" | "success" | "error"

  if (fetchStatus === "loading") return <Loading />;
  if (fetchStatus === "error") return <NetworkError />;

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
