import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId, shouldFetch = true) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideo = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      );

      if (!res.ok) {
        console.error(
          `❌ Failed to fetch trailer: ${res.status} ${res.statusText}`
        );
        return;
      }

      const json = await res.json();
      const filterData = json.results.filter(
        (video) => video.name === "Official Teaser Trailer"
      );
      const trailer = filterData.length ? filterData[0] : json.results[0];

      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("❌ Error fetching movie trailer:", error);
    }
  };

  useEffect(() => {
    if (shouldFetch && movieId && !trailerVideo) {
      getMovieVideo();
    }
  }, [shouldFetch, movieId, trailerVideo]);
};

export default useMovieTrailer;
