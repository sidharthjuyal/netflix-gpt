import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideo = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );

      if (!res.ok) {
        console.error(
          `Failed to fetch trailer for movie ID ${movieId}: ${res.status} ${res.statusText}`
        );
        return;
      }

      const json = await res.json();

      const filterData = json.results?.filter(
        (video) => video.name === "Official Teaser Trailer"
      );
      const trailer = filterData?.length ? filterData[0] : json.results?.[0];

      if (trailer) {
        dispatch(addTrailerVideo(trailer));
      } else {
        console.warn(`No trailer found for movie ID ${movieId}`);
      }
    } catch (error) {
      console.error(`Error fetching trailer for movie ID ${movieId}:`, error);
    }
  };

  useEffect(() => {
    if (!trailerVideo && movieId) getMovieVideo();
  }, [trailerVideo, movieId]);
};

export default useMovieTrailer;
