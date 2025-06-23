import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTrailerId } from "../utils/trailerModalSlice";

const useTrailerModalVideo = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieVideo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        );

        const json = await res.json();
        console.log(json);
        const filtered = json.results.filter((video) =>
          video.name.toLowerCase().includes("trailer")
        );
        const trailer = filtered.length ? filtered[0] : json.results[0];
        
        dispatch(setTrailerId((trailer?.key) ? trailer?.key : "none" ));
      } catch (error) {
        console.error("❌ Error fetching movie trailer:", error);
      }
    };

    if (movieId) getMovieVideo();
  }, [movieId, dispatch]);
};

export default useTrailerModalVideo;
