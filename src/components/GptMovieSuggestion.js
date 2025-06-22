import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const gptData = useSelector((store) => store.gpt.gptMovies);

  if (
    !gptData ||
    !gptData.movieNames ||
    gptData.movieNames.length === 0 ||
    !gptData.movieResults ||
    gptData.movieResults.length === 0
  )
    return null;

  return (
    <div className="backdrop-blur-sm bg-[rgba(0,0,0,0.85)] rounded-xl shadow-lg ml-4 mr-8 mb-4 mt-0 p-4 text-white">
      {gptData.movieNames.map((name, index) => (
          <MovieList key={name} title={name} movies={gptData.movieResults[index]} />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
