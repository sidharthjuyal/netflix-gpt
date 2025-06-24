import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector(
    (store) => store.movies?.topRatedMovies?.results
  );
  if (!movies) return;

  const mainMovie = movies[5];
  const { original_title, overview, id } = mainMovie;
  return (
    <div className="bg-black max-[450px]:pt-[40%] max-[780px]:pt-[30%] md:pt-0">
      <VideoTitle title={original_title} overview={overview} id={id} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
