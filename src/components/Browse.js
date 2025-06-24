import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import TrailerModal from "./TrailerModal";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.searchBarToggleFlag);
  const trailerModal = useSelector((store) => store.trailerModal);

  useEffect(() => {
    if (!sessionStorage.getItem("reloadedOnce")) {
      sessionStorage.setItem("reloadedOnce", "true");
      window.location.href = window.location.href;
    }
  }, []);
  
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
