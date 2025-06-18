import { useSelector } from "react-redux";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useLoadAllMovies from "../hooks/useLoadAllMovies";

const Browse = () => {
  useLoadAllMovies();

  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  if (loading)
    return <div className="text-white text-xl p-4">Loading movies...</div>;
  if (error)
    return <div className="text-red-500 text-xl p-4">Error: {error}</div>;

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;